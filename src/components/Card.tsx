import { Ruler, Wheat, WheatOff } from "lucide-react";

export interface Pizza {
  uuid: string;
  name: string;
  isGlutenFree: boolean;
  description: string;
  width: string;
  doughType: string;
  ingredients: string[];
  price: number;
  imageUrl: string | null;
}

export function Card({ pizza }: { pizza: Pizza }) {
  console.log(pizza.isGlutenFree);
  return (
    <li className="flex flex-col gap-4 border rounded-lg">
      <div className="relative">
        <img
          className="w-full h-48 object-cover rounded-t-lg"
          src={pizza.imageUrl || "https://placehold.co/600x400"}
          alt={pizza.name || "Imagem da Pizza"}
        />
        <span className="flex items-center gap-1 bg-stone-900/70 backdrop-blur rounded-lg text-sm absolute top-2 left-2 text-white px-3 py-1">
          {pizza.isGlutenFree ? (
            <WheatOff className="w-4 h-4" />
          ) : (
            <Wheat className="w-4 h-4" />
          )}{" "}
          {pizza.isGlutenFree ? "Sem Glúten" : "Contém Glúten"}
        </span>
        <span className="flex items-center gap-1 text-gray-900 rounded-lg text-sm absolute bottom-2 right-2 bg-white px-3 py-1">
          <Ruler className="w-4 h-4" />
          {pizza.width}
        </span>
      </div>
      <div className="flex flex-col gap-2 p-4">
        <h2 className="text-xl font-bold">{pizza.name || "Card Title"}</h2>
        <p className="text-gray-600">{pizza.description}</p>
        <div className="flex flexcol gap-2">
          <span className="text-gray-600 rounded-lg text-sm ">
            <strong>Massa:</strong> {pizza.doughType}
          </span>
        </div>

        <div>
          <h3 className="text-md font-bold text-gray-700 mb-1">
            Ingredientes:
          </h3>
          <ul className="flex flex-wrap gap-2 text-gray-600">
            {pizza.ingredients.map((ingredient, index) => (
              <li
                key={index}
                className="bg-gray-200 text-gray-800 py-1 px-2 rounded-lg text-sm"
              >
                {ingredient}
              </li>
            ))}
          </ul>
        </div>

        <p className="text-xl font-bold">R${pizza.price.toFixed(2)}</p>
        {/* <button className="bg-blue-500 text-white py-2 px-4 rounded">
        Action
      </button> */}
      </div>
    </li>
  );
}
