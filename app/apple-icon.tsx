import { ImageResponse } from 'next/og'

export const size = { width: 180, height: 180 }
export const contentType = 'image/png'

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#2D6A4F',
        }}
      >
        <span
          style={{
            color: 'white',
            fontSize: 110,
            fontWeight: 700,
            lineHeight: 1,
            letterSpacing: '-0.03em',
          }}
        >
          B
        </span>
      </div>
    ),
    { ...size }
  )
}
