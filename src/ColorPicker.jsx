import { useState } from "react";
export function ColorPicker(props) {
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
