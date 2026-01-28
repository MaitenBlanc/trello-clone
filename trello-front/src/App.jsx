import { useEffect, useState } from "react";
import { boardService } from "./services/boardService";
import { useNavigate } from "react-router-dom";
import { getColorById } from "./utils/colorUtils";
import ThemeSelector from "./components/ThemeSelector";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const navigate = useNavigate();
  const [boardName, setBoardName] = useState("");
  const [boards, setBoards] = useState([]);
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
      toast.error("Error al cargar los tableros.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await boardService.createBoard(boardName);
      setBoardName("");
      fetchBoards();
      toast.success("Tablero creado correctamente.");
    } catch (error) {
      console.error(error);
      toast.error("No se pudo crear el tablero. Inténtalo de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteBoard = async (e, boardId) => {
    e.stopPropagation();

    if (!window.confirm("¿Estás seguro de que deseas eliminar este tablero?")) {
      return;
    }

    try {
      await boardService.deleteBoard(boardId);
      setBoards(boards.filter((b) => b.id !== boardId));
      toast.success("Tablero eliminado correctamente.");
    } catch (error) {
      console.error(error);
      toast.error("No se pudo eliminar el tablero. Inténtalo de nuevo.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <ToastContainer position="bottom-right" theme="colored" />

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
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {boards.map((board) => {
            const borderColor = getColorById(board.id);

            return (
              <div
                key={board.id}
                onClick={() => navigate(`/board/${board.name}`)}
                className="group relative bg-white h-32 p-4 rounded-lg shadow-md hover:shadow-xl transition-all cursor-pointer border-l-4 flex flex-col justify-between hover:bg-gray-50"
                style={{ borderLeftColor: borderColor }}
              >

              <button
                  onClick={(e) => handleDeleteBoard(e, board.id)}
                  className="absolute top-2 right-2 hidden group-hover:block text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full p-1 transition-colors z-10"
                  title="Eliminar tablero"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                  </svg>
                </button>

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
