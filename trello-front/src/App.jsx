import { useEffect, useState } from "react";
import { boardService } from "./services/boardService";
import { useNavigate } from "react-router-dom";
import { getColorById } from "./utils/colorUtils";
import ThemeSelector from "./components/ThemeSelector";

function App() {
  const navigate = useNavigate();
  const [boardName, setBoardName] = useState("");
  const [boards, setBoards] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchBoards();
  }, []);

  const fetchBoards = async () => {
    try {
      const data = await boardService.getAllBoards();
      setBoards(data);
    } catch (error) {
      console.error("Error loading boards: ", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await boardService.createBoard(boardName);
      setBoardName("");
      fetchBoards();
    } catch (error) {
      console.error(error);
      setError("Error creatting board.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
          <h1 className="text-4xl font-bold text-slate-800 text-center md:text-left">
            Mis Tableros 📋
          </h1>
          <ThemeSelector />
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm mb-8">
          <form onSubmit={handleSubmit} className="flex gap-4">
            <input
              type="text"
              value={boardName}
              onChange={(e) => setBoardName(e.target.value)}
              placeholder="Nombre del nuevo tablero..."
              className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary outline-none"
              required
            />
            <button
              type="submit"
              disabled={loading}
              className="bg-primary text-white px-6 py-2 rounded-md font-semibold hover:opacity-90 transition-opacity disabled:opacity-50"
            >
              {loading ? "Creando..." : "Crear"}
            </button>
          </form>
          {error && <p className="mt-2 text-red-500 text-sm">{error}</p>}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {boards.map((board) => {
            const borderColor = getColorById(board.id);

            return (
              <div
                key={board.id}
                onClick={() => navigate(`/board/${board.name}`)}
                className="bg-white h-32 p-4 rounded-lg shadow-md hover:shadow-xl transition-shadow cursor-pointer border-l-4 flex flex-col justify-between hover:bg-gray-50"
                style={{ borderLeftColor: borderColor }}
              >
                <h3 className="font-bold text-lg text-slate-700 truncate">
                  {board.name}
                </h3>
                <span className="text-xs text-gray-400">ID: {board.id}</span>
              </div>
            );
          })}
        </div>

        {boards.length === 0 && (
          <p className="text-center text-gray-500">
            No hay tableros aún. Crea el primero!
          </p>
        )}
      </div>
    </div>
  );
}

export default App;
