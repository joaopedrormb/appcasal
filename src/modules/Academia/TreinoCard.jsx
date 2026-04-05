import { useEffect, useState } from 'react'
import { ChevronDown } from 'lucide-react'
import Badge from '../../components/Badge/Badge'
import { getDayEmoji } from '../../lib/training'
import styles from './TreinoCard.module.css'

export default function TreinoCard({ treino, onDone, onEdit, onUpdateCarga }) {
  const [open, setOpen] = useState(false)
  const [exercicios, setExercicios] = useState(treino.exercicios)

  useEffect(() => {
    setExercicios(treino.exercicios)
  }, [treino.exercicios])

  useEffect(() => {
    if (JSON.stringify(exercicios) === JSON.stringify(treino.exercicios)) return undefined
    const timer = window.setTimeout(() => {
      onUpdateCarga(treino.id, exercicios)
    }, 800)
    return () => window.clearTimeout(timer)
  }, [exercicios, onUpdateCarga, treino.exercicios, treino.id])

  function handleCarga(index, value) {
    setExercicios((current) =>
      current.map((item, itemIndex) => (itemIndex === index ? { ...item, carga: Number(value) } : item))
    )
  }

  return (
    <article className={styles.card}>
      <button type="button" className={styles.header} onClick={() => setOpen((value) => !value)}>
        <div className={styles.headerMain}>
          <span className={styles.emoji}>{getDayEmoji(treino.diaSemana)}</span>
          <div>
            <strong>{treino.nome}</strong>
            <div className={styles.meta}>
              <Badge status="info" label={treino.pessoa} />
              {treino.tags?.map((tag) => (
                <span key={tag} className={`${styles.tag} ${styles[tag.replace(/[^a-z-]/gi, '')] || ''}`}>
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
        <ChevronDown size={18} className={open ? styles.open : ''} />
      </button>

      {open ? (
        <div className={styles.body}>
          {exercicios.map((item, index) => (
            <div key={`${treino.id}-${index}`} className={styles.exercise}>
              <div>
                <strong>{item.nome}</strong>
                <p>
                  {item.series} séries × {item.reps}
                </p>
                {item.obs ? <em>{item.obs}</em> : null}
              </div>
              <label className={styles.loadField}>
                <span>Carga</span>
                <input type="number" value={item.carga || 0} onChange={(event) => handleCarga(index, event.target.value)} />
              </label>
            </div>
          ))}

          <div className={styles.footer}>
            <button type="button" className={styles.primary} onClick={() => onDone(treino)}>
              ✓ Feito hoje!
            </button>
            <button type="button" className={styles.secondary} onClick={() => onEdit(treino)}>
              ✏️ Editar
            </button>
          </div>
        </div>
      ) : null}
    </article>
  )
}
