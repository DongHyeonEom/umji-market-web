import { useEffect, useState } from 'react'
import { Link } from 'react-router'
import { ApiError } from '../shared/api/apiClient'
import { packageDisplayKey, shippingApi, type ShipmentPackage } from '../features/shipping/api/shippingApi'

const statusLabels: Record<string, string> = {
  PREPARING: '송장 등록 대기',
  IN_TRANSIT: '배송 중',
  DELIVERED: '배송 완료',
}

export function OperationShipmentPackagesPage() {
  const [packages, setPackages] = useState<ShipmentPackage[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let active = true
    shippingApi.packages()
      .then((result) => { if (active) setPackages(result) })
      .catch((cause: unknown) => {
        if (!active) return
        setError(cause instanceof ApiError ? cause.message : '운송 패키지를 불러오지 못했습니다.')
      })
      .finally(() => { if (active) setLoading(false) })
    return () => { active = false }
  }, [])

  return (
    <main className="page">
      <header className="app-header">
        <div>
          <p className="eyebrow">운영 관리 · 배송</p>
          <h1>운송 패키지</h1>
        </div>
        <Link className="button button--secondary" to="/">홈으로</Link>
      </header>
      <section className="shipment-section" aria-labelledby="shipment-list-heading">
        <div className="shipment-heading">
          <div>
            <h2 id="shipment-list-heading">패키지 목록</h2>
            <p>주문번호와 패키지 순번으로 각 박스를 확인합니다.</p>
          </div>
          <span className="shipment-count">{packages.length}건</span>
        </div>
        {loading && <p role="status">운송 목록을 불러오는 중입니다.</p>}
        {!loading && error && <p className="shipment-error" role="alert">{error}</p>}
        {!loading && !error && packages.length === 0 && <p className="shipment-empty">등록된 운송 패키지가 없습니다.</p>}
        {!loading && !error && packages.length > 0 && (
          <div className="shipment-list">
            {packages.map((pkg) => (
              <article className="shipment-card" key={pkg.packageId}>
                <div className="shipment-card__top">
                  <div>
                    <p className="shipment-key-label">주문번호 · 패키지 순번</p>
                    <h3>{packageDisplayKey(pkg)}</h3>
                  </div>
                  <span className={`shipment-status shipment-status--${pkg.shippingStatus.toLowerCase()}`}>
                    {statusLabels[pkg.shippingStatus] ?? pkg.shippingStatus}
                  </span>
                </div>
                <p className="shipment-tracking">
                  {pkg.carrierCode && pkg.trackingNumber
                    ? `${pkg.carrierCode} · ${pkg.trackingNumber}`
                    : '운송장 등록 대기'}
                </p>
                <ul className="shipment-items">
                  {pkg.items.map((item) => (
                    <li key={item.orderItemId}>{item.skuName}<span>{item.boxQuantity}박스</span></li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        )}
      </section>
    </main>
  )
}
