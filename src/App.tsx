import { use } from "react";
import "./App.css";

interface Pizza {
  uuid: string;
  name: string;
  isGlutenFree: boolean;
}

const fetchPizzasPromise = fetch("http://localhost:5250/pizza").then(
  async (res) => {
    if (!res.ok) throw new Error("Network response failed");
    return await res.json();
  },
);

function PizzaList() {
  const pizzas = use(fetchPizzasPromise);
  console.log(pizzas);

  return (
    <ul>
      {pizzas.map((pizza: Pizza) => (
        <li key={pizza.uuid}>{pizza.name}</li>
      ))}
    </ul>
  );
}

function App() {
  return (
    <>
      <main>
        <h1 className="text-5xl p-4">MSilva Pizza</h1>
        <PizzaList />
      </main>
    </>
  );
}

export default App;
