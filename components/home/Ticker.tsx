// globals.css 的 @keyframes tick 寫死 3 個詞
export function Ticker({ words }: { words: string[] }) {
  return (
    <>
      <span className="sr-only">{words.join(' ')}</span>
      <span aria-hidden className="ticker">
        <span className="ticker-track">
          {[...words, words[0]].map((word, i) => (
            <span key={i}>{word}</span>
          ))}
        </span>
      </span>
    </>
  )
}
