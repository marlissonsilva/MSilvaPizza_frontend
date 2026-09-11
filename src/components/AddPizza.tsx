import { API_URL } from "../shared/apiURL";
import { useEffect } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";

type Inputs = {
  uuid?: string;
  name: string;
  isGlutenFree: boolean;
  description: string;
  width: string;
  doughType: string;
  ingredients: string;
  price: number;
  // imageUrl?: string | null;
};

type Pizza = Omit<Inputs, "ingredients"> & {
  id?: number | string;
  ingredients: string | string[];
};

type AddPizzaProps = {
  pizza?: Pizza;
  onSaved?: () => void;
};

export function AddPizza({ pizza, onSaved }: AddPizzaProps) {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = useForm<Inputs>();

  useEffect(() => {
    if (pizza) {
      reset({
        uuid: pizza.uuid || (pizza.id as string),
        name: pizza.name,
        isGlutenFree: pizza.isGlutenFree,
        description: pizza.description,
        width: pizza.width,
        doughType: pizza.doughType,
        ingredients: Array.isArray(pizza.ingredients)
          ? pizza.ingredients.join(", ")
          : pizza.ingredients,
        price: pizza.price,
      });
    } else {
      reset({
        uuid: "",
        name: "",
        isGlutenFree: false,
        description: "",
        width: "",
        doughType: "",
        ingredients: "",
        price: 0,
      });
    }
  }, [pizza, reset]);

  const onSubmit: SubmitHandler<Inputs> = async (data: Inputs) => {
    const pizzaData = {
      ...data,
      isGlutenFree: data.isGlutenFree === true || String(data.isGlutenFree) === "true",
      ingredients: data.ingredients
        .split(",")
        .map((ingredient) => ingredient.trim())
        .filter(Boolean),
    };
    
    delete pizzaData.uuid;
    try {
      const response = await fetch(
        pizza ? `${API_URL}pizza/${pizza.uuid || pizza.id}` : `${API_URL}pizza`,
        {
          method: pizza ? "PATCH" : "POST",
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            Accept: "application/json",
          },
          credentials: "include",
          body: JSON.stringify(pizzaData),
        },
      );

      console.log(response);
      reset();
      onSaved?.();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <h2>{pizza ? "Editar Pizza" : "Adicionar nova Pizza"}</h2>
      <form
        action=""
        className="flex flex-col gap-2"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="flex flex-col">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            {...register("name", { required: "Informe o nome da pizza." })}
          />
          {errors.name && (
            <span className="text-red-500">{errors.name.message}</span>
          )}
        </div>
        <div className="flex flex-col">
          <label htmlFor="description">Descrição</label>
          <input
            type="text"
            id="description"
            {...register("description", {
              required: "Informe a descrição da pizza.",
            })}
          />
          {errors.description && (
            <span className="text-red-500">{errors.description.message}</span>
          )}
        </div>
        <div className="flex flex-col">
          <label htmlFor="gluten">Tem glúten</label>
          <select
            id="gluten"
            {...register("isGlutenFree", {
              required: "Informe se a pizza contém glúten.",
            })}
            value={watch("isGlutenFree") ? "true" : "false"}
            onChange={(e) =>
              setValue("isGlutenFree", e.target.value === "true")
            }
          >
            <option value="" disabled>
              Selecione
            </option>
            <option value="true">Sim</option>
            <option value="false">Não</option>
          </select>
          {errors.isGlutenFree && (
            <span className="text-red-500">{errors.isGlutenFree.message}</span>
          )}
        </div>
        <div className="flex w-full gap-4">
          <div className="flex min-w-0 flex-1 flex-col">
            <label htmlFor="width">Tamanho</label>
            <input
              type="text"
              id="width"
              className="box-border w-full min-w-0"
              {...register("width", { required: "Informe o tamanho." })}
            />
            {errors.width && (
              <span className="text-red-500">{errors.width.message}</span>
            )}
          </div>
          <div className="flex min-w-0 flex-1 flex-col">
            <label htmlFor="price">Preço</label>
            <input
              type="text"
              id="price"
              className="box-border w-full min-w-0"
              {...register("price", {
                required: "Informe o preço.",
                valueAsNumber: true,
                validate: (value) =>
                  !Number.isNaN(value) || "Informe um preço válido.",
              })}
            />
            {errors.price && (
              <span className="text-red-500">{errors.price.message}</span>
            )}
          </div>
        </div>
        <div className="flex flex-col">
          <label htmlFor="doughType">Tipo de Massa</label>
          <input
            type="text"
            id="doughType"
            {...register("doughType", {
              required: "Informe o tipo de massa.",
            })}
          />
          {errors.doughType && (
            <span className="text-red-500">{errors.doughType.message}</span>
          )}
        </div>
        <div className="flex flex-col">
          <label htmlFor="ingredients">Ingredientes</label>
          <input
            type="text"
            id="ingredients"
            placeholder="Ex.: queijo parmesão, tomate"
            {...register("ingredients", {
              required: "Informe os ingredientes, separados por vírgula.",
            })}
          />
          {errors.ingredients && (
            <span className="text-red-500">{errors.ingredients.message}</span>
          )}
        </div>
        {/* <div className="flex flex-col">
          <label htmlFor="imageUrl">Imagem</label>
          <input
            type="file"
            id="imageUrl"
            {...register("imageUrl", { required: false })}
          />
        </div> */}
        <button type="submit">{pizza ? "Atualizar" : "Salvar"}</button>
      </form>
    </div>
  );
}
