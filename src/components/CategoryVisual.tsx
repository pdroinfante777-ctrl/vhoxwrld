import type { ReactNode } from 'react'
import type { CategoryVisualName } from '../data/categories'

type CategoryVisualProps = {
  visual: CategoryVisualName
}

const drawings: Record<CategoryVisualName, ReactNode> = {
  shirt: (
    <>
      <path d="M37 20 51 12c8 7 20 7 28 0l14 8 20 18-13 18-11-8v54H41V48l-11 8-13-18 20-18Z" />
      <path className="category-visual__detail" d="M51 12c2 10 8 15 14 15s12-5 14-15M41 48l-4-28M89 48l4-28" />
    </>
  ),
  cap: (
    <>
      <path d="M18 71c3-30 21-49 47-49 27 0 43 17 47 45-17-5-35-4-54 2-17 6-30 7-40 2Z" />
      <path d="M57 69c23-10 47-10 70-1-9 10-26 16-48 16-14 0-23-5-22-15Z" />
      <path className="category-visual__detail" d="M65 22v45M24 61c15-3 30-2 44 4M60 18c0-4 3-7 7-7s7 3 7 7" />
    </>
  ),
  shoe: (
    <>
      <path d="M19 74c14-1 25-7 33-20l9-17c7 13 16 22 28 27 10 4 22 6 36 8v17H17c-6-7-5-12 2-15Z" />
      <path className="category-visual__detail" d="M46 61c10 8 26 14 48 17M17 82h108M66 48l-10 5M73 54l-11 6M81 60l-12 7" />
    </>
  ),
  future: (
    <>
      <path d="M65 14 76 48l35-16-21 29 33 17-38 1 5 38-25-30-25 30 5-38-38-1 33-17-21-29 35 16 11-34Z" />
      <path className="category-visual__detail" d="M65 34v61M34 63h62M45 43l40 40M85 43 45 83" />
    </>
  ),
}

export function CategoryVisual({ visual }: CategoryVisualProps) {
  return (
    <svg className="category-row__form category-visual" viewBox="0 0 140 130" aria-hidden="true">
      {drawings[visual]}
    </svg>
  )
}
