import {
  hex_to_rgb,
  rgb_to_hsl,
  hsl_to_rgb,
  rgb_to_hex,
  update_saturation,
  hue_distance_of_hsl_colors,
} from "./utils";

export const beautify = (colors) => {
  // 1. HEX colors ============================================================
  // Example: ['#3b374d', '#1c34b6', '#115bba']
  // --------------------------------------------------------------------------
  let list_of_hex_colors = colors.map((color) => color.value);
  console.log("HEX: ", list_of_hex_colors);

  // 2. Convert HEX to RGB ====================================================
  // Example:
  // [
  //     [
  //         59,
  //         55,
  //         77
  //     ],
  //     [
  //         28,
  //         52,
  //         182
  //     ],
  //     [
  //         17,
  //         91,
  //         186
  //     ]
  // ]
  // --------------------------------------------------------------------------
  let list_of_rgb_colors = list_of_hex_colors.map((color) => hex_to_rgb(color));
  console.log("RGB: ", list_of_rgb_colors);

  // 3. Convert RGB to HSL ====================================================
  // Example:
  // [
  //     [
  //         0.6969696969696969,
  //         0.16666666666666663,
  //         0.2588235294117647
  //     ],
  //     [
  //         0.6406926406926406,
  //         0.7333333333333335,
  //         0.4117647058823529
  //     ],
  //     [
  //         0.5936883629191322,
  //         0.8325123152709359,
  //         0.3980392156862745
  //     ]
  // ]
  // --------------------------------------------------------------------------
  let list_of_hsl_colors = list_of_rgb_colors.map((color) => rgb_to_hsl(color));
  console.log("HSL: ", list_of_hsl_colors);

  // 4. Convert HSL to RGB ====================================================
  // Credits: https://github.com/GhitaB/beautify-colors/blob/master/script.js#L96C12-L96C22
  let test_list_rgb = list_of_hsl_colors.map((color) => hsl_to_rgb(color));
  console.log("Back to RGB: ", test_list_rgb);

  // 5. Convert RGB to HEX ====================================================
  // Credits: https://github.com/GhitaB/beautify-colors/blob/master/script.js#L122C1-L130C4
  let test_list_hex = test_list_rgb.map((color) => rgb_to_hex(color));
  console.log("Back to HEX: ", test_list_hex);

  let updated_colors = list_of_hex_colors;
  // ## 1. Maximize saturation for primary color.
  updated_colors[0] = update_saturation(list_of_hsl_colors[0], 1);

  // ## 2. Calculate hue distance on color wheel for all secondary colors.
  for (let hsl_color of list_of_hsl_colors) {
    console.log(
      "DISTANCE: ",
      hue_distance_of_hsl_colors(list_of_hsl_colors[0], hsl_color),
    );
  }

  // ## 3. Update saturation for all secondary colors (~ gamut masking).
  for (
    let color_index = 1;
    color_index < updated_colors.length;
    color_index++
  ) {
    updated_colors[color_index] = update_saturation(
      list_of_hsl_colors[color_index],
      1 -
        hue_distance_of_hsl_colors(
          list_of_hsl_colors[0],
          list_of_hsl_colors[color_index],
        ),
    );
  }
  return updated_colors;
};
