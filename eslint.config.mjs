import ultracite from 'ultracite';

for (const item of ultracite) {
  item.settings = item.settings || {};
  item.settings.polyfills = item.settings.polyfills || [];

  item.settings.polyfills.push(
    // These are from Next.js
    'fetch',
    'URL',
    'Object.assign',

    // This one is running on the server
    'URLSearchParams'
  );
}

export { default } from 'ultracite';
