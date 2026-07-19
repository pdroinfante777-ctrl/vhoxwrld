export type LookbookFrame = {
  id: string
  format: 'portrait' | 'landscape' | 'square' | 'tall'
  mediaType: 'image' | 'video'
  src: string | null
  alt: string
  label: string
  note: string
  parallax: number
}

// Replace `src` with approved VHOX media. Null values intentionally render
// branded abstract placeholders instead of fabricated campaign photography.
export const lookbookFrames: LookbookFrame[] = [
  { id: 'lb-01', format: 'tall', mediaType: 'image', src: null, alt: '', label: 'FRAME 01', note: 'CAMPAIGN MEDIA PENDING', parallax: 5 },
  { id: 'lb-02', format: 'landscape', mediaType: 'video', src: null, alt: '', label: 'MOTION 02', note: 'FILM ASSET PENDING', parallax: 8 },
  { id: 'lb-03', format: 'square', mediaType: 'image', src: null, alt: '', label: 'FRAME 03', note: 'DETAIL STUDY PENDING', parallax: 4 },
  { id: 'lb-04', format: 'portrait', mediaType: 'image', src: null, alt: '', label: 'FRAME 04', note: 'LOCATION STUDY PENDING', parallax: 7 },
]
