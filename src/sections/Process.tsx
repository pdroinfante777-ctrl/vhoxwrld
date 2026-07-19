import { SectionHeading } from '../components/SectionHeading'

const processSteps = [
  { index: 'P-01', title: 'IDENTITY', detail: 'Define the graphic, message and placement that belong to the VHOX movement.' },
  { index: 'P-02', title: 'FORM', detail: 'Match the approved concept to the garment, cap or future object.' },
  { index: 'P-03', title: 'MAKE', detail: 'Production details and availability are confirmed before anything is offered for purchase.' },
]

export function Process() {
  return (
    <section id="process" className="process section" aria-labelledby="process-title">
      <SectionHeading
        id="process-title"
        index="07"
        label="CUSTOMIZATION / WORKFLOW"
        title="FROM SIGNAL TO GARMENT."
        description="A transparent framework for customized VHOX pieces. Final production methods, lead times and ordering terms remain subject to confirmation."
      />
      <ol className="process__steps">
        {processSteps.map((step) => (
          <li key={step.index} data-reveal>
            <span>{step.index}</span>
            <h3>{step.title}</h3>
            <p>{step.detail}</p>
          </li>
        ))}
      </ol>
      <div className="next-drop" data-reveal>
        <span>NEXT DROP / DATE TO BE ANNOUNCED</span>
        <p>New work enters the world only when the product, imagery and release details are real.</p>
        <a href="mailto:contact@vhoxwrld.com?subject=VHOX%20drop%20updates">REQUEST DROP UPDATES</a>
      </div>
    </section>
  )
}
