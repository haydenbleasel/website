import type { FC, HTMLProps } from 'react';
import slugify from 'slugify';

type SectionProps = HTMLProps<HTMLDivElement> & {
  title?: string;
};

const Section: FC<SectionProps> = ({ title, children, ...props }) => {
  const id = title ? slugify(title, { lower: true, strict: true }) : undefined;

  return (
    <section {...props} id={id}>
      {title && <h2>{title}</h2>}
      {children}
    </section>
  );
};

export default Section;
