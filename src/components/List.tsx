import { useEffect, useState } from "react";
import type { Pizza } from "./Card";
import { apiFetch } from "../shared/api";

export function List({
  onEditPizza,
  reload,
}: {
  onEditPizza?: (pizza: Pizza) => void;
  reload?: boolean;
}) {
  const [pizzas, setPizzas] = useState<Pizza[]>();

  const handleEdit = (pizza: Pizza) => {
    if (onEditPizza) {
      onEditPizza(pizza);
    }
  };

  useEffect(() => {
    const fetchPizzasPromise = async () =>
      apiFetch("pizza").then(async (res) => {
        if (!res.ok) throw new Error("Network response failed");
        const data = await res.json();
        setPizzas(data);
      });
    fetchPizzasPromise();
  }, [reload]);

  return (
    <section className="w-full flex-1">
      <ul>
        {pizzas &&
          pizzas.map((pizza: Pizza) => (
            <li
              key={pizza.uuid}
              className="flex justify-between border border-gray-300 p-2 rounded-md m-2"
            >
              <div className="flex gap-10 items-center min-w-[80%]">
                <span>{pizza.name}</span>
                <span className="font-bold">R$ {pizza.price.toFixed(2)}</span>
              </div>
              <div className="flex gap-2 items-center justify-end min-w-[20%]">
                <button
                  type="button"
                  onClick={() => handleEdit(pizza)}
                  className="bg-blue-500 text-white px-6 rounded-md flex-1"
                >
                  Editar
                </button>
                <button className="bg-red-500 text-white px-6 rounded-md flex-1">
                  Excluir
                </button>
              </div>
            </li>
          ))}
      </ul>
    </section>
  );
}
