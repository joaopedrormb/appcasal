import { useMemo, useState } from 'react'
import BottomSheet from '../../components/BottomSheet/BottomSheet'
import FAB from '../../components/FAB/FAB'
import Badge from '../../components/Badge/Badge'
import styles from './Remedios.module.css'
import MedCard from './MedCard'
import MedForm from './MedForm'
import { useAppStore } from '../../store'
import { filterMeds, getMedAlerts, getMedsMetrics } from '../../lib/meds'
import { useMeds } from '../../hooks/useFirestore'

const peopleFilters = ['Todos', 'João Pedro', 'Tefinha', 'Ambos']
const statusFilters = ['Todos', 'Crítico', 'Atenção', 'OK']

export default function Remedios() {
  const meds = useAppStore((state) => state.meds)
  const [editing, setEditing] = useState(null)
  const [person, setPerson] = useState('Todos')
  const [status, setStatus] = useState('Todos')
  const [search, setSearch] = useState('')
  const { saveMed, deleteMed, adjustQty } = useMeds()
  const metrics = getMedsMetrics(meds)
  const alerts = getMedAlerts(meds)

  const filtered = useMemo(() => filterMeds(meds, { person, status, search }), [meds, person, search, status])

  return (
    <section className={styles.screen}>
      <div className={styles.metrics}>
        <Badge status="info" label={`Total ${metrics.total}`} />
        <Badge status="warn" label={`Atenção ${metrics.warn}`} />
        <Badge status="danger" label={`Críticos ${metrics.danger}`} />
        <Badge status="ok" label={`Compartilhados ${metrics.shared}`} />
      </div>

      {alerts.length ? (
        <div className={styles.alerts}>
          {alerts.map((alert) => (
            <article key={alert.id} className={`${styles.alert} ${styles[alert.tone]}`}>
              <strong>{alert.title}</strong>
              <span>{alert.message}</span>
            </article>
          ))}
        </div>
      ) : null}

      <div className="chip-row">
        {peopleFilters.map((value) => (
          <button
            key={value}
            type="button"
            className={`chip ${person === value ? 'chip-active' : ''}`}
            onClick={() => setPerson(value)}
          >
            {value}
          </button>
        ))}
      </div>

      <div className="chip-row">
        {statusFilters.map((value) => (
          <button
            key={value}
            type="button"
            className={`chip ${status === value ? 'chip-active' : ''}`}
            onClick={() => setStatus(value)}
          >
            {value}
          </button>
        ))}
      </div>

      <label className="field">
        <span>Buscar</span>
        <input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Nome, dose ou observação" />
      </label>

      <div className={styles.list}>
        {filtered.map((med) => (
          <MedCard key={med.id} med={med} onAdjust={adjustQty} onEdit={setEditing} />
        ))}
      </div>

      <FAB onClick={() => setEditing({})} label="Adicionar remédio" />

      <BottomSheet open={Boolean(editing)} onClose={() => setEditing(null)} title={editing?.id ? 'Editar remédio' : 'Novo remédio'}>
        <MedForm initialData={editing} onSave={saveMed} onDelete={deleteMed} onClose={() => setEditing(null)} />
      </BottomSheet>
    </section>
  )
}
