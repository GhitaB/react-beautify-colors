export function ColorsList(colors) {
  const colors_array = Object.values(colors); // Credits: ChatGPT
  // Credits: ChatGPT for this amazing list of colors view, too.
  return (
    <div>
      {colors_array.map((color) => (
        <div
          key={color.id}
          style={{
            backgroundColor: color.value,
            padding: "10px",
            margin: "5px",
            color: "#fff",
          }}
        >
          <span style={{ fontWeight: "bold" }}>{color.value}</span>
        </div>
      ))}
    </div>
  );
}
