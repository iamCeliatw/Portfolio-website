'use client'

import Image from 'next/image'
import { useRef } from 'react'
import { JellyFrame } from '@/components/ui/JellyFrame'

type Props = { title: string; summary: string; image: string; video: string; watchLabel: string; closeLabel: string }

export function VideoThumb({ title, summary, image, video, watchLabel, closeLabel }: Props) {
  const dialogRef = useRef<HTMLDialogElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  return (
    <>
      <button type="button" aria-haspopup="dialog" onClick={() => dialogRef.current?.showModal()} className="spring-card block w-full text-left">
        <JellyFrame radius={16} className="aspect-[4/3] overflow-hidden rounded-2xl">
          <Image src={image} alt="" fill sizes="(min-width: 1024px) 25vw, 50vw" className="zoom-img object-cover" />
          <span aria-hidden className="absolute inset-0 grid place-items-center">
            <span className="grid size-12 place-items-center rounded-full bg-paper text-ink shadow-lg">▶</span>
          </span>
        </JellyFrame>
        <span className="mt-3 block font-bold">{title}</span>
        <span className="mt-1 block text-sm leading-relaxed text-mute">{summary}</span>
        <span className="sr-only">{watchLabel}</span>
      </button>
      <dialog
        ref={dialogRef}
        aria-label={title}
        onClose={() => videoRef.current?.pause()}
        onClick={(e) => e.target === dialogRef.current && dialogRef.current.close()}
        className="video-dialog m-auto w-[min(960px,92vw)] bg-transparent p-0"
      >
        <video ref={videoRef} src={video} controls playsInline preload="none" className="max-h-[80vh] w-full rounded-2xl bg-black" />
        <form method="dialog" className="mt-3 flex justify-end">
          <button className="min-h-11 rounded-full bg-paper px-5 font-bold text-ink">{closeLabel}</button>
        </form>
      </dialog>
    </>
  )
}
