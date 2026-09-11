import { useNavigate } from "react-router";
import { API_URL } from "../shared/apiURL";
import { useState } from "react";

export function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!username || !password) {
      setError("Por favor, preencha todos os campos");
      return;
    }
    setError("");
    try {
      const response = await fetch(`${API_URL}user/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        throw new Error("Usuário ou senha incorretos");
      }

      const data = await response.json();
      console.log(data);
      alert(data.message);
      navigate("/admin");
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Erro ao fazer login");
    }
  };

  return (
    <section className="max-w-7xl m-auto mt-8 w-[90%] min-h-[60vh] flex flex-col justify-center">
      <div>
        <h2 className="text-3xl font-bold text-center m-8">Faça seu Login</h2>
        {error && (
          <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm mb-4 w-sm m-auto text-center">
            {error}
          </div>
        )}
        <form
          action="login"
          className="flex flex-col gap-4 w-sm m-auto"
          onSubmit={handleSubmit}
        >
          <div className="flex flex-col gap-2">
            <label htmlFor="username">Nome de Usuário</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="password">Senha</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit">Entrar</button>
        </form>
      </div>
    </section>
  );
}
