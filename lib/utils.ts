export const sortByName = (companyA: string, companyB: string): number =>
  companyA.localeCompare(companyB);

export const listFormatter = new Intl.ListFormat('en', {
  style: 'long',
  type: 'conjunction',
});

export const getDate = (): string =>
  new Date().toLocaleString('en-US', {
    timeZone: 'America/New_York',
    dateStyle: 'long',
    timeStyle: 'short',
  });
