export type ParticlePath = {
  d: string
  weight?: number
}

export type ParticleShape = {
  id: 'premium-tshirt' | 'premium-cap' | 'premium-hoodie' | 'vhox-wordmark'
  label: string
  viewBox: readonly [number, number, number, number]
  worldWidth: number
  jitter: number
  paths: readonly ParticlePath[]
}

export const premiumTshirt: ParticleShape = {
  id: 'premium-tshirt',
  label: 'Premium oversized T-shirt',
  viewBox: [0, 0, 640, 570],
  worldWidth: 5.55,
  jitter: 0.006,
  paths: [
    {
      d: 'M240 76 C207 83 172 93 137 107 C109 118 89 136 75 160 L27 299 Q24 311 38 316 L139 351 L160 315 L160 529 Q160 540 172 540 L468 540 Q480 540 480 529 L480 315 L501 351 L602 316 Q616 311 613 299 L565 160 C551 136 531 118 503 107 C468 93 433 83 400 76 C392 106 363 123 320 123 C277 123 248 106 240 76 Z',
      weight: 1.52,
    },
    {
      d: 'M248 81 C258 112 284 133 320 133 C356 133 382 112 392 81',
      weight: 1.32,
    },
    {
      d: 'M137 107 C143 139 151 168 163 196 M503 107 C497 139 489 168 477 196',
      weight: 0.78,
    },
    {
      d: 'M38 305 L140 340 M602 305 L500 340',
      weight: 0.82,
    },
    {
      d: 'M172 526 C264 522 376 522 468 526',
      weight: 0.76,
    },
  ],
}

export const premiumCap: ParticleShape = {
  id: 'premium-cap',
  label: 'Premium structured cap',
  viewBox: [0, 0, 760, 430],
  worldWidth: 5.95,
  jitter: 0.006,
  paths: [
    {
      d: 'M88 321 C82 248 105 184 151 134 C201 80 278 56 365 64 C462 72 522 129 545 224 C492 232 438 245 383 263 C289 294 196 322 88 321 Z',
      weight: 1.42,
    },
    {
      d: 'M89 321 C202 331 300 309 390 282 C482 254 577 244 668 274 C698 284 713 301 706 319 C697 342 660 350 613 339 C552 325 503 303 448 302 C391 301 335 331 268 348 C201 365 139 354 90 334 Z',
      weight: 1.58,
    },
    {
      d: 'M359 65 C326 113 315 181 320 282',
      weight: 0.98,
    },
    {
      d: 'M545 224 C507 242 477 266 448 302',
      weight: 0.78,
    },
    {
      d: 'M341 66 C342 51 351 43 365 43 C379 43 388 52 389 69',
      weight: 1.12,
    },
    {
      d: 'M268 330 C338 316 391 289 448 290 C506 291 559 315 616 329 M320 316 C371 303 410 283 454 282 C508 282 560 304 610 318',
      weight: 0.48,
    },
  ],
}

export const premiumHoodie: ParticleShape = {
  id: 'premium-hoodie',
  label: 'Premium oversized hoodie',
  viewBox: [0, 0, 720, 690],
  worldWidth: 5.25,
  jitter: 0.008,
  paths: [
    {
      d: 'M270 158 C226 164 190 181 160 207 C140 225 128 248 119 275 L48 523 C41 550 49 572 67 587 L68 629 Q106 637 145 632 L153 585 C165 570 170 552 169 531 L179 345 L184 607 L194 650 Q360 658 526 650 L536 607 L541 345 L551 531 C550 552 555 570 567 585 L575 632 Q614 637 652 629 L653 587 C671 572 679 550 672 523 L601 275 C592 248 580 225 560 207 C530 181 494 164 450 158 C423 177 393 190 360 199 C327 190 297 177 270 158 Z',
      weight: 1.4,
    },
    {
      d: 'M270 171 C245 144 237 112 248 77 C266 23 454 23 472 77 C483 112 475 144 450 171 C418 182 388 200 360 224 C332 200 302 182 270 171 Z',
      weight: 1.35,
    },
    {
      d: 'M276 82 C304 52 416 52 444 82 C426 128 397 159 360 190 C323 159 294 128 276 82 Z',
      weight: 1.15,
    },
    {
      d: 'M160 207 C169 254 177 301 179 345 M560 207 C551 254 543 301 541 345',
      weight: 0.66,
    },
    {
      d: 'M247 453 C242 494 224 531 198 560 C248 568 301 571 360 571 C419 571 472 568 522 560 C496 531 478 494 473 453 C402 447 318 447 247 453 Z',
      weight: 0.96,
    },
    {
      d: 'M184 606 C294 611 426 611 536 606 M194 638 C300 643 420 643 526 638',
      weight: 0.74,
    },
    {
      d: 'M67 587 C94 580 121 581 153 585 M68 615 C94 609 119 610 147 613 M567 585 C599 581 626 580 653 587 M573 613 C601 610 626 609 652 615',
      weight: 0.72,
    },
  ],
}

export const garmentShapes = [premiumTshirt, premiumCap, premiumHoodie] as const

export {
  vhoxWordmark,
  vhoxWordmarkSourceName,
  wordmarkH,
  wordmarkLetterBounds,
  wordmarkO,
  wordmarkV,
  wordmarkX,
} from './vhoxWordmark'
