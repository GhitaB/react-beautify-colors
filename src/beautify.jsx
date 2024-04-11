import { hex_to_rgb, rgb_to_hsl } from "./utils";

export const beautify = (colors) => {
  console.log("TODO beautify colors");
  console.log(colors);

  // 1. HEX colors ============================================================
  // Example: ['#3b374d', '#1c34b6', '#115bba']
  // --------------------------------------------------------------------------
  let list_of_hex_colors = colors.map((color) => color.value);
  console.log(list_of_hex_colors);

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
  console.log(list_of_rgb_colors);

  // 3. Convert RGB to HSL ====================================================
  // --------------------------------------------------------------------------
  let list_of_hsl_colors = list_of_rgb_colors.map((color) => rgb_to_hsl(color));
  console.log(list_of_hsl_colors);

  let updated_colors = [];
  return updated_colors;
};
