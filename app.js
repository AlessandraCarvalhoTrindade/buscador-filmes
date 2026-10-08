const { useState } = React;

function App() {
  const [busca, setBusca] = useState("");
  const [filmes, setFilmes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [mensagem, setMensagem] = useState("Digite o nome de um filme e clique em Buscar");

  async function buscarFilmes(e) {
    e.preventDefault();
    if (busca.trim() === "") return;

    setLoading(true);
    setMensagem("");
    setFilmes([]);

    try {
      // API gratuita OMDB (chave de demonstração)
      const resposta = await fetch(`https://www.omdbapi.com/?s=${busca}&apikey=trilogy`);
      const dados = await resposta.json();

      if (dados.Response === "True") {
        setFilmes(dados.Search);
      } else {
        setMensagem("Nenhum filme encontrado. Tente outro nome.");
      }
    } catch (erro) {
      setMensagem("Erro ao buscar filmes. Tente novamente.");
    }

    setLoading(false);
  }

  return (
    <div className="container">
      <h1>Buscador de Filmes</h1>
      <p className="subtitulo">Encontre informações de filmes e séries</p>

      <form className="busca" onSubmit={buscarFilmes}>
        <input
          type="text"
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
          placeholder="Ex: Matrix, Avatar, Titanic..."
        />
        <button type="submit">Buscar</button>
      </form>

      {loading && <p className="loading">Carregando...</p>}

      {!loading && filmes.length === 0 && (
        <p className="mensagem">{mensagem}</p>
      )}

      <div className="grid">
        {filmes.map((filme) => (
          <div className="card" key={filme.imdbID}>
            <img
              src={filme.Poster !== "N/A" ? filme.Poster : "https://via.placeholder.com/300x450?text=Sem+Imagem"}
              alt={filme.Title}
            />
            <div className="info">
              <h3>{filme.Title}</h3>
              <p>{filme.Year} • {filme.Type}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
