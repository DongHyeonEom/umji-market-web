import { useLocation, useNavigate } from 'react-router'
import type { AccountStatus } from '../features/auth/model/authTypes'

const statusMessages: Record<string, string> = {
  PENDING_CONSENT: '개인정보 동의 확인이 필요합니다.',
  PENDING_PROFILE: '업체 정보를 입력해야 합니다.',
  PENDING_REVIEW: '관리자 확인을 기다리고 있습니다.',
  SUSPENDED: '계정 이용이 정지되어 있습니다. 관리자에게 문의해 주세요.',
  WITHDRAWN: '탈퇴 처리된 계정입니다.',
}

export function ApprovalStatusPage() {
  const location = useLocation()
  const navigate = useNavigate()
  const accountStatus = (location.state as { accountStatus?: AccountStatus } | null)?.accountStatus
  const message = accountStatus
    ? statusMessages[accountStatus] ?? '계정 확인이 필요합니다. 관리자에게 문의해 주세요.'
    : '계정 또는 휴대폰 본인 확인이 필요합니다.'

  return (
    <main className="page page--narrow">
      <section className="status-card" aria-live="polite">
        <p className="eyebrow">계정 확인</p>
        <h1>확인이 필요합니다</h1>
        <p>{message}</p>
        <button className="button button--secondary" onClick={() => navigate('/login', { replace: true })} type="button">
          로그인 화면으로
        </button>
      </section>
    </main>
  )
}
