import { useState } from "react";
import { init_color_picker, init_color_pickers } from "./utils";
import "./App.css";

function ColorPicker(props) {
  /* eslint-disable react/prop-types */ // TODO: upgrade to latest eslint tooling
  const { label, id, name, value, removeColor, onChange } = props;
  const [color, setColor] = useState(value);
  // Credits for on change: https://stackoverflow.com/a/59939918/1929820

  const handleColorChange = (new_color) => {
    onChange(new_color);
  };
  return (
    <div className="color-picker">
      <label htmlFor={name}>{label}</label>
      <input
        type="color"
        id={id}
        name={name}
        value={color}
        onChange={(e) => {
          setColor(e.target.value);
          handleColorChange(e.target.value);
        }}
      />
      {id !== "color-0" && (
        <button onClick={() => removeColor(id)}>Remove</button>
      )}
    </div>
  );
}

function ColorsList(colors) {
  const colors_array = Object.values(colors); // Credits: ChatGPT
  return (
    <p>The colors are: {colors_array.map((color) => color.value + " ")}</p>
  );
}

function App() {
  const number_of_colors = 4;
  const [colors, setColors] = useState(init_color_pickers(number_of_colors));
  const [colorsIndex, setColorsIndex] = useState(number_of_colors);

  const addColor = (colors) => {
    let updated = [...colors]; // Credits: https://stackoverflow.com/a/71250303/1929820
    updated.push(init_color_picker(colorsIndex));
    setColors(updated);
    setColorsIndex(colorsIndex + 1);
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
    }
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
        <button>Beautify</button>
        <p>
          4. <strong>Copy</strong> the colors.
        </p>
        <ColorsList {...colors} />
        <p>
          5. Try <strong>again</strong> with other colors.
        </p>
      </div>
    </>
  );
}

export default App;
