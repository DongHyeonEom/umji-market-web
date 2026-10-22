import { Navigate, Route, Routes } from 'react-router'
import { ApprovalStatusPage } from '../pages/ApprovalStatusPage'
import { HomePage } from '../pages/HomePage'
import { LoginPage } from '../pages/LoginPage'
import { OperationShipmentPackagesPage } from '../pages/OperationShipmentPackagesPage'
import { ProtectedRoute } from './routing/ProtectedRoute'

export function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/account/status" element={<ApprovalStatusPage />} />
      <Route element={<ProtectedRoute />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/operation/shipping/packages" element={<OperationShipmentPackagesPage />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
