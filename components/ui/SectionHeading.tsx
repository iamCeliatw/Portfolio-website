type Props = { label: string; title: string; alt: string; invert?: boolean; className?: string }

export function SectionHeading({ label, title, alt, invert, className = '' }: Props) {
  return (
    <div className={className}>
      <p className={`text-sm ${invert ? 'text-white/80' : 'text-mute'}`}>{label}</p>
      <h2 data-reveal className="mt-3 text-[clamp(40px,4.6vw,72px)] font-extrabold leading-[.95] tracking-[-.035em]">
        {title}
        <br />
        <span className="font-serif font-light italic">{alt}</span>
      </h2>
    </div>
  )
}
