import { parse } from 'node-html-parser';

export type DribbbleResponse = {
  id: string;
  url: string;
  title?: string;
  image?: string;
  comments?: string;
  likes?: string;
  views?: string;
  video?: string;
};

const likesRegex = /"likesCount":(?<value>\d+)/u;
const commentsRegex = /"commentsCount":(?<value>\d+)/u;
const viewsRegex = /"viewsCount":(?<value>\d+)/u;
const titleRegex = /"title":"(?<value>.+?)"/u;
const imageRegex = /"shotGifUrl":"(?<value>.+?)"/u;

export const fetchDribbbleShot = async (
  id: number
): Promise<DribbbleResponse> => {
  const response = await fetch(`https://dribbble.com/shots/${id}`);
  const data = (await response.text()) as string;

  const dom = parse(data);

  const scripts = dom.querySelectorAll('script');

  const shotData = scripts.find((script) => script.text.includes('shotData:'))
    ?.text;

  if (!shotData) {
    throw new Error('No shot data found');
  }

  const likes = likesRegex.exec(shotData)?.groups?.value;
  const comments = commentsRegex.exec(shotData)?.groups?.value;
  const views = viewsRegex.exec(shotData)?.groups?.value;
  const title = titleRegex.exec(shotData)?.groups?.value;
  const video = dom
    .querySelector('video[data-test="video-content"]')
    ?.getAttribute('src');
  let image = imageRegex.exec(shotData)?.groups?.value;

  if (image?.includes('?resize=')) {
    // eslint-disable-next-line prefer-named-capture-group
    image = image.replace(/resize=(\d+)x(\d+)/u, 'resize=796x597');
  }

  return {
    id: String(id),
    url: `https://dribbble.com/shots/${id}`,
    likes,
    comments,
    views,
    title,
    video,
    image,
  };
};
