import styles from './EmptyState.module.css'

export default function EmptyState({ emoji, title, description, actionLabel, onAction }) {
  return (
    <section className={styles.empty}>
      <div className={styles.emoji}>{emoji}</div>
      <h2>{title}</h2>
      <p>{description}</p>
      {actionLabel ? (
        <button type="button" className={styles.action} onClick={onAction}>
          {actionLabel}
        </button>
      ) : null}
    </section>
  )
}
