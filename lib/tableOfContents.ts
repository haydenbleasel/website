import { remark } from 'remark';
import { toc } from 'mdast-util-toc';
import { visit } from 'unist-util-visit';

const textTypes = ['text', 'emphasis', 'strong', 'inlineCode'];

const flattenNode = (node) => {
  const p = [];
  visit(node, (node) => {
    if (!textTypes.includes(node.type)) {
      return;
    }
    p.push(node.value);
  });
  return p.join(``);
};

type Item = {
  title: string;
  url: string;
  items?: Item[];
};

type Items = {
  items?: Item[];
};

const getItems = (node, current): Items => {
  if (!node) {
    return {};
  }

  if (node.type === 'paragraph') {
    visit(node, (item) => {
      if (item.type === 'link') {
        current.url = item.url;
        current.title = flattenNode(node);
      }

      if (item.type === 'text') {
        current.title = flattenNode(node);
      }
    });

    return current;
  }

  if (node.type === 'list') {
    current.items = node.children.map((i) => getItems(i, {}));

    return current;
  } else if (node.type === 'listItem') {
    const heading = getItems(node.children[0], {});

    if (node.children.length > 1) {
      getItems(node.children[1], heading);
    }

    return heading;
  }

  return {};
};

const getToc = () => (node, file) => {
  const table = toc(node);
  file.data = getItems(table.map, {});
};

export type TableOfContentsProps = Items;

export const getTableOfContents = async (
  content: string
): Promise<TableOfContentsProps> => {
  const result = await remark().use(getToc).process(content);

  return result.data;
};