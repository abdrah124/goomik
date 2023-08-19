export default function removeDuplicate(arr: any[], field: string): any[] {
  const seen = new Set();

  const filtererdArr = arr.filter((item) => {
    const duplicate = seen.has(item[field]);
    seen.add(item[field]);
    return !duplicate;
  });

  return filtererdArr;
}
