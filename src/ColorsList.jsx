export function ColorsList(colors) {
  const colors_array = Object.values(colors); // Credits: ChatGPT
  return (
    <p>The colors are: {colors_array.map((color) => color.value + " ")}</p>
  );
}
