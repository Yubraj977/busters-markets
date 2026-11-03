import zipcodes from 'zipcodes'

export const STORE_ZIP = '14546' // 3892 Scottsville Rd, Scottsville, NY
export const DELIVERY_RADIUS_MILES = 10

export function distanceFromStoreMiles(zip: string): number | null {
  const miles = zipcodes.distance(STORE_ZIP, zip)
  return typeof miles === 'number' && !Number.isNaN(miles) ? miles : null
}

export function isWithinDeliveryRadius(zip: string): boolean {
  const miles = distanceFromStoreMiles(zip)
  return miles !== null && miles <= DELIVERY_RADIUS_MILES
}
