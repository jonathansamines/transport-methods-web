export default function range(number) {
  const empty = [];

  for (let i = 0; i < number; i += 1) {
    empty.push(i);
  }

  return empty;
}
