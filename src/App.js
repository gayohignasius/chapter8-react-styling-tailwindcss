import { useState } from "react";
import Article from "./pages/Article";

function App() {
  const [darkToggle, setDarkToggle] = useState(false);
  return (
    <div
      class={`min-h-screen w-full flex flex-col transition duration-200 ${
        darkToggle && "dark"
      }`}
    >
      <div className="min-h-screen bg-gray-300 dark:bg-gray-800">
        <h1 className="text-center text-3xl font-bold mt-6 text-black dark:text-white">
          Article List
        </h1>
        <label class="toggleDarkBtn ml-4">
          <input type="checkbox" onClick={() => setDarkToggle(!darkToggle)} />
          <span class="slideBtnTg round"></span>
        </label>
        <div className="grid gap-2 grid-cols-3 grid-rows-3">
          <Article />
        </div>
      </div>
    </div>
  );
}

export default App;
