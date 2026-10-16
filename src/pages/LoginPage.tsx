import { useState } from 'react'
import type { FormEvent } from 'react'
import { useNavigate } from 'react-router'
import { authApi } from '../features/auth/api/authApi'
import { sessionStore } from '../features/auth/model/sessionStore'
import type { AccountStatus } from '../features/auth/model/authTypes'
import { ApiError } from '../shared/api/apiClient'

export function LoginPage() {
  const navigate = useNavigate()
  const [phone, setPhone] = useState('')
  const [message, setMessage] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setMessage(null)
    setIsSubmitting(true)

    try {
      const result = await authApi.phoneLogin(phone.trim())
      if (result.status === 'AUTHENTICATED' && result.tokens) {
        sessionStore.setTokenPair(result.tokens)
        navigate('/', { replace: true })
        return
      }

      const status = result.account?.status as AccountStatus | undefined
      navigate('/account/status', { replace: true, state: { accountStatus: status } })
    } catch (error) {
      setMessage(error instanceof ApiError ? error.message : '서버에 연결하지 못했습니다. 잠시 후 다시 시도해 주세요.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <main className="page page--narrow">
      <header className="brand-block">
        <p className="eyebrow">UMJI MARKET</p>
        <h1>엄지마켓</h1>
        <p>휴대폰 번호로 로그인해 주세요.</p>
      </header>

      <form className="form-card" onSubmit={submit}>
        <label htmlFor="phone">휴대폰 번호</label>
        <input
          autoComplete="tel"
          id="phone"
          inputMode="tel"
          onChange={(event) => setPhone(event.target.value)}
          placeholder="01012345678"
          required
          type="tel"
          value={phone}
        />
        {message && <p className="form-message" role="alert">{message}</p>}
        <button disabled={isSubmitting} type="submit">
          {isSubmitting ? '확인 중…' : '계속'}
        </button>
        <p className="helper-text">휴대폰 본인 확인과 신규 가입은 현재 API 연동 범위에 포함되어 있지 않습니다.</p>
      </form>
    </main>
  )
}
