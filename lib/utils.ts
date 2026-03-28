export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(date);
}

export function formatNumber(n: number): string {
  return new Intl.NumberFormat('fr-FR').format(n);
}

export function truncate(str: string, n: number): string {
  if (str.length <= n) {
    return str;
  }

  return `${str.slice(0, n).trimEnd()}…`;
}
