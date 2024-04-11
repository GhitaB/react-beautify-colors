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

export const hex_to_rgb = (hex) => {
  // Credits: https://github.com/GhitaB/beautify-colors/blob/master/script.js#L58C2-L71C5
  // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
  let shorthand_regex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
  hex = hex.replace(shorthand_regex, function (m, r, g, b) {
    return r + r + g + g + b + b;
  });

  let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? [
        parseInt(result[1], 16),
        parseInt(result[2], 16),
        parseInt(result[3], 16),
      ]
    : null;
};

export const rgb_to_hsl = (r, g, b) => {
  return "TODO";
};
