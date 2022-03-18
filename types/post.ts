export type Post = {
  id: string;
  title: string;
  link: string;
  caption: string;
  description: string;
  image: string;
  date: string;
  comments?: number;
  reactions?: number;
  duration?: number;
  tags?: string[];
  content: string;
};
