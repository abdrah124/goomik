export default function removeDuplicate(arr: any[], field: string): any[] {
  const ids = arr.map((item) => item[field]);
  const filtered = arr.filter(
    (item, index) => !ids.includes(item[field], index + 1)
  );
  return filtered;
}
