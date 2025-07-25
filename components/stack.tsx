'use client';

import { stack } from '@/lib/stack';
import { Tool } from './tool';

const getCategories = () => {
  const categories = new Set<string>();
  for (const item of stack) {
    categories.add(item.category);
  }
  // Sort categories alphabetically before returning
  return Array.from(categories).sort((a, b) => a.localeCompare(b));
};

export const Stack = () => {
  const categories = getCategories();

  // Sort stack by affiliate first, then by name for consistency
  const sortedStack = [...stack].sort((a, b) => {
    if (a.affiliate === b.affiliate) {
      return a.name.localeCompare(b.name);
    }
    return b.affiliate ? 1 : -1;
  });

  // Group tools by category, include all tools (not just featured)
  const toolsByCategory = categories.map((category) => ({
    category,
    tools: sortedStack.filter((tool) => tool.category === category),
  }));

  return (
    <div className="not-prose grid gap-16">
      {toolsByCategory.map(({ category, tools }) =>
        tools.length > 0 ? (
          <section className="flex flex-col gap-8" key={category}>
            <h2 className="font-medium text-3xl">{category}</h2>
            <div className="grid gap-4">
              {tools.map((tool) => (
                <Tool key={tool.name} {...tool} />
              ))}
            </div>
          </section>
        ) : null
      )}
    </div>
  );
};
