import { execFileSync } from 'node:child_process'
import { mkdirSync, readFileSync } from 'node:fs'
import { chromium } from '@playwright/test'

const base = process.env.BASE_URL ?? 'http://localhost:3100'
const paths = ['/', '/works/liftlog']
const presets = ['mobile', 'desktop']
const min = { performance: 90, accessibility: 95, 'best-practices': 95, seo: 95 }

mkdirSync('.lighthouse', { recursive: true })
let failed = false
for (const preset of presets) {
  for (const path of paths) {
    const out = `.lighthouse/${preset}${path.replaceAll('/', '_') || '_home'}.json`
    const args = [base + path, '--quiet', '--output=json', `--output-path=${out}`, `--chrome-path=${chromium.executablePath()}`, '--chrome-flags=--headless=new']
    if (preset === 'desktop') args.push('--preset=desktop')
    execFileSync('npx', ['lighthouse', ...args], { stdio: 'inherit' })
    const report = JSON.parse(readFileSync(out, 'utf8'))
    const scores = Object.fromEntries(Object.entries(report.categories).map(([k, v]) => [k, Math.round(v.score * 100)]))
    const lcp = report.audits['largest-contentful-paint'].numericValue
    const cls = report.audits['cumulative-layout-shift'].numericValue
    const bad = [
      ...Object.entries(min).filter(([k, v]) => preset === 'mobile' || k !== 'performance' ? scores[k] < v : false).map(([k]) => k),
      ...(preset === 'mobile' && lcp > 2500 ? ['LCP'] : []),
      ...(cls >= 0.1 ? ['CLS'] : []),
    ]
    failed ||= bad.length > 0
    console.log(`${preset.padEnd(7)} ${path.padEnd(15)} ${JSON.stringify(scores)} LCP=${Math.round(lcp)}ms CLS=${cls.toFixed(3)} ${bad.length ? 'FAIL ' + bad.join(',') : 'ok'}`)
  }
}
process.exit(failed ? 1 : 0)
