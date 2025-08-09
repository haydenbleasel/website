import type { Metadata } from 'next';
import { Section } from '@/components/Section';
import { SimpleLayout } from '@/components/SimpleLayout';
import { stack } from '@/lib/stack';
import { Tool } from './components/tool';

function ToolsSection({
  children,
  ...props
}: React.ComponentPropsWithoutRef<typeof Section>) {
  return (
    <Section {...props} className="max-w-none">
      <ul className="grid grid-cols-1 gap-x-12 gap-y-16 sm:grid-cols-2">
        {children}
      </ul>
    </Section>
  );
}

export const metadata: Metadata = {
  title: 'Uses',
  description: 'Software I use, gadgets I love, and other things I recommend.',
};

export default function Uses() {
  const categoryOrder = [
    'AI',
    'Productivity',
    'Design',
    'Development',
    'Marketing',
    'Finance',
    'Other',
  ] as const;

  const categoriesToRender = categoryOrder.filter((category) =>
    stack.some((item) => item.category === category)
  );

  return (
    <SimpleLayout
      intro="I get asked a lot about the things I use to build software, stay productive, or buy to fool myself into thinking I’m being productive when I’m really just procrastinating. Here’s a big list of all of my favorite stuff."
      title="Software I use, gadgets I love, and other things I recommend."
    >
      <div className="space-y-20">
        {categoriesToRender.map((category) => {
          const itemsForCategory = stack.filter(
            (item) => item.category === category
          );

          return (
            <ToolsSection key={category} title={category}>
              {itemsForCategory.map((item) => (
                <Tool
                  affiliate={item.affiliate}
                  description={item.description}
                  href={item.href}
                  imageHref={item.imageHref}
                  key={item.name}
                  name={item.name}
                />
              ))}
            </ToolsSection>
          );
        })}
      </div>
    </SimpleLayout>
  );
}
