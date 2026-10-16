import { apiClient } from '../../../shared/api/apiClient'
import type { PhoneLoginResponse, RefreshTokenResponse } from '../model/authTypes'

export const authApi = {
  phoneLogin(phone: string, deviceId?: string) {
    return apiClient.post<PhoneLoginResponse>('/api/auth/login', { phone, deviceId })
  },

  refresh(refreshToken: string, deviceId?: string) {
    return apiClient.post<RefreshTokenResponse>('/api/auth/token/refresh', { refreshToken, deviceId })
  },

  revoke(refreshToken: string) {
    return apiClient.post<void>('/api/auth/tokens/revoke', { refreshToken })
  },
}
