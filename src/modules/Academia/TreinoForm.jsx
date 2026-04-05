import { useState } from 'react'
import styles from './TreinoForm.module.css'

const emptyExercise = { nome: '', series: 3, reps: '10', carga: 0, obs: '' }

export default function TreinoForm({ initialData, onSave, onDelete, onClose }) {
  const [form, setForm] = useState(initialData || { nome: '', pessoa: 'João Pedro', diaSemana: 'seg', exercicios: [emptyExercise] })

  function update(field, value) {
    setForm((current) => ({ ...current, [field]: value }))
  }

  function updateExercise(index, field, value) {
    setForm((current) => ({
      ...current,
      exercicios: current.exercicios.map((item, itemIndex) => (itemIndex === index ? { ...item, [field]: value } : item))
    }))
  }

  function addExercise() {
    setForm((current) => ({ ...current, exercicios: [...current.exercicios, emptyExercise] }))
  }

  function removeExercise(index) {
    setForm((current) => ({
      ...current,
      exercicios: current.exercicios.filter((_, itemIndex) => itemIndex !== index)
    }))
  }

  async function handleSubmit(event) {
    event.preventDefault()
    await onSave({
      ...form,
      exercicios: form.exercicios.map((item) => ({
        ...item,
        series: Number(item.series),
        carga: Number(item.carga)
      }))
    })
    onClose()
  }

  async function handleDelete() {
    if (!form.id || !window.confirm('Excluir treino?')) return
    await onDelete(form.id)
    onClose()
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <label className="field">
        <span>Nome*</span>
        <input value={form.nome} onChange={(event) => update('nome', event.target.value)} />
      </label>
      <label className="field">
        <span>Pessoa</span>
        <select value={form.pessoa} onChange={(event) => update('pessoa', event.target.value)}>
          <option>João Pedro</option>
          <option>Tefinha</option>
        </select>
      </label>
      <label className="field">
        <span>Dia da semana</span>
        <select value={form.diaSemana} onChange={(event) => update('diaSemana', event.target.value)}>
          <option value="seg">Segunda</option>
          <option value="ter">Terça</option>
          <option value="qua">Quarta</option>
          <option value="qui">Quinta</option>
          <option value="sex">Sexta</option>
          <option value="sab">Sábado</option>
          <option value="dom">Domingo</option>
        </select>
      </label>

      <div className={styles.exerciseList}>
        {form.exercicios.map((item, index) => (
          <div key={index} className={styles.exercise}>
            <label className="field">
              <span>Exercício</span>
              <input value={item.nome} onChange={(event) => updateExercise(index, 'nome', event.target.value)} />
            </label>
            <div className={styles.grid}>
              <label className="field">
                <span>Séries</span>
                <input type="number" value={item.series} onChange={(event) => updateExercise(index, 'series', event.target.value)} />
              </label>
              <label className="field">
                <span>Reps</span>
                <input value={item.reps} onChange={(event) => updateExercise(index, 'reps', event.target.value)} />
              </label>
            </div>
            <div className={styles.grid}>
              <label className="field">
                <span>Carga</span>
                <input type="number" value={item.carga} onChange={(event) => updateExercise(index, 'carga', event.target.value)} />
              </label>
              <label className="field">
                <span>Obs</span>
                <input value={item.obs} onChange={(event) => updateExercise(index, 'obs', event.target.value)} />
              </label>
            </div>
            <button type="button" className={styles.remove} onClick={() => removeExercise(index)}>
              Remover exercício
            </button>
          </div>
        ))}
      </div>

      <button type="button" className={styles.add} onClick={addExercise}>
        + Exercício
      </button>

      <div className={styles.actions}>
        <button type="submit" className={styles.save}>
          Salvar
        </button>
        {form.id ? (
          <button type="button" className={styles.delete} onClick={handleDelete}>
            Excluir
          </button>
        ) : null}
      </div>
    </form>
  )
}
