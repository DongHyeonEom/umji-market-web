export type AccountStatus =
  | 'PENDING_CONSENT'
  | 'PENDING_PROFILE'
  | 'PENDING_REVIEW'
  | 'ACTIVE'
  | 'SUSPENDED'
  | 'WITHDRAWN'
  | (string & {})

export type LoginStatus = 'AUTHENTICATED' | 'PHONE_VERIFICATION_REQUIRED'

export interface AccountSummary {
  id: string
  name: string
  status: AccountStatus
}

export interface TokenPair {
  accessToken: string
  accessTokenExpiresAt: string
  refreshToken: string
}

export interface PhoneLoginResponse {
  status: LoginStatus
  account: AccountSummary | null
  tokens: TokenPair | null
}

export interface RefreshTokenResponse {
  accessToken: string
  accessTokenExpiresAt: string
  refreshToken: string
}
