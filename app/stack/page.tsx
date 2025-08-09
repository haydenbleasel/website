import type { Metadata } from 'next';
import { SimpleLayout } from '@/components/simple-layout';
import { stack } from '@/lib/stack';
import { Tool } from './components/tool';
import { ToolsSection } from './components/tools-section';

export const metadata: Metadata = {
  title: 'Stack',
  description: 'Software I use, apps I love, and other things I recommend.',
};

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

const StackPage = () => (
  <SimpleLayout
    intro="I get asked a lot about the tools and technologies I use to build products, stay productive, and more. Here’s a big list of all of my favorite software."
    title="Software I use, apps I love, and other things I recommend."
  >
    <div className="space-y-20">
      {categoriesToRender.map((category) => {
        const itemsForCategory = stack.filter(
          (item) => item.category === category
        );
        const itemsForCategorySorted = itemsForCategory
          .slice()
          .sort((a, b) => (b.affiliate ? 1 : 0) - (a.affiliate ? 1 : 0));

        return (
          <ToolsSection key={category} title={category}>
            {itemsForCategorySorted.map((item) => (
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

export default StackPage;
