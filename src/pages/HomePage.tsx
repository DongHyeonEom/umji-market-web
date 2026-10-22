import { useAuth } from '../features/auth/model/AuthProvider'
import { Link } from 'react-router'

export function HomePage() {
  const { clearSession } = useAuth()

  return (
    <main className="page">
      <header className="app-header">
        <div>
          <p className="eyebrow">UMJI MARKET</p>
          <h1>엄지마켓</h1>
        </div>
        <button className="button button--secondary" onClick={clearSession} type="button">로그아웃</button>
      </header>
      <section className="empty-state">
        <h2>화면 뼈대가 준비되었습니다</h2>
        <p>상품·장바구니·주문 화면은 디자인과 API 범위에 맞춰 이 영역에 연결합니다.</p>
      </section>
      <section className="home-actions">
        <Link className="button" to="/operation/shipping/packages">운송 패키지 확인</Link>
      </section>
    </main>
  )
}
