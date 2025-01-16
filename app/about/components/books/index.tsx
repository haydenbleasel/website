import type { OkuProperties } from '@/app/api/cron/oku/route';
import { Section } from '@/components/section';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ViewAnimation } from '@/providers/view-animation';
import { get } from '@vercel/edge-config';
import { Book } from './book';

export const Books = async () => {
  const books = await get<OkuProperties>('oku');

  if (!books) {
    return null;
  }

  const tabs = [
    {
      id: 'backlog',
      label: 'To Read',
      items: books.backlog,
    },
    {
      id: 'reading',
      label: 'Reading',
      items: books.reading,
    },
    {
      id: 'finished',
      label: 'Read',
      items: books.completed,
    },
  ];

  return (
    <Section className="p-8">
      <Tabs defaultValue="backlog" className="grid gap-4">
        <div className="flex items-center justify-between">
          <ViewAnimation initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}>
            <h2 className="font-bold text-3xl tracking-tight">Reading List</h2>
          </ViewAnimation>
          <ViewAnimation
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            delay={0.2}
          >
            <TabsList>
              {tabs.map((tab) => (
                <TabsTrigger key={tab.id} value={tab.id}>
                  {tab.label}
                </TabsTrigger>
              ))}
            </TabsList>
          </ViewAnimation>
        </div>
        {tabs.map((tab) => (
          <TabsContent key={tab.id} value={tab.id}>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
              {tab.items.map((book, index) => (
                <ViewAnimation
                  key={book.id}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  delay={(index % 5) * 0.2}
                >
                  <Book key={book.id} {...book} />
                </ViewAnimation>
              ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </Section>
  );
};
