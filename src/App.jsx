import "./App.css";

function App() {
  return (
    <>
      <div className="container">
        <h1>React Beautify Colors</h1>
        <p>
          1. <strong>Pick your main color.</strong> It will be used as reference
          to harmonize the other colors.
        </p>
        <label htmlFor="primarycolor">Primary Color: </label>
        <input type="color" id="primary-color" name="primary-color" />
        <p>
          2. Now add <strong>secondary colors</strong>.
        </p>
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
