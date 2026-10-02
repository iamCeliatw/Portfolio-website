import { ImageResponse } from 'next/og'

export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'
export const alt = "Celia's Portfolio"

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: 72, background: '#F8F6F5', color: '#111111' }}>
        <div style={{ fontSize: 28 }}>(00) Frontend Engineer</div>
        <div style={{ display: 'flex', flexDirection: 'column', fontSize: 120, fontWeight: 800, lineHeight: 0.92, letterSpacing: -5 }}>
          <span>I make (digital)</span>
          <span>web apps.</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 28 }}>
          <span>celia</span>
          <span>celia-portfolio-website.vercel.app</span>
        </div>
      </div>
    ),
    size,
  )
}
