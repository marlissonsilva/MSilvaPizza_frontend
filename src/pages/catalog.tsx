import { useEffect, useState } from "react";
import { API_URL } from "../shared/apiURL";
import { Card, type Pizza } from "../components/Card";

export function Catalog() {
  const [pizzas, setPizzas] = useState<Pizza[]>();

  useEffect(() => {
    const fetchPizzasPromise = async () =>
      fetch(`${API_URL}pizza`).then(async (res) => {
        if (!res.ok) throw new Error("Network response failed");
        const data = await res.json();
        setPizzas(data);
      });
    fetchPizzasPromise();
  }, []);

  return (
    <section>
      <h2 className="text-3xl font-bold text-center m-8">
        Confira Nossas Pizzas
      </h2>
      <div className="max-w-7xl m-auto mt-8 w-[90%]">
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {pizzas &&
            pizzas.map((pizza: Pizza) => (
              <Card key={pizza.uuid} pizza={pizza} />
            ))}
        </ul>
      </div>
    </section>
  );
}
