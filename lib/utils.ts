import type { Thing, WithContext } from 'schema-dts';

export const sortByName = (companyA: string, companyB: string): number =>
  companyA.localeCompare(companyB);

export const formatList = (list: string[]): string => {
  const listFormatter = new Intl.ListFormat('en', {
    style: 'long',
    type: 'conjunction',
  });

  const sortedList = list.sort(sortByName);

  return listFormatter.format(sortedList);
};

export const getDate = (): string =>
  new Date().toLocaleString('en-US', {
    timeZone: 'America/New_York',
    dateStyle: 'long',
    timeStyle: 'short',
  });

export const toJsonLd = <T extends Thing>(
  json: WithContext<T>
): string => `<script type="application/ld+json">
${JSON.stringify(json, null, 2)}
</script>`;
