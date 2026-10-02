'use client'

import { useState } from 'react'

type Props = { text: string; label: string; copiedLabel: string; className?: string }

export function CopyButton({ text, label, copiedLabel, className = '' }: Props) {
  const [copied, setCopied] = useState(false)
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // 剪貼簿被瀏覽器擋下時不做事，旁邊的 mailto 連結仍可用
    }
  }
  return (
    <button type="button" onClick={copy} aria-live="polite" className={`min-h-11 rounded-full border border-ink px-5 text-sm font-bold ${className}`}>
      {copied ? copiedLabel : label}
    </button>
  )
}
