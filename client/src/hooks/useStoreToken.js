import {create} from 'zustand'
import {persist, createJSONStorage} from 'zustand/middleware'

const useStoreToken = create(persist(
    (set) => ({
        // Default values and setters
        isAuthenticated: false,
        setAuthenticated: (auth) => set({isAuthenticated: auth}),
        role: '',
        setRole: (role) => set({role: role})
    }),
    {
        // Add data to local storage
        name: 'token-storage',
        storage: createJSONStorage(() => localStorage)
    }
))

export default useStoreToken