import { Schibsted_Grotesk, Zilla_Slab } from 'next/font/google'

// 中文用系統字型（蘋方、微軟正黑體、思源黑體）：Noto TC 網路字型拆成數十個字型檔，手機第一個畫面要多下載 1.4MB
const grotesk = Schibsted_Grotesk({ subsets: ['latin'], weight: ['400', '500', '700', '800'], variable: '--font-grotesk' })
const slab = Zilla_Slab({ subsets: ['latin'], weight: ['300'], style: ['normal', 'italic'], variable: '--font-slab', preload: false })

export const fontVariables = [grotesk, slab].map((font) => font.variable).join(' ')
