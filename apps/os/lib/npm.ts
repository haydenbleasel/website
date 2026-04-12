interface NpmPackage {
  name: string;
  description: string;
  version: string;
  date: string;
  links: {
    npm: string;
    homepage?: string;
    repository?: string;
  };
}

interface NpmSearchResponse {
  objects: {
    package: NpmPackage;
    score: {
      final: number;
    };
  }[];
}

interface NpmDownloads {
  downloads: number;
  start: string;
  end: string;
  package: string;
}

export type { NpmPackage };

export const getPackages = async (): Promise<NpmPackage[]> => {
  const response = await fetch(
    "https://registry.npmjs.org/-/v1/search?text=author:haydenbleasel&size=20",
  );

  if (!response.ok) {
    throw new Error(`npm API error: ${response.status}`);
  }

  const data = (await response.json()) as NpmSearchResponse;
  return data.objects.map((obj) => obj.package);
};

export const getDownloads = async (packageName: string): Promise<NpmDownloads> => {
  const response = await fetch(`https://api.npmjs.org/downloads/point/last-year/${packageName}`);

  if (!response.ok) {
    throw new Error(`npm API error: ${response.status}`);
  }

  return response.json() as Promise<NpmDownloads>;
};
