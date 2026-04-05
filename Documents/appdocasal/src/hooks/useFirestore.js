import { useEffect } from 'react'
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
  updateDoc
} from 'firebase/firestore'
import { db } from '../firebase'
import { useAppStore } from '../store'
import { getNextRecurringDate } from '../lib/finance'
import { allTreinos } from '../data/treinos-seed'

function houseCollection(householdId, name) {
  return collection(db, 'casas', householdId, name)
}

function syncCollection(householdId, name, orderField, setter, direction = 'asc') {
  const ref = query(houseCollection(householdId, name), orderBy(orderField, direction))
  return onSnapshot(ref, (snapshot) => {
    setter(snapshot.docs.map((item) => ({ id: item.id, ...item.data() })))
  })
}

export function useAppCollections() {
  const householdId = useAppStore((state) => state.householdId)
  const setMeds = useAppStore((state) => state.setMeds)
  const setGastos = useAppStore((state) => state.setGastos)
  const setContas = useAppStore((state) => state.setContas)
  const setMetas = useAppStore((state) => state.setMetas)
  const setTreinos = useAppStore((state) => state.setTreinos)
  const setHistorico = useAppStore((state) => state.setHistorico)
  const showToast = useAppStore((state) => state.showToast)

  useEffect(() => {
    try {
      const unsubscribers = [
        syncCollection(householdId, 'meds', 'name', setMeds),
        syncCollection(householdId, 'gastos', 'data', setGastos, 'desc'),
        syncCollection(householdId, 'contas', 'vencimento', setContas),
        syncCollection(householdId, 'metas', 'createdAt', setMetas),
        syncCollection(householdId, 'treinos', 'nome', setTreinos),
        syncCollection(householdId, 'historico_treinos', 'realizadoEm', setHistorico, 'desc')
      ]

      return () => unsubscribers.forEach((unsub) => unsub())
    } catch (error) {
      showToast(error.message, 'error')
      return undefined
    }
  }, [householdId, setContas, setGastos, setHistorico, setMeds, setMetas, setTreinos, showToast])
}

function useMutationHelpers() {
  const householdId = useAppStore((state) => state.householdId)
  const showToast = useAppStore((state) => state.showToast)

  async function saveEntity(name, data) {
    const clean = {
      ...data,
      updatedAt: serverTimestamp()
    }

    if (data.id) {
      const ref = doc(db, 'casas', householdId, name, data.id)
      const { id, ...payload } = clean
      await setDoc(ref, payload, { merge: true })
      return ref
    }

    const ref = doc(houseCollection(householdId, name))
    await setDoc(ref, { ...clean, createdAt: serverTimestamp() }, { merge: true })
    return ref
  }

  async function withErrorToast(action) {
    try {
      return await action()
    } catch (error) {
      showToast(error.message, 'error')
      throw error
    }
  }

  return { householdId, showToast, saveEntity, withErrorToast }
}

export function useMeds() {
  const { householdId, saveEntity, withErrorToast } = useMutationHelpers()

  return {
    saveMed: (data) => withErrorToast(() => saveEntity('meds', data)),
    deleteMed: (id) => withErrorToast(() => deleteDoc(doc(db, 'casas', householdId, 'meds', id))),
    adjustQty: (id, delta) =>
      withErrorToast(async () => {
        const med = useAppStore.getState().meds.find((item) => item.id === id)
        if (!med) return
        await updateDoc(doc(db, 'casas', householdId, 'meds', id), {
          qty: Math.max(0, (Number(med.qty) || 0) + delta),
          updatedAt: serverTimestamp()
        })
      })
  }
}

export function useGastos() {
  const { householdId, saveEntity, withErrorToast } = useMutationHelpers()

  return {
    saveGasto: (data) => withErrorToast(() => saveEntity('gastos', data)),
    deleteGasto: (id) => withErrorToast(() => deleteDoc(doc(db, 'casas', householdId, 'gastos', id)))
  }
}

export function useContas() {
  const { householdId, saveEntity, withErrorToast } = useMutationHelpers()

  return {
    saveConta: (data) => withErrorToast(() => saveEntity('contas', data)),
    deleteConta: (id) => withErrorToast(() => deleteDoc(doc(db, 'casas', householdId, 'contas', id))),
    marcarPaga: (id, paga) =>
      withErrorToast(async () => {
        const conta = useAppStore.getState().contas.find((item) => item.id === id)
        if (!conta) return

        await updateDoc(doc(db, 'casas', householdId, 'contas', id), {
          paga,
          pagaEm: paga ? new Date().toISOString() : null,
          updatedAt: serverTimestamp()
        })

        if (paga && conta.recorrente) {
          const { id: _, ...payload } = conta
          await addDoc(houseCollection(householdId, 'contas'), {
            ...payload,
            paga: false,
            pagaEm: null,
            vencimento: getNextRecurringDate(conta.vencimento),
            origemRecorrenteId: conta.origemRecorrenteId || conta.id,
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp()
          })
        }
      })
  }
}

export function useMetas() {
  const { householdId, saveEntity, withErrorToast } = useMutationHelpers()

  return {
    saveMeta: (data) => withErrorToast(() => saveEntity('metas', data)),
    deleteMeta: (id) => withErrorToast(() => deleteDoc(doc(db, 'casas', householdId, 'metas', id))),
    depositar: (id, valor) =>
      withErrorToast(async () => {
        const meta = useAppStore.getState().metas.find((item) => item.id === id)
        if (!meta) return
        await updateDoc(doc(db, 'casas', householdId, 'metas', id), {
          valorAtual: (Number(meta.valorAtual) || 0) + Number(valor || 0),
          updatedAt: serverTimestamp()
        })
      })
  }
}

export function useTreinos() {
  const { householdId, saveEntity, showToast, withErrorToast } = useMutationHelpers()

  return {
    saveTreino: (data) => withErrorToast(() => saveEntity('treinos', data)),
    deleteTreino: (id) => withErrorToast(() => deleteDoc(doc(db, 'casas', householdId, 'treinos', id))),
    updateCarga: (treinoId, exercicios) =>
      withErrorToast(() =>
        updateDoc(doc(db, 'casas', householdId, 'treinos', treinoId), {
          exercicios,
          updatedAt: serverTimestamp()
        })
      ),
    marcarRealizado: (treino) =>
      withErrorToast(async () => {
        await addDoc(houseCollection(householdId, 'historico_treinos'), {
          treinoId: treino.id,
          nome: treino.nome,
          pessoa: treino.pessoa,
          exercicios: treino.exercicios.length,
          realizadoEm: new Date().toISOString(),
          createdAt: serverTimestamp()
        })
        showToast('🎉 Treino registrado!', 'success')
      }),
    importarSeed: () =>
      withErrorToast(async () => {
        for (const treino of allTreinos) {
          await addDoc(houseCollection(householdId, 'treinos'), {
            ...treino,
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp()
          })
        }
        showToast('Treinos importados!', 'success')
      })
  }
}
