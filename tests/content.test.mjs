import { test } from 'node:test'
import assert from 'node:assert/strict'
import { existsSync } from 'node:fs'
import { projects } from '../content/projects.ts'
import { jobs } from '../content/experience.ts'
import { liftlog } from '../content/liftlog.ts'

const inPublic = (path) => existsSync(new URL(`../public${path}`, import.meta.url))
const bothLocales = (text, where) => {
  assert.ok(text.zh?.trim(), `${where} 缺中文`)
  assert.ok(text.en?.trim(), `${where} 缺英文`)
}

test('作品：圖片存在、中英文都有、剛好一個主打', () => {
  assert.deepEqual(projects.map((p) => p.slug), ['liftlog', 'crochet', 'paws-on-patrol'])
  assert.equal(projects.filter((p) => p.featured).length, 1)
  for (const p of projects) {
    assert.ok(inPublic(p.image), `找不到 ${p.image}`)
    bothLocales(p.summary, p.slug)
  }
})

test('經歷：縮圖與影片存在，每個作品只有連結或影片其中一種', () => {
  for (const job of jobs) {
    bothLocales(job.company, 'company')
    for (const h of job.highlights ?? []) bothLocales(h, job.company.zh)
    for (const w of job.works ?? []) {
      assert.ok(inPublic(w.image), `找不到 ${w.image}`)
      if (w.video) assert.ok(inPublic(w.video), `找不到 ${w.video}`)
      assert.ok(Boolean(w.href) !== Boolean(w.video), `${w.title} 要有連結或影片其中一種`)
      bothLocales(w.summary, w.title)
    }
  }
})

test('案例頁：6 張截圖都存在', () => {
  assert.equal(liftlog.screens.length, 6)
  for (const s of liftlog.screens) assert.ok(inPublic(s.image), `找不到 ${s.image}`)
})
