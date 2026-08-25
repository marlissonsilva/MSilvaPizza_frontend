import { useState } from "react";
import { API_URL } from "../../shared/apiURL";

export function AddPizza() {
  const [name, setName] = useState("");
  const [isGluten, setIsGluten] = useState("");
  const [reset, setReset] = useState(0);
  const handleSubmit = async (event: React.SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (name === "") {
      alert("Preenchimento obrigatório");
      return;
    }
    console.log(name, isGluten);
    const newPizza = {
      name: name,
      isGlutenFree: isGluten === "true" ? true : false,
    };

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          Accept: "application/json",
        },
        mode: "cors",
        body: JSON.stringify(newPizza),
      });

      console.log(response);

      setName("");
      setIsGluten("");
      setReset((prev) => prev + 1);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="p-4 w-96">
      <h2>Adicionar nova Pizza</h2>
      <form action="" className="flex flex-col gap-2" onSubmit={handleSubmit}>
        <div className="flex flex-col">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="gluten">Tem glúten</label>
          <select
            id="gluten"
            value={isGluten}
            onChange={(e) => setIsGluten(e.target.value)}
            key={reset}
          >
            <option value="" disabled>
              Selecione
            </option>
            <option value="true">Sim</option>
            <option value="false">Não</option>
          </select>
        </div>
        <button type="submit">Salvar</button>
      </form>
    </div>
  );
}
