import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@haydenbleasel/design-system/components/ui/card";
import { getContributions, getProfile, getRepositories } from "@/lib/github";
import { getDownloads, getPackages } from "@/lib/npm";
import type { NpmPackage } from "@/lib/npm";
import type { Metadata } from "next";

export const metadata: Metadata = {
  description: "My open source work on GitHub and npm.",
  title: "Code | OS1",
};

const formatNumber = (num: number) => {
  if (num >= 1_000_000) {
    return `${(num / 1_000_000).toFixed(1)}M`;
  }
  if (num >= 1000) {
    return `${(num / 1000).toFixed(1)}K`;
  }
  return num.toString();
};

const CodePage = async () => {
  const [profile, repos, contributions, packages] = await Promise.all([
    getProfile(),
    getRepositories(),
    getContributions(),
    getPackages(),
  ]);

  const packagesWithDownloads = await Promise.all(
    packages.map(async (pkg: NpmPackage) => {
      const downloads = await getDownloads(pkg.name);
      return { ...pkg, downloads: downloads.downloads };
    }),
  );

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-2xl font-semibold">Code</h1>
        <p className="text-muted-foreground">
          {profile.public_repos} public repos. {formatNumber(contributions.totalContributions)}{" "}
          contributions this year.
        </p>
      </div>

      <section className="flex flex-col gap-4">
        <h2 className="text-lg font-medium">Repositories</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {repos.map((repo) => (
            <a key={repo.id} href={repo.html_url} target="_blank" rel="noopener noreferrer">
              <Card size="sm" className="h-full transition-colors hover:bg-accent">
                <CardHeader>
                  <CardTitle>{repo.name}</CardTitle>
                  {repo.description && (
                    <CardDescription className="line-clamp-2">{repo.description}</CardDescription>
                  )}
                </CardHeader>
                <CardContent>
                  <div className="flex gap-4 text-xs text-muted-foreground">
                    {repo.language && <span>{repo.language}</span>}
                    <span>{formatNumber(repo.stargazers_count ?? 0)} stars</span>
                    <span>{formatNumber(repo.forks_count ?? 0)} forks</span>
                  </div>
                </CardContent>
              </Card>
            </a>
          ))}
        </div>
      </section>

      {packagesWithDownloads.length > 0 && (
        <section className="flex flex-col gap-4">
          <h2 className="text-lg font-medium">npm Packages</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {packagesWithDownloads
              .toSorted((a, b) => b.downloads - a.downloads)
              .map((pkg) => (
                <a key={pkg.name} href={pkg.links.npm} target="_blank" rel="noopener noreferrer">
                  <Card size="sm" className="h-full transition-colors hover:bg-accent">
                    <CardHeader>
                      <CardTitle>{pkg.name}</CardTitle>
                      {pkg.description && (
                        <CardDescription className="line-clamp-2">
                          {pkg.description}
                        </CardDescription>
                      )}
                    </CardHeader>
                    <CardContent>
                      <div className="flex gap-4 text-xs text-muted-foreground">
                        <span>v{pkg.version}</span>
                        <span>{formatNumber(pkg.downloads)} downloads/year</span>
                      </div>
                    </CardContent>
                  </Card>
                </a>
              ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default CodePage;
