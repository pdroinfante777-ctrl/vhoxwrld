import { SectionHeading } from '../components/SectionHeading'
import { useLocale } from '../i18n/useLocale'

const testimonialSlots = [
  { index: 'T-01', labelKey: 'testimonials.voice' },
  { index: 'T-02', labelKey: 'testimonials.response' },
  { index: 'T-03', labelKey: 'testimonials.note' },
] as const

export function Testimonials() {
  const { t } = useLocale()

  return (
    <section id="testimonials" className="testimonials section" aria-labelledby="testimonials-title">
      <SectionHeading
        id="testimonials-title"
        index="09"
        label={t('testimonials.label')}
        title={t('testimonials.title')}
        description={t('testimonials.description')}
      />

      <div className="testimonials__grid">
        {testimonialSlots.map((slot) => (
          <article key={slot.index} className="testimonial-slot" data-reveal>
            <span>{slot.index}</span>
            <div className="testimonial-slot__mark" aria-hidden="true">“</div>
            <p>{t('testimonials.pending')}</p>
            <footer>{t(slot.labelKey)}</footer>
          </article>
        ))}
      </div>
    </section>
  )
}
