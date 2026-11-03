const fs = require('fs')
const path = require('path')

function loadEnv(file) {
  const out = {}
  const content = fs.readFileSync(file, 'utf8')
  for (const line of content.split('\n')) {
    const trimmed = line.trim()
    if (!trimmed || trimmed.startsWith('#')) continue
    const idx = trimmed.indexOf('=')
    if (idx === -1) continue
    out[trimmed.slice(0, idx)] = trimmed.slice(idx + 1)
  }
  return out
}

async function main() {
  const env = loadEnv(path.join(__dirname, '..', '.env'))
  const token = env.CLOVER_PRIVATE_TOKEN
  const cloverEnv = env.CLOVER_ENV || 'sandbox'

  if (!token) {
    console.log('FAIL: CLOVER_PRIVATE_TOKEN is not set in .env')
    process.exit(1)
  }

  const base = cloverEnv === 'production' ? 'https://scl.clover.com' : 'https://scl-sandbox.dev.clover.com'

  const res = await fetch(`${base}/v1/charges`, {
    headers: { Authorization: `Bearer ${token}` },
  })

  if (res.status === 401) {
    console.log(`FAIL: CLOVER_PRIVATE_TOKEN rejected (401 Unauthorized) against ${base}`)
    process.exit(1)
  }

  if (res.ok) {
    console.log(`PASS: CLOVER_PRIVATE_TOKEN authenticated successfully against ${base} (status ${res.status})`)
    process.exit(0)
  }

  console.log(`UNKNOWN: unexpected status ${res.status} from ${base} — not a clear pass or fail`)
  process.exit(2)
}

main()
