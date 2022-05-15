export const capitalize = (str: string) => {
  const words = str.split(" ");
  words.forEach(
    (w, index) => (words[index] = w.charAt(0).toUpperCase() + w.slice(1))
  );
  return words.join(" ");
};
