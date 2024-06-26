import { useState } from "react";
import { init_color, init_colors } from "./utils";
import { beautify } from "./beautify";
import { ColorPicker } from "./ColorPicker";
import { ColorsList } from "./ColorsList";
import "./App.css";

function App() {
  const number_of_colors = 4;
  const [colors, setColors] = useState(init_colors(number_of_colors));
  const [colorsIndex, setColorsIndex] = useState(number_of_colors);
  const [improvedColors, setImprovedColors] = useState([]);

  const addColor = (colors) => {
    let updated = [...colors]; // Credits: https://stackoverflow.com/a/71250303/1929820
    updated.push(init_color(colorsIndex));
    setColors(updated);
    setColorsIndex(colorsIndex + 1);
  };

  const invalidateImprovedColors = () => {
    setImprovedColors([]);
  };

  const removeColor = (id) => {
    setColors((prevItems) => prevItems.filter((color) => color.id !== id));
  };

  const handleColorChange = (id, new_color) => {
    // Credits: ChatGPT for finding the color having the id and update the item
    const color_index = colors.findIndex((color) => color.id === id);

    if (color_index !== -1) {
      const updated_colors = [...colors];

      updated_colors[color_index] = {
        ...updated_colors[color_index],
        value: new_color,
      };

      setColors(updated_colors);
      invalidateImprovedColors();
    }
  };

  const beautifyColors = (colors) => {
    const updated_colors_hex = beautify(colors);
    console.log("BEST: ", updated_colors_hex);
    const improved_colors = [];
    let index = 1000;
    for (let value of updated_colors_hex) {
      improved_colors.push(init_color(index, value));
      index += 1;
    }
    console.log("IMPROVED", improved_colors);
    setImprovedColors(improved_colors);
  };

  return (
    <>
      <div className="container">
        <h1>React Beautify Colors</h1>
        <p>
          1. <strong>Pick your main color.</strong> It will be used as reference
          to harmonize the other colors.
        </p>
        <ColorPicker
          {...colors[0]}
          onChange={(new_color) => handleColorChange("color-0", new_color)}
        />
        <p>
          2. Now add <strong>secondary colors</strong>.
        </p>
        {colors
          .filter((colors, index) => index > 0)
          .map((color) => (
            <ColorPicker
              key={color.id}
              {...color}
              removeColor={removeColor}
              onChange={(new_color) => handleColorChange(color.id, new_color)}
            />
          ))}
        <button onClick={() => addColor(colors)}>Add color</button>
        <p>
          3. Ready? Just press <strong>Beautify</strong>.
        </p>
        <button onClick={() => beautifyColors(colors)}>Beautify</button>
        <div className="colors-container">
          <div className="col-left">
            <p>Original colors</p>
            <ColorsList {...colors} />
          </div>
          {improvedColors.length > 0 && (
            <div className="col-right">
              <p>Improved colors</p>
              <ColorsList {...improvedColors} />
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default App;
