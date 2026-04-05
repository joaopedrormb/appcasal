import { useState } from 'react'
import EmptyState from '../../components/EmptyState/EmptyState'
import BottomSheet from '../../components/BottomSheet/BottomSheet'
import FAB from '../../components/FAB/FAB'
import styles from './Academia.module.css'
import TreinoCard from './TreinoCard'
import TreinoForm from './TreinoForm'
import HistoricoTab from './HistoricoTab'
import { useAppStore } from '../../store'
import { useTreinos } from '../../hooks/useFirestore'

export default function Academia() {
  const treinos = useAppStore((state) => state.treinos)
  const [tab, setTab] = useState('treinos')
  const [person, setPerson] = useState('Todos')
  const [editing, setEditing] = useState(null)
  const { importarSeed, marcarRealizado, saveTreino, deleteTreino, updateCarga } = useTreinos()

  const filtered = treinos.filter((treino) => person === 'Todos' || treino.pessoa === person)

  return (
    <section className={styles.screen}>
      <div className="chip-row">
        {['treinos', 'historico'].map((item) => (
          <button
            key={item}
            type="button"
            className={`chip ${tab === item ? 'chip-active' : ''}`}
            onClick={() => setTab(item)}
          >
            {item === 'treinos' ? 'Treinos' : 'Histórico'}
          </button>
        ))}
      </div>

      {tab === 'treinos' ? (
        <>
          <div className="chip-row">
            {['Todos', 'João Pedro', 'Tefinha'].map((item) => (
              <button
                key={item}
                type="button"
                className={`chip ${person === item ? 'chip-active' : ''}`}
                onClick={() => setPerson(item)}
              >
                {item}
              </button>
            ))}
          </div>

          {treinos.length ? (
            <div className={styles.list}>
              {filtered.map((treino) => (
                <TreinoCard
                  key={treino.id}
                  treino={treino}
                  onDone={marcarRealizado}
                  onEdit={setEditing}
                  onUpdateCarga={updateCarga}
                />
              ))}
            </div>
          ) : (
            <EmptyState
              emoji="🏋️"
              title="Sem treinos ainda"
              description="Importe os treinos padrão para começar."
              actionLabel="Importar treinos padrão"
              onAction={importarSeed}
            />
          )}
        </>
      ) : (
        <HistoricoTab />
      )}

      {tab === 'treinos' ? <FAB onClick={() => setEditing({ exercicios: [{ nome: '', series: 3, reps: '10', carga: 0, obs: '' }] })} label="Adicionar treino" /> : null}

      <BottomSheet open={Boolean(editing)} onClose={() => setEditing(null)} title={editing?.id ? 'Editar treino' : 'Novo treino'}>
        <TreinoForm initialData={editing} onSave={saveTreino} onDelete={deleteTreino} onClose={() => setEditing(null)} />
      </BottomSheet>
    </section>
  )
}
