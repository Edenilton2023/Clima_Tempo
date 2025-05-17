import { useState } from "react" // Importa o useState do React para gerenciar o estado da cidade digitada



function Header({ onBuscar }) {
  // Componente Header que recebe uma função onBuscar como prop (vai ser chamada quando o usuário buscar o clima)

  const [cidade, setCidade] = useState("") 
  // Estado que armazena o valor digitado no input
    const handleSubmit = (e) => {
    e.preventDefault() // Impede o recarregamento da página ao enviar o form
    if (cidade.trim()) {
      onBuscar(cidade) // Chama a função passada por prop com o nome da cidade
      setCidade("") // Limpa o input depois de enviar
    }
  };

  return (
    <header className="bg-blue-600 p-4 text-white text-center">
      {/* Cabeçalho com fundo azul, texto branco e centralizado */}

      <h1 className="text-3xl 
       font-bold mb-2">Clima agora</h1>
      {/* Título da aplicação */}

      <form onSubmit={handleSubmit} className="flex justify-center gap-2">
        {/* Formulário com submit, alinhado no centro e com espaçamento entre os itens */}

       <input
          type="text"
          value={cidade}
          onChange={(e) => setCidade(e.target.value)}
          placeholder="Digite o nome da cidade"
          className="px-4 py-2 bg-blue-00 rounded border border-gray-300 text-black"
        />
        {/* Input controlado, que pega o valor da cidade e atualiza o estado */}
        <button type="submit" className="px-4 py-2 bg-blue-600 rounded text-white hover:bg-gray-200">
          
          Buscar
        </button>
      </form>
    </header>
  )
}
export default Header // Exporta o componente para ser usado em App.jsx


