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
  const data = {
    label: "Primary color: ",
    id: "primary-color",
    name: "primary-color",
  };

  const data_bla = {
    label: "Bla: ",
    id: "bla-color",
    name: "bla-color",
  };

  return (
    <>
      <div className="container">
        <h1>React Beautify Colors</h1>
        <p>
          1. <strong>Pick your main color.</strong> It will be used as reference
          to harmonize the other colors.
        </p>
        <ColorPicker {...data} />
        <p>
          2. Now add <strong>secondary colors</strong>.
        </p>
        <ColorPicker {...data_bla} />
        <p>TODO ADD</p>
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
