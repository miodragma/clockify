export const hexToRgba = (hex, a = 1) => {
  const [r, g, b] = hex.match(/\w\w/g).map(x => parseInt(x, 16));
  return { r, g, b, a };
};
