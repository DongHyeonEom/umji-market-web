import type { TokenPair } from './authTypes'

type Listener = () => void

let tokenPair: TokenPair | null = null
const listeners = new Set<Listener>()

export const sessionStore = {
  getSnapshot: () => tokenPair,
  getAccessToken: () => tokenPair?.accessToken ?? null,
  setTokenPair(value: TokenPair | null) {
    tokenPair = value
    listeners.forEach((listener) => listener())
  },
  subscribe(listener: Listener) {
    listeners.add(listener)
    return () => listeners.delete(listener)
  },
}
