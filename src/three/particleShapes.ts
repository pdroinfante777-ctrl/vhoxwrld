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
  viewBox: [0, 0, 640, 560],
  worldWidth: 5.35,
  jitter: 0.008,
  paths: [
    {
      d: 'M246 82 C216 88 183 97 148 111 C122 121 103 138 90 160 L36 286 Q33 296 44 300 L136 334 L153 301 L153 514 Q153 525 164 525 L476 525 Q487 525 487 514 L487 301 L504 334 L596 300 Q607 296 604 286 L550 160 C537 138 518 121 492 111 C457 97 424 88 394 82 C387 111 359 128 320 128 C281 128 253 111 246 82 Z',
      weight: 1.45,
    },
    {
      d: 'M254 87 C264 114 286 136 320 136 C354 136 376 114 386 87',
      weight: 1.25,
    },
    {
      d: 'M148 111 C151 137 157 163 166 190 M492 111 C489 137 483 163 474 190',
      weight: 0.72,
    },
    {
      d: 'M44 290 L137 323 M596 290 L503 323',
      weight: 0.78,
    },
    {
      d: 'M164 511 C258 507 382 507 476 511',
      weight: 0.72,
    },
  ],
}

export const premiumCap: ParticleShape = {
  id: 'premium-cap',
  label: 'Premium structured cap',
  viewBox: [0, 0, 760, 430],
  worldWidth: 5.85,
  jitter: 0.007,
  paths: [
    {
      d: 'M94 320 C85 260 103 198 143 146 C188 88 267 58 361 66 C456 73 515 126 537 221 C484 229 430 242 379 259 C286 291 199 320 94 320 Z',
      weight: 1.35,
    },
    {
      d: 'M95 320 C208 327 300 306 385 282 C476 255 573 244 665 274 C694 284 708 301 701 318 C693 338 659 345 615 336 C552 324 503 302 449 301 C393 299 338 329 270 344 C204 359 145 350 95 331 Z',
      weight: 1.5,
    },
    {
      d: 'M355 67 C322 113 310 177 315 279',
      weight: 0.9,
    },
    {
      d: 'M537 221 C501 239 473 263 449 301',
      weight: 0.72,
    },
    {
      d: 'M337 67 C338 54 348 46 361 46 C374 46 384 54 385 69',
      weight: 1.05,
    },
    {
      d: 'M271 326 C340 313 391 288 449 289 C505 290 557 313 616 325 M322 313 C373 301 409 282 453 281 C507 280 557 302 606 315',
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

export const vhoxWordmark: ParticleShape = {
  id: 'vhox-wordmark',
  label: 'VHOX wordmark',
  viewBox: [-3.4, -1.2, 6.8, 2.4],
  worldWidth: 6.3,
  jitter: 0.01,
  paths: [
    { d: 'M-3.2 1 L-2.7 -1 L-2.2 1', weight: 1.3 },
    { d: 'M-1.7 1 L-1.7 -1 M-0.7 1 L-0.7 -1 M-1.7 0 L-0.7 0', weight: 1.3 },
    { d: 'M0.1 0.9 L0.1 -0.9 L1.1 -0.9 L1.1 0.9 Z', weight: 1.3 },
    { d: 'M1.8 1 L3.1 -1 M3.1 1 L1.8 -1', weight: 1.3 },
  ],
}

export const garmentShapes = [premiumTshirt, premiumCap, premiumHoodie] as const
