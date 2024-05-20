
export function getPostgresTimestamp(): string {
  const now: Date = new Date();

  const pad = (n: number) => n.toString().padStart(2, '0');

  const year: number = now.getFullYear();
  const month: string = pad(now.getMonth() + 1); // getMonth() is zero-based
  const day: string = pad(now.getDate());
  const hours: string = pad(now.getHours());
  const minutes: string = pad(now.getMinutes());
  const seconds: string = pad(now.getSeconds());
  const milliseconds: string = now.getMilliseconds().toString().padStart(3, '0');

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}.${milliseconds}`;
}
