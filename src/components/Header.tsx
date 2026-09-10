import { NavLink } from "react-router";

export function Header() {
  return (
    <header className="flex bg-slate-800 text-white p-4">
      <div className="flex items-center justify-between gap-6 max-w-7xl m-auto w-full">
        <h1 className="text-3xl">MSilva Pizza</h1>
        <div className="flex gap-6">
          <NavLink
            to="/catalog"
            className={({ isActive }) =>
              `font-bold py-2 px-6 rounded border border-gray-400 ${
                isActive ? "bg-gray-500" : "text-white"
              }`
            }
          >
            Catálogo
          </NavLink>
          <NavLink
            to="/login"
            className={({ isActive }) =>
              `font-bold py-2 px-6 rounded border border-gray-400 ${
                isActive ? "bg-gray-500" : "text-white"
              }`
            }
          >
            Gerenciar
          </NavLink>
        </div>
      </div>
    </header>
  );
}
