import { BrowserRouter, Navigate, Route, Routes } from "react-router";
import { Header } from "./components/Header";
import { Catalog } from "./pages/catalog";
import { Login } from "./pages/login";
import { Admin } from "./pages/admin";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <main className="pb-8">
        <Routes>
          <Route path="/" element={<Navigate to="/catalog" replace />} />
          <Route path="/catalog" element={<Catalog />} />
          <Route path="/login" element={<Login />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;
