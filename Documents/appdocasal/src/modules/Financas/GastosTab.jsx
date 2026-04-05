import styles from './GastosTab.module.css'
import { formatCurrency } from '../../lib/formatters'

export default function GastosTab({ summary, gastos, onEdit, onDelete }) {
  return (
    <section className={styles.tab}>
      <article className={styles.summary}>
        <strong>Resumo do mês</strong>
        <h3>{formatCurrency(summary.total)}</h3>
        <div className={styles.bars}>
          {summary.categories.map((item) => (
            <div key={item.category} className={styles.barRow}>
              <span>{item.category}</span>
              <small>{Math.round(item.ratio * 100)}%</small>
              <progress value={item.value} max={Math.max(summary.total, 1)} />
            </div>
          ))}
        </div>
      </article>

      <div className={styles.list}>
        {gastos.slice(0, 20).map((gasto) => (
          <article key={gasto.id} className={styles.card}>
            <div>
              <strong>{gasto.categoria}</strong>
              <p>{gasto.descricao}</p>
            </div>
            <div className={styles.valueBlock}>
              <strong>{formatCurrency(gasto.valor)}</strong>
              <span>{gasto.data}</span>
            </div>
            <div className={styles.actions}>
              <button type="button" onClick={() => onEdit(gasto)}>
                Editar
              </button>
              <button type="button" onClick={() => onDelete(gasto.id)}>
                Excluir
              </button>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
