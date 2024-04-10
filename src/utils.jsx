export const random_hex_color = () => {
  // Generate a random hex color
  // Credits: https://css-tricks.com/snippets/javascript/random-hex-color/
  return "#" + Math.floor(Math.random() * 16777215).toString(16);
};

export const init_color_picker = (order) => {
  let label = "";
  order = order.toString();
  if (order === "0") {
    label = "Primary color: ";
  } else {
    label = "Secondary color " + order + ": ";
  }
  return {
    label: label,
    id: "color-" + order,
    name: "color-" + order,
    value: random_hex_color(),
  };
};

export const init_color_pickers = (number_of_color_pickers) => {
  let color_pickers = [];
  for (let i = 0; i < number_of_color_pickers; i++) {
    color_pickers.push(init_color_picker(i));
  }
  return color_pickers;
};
