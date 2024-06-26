export const random_hex_color = () => {
  // Generate a random hex color
  // Credits: https://css-tricks.com/snippets/javascript/random-hex-color/
  return "#" + Math.floor(Math.random() * 16777215).toString(16);
};

export const init_color = (order, value) => {
  if (value === null || value === "" || value === undefined) {
    value = random_hex_color();
  }

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
    value: value,
  };
};

export const init_colors = (number_of_colors) => {
  let colors = [];
  for (let i = 0; i < number_of_colors; i++) {
    colors.push(init_color(i));
  }
  return colors;
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

export const hsl_to_rgb = (hsl_color) => {
  let h = hsl_color[0];
  let s = hsl_color[1];
  let l = hsl_color[2];
  let r, g, b;

  if (s == 0) {
    r = g = b = l; // achromatic
  } else {
    const hue2rgb = function hue2rgb(p, q, t) {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1 / 6) return p + (q - p) * 6 * t;
      if (t < 1 / 2) return q;
      if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
      return p;
    };

    var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    var p = 2 * l - q;
    r = hue2rgb(p, q, h + 1 / 3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1 / 3);
  }

  return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
};

export const component_to_hex = (c) => {
  let hex = c.toString(16);
  return hex.length == 1 ? "0" + hex : hex;
};

export const rgb_to_hex = (rgb_color) => {
  const r = rgb_color[0];
  const g = rgb_color[1];
  const b = rgb_color[2];
  return "#" + component_to_hex(r) + component_to_hex(g) + component_to_hex(b);
};

export const update_saturation = (hsl_color, saturation) => {
  // Usually we have a HSL color and we need to update its saturation and
  // export as HEX color.
  hsl_color[1] = saturation;
  return rgb_to_hex(hsl_to_rgb(hsl_color));
};

// Credits: ChatGPT
export const hue_distance_of_hsl_colors = (hsl_color_1, hsl_color_2) => {
  // hue = 0 .. 1, but * 360 to have the wheel
  // hue distance = 0 .. 180
  // normalized hue distance = 0 .. 1
  const hue1 = hsl_color_1[0] * 360;
  const hue2 = hsl_color_2[0] * 360;
  let hue_difference = Math.abs(hue1 - hue2);
  if (hue_difference > 180) {
    hue_difference = 360 - hue_difference;
  }
  let normalized_hue_distance = hue_difference / 180;
  return normalized_hue_distance;
};

export const optimized_saturation = (hue_distance) => {
  // Make the colors great again
  const beauty = 1.3; // TODO: experiment, and find the best value
  return 1 - hue_distance / beauty;
};
