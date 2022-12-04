import { parse } from 'node-html-parser';

type WindowContext = {
  context: {
    packages: {
      total: number;
      objects: {
        name: string;
        date: {
          rel: string;
        };
        description: string;
        version: string;
      }[];
    };
  };
};

export type PackageProps = {
  name: string;
  description: string;
  version: string;
  updated: string;
  link: string;
};

export const getNPMPackages = async (): Promise<PackageProps[]> => {
  const response = await fetch('https://www.npmjs.com/~haydenbleasel');
  const data = await response.text();
  const dom = parse(data);

  const scripts = dom.querySelectorAll('script');

  const shotData = scripts.find((script) =>
    script.text.includes('window.__context__')
  )?.text;

  if (!shotData) {
    throw new Error('No data found');
  }

  const windowContext = JSON.parse(
    shotData.replace('window.__context__ = ', '')
  ) as WindowContext;

  return windowContext.context.packages.objects
    .filter(({ name }) => name.includes('@haydenbleasel'))
    .map(({ name, date, description, version }) => ({
      name,
      updated: date.rel,
      description,
      version,
      link: `https://www.npmjs.com/package/${name}`,
    }));
};
