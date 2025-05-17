// ForecastCard.jsx
import React from "react";

// Recebe a lista de previsões dos próximos dias via props
function ForecastCard({ forecast }) {
  return (
    <div className="bg-white p-4 rounded shadow-md mt-4">
      <h2 className="text-xl font-semibold mb-2 text-center">Próximos dias</h2>
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {forecast.map((dia, index) => (
          <div
            key={index}
            className="flex flex-col items-center bg-blue-100 p-2 rounded"
          >
            <p className="font-medium">{dia.data}</p>
            <img
              src={`https://openweathermap.org/img/wn/${dia.icone}@2x.png`}
              alt="icone"
            />
            <p>{dia.temp} °C</p>
            <p className="text-sm capitalize">{dia.descricao}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ForecastCard;