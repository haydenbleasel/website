import type { ReactNode } from 'react';
import { Fragment } from 'react';
import Link from 'next/link';
import Project from '../projects/project';
import { fetchNPMPackages } from '@/lib/npm';
import Divider from '@/components/divider';
import fetchGithubRepositories from '@/lib/github';

const Code = async (): Promise<ReactNode> => {
  const packages = await fetchNPMPackages();
  const repositories = await fetchGithubRepositories();

  return (
    <main className="flex flex-col gap-6 prose-h2:mb-2 prose-h2:mt-4 prose-p:m-0">
      <h1>Code</h1>
      <div className="flex flex-col gap-2">
        <h2>NPM Packages</h2>
        <div>
          {packages.map((pkg, index) => (
            <Fragment key={pkg.name}>
              {index > 0 && <Divider />}
              <Project
                title={pkg.name.replace('@haydenbleasel/', '')}
                description={pkg.description}
                href={pkg.link}
              />
            </Fragment>
          ))}
        </div>
        <p className="m-0">
          I also started some open-source libraries that have hundreds or
          thousands of stars, such as{' '}
          <Link href="https://github.com/itgalaxy/favicons">Favicons</Link> and{' '}
          <Link href="https://github.com/nitinthewiz/ghost-phantom">
            Phantom
          </Link>
          .
        </p>
      </div>
      <div className="flex flex-col gap-2">
        <h2>GitHub Repositories</h2>
        <div>
          {repositories.map((repo, index) => (
            <Fragment key={repo.id}>
              {index > 0 && <Divider />}
              <Project
                title={repo.name}
                description={repo.description}
                href={repo.html_url}
              />
            </Fragment>
          ))}
        </div>
      </div>
    </main>
  );
};

export default Code;
