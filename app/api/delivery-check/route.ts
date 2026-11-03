import { NextResponse } from 'next/server'
import { isWithinDeliveryRadius, distanceFromStoreMiles, DELIVERY_RADIUS_MILES } from '@/lib/delivery'

export async function POST(req: Request) {
  try {
    const { zip } = await req.json()
    if (!zip || typeof zip !== 'string') {
      return NextResponse.json({ error: 'ZIP code is required' }, { status: 400 })
    }

    const withinRadius = isWithinDeliveryRadius(zip)
    const distanceMiles = distanceFromStoreMiles(zip)

    return NextResponse.json({ withinRadius, distanceMiles, radiusMiles: DELIVERY_RADIUS_MILES })
  } catch (err) {
    console.error('delivery-check POST:', err)
    return NextResponse.json({ error: 'Could not check delivery area' }, { status: 500 })
  }
}
