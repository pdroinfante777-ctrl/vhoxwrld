import { SectionHeading } from '../components/SectionHeading'

const testimonialSlots = [
  { index: 'T–01', label: 'VERIFIED VOICE', status: 'AWAITING APPROVED TESTIMONIAL' },
  { index: 'T–02', label: 'FIELD RESPONSE', status: 'AWAITING APPROVED TESTIMONIAL' },
  { index: 'T–03', label: 'COMMUNITY NOTE', status: 'AWAITING APPROVED TESTIMONIAL' },
]

export function Testimonials() {
  return (
    <section id="testimonials" className="testimonials section" aria-labelledby="testimonials-title">
      <SectionHeading
        id="testimonials-title"
        index="05"
        label="TESTIMONIALS / RESERVED"
        title="REAL SIGNAL. NO FICTION."
        description="This modular field will only publish statements supplied or verified by VHOX. No names, ratings or endorsements have been fabricated."
      />

      <div className="testimonials__grid">
        {testimonialSlots.map((slot) => (
          <article key={slot.index} className="testimonial-slot" data-reveal>
            <span>{slot.index}</span>
            <div className="testimonial-slot__mark" aria-hidden="true">“</div>
            <p>{slot.status}</p>
            <footer>{slot.label}</footer>
          </article>
        ))}
      </div>
    </section>
  )
}
