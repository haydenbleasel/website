const formatter = new Intl.ListFormat('en', {
  style: 'long',
  type: 'conjunction',
});

const formatList = (list: Iterable<string>): string => formatter.format(list);

export default formatList;
