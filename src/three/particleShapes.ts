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
  worldWidth: 5.82,
  jitter: 0.005,
  paths: [
    {
      d: 'M94 308 C91 236 116 169 164 121 C218 67 302 48 388 61 C472 73 532 126 556 214 C563 237 567 261 566 282 C487 282 408 291 329 303 C252 315 174 317 94 308 Z',
      weight: 1.72,
    },
    {
      d: 'M94 308 C190 321 278 311 366 293 C455 275 542 265 622 282 C672 292 707 309 715 326 C723 344 707 360 678 365 C641 372 605 358 566 343 C521 326 477 316 436 322 C379 331 325 355 267 369 C204 385 144 373 96 346 C84 339 82 326 94 308 Z',
      weight: 1.18,
    },
    {
      d: 'M382 61 C347 101 330 158 330 224 C330 252 333 278 338 301',
      weight: 1.08,
    },
    {
      d: 'M164 121 C212 146 242 200 246 314',
      weight: 0.82,
    },
    {
      d: 'M556 214 C515 234 478 258 446 279',
      weight: 0.86,
    },
    {
      d: 'M360 63 C360 45 370 35 384 35 C399 35 410 47 410 67',
      weight: 1.16,
    },
    {
      d: 'M96 309 C213 328 303 308 391 289 C480 270 550 268 622 282',
      weight: 0.76,
    },
    {
      d: 'M99 341 C156 368 207 372 267 357 C326 342 379 319 436 310 C486 303 537 315 575 330 C615 346 650 357 681 352',
      weight: 0.62,
    },
    {
      d: 'M436 322 C486 318 527 329 568 344 M453 311 C500 309 543 322 582 337 M470 302 C516 303 558 316 598 330',
      weight: 0.42,
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
