import { useMemo, useState } from 'react'
import styles from './MedForm.module.css'
import { getRemainingDays } from '../../lib/meds'

const emptyState = {
  name: '',
  dosage: '',
  person: 'João Pedro',
  frequency: '1x ao dia',
  qty: 0,
  alertQty: 0,
  dailyUse: 1,
  times: '',
  notes: ''
}

export default function MedForm({ initialData, onClose, onSave, onDelete }) {
  const [form, setForm] = useState(initialData || emptyState)
  const remainingDays = useMemo(() => getRemainingDays(form), [form])

  function updateField(field, value) {
    setForm((current) => ({ ...current, [field]: value }))
  }

  async function handleSubmit(event) {
    event.preventDefault()
    if (!form.name || form.qty === '') return
    await onSave({
      ...form,
      qty: Number(form.qty),
      alertQty: Number(form.alertQty),
      dailyUse: Number(form.dailyUse)
    })
    onClose()
  }

  async function handleDelete() {
    if (!form.id || !window.confirm('Excluir remédio?')) return
    await onDelete(form.id)
    onClose()
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <label className="field">
        <span>Nome*</span>
        <input value={form.name} onChange={(event) => updateField('name', event.target.value)} />
      </label>
      <label className="field">
        <span>Dosagem</span>
        <input value={form.dosage} onChange={(event) => updateField('dosage', event.target.value)} />
      </label>
      <label className="field">
        <span>Pessoa</span>
        <select value={form.person} onChange={(event) => updateField('person', event.target.value)}>
          <option>João Pedro</option>
          <option>Tefinha</option>
          <option>Ambos</option>
        </select>
      </label>
      <label className="field">
        <span>Frequência</span>
        <select value={form.frequency} onChange={(event) => updateField('frequency', event.target.value)}>
          <option>1x ao dia</option>
          <option>2x ao dia</option>
          <option>3x ao dia</option>
          <option>1x/semana</option>
          <option>Quando necessário</option>
        </select>
      </label>
      <div className={styles.grid}>
        <label className="field">
          <span>Estoque*</span>
          <input type="number" value={form.qty} onChange={(event) => updateField('qty', event.target.value)} />
        </label>
        <label className="field">
          <span>Avisar em</span>
          <input type="number" value={form.alertQty} onChange={(event) => updateField('alertQty', event.target.value)} />
        </label>
      </div>
      <label className="field">
        <span>Consumo/dia</span>
        <input type="number" value={form.dailyUse} onChange={(event) => updateField('dailyUse', event.target.value)} />
      </label>
      <label className="field">
        <span>Horário(s)</span>
        <input value={form.times} onChange={(event) => updateField('times', event.target.value)} />
      </label>
      <label className="field">
        <span>Observações</span>
        <textarea value={form.notes} onChange={(event) => updateField('notes', event.target.value)} />
      </label>

      <p className={styles.preview}>
        Dias restantes: {Number.isFinite(remainingDays) ? remainingDays : 'consumo livre'} dias
      </p>

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
