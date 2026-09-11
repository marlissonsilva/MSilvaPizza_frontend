import { Plus, X } from "lucide-react";
import { AddPizza } from "../components/AddPizza";
import { List } from "../components/List";
import { useState } from "react";
import { Sidebar } from "../components/Sidebar";
import type { Pizza } from "../components/Card";

export function Admin() {
  const [add, setAdd] = useState(false);
  const [formMode, setFormMode] = useState<"add" | "edit">("add");
  const [selectedPizza, setSelectedPizza] = useState<Pizza | undefined>(undefined);
  const [reloadList, setReloadList] = useState(false);

  const openAddForm = () => {
    setFormMode("add");
    setSelectedPizza(undefined);
    setAdd(true);
  };

  const closeForm = () => {
    setAdd(false);
    setSelectedPizza(undefined);
    setFormMode("add");
  };

  const handleEditPizza = (pizza: Pizza) => {
    setFormMode("edit");
    setSelectedPizza(pizza);
    setAdd(true);
  };

  const handleSaved = () => {
    closeForm();
    setReloadList((prev) => !prev);
  };

  return (
    <section className="max-w-7xl m-auto w-[90%] flex flex-col justify-center">
      <div className="flex justify-between items-center mt-6 mb-6 p-2 gap-3">
        <h2 className="text-3xl font-bold text-center">Área Administrativa</h2>

        <div className="flex items-center gap-2">
          <button
            className={`${add ? "bg-red-500" : "bg-green-600"} text-white px-6 rounded-md flex items-center gap-2 h-11`}
            onClick={() => (add ? closeForm() : openAddForm())}
            type="button"
          >
            {add ? <X /> : <Plus />}
            {add ? "Cancelar" : "Adicionar Pizza"}
          </button>
        </div>
      </div>
      <div className="flex flex-col md:flex-row gap-4">
        <List onEditPizza={handleEditPizza} reload={reloadList} />

        {add && (
          <Sidebar
            isOpen={add}
            onClose={closeForm}
            title={formMode === "edit" ? "Editar Pizza" : "Adicionar Pizza"}
          >
            <AddPizza pizza={selectedPizza} onSaved={handleSaved} />
          </Sidebar>
        )}
      </div>
    </section>
  );
}
