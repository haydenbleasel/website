import { ArrowUpRightIcon, BriefcaseIcon } from '@phosphor-icons/react/ssr';
import { Button } from '@/components/Button';
import Corellium from '@/images/logos/corellium.svg';
import Jellypepper from '@/images/logos/jellypepper.svg';
import Palantir from '@/images/logos/palantir.svg';
import Vercel from '@/images/logos/vercel.svg';
import { Role } from './role';

export const Resume = () => {
  const resume: Role[] = [
    {
      company: 'Vercel',
      title: 'DX Engineer',
      className: 'bg-black text-white',
      logo: Vercel,
      start: '2025',
      end: {
        label: 'Present',
        dateTime: new Date().getFullYear().toString(),
      },
    },
    {
      company: 'Corellium',
      title: 'Chief Product Officer',
      className: 'bg-black text-white',
      logo: Corellium,
      start: '2021',
      end: '2024',
    },
    {
      company: 'Jellypepper',
      title: 'Director',
      className: 'bg-black text-white',
      logo: Jellypepper,
      start: '2017',
      end: '2023',
    },
    {
      company: 'Palantir',
      title: 'Product Design Intern',
      className: 'bg-black text-white',
      logo: Palantir,
      start: '2015',
      end: '2015',
    },
  ];

  return (
    <div className="rounded-2xl border border-zinc-100 p-6 dark:border-zinc-700/40">
      <h2 className="flex font-semibold text-sm text-zinc-900 dark:text-zinc-100">
        <BriefcaseIcon className="h-6 w-6 flex-none" weight="duotone" />
        <span className="ml-3">Work</span>
      </h2>
      <ol className="mt-6 space-y-4">
        {resume.map((role) => (
          <Role key={role.company} role={role} />
        ))}
      </ol>
      <Button
        className="group mt-6 w-full"
        href="https://www.linkedin.com/in/haydenbleasel/"
        rel="noopener noreferrer"
        target="_blank"
        variant="secondary"
      >
        View full resume
        <ArrowUpRightIcon className="h-4 w-4 stroke-zinc-400 transition group-active:stroke-zinc-600 dark:group-active:stroke-zinc-50 dark:group-hover:stroke-zinc-50" />
      </Button>
    </div>
  );
};
