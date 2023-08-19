export default function getDate(dateNow: number) {
  const date = new Date(dateNow);

  return date.toDateString();
}
