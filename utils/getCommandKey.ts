const getCommandKey = (): '⌘' | 'Ctrl-' => {
  if (
    typeof window === 'undefined' ||
    window.navigator.platform.startsWith('Mac') ||
    navigator.platform === 'iPhone'
  ) {
    return '⌘';
  }

  return 'Ctrl-';
};

export default getCommandKey;
