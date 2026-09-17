import type { ComponentType } from 'react'

type ArtProps = {
  className?: string
}

export type ItemId =
  | 'cat'
  | 'dog'
  | 'sun'
  | 'hat'
  | 'cup'
  | 'egg'
  | 'bus'
  | 'pig'
  | 'hen'
  | 'bee'
  | 'fox'
  | 'fish'
  | 'frog'
  | 'bird'

export type ItemCategory = 'land' | 'water' | 'air' | 'object' | 'insect'

export type Item = {
  id: ItemId
  word: string
  category: ItemCategory
  Illustration: ComponentType<ArtProps>
}

export function CatArt({ className }: ArtProps) {
  return (
    <svg className={className} viewBox="0 0 120 100" aria-hidden="true">
      <ellipse cx="60" cy="88" rx="28" ry="6" fill="#d9c9a8" opacity="0.45" />
      <ellipse cx="60" cy="70" rx="28" ry="20" fill="#e0b089" />
      <ellipse cx="60" cy="74" rx="16" ry="10" fill="var(--color-mascot-belly)" />
      <circle cx="60" cy="42" r="24" fill="#e0b089" />
      <path d="M38 28 L34 8 L52 22 Z" fill="#e0b089" />
      <path d="M82 28 L86 8 L68 22 Z" fill="#e0b089" />
      <path d="M40 24 L36 12 L50 22 Z" fill="var(--color-mascot-ear)" />
      <path d="M80 24 L84 12 L70 22 Z" fill="var(--color-mascot-ear)" />
      <circle cx="52" cy="42" r="4" fill="var(--color-ink)" />
      <circle cx="68" cy="42" r="4" fill="var(--color-ink)" />
      <path d="M56 52 L60 56 L64 52 Z" fill="var(--color-mascot-ear)" />
      <path d="M36 48 H46 M74 48 H84" stroke="var(--color-ink)" strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
}

export function DogArt({ className }: ArtProps) {
  return (
    <svg className={className} viewBox="0 0 120 100" aria-hidden="true">
      <ellipse cx="60" cy="88" rx="30" ry="6" fill="#d9c9a8" opacity="0.45" />
      <ellipse cx="62" cy="70" rx="30" ry="18" fill="#c48a4a" />
      <ellipse cx="62" cy="74" rx="16" ry="10" fill="var(--color-mascot-belly)" />
      <ellipse cx="58" cy="42" rx="22" ry="20" fill="#c48a4a" />
      <ellipse cx="36" cy="48" rx="12" ry="16" fill="#a56e38" transform="rotate(-24 36 48)" />
      <ellipse cx="84" cy="46" rx="12" ry="16" fill="#a56e38" transform="rotate(28 84 46)" />
      <ellipse cx="76" cy="50" rx="14" ry="10" fill="#e0b089" />
      <circle cx="50" cy="40" r="4" fill="var(--color-ink)" />
      <circle cx="66" cy="40" r="4" fill="var(--color-ink)" />
      <ellipse cx="80" cy="52" rx="5" ry="3.5" fill="var(--color-mascot-ear)" />
      <path d="M92 62 Q108 52 104 36" fill="none" stroke="#c48a4a" strokeWidth="8" strokeLinecap="round" />
    </svg>
  )
}

export function SunArt({ className }: ArtProps) {
  return (
    <svg className={className} viewBox="0 0 120 100" aria-hidden="true">
      <g fill="var(--color-gold)">
        <rect x="56" y="6" width="8" height="16" rx="4" />
        <rect x="56" y="78" width="8" height="16" rx="4" />
        <rect x="12" y="46" width="16" height="8" rx="4" />
        <rect x="92" y="46" width="16" height="8" rx="4" />
        <rect x="26" y="18" width="12" height="8" rx="4" transform="rotate(-45 32 22)" />
        <rect x="82" y="74" width="12" height="8" rx="4" transform="rotate(-45 88 78)" />
        <rect x="82" y="18" width="12" height="8" rx="4" transform="rotate(45 88 22)" />
        <rect x="26" y="74" width="12" height="8" rx="4" transform="rotate(45 32 78)" />
      </g>
      <circle cx="60" cy="50" r="24" fill="var(--color-sun)" />
      <circle cx="60" cy="50" r="18" fill="var(--color-gold)" />
    </svg>
  )
}

export function HatArt({ className }: ArtProps) {
  return (
    <svg className={className} viewBox="0 0 120 100" aria-hidden="true">
      <ellipse cx="60" cy="78" rx="44" ry="10" fill="var(--color-coral-deep)" />
      <ellipse cx="60" cy="74" rx="44" ry="10" fill="var(--color-coral)" />
      <path d="M32 70 C 34 34, 86 34, 88 70 Z" fill="var(--color-coral)" />
      <ellipse cx="60" cy="42" rx="18" ry="6" fill="var(--color-gold)" />
    </svg>
  )
}

export function CupArt({ className }: ArtProps) {
  return (
    <svg className={className} viewBox="0 0 120 100" aria-hidden="true">
      <path d="M34 28 H86 L80 82 H40 Z" fill="var(--color-sky)" />
      <path d="M40 36 H80 L76 74 H44 Z" fill="var(--color-canvas)" />
      <path
        d="M86 36 C 108 36, 108 70, 86 70"
        fill="none"
        stroke="var(--color-sky-deep)"
        strokeWidth="8"
        strokeLinecap="round"
      />
      <rect x="34" y="22" width="52" height="10" rx="5" fill="var(--color-sky-deep)" />
    </svg>
  )
}

export function EggArt({ className }: ArtProps) {
  return (
    <svg className={className} viewBox="0 0 120 100" aria-hidden="true">
      <ellipse cx="60" cy="54" rx="26" ry="34" fill="var(--color-canvas)" stroke="#e2d4b4" strokeWidth="6" />
      <ellipse cx="52" cy="42" rx="8" ry="12" fill="#fff" opacity="0.7" />
    </svg>
  )
}

export function BusArt({ className }: ArtProps) {
  return (
    <svg className={className} viewBox="0 0 120 100" aria-hidden="true">
      <rect x="10" y="28" width="100" height="46" rx="14" fill="var(--color-gold)" />
      <rect x="22" y="36" width="22" height="18" rx="4" fill="var(--color-sky)" />
      <rect x="50" y="36" width="22" height="18" rx="4" fill="var(--color-sky)" />
      <rect x="78" y="36" width="22" height="18" rx="4" fill="var(--color-sky)" />
      <circle cx="34" cy="78" r="10" fill="var(--color-ink)" />
      <circle cx="86" cy="78" r="10" fill="var(--color-ink)" />
      <circle cx="34" cy="78" r="4" fill="var(--color-canvas)" />
      <circle cx="86" cy="78" r="4" fill="var(--color-canvas)" />
      <rect x="10" y="58" width="100" height="8" fill="var(--color-gold-deep)" />
    </svg>
  )
}

export function PigArt({ className }: ArtProps) {
  return (
    <svg className={className} viewBox="0 0 120 100" aria-hidden="true">
      <ellipse cx="60" cy="88" rx="28" ry="6" fill="#d9c9a8" opacity="0.45" />
      <ellipse cx="60" cy="64" rx="32" ry="22" fill="#f4a698" />
      <circle cx="60" cy="40" r="22" fill="#f4a698" />
      <circle cx="42" cy="22" r="8" fill="#f4a698" />
      <circle cx="78" cy="22" r="8" fill="#f4a698" />
      <circle cx="42" cy="22" r="3.5" fill="var(--color-mascot-ear)" />
      <circle cx="78" cy="22" r="3.5" fill="var(--color-mascot-ear)" />
      <circle cx="52" cy="38" r="3.5" fill="var(--color-ink)" />
      <circle cx="68" cy="38" r="3.5" fill="var(--color-ink)" />
      <ellipse cx="60" cy="52" rx="10" ry="7" fill="#e07a7a" />
      <circle cx="56" cy="52" r="1.8" fill="var(--color-ink)" />
      <circle cx="64" cy="52" r="1.8" fill="var(--color-ink)" />
      <path d="M90 58 Q108 48 100 32" fill="none" stroke="#f4a698" strokeWidth="8" strokeLinecap="round" />
    </svg>
  )
}

export function HenArt({ className }: ArtProps) {
  return (
    <svg className={className} viewBox="0 0 120 100" aria-hidden="true">
      <ellipse cx="62" cy="88" rx="26" ry="6" fill="#d9c9a8" opacity="0.45" />
      <ellipse cx="58" cy="62" rx="28" ry="22" fill="#f2efe6" />
      <circle cx="78" cy="40" r="16" fill="#f2efe6" />
      <path d="M70 18 Q78 8 86 18 Q78 14 70 18 Z" fill="var(--color-coral)" />
      <path d="M92 42 L108 40 L92 48 Z" fill="var(--color-gold)" />
      <circle cx="82" cy="38" r="3" fill="var(--color-ink)" />
      <ellipse cx="46" cy="58" rx="12" ry="16" fill="#e07a5f" />
      <path d="M48 82 L42 92 M58 82 L58 94 M68 82 L74 92" stroke="var(--color-gold-deep)" strokeWidth="4" strokeLinecap="round" />
    </svg>
  )
}

export function BeeArt({ className }: ArtProps) {
  return (
    <svg className={className} viewBox="0 0 120 100" aria-hidden="true">
      <ellipse cx="48" cy="36" rx="16" ry="12" fill="#d7eef0" opacity="0.9" />
      <ellipse cx="72" cy="36" rx="16" ry="12" fill="#d7eef0" opacity="0.9" />
      <ellipse cx="60" cy="58" rx="28" ry="20" fill="var(--color-gold)" />
      <rect x="48" y="42" width="8" height="32" fill="var(--color-ink)" />
      <rect x="64" y="42" width="8" height="32" fill="var(--color-ink)" />
      <circle cx="88" cy="54" r="10" fill="var(--color-gold)" />
      <circle cx="92" cy="50" r="2.4" fill="var(--color-ink)" />
      <path d="M96 46 L102 34 M100 48 L110 40" stroke="var(--color-ink)" strokeWidth="3" strokeLinecap="round" />
    </svg>
  )
}

export function FoxArt({ className }: ArtProps) {
  return (
    <svg className={className} viewBox="0 0 120 100" aria-hidden="true">
      <ellipse cx="58" cy="88" rx="28" ry="6" fill="#d9c9a8" opacity="0.45" />
      <ellipse cx="58" cy="70" rx="28" ry="18" fill="#e07a5f" />
      <path d="M40 44 L28 12 L56 32 Z" fill="#e07a5f" />
      <path d="M76 44 L92 12 L64 32 Z" fill="#e07a5f" />
      <ellipse cx="60" cy="48" rx="24" ry="18" fill="#e07a5f" />
      <path d="M48 52 L60 66 L72 52 Z" fill="var(--color-canvas)" />
      <circle cx="52" cy="44" r="3.5" fill="var(--color-ink)" />
      <circle cx="68" cy="44" r="3.5" fill="var(--color-ink)" />
      <ellipse cx="60" cy="56" rx="5" ry="3" fill="var(--color-ink)" />
      <path d="M86 66 Q108 50 96 28" fill="none" stroke="#e07a5f" strokeWidth="8" strokeLinecap="round" />
      <circle cx="96" cy="28" r="6" fill="var(--color-canvas)" />
    </svg>
  )
}

export function FishArt({ className }: ArtProps) {
  return (
    <svg className={className} viewBox="0 0 120 100" aria-hidden="true">
      <ellipse cx="64" cy="50" rx="32" ry="20" fill="var(--color-sky)" />
      <path d="M20 50 L8 32 L8 68 Z" fill="var(--color-sky-deep)" />
      <path d="M64 32 C 72 24, 84 28, 78 38 Z" fill="var(--color-sky-deep)" />
      <circle cx="82" cy="46" r="4" fill="var(--color-ink)" />
      <circle cx="83" cy="45" r="1.4" fill="#fff" />
      <path d="M54 50 Q64 56 74 50" fill="none" stroke="var(--color-sky-deep)" strokeWidth="3" strokeLinecap="round" />
    </svg>
  )
}

export function FrogArt({ className }: ArtProps) {
  return (
    <svg className={className} viewBox="0 0 120 100" aria-hidden="true">
      <ellipse cx="60" cy="88" rx="30" ry="6" fill="#d9c9a8" opacity="0.45" />
      <ellipse cx="60" cy="68" rx="36" ry="20" fill="var(--color-meadow)" />
      <circle cx="42" cy="38" r="14" fill="var(--color-meadow)" />
      <circle cx="78" cy="38" r="14" fill="var(--color-meadow)" />
      <circle cx="42" cy="38" r="8" fill="#fff" />
      <circle cx="78" cy="38" r="8" fill="#fff" />
      <circle cx="44" cy="40" r="4" fill="var(--color-ink)" />
      <circle cx="80" cy="40" r="4" fill="var(--color-ink)" />
      <ellipse cx="60" cy="70" rx="16" ry="10" fill="var(--color-meadow-deep)" />
      <path d="M48 78 Q36 92 24 84 M72 78 Q84 92 96 84" fill="none" stroke="var(--color-meadow-deep)" strokeWidth="8" strokeLinecap="round" />
    </svg>
  )
}

export function BirdArt({ className }: ArtProps) {
  return (
    <svg className={className} viewBox="0 0 120 100" aria-hidden="true">
      <ellipse cx="58" cy="58" rx="28" ry="20" fill="var(--color-violet)" />
      <circle cx="82" cy="42" r="14" fill="var(--color-violet)" />
      <path d="M94 42 L112 38 L94 50 Z" fill="var(--color-gold)" />
      <circle cx="86" cy="40" r="3" fill="var(--color-ink)" />
      <path d="M48 52 Q36 36 58 40" fill="var(--color-violet-deep)" />
      <path d="M48 76 L42 90 M58 78 L58 92 M68 76 L74 90" stroke="var(--color-ink)" strokeWidth="4" strokeLinecap="round" />
    </svg>
  )
}

export const ITEMS: Record<ItemId, Item> = {
  cat: { id: 'cat', word: 'cat', category: 'land', Illustration: CatArt },
  dog: { id: 'dog', word: 'dog', category: 'land', Illustration: DogArt },
  sun: { id: 'sun', word: 'sun', category: 'object', Illustration: SunArt },
  hat: { id: 'hat', word: 'hat', category: 'object', Illustration: HatArt },
  cup: { id: 'cup', word: 'cup', category: 'object', Illustration: CupArt },
  egg: { id: 'egg', word: 'egg', category: 'object', Illustration: EggArt },
  bus: { id: 'bus', word: 'bus', category: 'object', Illustration: BusArt },
  pig: { id: 'pig', word: 'pig', category: 'land', Illustration: PigArt },
  hen: { id: 'hen', word: 'hen', category: 'land', Illustration: HenArt },
  bee: { id: 'bee', word: 'bee', category: 'insect', Illustration: BeeArt },
  fox: { id: 'fox', word: 'fox', category: 'land', Illustration: FoxArt },
  fish: { id: 'fish', word: 'fish', category: 'water', Illustration: FishArt },
  frog: { id: 'frog', word: 'frog', category: 'water', Illustration: FrogArt },
  bird: { id: 'bird', word: 'bird', category: 'air', Illustration: BirdArt },
}

export function ItemArt({ id, className }: { id: ItemId; className?: string }) {
  const Illustration = ITEMS[id].Illustration
  return <Illustration className={className} />
}
