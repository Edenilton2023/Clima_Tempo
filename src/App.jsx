// App.jsx
import { useState, useEffect } from "react";
import Header from "./components/Header";
import ForecastCard from "./components/ForecastCard"; // ⬅️ Importamos o novo componente

const API_KEY = "d56e1985c7e534244203597b6a632595"; // ⬅️ Substitua pela sua chave da OpenWeather

function App() {
  const [cidade, setCidade] = useState("");
  const [climaAtual, setClimaAtual] = useState(null);
  const [previsao, setPrevisao] = useState([]); // ⬅️ Vai guardar os próximos dias

  const buscarClima = async (cidade) => {
    try {
      // 1️⃣ Busca o clima atual
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${cidade}&units=metric&lang=pt_br&appid=${API_KEY}`
      );
      if (!res.ok) throw new Error("Cidade não encontrada");
      const dados = await res.json();
      setClimaAtual({
        cidade: dados.name,
        temperatura: dados.main.temp,
        descricao: dados.weather[0].description,
        icone: dados.weather[0].icon,
      });
      setCidade(cidade);

      // 2️⃣ Busca a previsão de 5 dias (a cada 3h)
      const resForecast = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${cidade}&units=metric&lang=pt_br&appid=${API_KEY}`
      );
      const dadosForecast = await resForecast.json();

      // 3️⃣ Filtra 1 previsão por dia (ex: meio-dia)
      const previsoesFiltradas = dadosForecast.list.filter((item) =>
        item.dt_txt.includes("12:00:00")
      );

      const dadosFinais = previsoesFiltradas.map((item) => ({
        data: new Date(item.dt_txt).toLocaleDateString("pt-BR", {
          weekday: "short",
          day: "2-digit",
          month: "2-digit",
        }),
        temp: Math.round(item.main.temp),
        descricao: item.weather[0].description,
        icone: item.weather[0].icon,
      }));

      setPrevisao(dadosFinais);
    } catch (error) {
      console.error(error);
      setClimaAtual(null);
      setPrevisao([]);
    }
  };

  return (
    <div className="min-h-screen bg-blue-50 text-gray-800">
      <Header onBuscar={buscarClima} />
      <main className="p-4 max-w-3xl mx-auto">
        {climaAtual && (
          <div className="text-center mt-4 bg-white p-6 rounded shadow">
            <h2 className="text-2xl font-bold">{climaAtual.cidade}</h2>
            <img
              src={`https://openweathermap.org/img/wn/${climaAtual.icone}@2x.png`}
              alt="ícone do clima"
              className="mx-auto"
            />
            <p className="text-xl">{climaAtual.temperatura} °C</p>
            <p className="capitalize">{climaAtual.descricao}</p>
          </div>
        )}

        {previsao.length > 0 && <ForecastCard forecast={previsao} />}
      </main>
    </div>
  );
}

export default App;