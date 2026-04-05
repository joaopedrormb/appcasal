import styles from './Home.module.css'
import { useAppStore } from '../../store'
import { getGreeting, getWeekdayKey } from '../../lib/dates'
import { getMedsMetrics } from '../../lib/meds'
import { getPendingTotal, getUpcomingBills } from '../../lib/finance'
import { getLastWorkoutLabel, getStreakDays } from '../../lib/training'
import { formatCurrency } from '../../lib/formatters'
import { useTreinos } from '../../hooks/useFirestore'

export default function Home() {
  const meds = useAppStore((state) => state.meds)
  const contas = useAppStore((state) => state.contas)
  const treinos = useAppStore((state) => state.treinos)
  const historico = useAppStore((state) => state.historico)
  const { marcarRealizado } = useTreinos()
  const metrics = getMedsMetrics(meds)
  const upcomingBills = getUpcomingBills(contas)
  const pendingTotal = getPendingTotal(contas)
  const weekdayKey = getWeekdayKey()
  const greetingTarget = new Date().getDate() % 2 === 0 ? 'Tefinha' : 'João Pedro'
  const treinosHoje = treinos.filter((treino) => treino.diaSemana === weekdayKey)
  const joaoHistory = historico.filter((item) => item.pessoa === 'João Pedro')
  const tefinhaHistory = historico.filter((item) => item.pessoa === 'Tefinha')

  return (
    <section className={styles.screen}>
      <header className={styles.hero}>
        <p>{getGreeting()},</p>
        <h2>{greetingTarget}</h2>
      </header>

      <div className={styles.grid}>
        <article className={`${styles.card} ${metrics.danger ? styles.dangerCard : ''}`}>
          <strong>Remédios</strong>
          <span>
            {metrics.danger} críticos, {metrics.warn} com atenção
          </span>
        </article>
        <article className={styles.card}>
          <strong>Contas</strong>
          <span>
            {upcomingBills.length} contas em 7 dias · {formatCurrency(pendingTotal)}
          </span>
        </article>
        <article className={styles.card}>
          <strong>Academia João</strong>
          <span>{getLastWorkoutLabel(joaoHistory, 'João Pedro')}</span>
          <small>🔥 streak {getStreakDays(joaoHistory)} dias</small>
        </article>
        <article className={styles.card}>
          <strong>Academia Tefinha</strong>
          <span>{getLastWorkoutLabel(tefinhaHistory, 'Tefinha')}</span>
          <small>🔥 streak {getStreakDays(tefinhaHistory)} dias</small>
        </article>
      </div>

      <section className={styles.today}>
        <div className={styles.sectionHeader}>
          <h3>Hoje na academia</h3>
          <p>{treinosHoje.length ? 'Treinos do dia prontos para marcar.' : 'Sem treino padrão hoje.'}</p>
        </div>

        <div className={styles.todayList}>
          {treinosHoje.map((treino) => (
            <article key={treino.id} className={styles.todayCard}>
              <div>
                <strong>{treino.nome}</strong>
                <span>{treino.pessoa}</span>
              </div>
              <button type="button" className={styles.cta} onClick={() => marcarRealizado(treino)}>
                Fazer agora
              </button>
            </article>
          ))}
        </div>
      </section>
    </section>
  )
}
