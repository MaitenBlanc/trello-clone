import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { boardService } from "../services/boardService";
import ListColumn from "../components/ListColumn";
import CreateListForm from "../components/CreateListForm";
import { DragDropContext } from "@hello-pangea/dnd";

function BoardPage() {
  const { id: boardName } = useParams();
  const [board, setBoard] = useState(null);

  // Carga inicial
  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const data = await boardService.getBoardByName(boardName);
        setBoard(data);
      } catch (error) {
        console.error("Initial error loading dashboard: ", error);
      }
    };

    fetchInitialData();
  }, [boardName]);

  const handleUpdate = async () => {
    try {
      const data = await boardService.getBoardByName(boardName);
      setBoard(data);
    } catch (error) {
      console.error("Error updating dashboard: ", error);
    }
  };

  const handleDeleteList = async (listId) => {
    try {
      await boardService.deleteList(board.id, listId)
      handleUpdate()
    } catch (error) {
      console.error("Error borrando lista:", error)
    }
  };

  const onDragEnd = async (result) => {
    const { destination, source, draggableId } = result;
    if (!destination) return;

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    )
      return;

    const newBoard = { ...board };

    const sourceList = newBoard.lists.find((l) => l.id === source.droppableId);
    const destList = newBoard.lists.find((l) => l.id === destination.droppableId);

    const cardMoved = sourceList.cards[source.index];
    sourceList.cards.splice(source.index, 1);
    destList.cards.splice(destination.index, 0, cardMoved);

    setBoard(newBoard);

    try {
      await boardService.moveCard(
        board.id, 
        source.droppableId,
        destination.droppableId,
        draggableId,
        destination.index
      );
    } catch (error) {
      console.error("Error moving card: ", error);
      handleUpdate()
    }
  };

  if (!board)
    return (
      <div className="min-h-screen bg-blue-500 flex items-center justify-center text-white text-xl font-bold">
        Cargando tablero...
      </div>
    );

  return (
    <div className="min-h-screen bg-blue-600 flex flex-col font-sans">
      <div className="bg-black/20 p-3 text-white flex justify-between items-center backdrop-blur-md shadow-sm z-10">
        <div className="flex items-center gap-4">
          <h1 className="text-xl font-bold tracking-tight">{board.name}</h1>
          <span className="bg-white/20 px-2 py-0.5 rounded text-xs font-semibold">
            Gratis
          </span>
        </div>
        <Link
          to="/"
          className="bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded transition text-sm font-medium flex items-center gap-2"
        >
          Ir a Dashboard
        </Link>
      </div>

      <DragDropContext onDragEnd={onDragEnd}>
        <div className="flex-1 overflow-x-auto p-4 flex items-start gap-4 scroll-smooth">
          {board.lists &&
            board.lists.map((list) => (
              <ListColumn
                key={list.id}
                list={list}
                boardId={board.id}
                onUpdate={handleUpdate}
                onDeleteList={handleDeleteList}
              />
            ))}

          <CreateListForm boardId={board.id} onListCreated={handleUpdate} />
        </div>
      </DragDropContext>
    </div>
  );
}

export default BoardPage;
