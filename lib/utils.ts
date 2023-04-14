export const sortByName = (companyA: string, companyB: string): number =>
  companyA.localeCompare(companyB);

export const listFormatter = new Intl.ListFormat('en', {
  style: 'long',
  type: 'conjunction',
});

export const formatDate = (date: Date): string =>
  new Intl.DateTimeFormat('en', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeStyle: 'short',
    timeZone: 'America/New_York',
  }).format(date);
