const formatNumbers = (str: string | undefined): string => {
  if (!str) {
    return '0';
  }

  const num = Number(str);

  if (num < 1000) {
    return str;
  }

  if (num < 1000000) {
    return `${(num / 1000).toFixed(1)}k`;
  }

  return `${(num / 1000000).toFixed(1)}m`;
};

export default formatNumbers;
