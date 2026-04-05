import styles from './HistoricoTab.module.css'
import { getStreakDays, getWeeklyDots } from '../../lib/training'
import { useAppStore } from '../../store'
import { formatRelativeDateLabel } from '../../lib/dates'

function SummaryRow({ title, dots }) {
  return (
    <div className={styles.summaryRow}>
      <strong>{title}</strong>
      <div className={styles.dots}>
        {dots.map((dot, index) => (
          <span key={index} className={dot ? styles.dotOn : styles.dotOff} />
        ))}
      </div>
    </div>
  )
}

export default function HistoricoTab() {
  const historico = useAppStore((state) => state.historico)
  const joaoDots = getWeeklyDots(historico, 'João Pedro')
  const tefinhaDots = getWeeklyDots(historico, 'Tefinha')

  return (
    <section className={styles.tab}>
      <article className={styles.summary}>
        <SummaryRow title="João Pedro" dots={joaoDots} />
        <SummaryRow title="Tefinha" dots={tefinhaDots} />
        <p>🔥 {getStreakDays(historico)} dias seguidos</p>
      </article>

      <div className={styles.list}>
        {historico.slice(0, 30).map((item) => (
          <article key={item.id} className={styles.item}>
            <div>
              <strong>{item.nome}</strong>
              <span>{item.pessoa}</span>
            </div>
            <div className={styles.meta}>
              <strong>{item.exercicios} exercícios</strong>
              <span>{formatRelativeDateLabel(item.realizadoEm)}</span>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
