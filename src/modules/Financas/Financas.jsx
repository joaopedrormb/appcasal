import { useMemo, useState } from 'react'
import BottomSheet from '../../components/BottomSheet/BottomSheet'
import FAB from '../../components/FAB/FAB'
import styles from './Financas.module.css'
import GastosTab from './GastosTab'
import ContasTab from './ContasTab'
import MetasTab from './MetasTab'
import { useAppStore } from '../../store'
import { getMonthlyExpenseSummary } from '../../lib/finance'
import { useContas, useGastos, useMetas } from '../../hooks/useFirestore'

const initialForms = {
  gasto: { descricao: '', valor: '', categoria: 'Casa', data: new Date().toISOString().slice(0, 10), pessoa: 'Casal' },
  conta: { nome: '', valor: '', vencimento: new Date().toISOString().slice(0, 10), recorrente: false, observacao: '', paga: false },
  meta: { nome: '', valorAlvo: '', valorAtual: 0, prazo: '', descricao: '' }
}

function FinanceForm({ type, data, onClose, onSave }) {
  const [form, setForm] = useState(data || initialForms[type])

  function update(field, value) {
    setForm((current) => ({ ...current, [field]: value }))
  }

  async function handleSubmit(event) {
    event.preventDefault()
    await onSave({
      ...form,
      valor: form.valor === undefined ? undefined : Number(form.valor),
      valorAlvo: form.valorAlvo === undefined ? undefined : Number(form.valorAlvo),
      valorAtual: form.valorAtual === undefined ? undefined : Number(form.valorAtual)
    })
    onClose()
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      {type === 'gasto' ? (
        <>
          <label className="field">
            <span>Descrição*</span>
            <input value={form.descricao} onChange={(event) => update('descricao', event.target.value)} />
          </label>
          <label className="field">
            <span>Valor</span>
            <input type="number" value={form.valor} onChange={(event) => update('valor', event.target.value)} />
          </label>
          <label className="field">
            <span>Categoria</span>
            <select value={form.categoria} onChange={(event) => update('categoria', event.target.value)}>
              <option>Alimentação</option>
              <option>Saúde</option>
              <option>Transporte</option>
              <option>Casa</option>
              <option>Lazer</option>
              <option>Outros</option>
            </select>
          </label>
          <label className="field">
            <span>Data</span>
            <input type="date" value={form.data} onChange={(event) => update('data', event.target.value)} />
          </label>
          <label className="field">
            <span>Pessoa</span>
            <select value={form.pessoa} onChange={(event) => update('pessoa', event.target.value)}>
              <option>João Pedro</option>
              <option>Tefinha</option>
              <option>Casal</option>
            </select>
          </label>
        </>
      ) : null}

      {type === 'conta' ? (
        <>
          <label className="field">
            <span>Nome*</span>
            <input value={form.nome} onChange={(event) => update('nome', event.target.value)} />
          </label>
          <label className="field">
            <span>Valor</span>
            <input type="number" value={form.valor} onChange={(event) => update('valor', event.target.value)} />
          </label>
          <label className="field">
            <span>Vencimento</span>
            <input type="date" value={form.vencimento} onChange={(event) => update('vencimento', event.target.value)} />
          </label>
          <label className={styles.toggle}>
            <input type="checkbox" checked={Boolean(form.recorrente)} onChange={(event) => update('recorrente', event.target.checked)} />
            <span>Conta recorrente</span>
          </label>
          <label className="field">
            <span>Observação</span>
            <textarea value={form.observacao} onChange={(event) => update('observacao', event.target.value)} />
          </label>
        </>
      ) : null}

      {type === 'meta' ? (
        <>
          <label className="field">
            <span>Nome*</span>
            <input value={form.nome} onChange={(event) => update('nome', event.target.value)} />
          </label>
          <label className="field">
            <span>Valor alvo</span>
            <input type="number" value={form.valorAlvo} onChange={(event) => update('valorAlvo', event.target.value)} />
          </label>
          <label className="field">
            <span>Valor inicial</span>
            <input type="number" value={form.valorAtual} onChange={(event) => update('valorAtual', event.target.value)} />
          </label>
          <label className="field">
            <span>Prazo</span>
            <input type="date" value={form.prazo} onChange={(event) => update('prazo', event.target.value)} />
          </label>
          <label className="field">
            <span>Descrição</span>
            <textarea value={form.descricao} onChange={(event) => update('descricao', event.target.value)} />
          </label>
        </>
      ) : null}

      <button type="submit" className={styles.submit}>
        Salvar
      </button>
    </form>
  )
}

