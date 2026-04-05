import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { HOUSEHOLD_ID } from '../firebase/config'

export const useAppStore = create(
  persist(
    (set) => ({
      householdId: HOUSEHOLD_ID,
      activeTab: 'home',
      setActiveTab: (activeTab) => set({ activeTab }),
      meds: [],
      setMeds: (meds) => set({ meds }),
      gastos: [],
      setGastos: (gastos) => set({ gastos }),
      contas: [],
      setContas: (contas) => set({ contas }),
      metas: [],
      setMetas: (metas) => set({ metas }),
      treinos: [],
      setTreinos: (treinos) => set({ treinos }),
      historico: [],
      setHistorico: (historico) => set({ historico }),
      toast: null,
      showToast: (message, type = 'info') => set({ toast: { message, type } }),
      clearToast: () => set({ toast: null })
    }),
    {
      name: 'nossa-casa-store',
      partialize: (state) => ({
        householdId: state.householdId,
        activeTab: state.activeTab
      })
    }
  )
)
