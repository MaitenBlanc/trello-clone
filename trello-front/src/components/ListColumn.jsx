import { useState } from "react";
import { boardService } from "../services/boardService";
import CardItem from "./CardItem";
import { Droppable } from "@hello-pangea/dnd";

function ListColumn({ list, boardId, onUpdate }) {
  const [isAddingCard, setIsAddingCard] = useState(false);
  const [newCardTitle, setNewCardTitle] = useState("");

  const handleAddCard = async () => {
    if (!newCardTitle) return;
    try {
      await boardService.createCard(boardId, list.id, newCardTitle);
      setNewCardTitle("");
      setIsAddingCard(false);
      onUpdate();
    } catch (error) {
      console.error("Error creating card: ", error);
    }
  };

  const handleDeleteCard = async (cardId) => {
    try {
      await boardService.deleteCard(boardId, list.id, cardId);
      onUpdate();
    } catch (error) {
      console.error("Error deleting card: ", error);
    }
  };
  return (
    <div className="min-w-[280px] w-[280px] bg-gray-100 rounded-xl p-3 shadow-lg flex flex-col max-h-full border-t-4 border-blue-400">
      <h3 className="font-bold text-slate-700 mb-3 px-1 text-sm uppercase tracking-wide flex justify-between">
        {list.name}
        <span className="text-gray-400 text-xs font-normal">
          {list.cards?.length || 0}
        </span>
      </h3>

      <Droppable droppableId={list.id}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className={`flex-1 overflow-y-auto min-h-[50px] custom-scrollbar transition-colors rounded ${
              snapshot.isDraggingOver ? "bg-blue-200/50" : ""
            }`}
          >
            {list.cards &&
              list.cards.map((card, index) => (
                <CardItem
                  key={card.id}
                  card={card}
                  index={index}
                  onDelete={() => handleDeleteCard(card.id)}
                />
              ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>

      {isAddingCard ? (
        <div className="mt-2">
          <textarea
            autoFocus
            placeholder="Título de la tarjeta..."
            className="w-full p-2 rounded shadow-sm border-none focus:ring-2 focus:ring-blue-400 text-sm mb-2"
            rows="3"
            value={newCardTitle}
            onChange={(e) => setNewCardTitle(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleAddCard();
              }
            }}
          />
          <div className="flex items-center gap-2">
            <button
              onClick={handleAddCard}
              className="bg-blue-600 text-white px-3 py-1.5 rounded text-sm hover:bg-blue-700"
            >
              Añadir
            </button>
            <button
              onClick={() => setIsAddingCard(false)}
              className="text-gray-500 hover:text-gray-800"
            >
              ✕
            </button>
          </div>
        </div>
      ) : (
        <button
          onClick={() => setIsAddingCard(true)}
          className="text-gray-500 hover:bg-gray-200 p-2 rounded text-left text-sm mt-2 flex items-center gap-2 w-full transition-colors"
        >
          <span>+</span> Añadir tarjeta
        </button>
      )}
    </div>
  );
}

export default ListColumn;
