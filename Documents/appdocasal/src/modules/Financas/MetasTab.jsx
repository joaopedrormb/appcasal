import styles from './MetasTab.module.css'
import Badge from '../../components/Badge/Badge'
import { formatCurrency } from '../../lib/formatters'
import { getMetaProgress } from '../../lib/finance'

export default function MetasTab({ metas, onEdit, onDelete, onDeposit }) {
  return (
    <section className={styles.list}>
      {metas.map((meta) => {
        const progress = getMetaProgress(meta)
        return (
          <article key={meta.id} className={styles.card}>
            <div className={styles.header}>
              <div>
                <strong>{meta.nome}</strong>
                <span>{meta.prazo || 'Sem prazo'}</span>
              </div>
              <Badge status={progress.percent >= 100 ? 'ok' : 'warn'} label={progress.percent >= 100 ? '✓ Concluída' : 'Em andamento'} />
            </div>
            <p>
              {formatCurrency(meta.valorAtual)} / {formatCurrency(meta.valorAlvo)}
            </p>
            <progress value={meta.valorAtual || 0} max={Math.max(meta.valorAlvo || 1, 1)} />
            <small>{progress.percent}%</small>
            <div className={styles.actions}>
              <button type="button" onClick={() => onDeposit(meta)}>
                + Depositar
              </button>
              <button type="button" onClick={() => onEdit(meta)}>
                Editar
              </button>
              <button type="button" onClick={() => onDelete(meta.id)}>
                Excluir
              </button>
            </div>
          </article>
        )
      })}
    </section>
  )
}
