import { createContext, useContext, useMemo, useSyncExternalStore } from 'react'
import { sessionStore } from './sessionStore'

interface AuthContextValue {
  isAuthenticated: boolean
  accessToken: string | null
  clearSession: () => void
}

const AuthContext = createContext<AuthContextValue | null>(null)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const tokenPair = useSyncExternalStore(sessionStore.subscribe, sessionStore.getSnapshot)
  const value = useMemo<AuthContextValue>(
    () => ({
      isAuthenticated: Boolean(tokenPair?.accessToken),
      accessToken: tokenPair?.accessToken ?? null,
      clearSession: () => sessionStore.setTokenPair(null),
    }),
    [tokenPair],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth는 AuthProvider 내부에서 호출해야 합니다.')
  return context
}
