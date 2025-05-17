









function ClimaCard({ clima }) {
  if (!clima) return null;

  const { name, main, weather } = clima;
  const temperatura = Math.round(main.temp);
  const descricao = weather[0].description;
  const icone = weather[0].icon;
  const iconeUrl = `https://openweathermap.org/img/wn/${icone}@2x.png`;

  return (
    <div className="bg-white p-4 rounded shadow text-center mt-4">
      <h2 className="text-xl font-bold mb-2">{name}</h2>
      <img src={iconeUrl} alt={descricao} className="mx-auto" />
      <p className="text-lg capitalize">{descricao}</p>
      <p className="text-3xl font-bold">{temperatura}°C</p>
    </div>
  );
}

export default ClimaCard;
