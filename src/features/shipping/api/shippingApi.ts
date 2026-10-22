import { apiClient } from '../../../shared/api/apiClient'

export interface ShipmentPackage {
  orderId: string
  orderNumber: string
  packageId: string
  packageSequence: number
  organizationId: string | null
  shippingStatus: string
  carrierCode: string | null
  trackingNumber: string | null
  trackingRegisteredAt: string | null
  actualShippingCost: number | null
  items: Array<{
    orderItemId: string
    skuId: string
    skuName: string
    boxQuantity: number
    amountPerBox: number | null
    lineShippingCost: number | null
  }>
}

export const shippingApi = {
  packages: () => apiClient.get<ShipmentPackage[]>('/api/operation/shipping/packages'),
}

export function packageDisplayKey(pkg: Pick<ShipmentPackage, 'orderNumber' | 'packageSequence'>) {
  return `${pkg.orderNumber}-${String(pkg.packageSequence).padStart(2, '0')}`
}
