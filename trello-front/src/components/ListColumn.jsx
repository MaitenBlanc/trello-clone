import { useState } from "react";
import { boardService } from "../services/boardService";
import CardItem from "./CardItem";
import { Droppable } from "@hello-pangea/dnd";
import {getColorById } from "../utils/colorUtils";

function ListColumn({ list, boardId, onUpdate, onDeleteList }) {
  const [isAddingCard, setIsAddingCard] = useState(false);
  const [newCardTitle, setNewCardTitle] = useState("");
  const listBorderColor = getColorById(list.id);

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

  const handleEditeCard = async (cardId, newTitle) => {
    try {
      await boardService.updateCard(boardId, list.id, cardId, newTitle);
      onUpdate();
    } catch (error) {
      console.error("Error editing card: ", error);
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
    <div className="min-w-[280px] w-[280px] bg-gray-100 rounded-xl p-3 shadow-lg flex flex-col max-h-full border-t-4"
      style={{ borderTopColor: listBorderColor }}
    >
      <div className="flex justify-between items-center mb-3 px-1">
        <h3 className="font-bold text-slate-700 text-sm uppercase tracking-wide">
          {list.name}{" "}
          <span className="text-gray-400 text-xs font-normal">
            ({list.cards?.length || 0})
          </span>
        </h3>
        <button
          onClick={() => {
            if (
              window.confirm(
                "¿Seguro que quieres borrar esta lista y todas sus tareas?"
              )
            ) {
              onDeleteList(list.id);
            }
          }}
          className="text-gray-400 hover:text-red-600 hover:bg-red-50 rounded p-1 transition"
          title="Borrar lista"
        >
          🗑️
        </button>
      </div>

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
                  onEdit={(newTitle) => handleEditeCard(card.id, newTitle)}
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
