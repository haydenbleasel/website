export type MediumPost = {
  creator: string;
  title: string;
  link: string;
  // eslint-disable-next-line @typescript-eslint/naming-convention
  'content:encoded': string;
  guid: string;
  isoDate: string;
  categories: string[];
};
