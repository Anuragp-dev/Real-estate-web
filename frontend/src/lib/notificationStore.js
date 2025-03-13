import { create } from 'zustand'
import apiRequest from './apiRequest'

export const useNotificationStore = create((set) => ({

    number: 0,
    fetch: async () => {

        const response = await apiRequest.get('/users/notifications')
        set({ number: response.data })
    },
    decrease: () => {
        set((state) => ({ number: state.number - 1 }))
    },

    reset: () => {
        set({ number: 0 })
    }

}))