function DepositForm({ meta, onDeposit, onClose }) {
  const [value, setValue] = useState('')

  async function handleSubmit(event) {
    event.preventDefault()
    await onDeposit(meta.id, Number(value))
    onClose()
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <label className="field">
        <span>Valor</span>
        <input type="number" value={value} onChange={(event) => setValue(event.target.value)} />
      </label>
      <button type="submit" className={styles.submit}>
        Confirmar depósito
      </button>
    </form>
  )
}

export default function Financas() {
  const gastos = useAppStore((state) => state.gastos)
  const contas = useAppStore((state) => state.contas)
  const metas = useAppStore((state) => state.metas)
  const [tab, setTab] = useState('gastos')
  const [contaFilter, setContaFilter] = useState('Todas')
  const [editing, setEditing] = useState(null)
  const [depositing, setDepositing] = useState(null)
  const { saveGasto, deleteGasto } = useGastos()
  const { saveConta, marcarPaga, deleteConta } = useContas()
  const { saveMeta, deleteMeta, depositar } = useMetas()
  const summary = useMemo(() => getMonthlyExpenseSummary(gastos), [gastos])

  function handleDelete(action) {
    return async (id) => {
      if (!window.confirm('Excluir item?')) return
      await action(id)
    }
  }

  const actionMap = {
    gastos: saveGasto,
    contas: saveConta,
    metas: saveMeta
  }

  return (
    <section className={styles.screen}>
      <div className="chip-row">
        {['gastos', 'contas', 'metas'].map((item) => (
          <button
            key={item}
            type="button"
            className={`chip ${tab === item ? 'chip-active' : ''}`}
            onClick={() => setTab(item)}
          >
            {item[0].toUpperCase() + item.slice(1)}
          </button>
        ))}
      </div>

      {tab === 'gastos' ? (
        <GastosTab summary={summary} gastos={gastos} onEdit={(item) => setEditing({ type: 'gasto', data: item })} onDelete={handleDelete(deleteGasto)} />
      ) : null}
      {tab === 'contas' ? (
        <ContasTab
          contas={contas}
          filter={contaFilter}
          setFilter={setContaFilter}
          onToggle={marcarPaga}
          onEdit={(item) => setEditing({ type: 'conta', data: item })}
          onDelete={handleDelete(deleteConta)}
        />
      ) : null}
      {tab === 'metas' ? (
        <MetasTab
          metas={metas}
          onEdit={(item) => setEditing({ type: 'meta', data: item })}
          onDelete={handleDelete(deleteMeta)}
          onDeposit={setDepositing}
        />
      ) : null}

      <FAB onClick={() => setEditing({ type: tab === 'gastos' ? 'gasto' : tab === 'contas' ? 'conta' : 'meta' })} label="Adicionar item financeiro" />

      <BottomSheet open={Boolean(editing)} onClose={() => setEditing(null)} title="Cadastro financeiro">
        <FinanceForm
          type={editing?.type || 'gasto'}
          data={editing?.data}
          onClose={() => setEditing(null)}
          onSave={actionMap[editing?.type === 'conta' ? 'contas' : editing?.type === 'meta' ? 'metas' : 'gastos']}
        />
      </BottomSheet>

      <BottomSheet open={Boolean(depositing)} onClose={() => setDepositing(null)} title="Depositar na meta">
        {depositing ? <DepositForm meta={depositing} onDeposit={depositar} onClose={() => setDepositing(null)} /> : null}
      </BottomSheet>
    </section>
  )
}
