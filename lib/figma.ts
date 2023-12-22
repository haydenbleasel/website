type FigmaDocument = {
  name: string;
  role: string;
  lastModified: string;
  editorType: string;
  thumbnailUrl: string;
  version: string;
  document: Node;
  components: Record<string, unknown>;
  componentSets: Record<string, unknown>;
  schemaVersion: number;
  styles: Record<string, unknown>;
  mainFileKey: string;
  branches: [
    {
      key: string;
      name: string;
      thumbnail_url: string;
      last_modified: string;
      link_access: string;
    },
  ];
};

type FigmaProject = {
  name: string;
  files: {
    key: string;
    name: string;
    thumbnail_url: string;
    last_modified: string;
    branches: [
      {
        key: string;
        name: string;
        thumbnail_url: string;
        last_modified: string;
      },
    ];
  }[];
};

const options = {
  headers: {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'X-FIGMA-TOKEN': process.env.FIGMA_ACCESS_TOKEN ?? '',
  },
};

export const fetchFigmaFile = async (id: string): Promise<FigmaDocument> => {
  const response = await fetch(`https://api.figma.com/v1/files/${id}`, options);

  const file = (await response.json()) as FigmaDocument;

  return file;
};

export const fetchFigmaProject = async (id: string): Promise<FigmaProject> => {
  const response = await fetch(
    `https://api.figma.com/v1/projects/${id}/files`,
    options
  );

  const project = (await response.json()) as FigmaProject;

  return project;
};
