import { useEffect, useState } from "react";
import "./App.css";
import { API_URL } from "./shared/apiURL";
import { AddPizza } from "./components/AddPizza";
interface Pizza {
  uuid: string;
  name: string;
  isGlutenFree: boolean;
}

function App() {
  const [pizzas, setPizzas] = useState<Pizza[]>();
  useEffect(() => {
    const fetchPizzasPromise = async () =>
      fetch(API_URL).then(async (res) => {
        if (!res.ok) throw new Error("Network response failed");
        const data = await res.json();
        setPizzas(data);
      });
    fetchPizzasPromise();
  }, []);

  return (
    <main>
      <h1 className="text-5xl p-4 text-center">MSilva Pizza</h1>
      <div className="flex gap-24 max-w-3/4 m-auto">
        <AddPizza />
        <div className="p-4 flex-1">
          <h2>Lista de Pizzas</h2>
          <div className="flex justify-between">
            <span>Nome</span>
            <span>Contém glúten?</span>
          </div>
          <ul>
            {pizzas &&
              pizzas.map((pizza: Pizza) => (
                <li key={pizza.uuid} className="flex justify-between">
                  <span>{pizza.name}</span>
                  <span>{pizza.isGlutenFree ? "Sim" : "Não"}</span>
                </li>
              ))}
          </ul>
        </div>
      </div>
    </main>
  );
}

export default App;
