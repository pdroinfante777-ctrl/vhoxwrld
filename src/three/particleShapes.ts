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
  worldWidth: 5.48,
  jitter: 0.005,
  paths: [
    {
      d: 'M108 287 C102 226 122 169 164 121 C216 61 294 42 378 51 C457 60 511 107 535 184 C544 215 548 243 548 268 C484 263 420 264 358 274 C278 286 195 295 108 287 Z',
      weight: 1.82,
    },
    {
      d: 'M108 287 C215 302 313 284 411 266 C495 251 571 256 638 276 C683 289 711 305 717 322 C723 341 697 356 661 359 C620 362 582 347 541 331 C495 314 449 310 406 321 C354 334 307 350 260 350 C203 350 156 330 108 300 Z',
      weight: 1.06,
    },
    {
      d: 'M372 51 C341 92 328 145 330 205 C331 233 335 255 342 277',
      weight: 1.02,
    },
    {
      d: 'M164 121 C204 143 230 190 234 290',
      weight: 0.76,
    },
    {
      d: 'M535 184 C500 207 467 232 438 263',
      weight: 0.8,
    },
    {
      d: 'M357 53 C357 39 367 30 381 30 C396 30 407 40 407 57',
      weight: 1.12,
    },
    {
      d: 'M109 286 C220 305 315 284 411 266 C497 250 574 257 638 276',
      weight: 0.74,
    },
    {
      d: 'M117 309 C161 339 208 353 260 345 C310 337 356 319 406 309 C453 300 500 312 541 329 C582 346 620 359 661 355',
      weight: 0.58,
    },
    {
      d: 'M406 321 C452 312 497 323 541 338 M427 312 C469 308 510 320 556 335 M448 304 C488 304 530 316 574 330',
      weight: 0.38,
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
