const rtf = new Intl.RelativeTimeFormat('en', {
  localeMatcher: 'best fit',
});

const timeAgo = (fromDate: Date, toDate: Date): string => {
  const diff = Math.floor(
    (fromDate.getTime() - toDate.getTime()) / (1000 * 60 * 60 * 24)
  );

  return rtf.format(diff, 'day');
};

export default timeAgo;
