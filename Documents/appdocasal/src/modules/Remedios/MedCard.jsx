import Badge from '../../components/Badge/Badge'
import styles from './MedCard.module.css'
import { getMedProgressValue, getMedStatus, getMedStatusLabel, getRemainingDays } from '../../lib/meds'

export default function MedCard({ med, onAdjust, onEdit }) {
  const status = getMedStatus(med)
  const remainingDays = getRemainingDays(med)

  return (
    <article className={`${styles.card} ${styles[status]}`}>
      <div className={styles.top}>
        <strong>{med.name}</strong>
        <div className={styles.badges}>
          <Badge status="info" label={med.person} />
          <Badge status={status === 'danger' ? 'danger' : status === 'warn' ? 'warn' : 'ok'} label={getMedStatusLabel(status)} />
        </div>
      </div>

      <p className={styles.subtitle}>
        {med.dosage || 'Dose livre'} · {med.frequency || 'Sem frequência'} · ⏰ {med.times || 'Sem horário'}
      </p>

      <div className={styles.metrics}>
        <span>Estoque: {med.qty || 0}</span>
        <span>Alerta: {med.alertQty || 0}</span>
        <span>Dias: {Number.isFinite(remainingDays) ? remainingDays : 'Livre'}</span>
      </div>

      <progress className={styles.progress} value={getMedProgressValue(med)} max="100" />

      {med.notes ? <p className={styles.notes}>{med.notes}</p> : null}

      <div className={styles.actions}>
        <button type="button" onClick={() => onAdjust(med.id, -1)} aria-label="Diminuir estoque">
          −1
        </button>
        <button type="button" onClick={() => onAdjust(med.id, 1)} aria-label="Aumentar estoque">
          +1
        </button>
        <button type="button" onClick={() => onEdit(med)} aria-label="Editar remédio">
          ✏️ Editar
        </button>
      </div>
    </article>
  )
}
