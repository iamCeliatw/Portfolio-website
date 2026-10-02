import { Noto_Sans_TC, Noto_Serif_TC, Schibsted_Grotesk, Zilla_Slab } from 'next/font/google'

const grotesk = Schibsted_Grotesk({ subsets: ['latin'], weight: ['400', '500', '700', '800'], variable: '--font-grotesk' })
const slab = Zilla_Slab({ subsets: ['latin'], weight: ['300'], style: ['normal', 'italic'], variable: '--font-slab' })
const notoSans = Noto_Sans_TC({ weight: ['400', '500', '700'], variable: '--font-noto-sans', preload: false })
const notoSerif = Noto_Serif_TC({ weight: ['300', '500'], variable: '--font-noto-serif', preload: false })

export const fontVariables = [grotesk, slab, notoSans, notoSerif].map((font) => font.variable).join(' ')
