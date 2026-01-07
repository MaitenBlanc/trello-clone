import { useState } from "react";
import { boardService } from "../services/boardService";

function CreateListForm({ boardId, onListCreated }) {
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title) return;
    setLoading(true);
    try {
      await boardService.createList(boardId, title);
      setTitle("");
      onListCreated();
    } catch (error) {
      console.error("Error creating list: ", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-w-[280px]">
      <form
        onSubmit={handleSubmit}
        className={`bg-white/20 p-3 rounded-xl transition ${
          title ? "bg-white" : "hover:bg-white/30"
        }`}
      >
        <input
          type="text"
          placeholder="+ Añadir otra lista"
          className={`w-full px-3 py-2 rounded border-none focus:ring-2 focus:ring-blue-400 outline-none transition
            ${
              title
                ? "text-slate-800"
                : "bg-transparent text-white placeholder-white"
            }`}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          disabled={loading}
        />

        {title && (
          <div className="mt-2 flex items-center gap-2">
            <button
              type="submit"
              disabled={loading}
              className="bg-primary text-white px-4 py-1.5 rounded text-sm font-semibold hover:bg-blue-700 disabled:bg-blue-300"
            >
              {loading ? "Guardando..." : "Añadir lista"}
            </button>
            <button
              type="button"
              onClick={() => setTitle("")}
              className="text-gray-500 hover:text-gray-700 px-2"
            >
              ✕
            </button>
          </div>
        )}
      </form>
    </div>
  );
}

export default CreateListForm;
