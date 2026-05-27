/**
 * SectionWrapper — Consistent section layout with padding, max-width, and optional divider.
 * Every page section should be wrapped in this.
 *
 * @example
 *   <SectionWrapper id="expertise" className="py-section-lg">
 *     <h2>...</h2>
 *   </SectionWrapper>
 *
 *   <SectionWrapper topDivider bottomDivider>...</SectionWrapper>
 */

export default function SectionWrapper({
  id,
  topDivider = false,
  bottomDivider = false,
  className = "",
  children,
  ...props
}) {
  return (
    <section id={id} className={`relative ${className}`} {...props}>
      {topDivider && <div className="divider-gradient mb-12 md:mb-16" />}

      <div className="section-container">{children}</div>

      {bottomDivider && <div className="divider-gradient mt-12 md:mt-16" />}
    </section>
  );
}
