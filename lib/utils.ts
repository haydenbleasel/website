export const sortByName = (companyA: string, companyB: string): number =>
  companyA.localeCompare(companyB);

export const listFormatter = new Intl.ListFormat('en', {
  style: 'long',
  type: 'conjunction',
});
