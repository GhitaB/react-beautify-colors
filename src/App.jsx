import { useState } from "react";
import { random_hex_color } from "./utils";
import "./App.css";

function ColorPicker(props) {
  /* eslint-disable react/prop-types */ // TODO: upgrade to latest eslint tooling
  const { label, id, name } = props;
  const [color, setColor] = useState(random_hex_color());
  // Credits for on change: https://stackoverflow.com/a/59939918/1929820
  return (
    <div className="color-picker">
      <label htmlFor="primarycolor">{label}</label>
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
  const initial_colors = [
    {
      label: "Primary color: ",
      id: "primary-color",
      name: "primary-color",
    },
    {
      label: "Bla: ",
      id: "bla-color",
      name: "bla-color",
    },
  ];
  const [colors, setColors] = useState(initial_colors);

  const test_colors = [
    {
      label: "Primary color: ",
      id: "primary-color",
      name: "primary-color",
    },
    {
      label: "Bla: ",
      id: "bla-color",
      name: "bla-color",
    },
    {
      label: "Bla2: ",
      id: "bla-color2",
      name: "bla-color2",
    },
  ];
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
        <ColorPicker {...colors[1]} />
        {colors.length > 2 && <ColorPicker {...colors[2]} />}
        <button onClick={() => setColors(test_colors)}>Add color</button>
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
