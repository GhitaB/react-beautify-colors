import { useState } from "react";
import { init_color_pickers } from "./utils";
import "./App.css";

function ColorPicker(props) {
  /* eslint-disable react/prop-types */ // TODO: upgrade to latest eslint tooling
  const { label, id, name, value } = props;
  const [color, setColor] = useState(value);
  // Credits for on change: https://stackoverflow.com/a/59939918/1929820
  return (
    <div className="color-picker">
      <label htmlFor={name}>{label}</label>
      <input
        type="color"
        id={id}
        name={name}
        value={color}
        onChange={(e) => setColor(e.target.value)}
      />
    </div>
  );
}

function App() {
  const [colors, setColors] = useState(init_color_pickers(4));

  return (
    <>
      <div className="container">
        <h1>React Beautify Colors</h1>
        <p>
          1. <strong>Pick your main color.</strong> It will be used as reference
          to harmonize the other colors.
        </p>
        <ColorPicker {...colors[0]} />
        <p>
          2. Now add <strong>secondary colors</strong>.
        </p>
        {colors
          .filter((colors, index) => index > 0)
          .map((color) => (
            <ColorPicker key={color.id} {...color} />
          ))}
        <button onClick={() => setColors([])}>Add color</button>
        <p>
          3. Ready? Just press <strong>Beautify</strong>.
        </p>
        <button>Beautify</button>
        <p>
          4. <strong>Copy</strong> the colors.
        </p>
        <p>
          5. Try <strong>again</strong> with other colors.
        </p>
      </div>
    </>
  );
}

export default App;
