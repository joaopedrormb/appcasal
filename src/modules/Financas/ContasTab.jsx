import styles from './ContasTab.module.css'
import Badge from '../../components/Badge/Badge'
import { formatCurrency } from '../../lib/formatters'
import { getContaStatus } from '../../lib/finance'

export default function ContasTab({ contas, filter, setFilter, onToggle, onEdit, onDelete }) {
  const filtered = contas.filter((conta) => {
    if (filter === 'Todas') return true
    if (filter === 'Pendentes') return !conta.paga
    return conta.paga
  })

  return (
    <section className={styles.tab}>
      <div className="chip-row">
        {['Todas', 'Pendentes', 'Pagas'].map((item) => (
          <button
            key={item}
            type="button"
            className={`chip ${filter === item ? 'chip-active' : ''}`}
            onClick={() => setFilter(item)}
          >
            {item}
          </button>
        ))}
      </div>

      <div className={styles.list}>
        {filtered.map((conta) => {
          const status = getContaStatus(conta)
          return (
            <article key={conta.id} className={`${styles.card} ${styles[status.tone]}`}>
              <div className={styles.header}>
                <div>
                  <strong>{conta.nome}</strong>
                  <p>{formatCurrency(conta.valor)}</p>
                </div>
                <Badge status={status.tone === 'danger' ? 'danger' : status.tone === 'warn' ? 'warn' : 'ok'} label={status.label} />
              </div>
              <span>Vencimento: {conta.vencimento}</span>
              <div className={styles.actions}>
                <button type="button" onClick={() => onToggle(conta.id, !conta.paga)}>
                  {conta.paga ? '↩ Reabrir' : '✓ Marcar paga'}
                </button>
                <button type="button" onClick={() => onEdit(conta)}>
                  Editar
                </button>
                <button type="button" onClick={() => onDelete(conta.id)}>
                  Excluir
                </button>
              </div>
            </article>
          )
        })}
      </div>
    </section>
  )
}
