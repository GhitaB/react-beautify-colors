export const random_hex_color = () => {
  // Generate a random hex color
  // Credits: https://css-tricks.com/snippets/javascript/random-hex-color/
  return "#" + Math.floor(Math.random() * 16777215).toString(16);
};
