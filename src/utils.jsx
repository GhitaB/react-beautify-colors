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

// Credits: https://github.com/GhitaB/beautify-colors/blob/master/script.js#L74C1-L93C5
// Credits: https://stackoverflow.com/a/39147465/1929820 (This is amazing.)
export const rgb_to_hsl = (rgb_color) => {
  let r = rgb_color[0];
  let g = rgb_color[1];
  let b = rgb_color[2];

  (r /= 255), (g /= 255), (b /= 255);
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = (max + min) / 2;
  let s = (max + min) / 2;
  let l = (max + min) / 2;

  if (max == min) {
    h = s = 0; // achromatic
  } else {
    let d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }
    h /= 6;
  }

  return [h, s, l];
};
