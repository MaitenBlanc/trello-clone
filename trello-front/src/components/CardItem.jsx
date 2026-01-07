import { Draggable } from "@hello-pangea/dnd";
import { useState } from "react";

function CardItem({ card, index, onDelete, onEdit }) {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(card.title);

  const handleSave = () => {
    if (title.trim() !== card.title) {
      onEdit(title);
    }
    setIsEditing(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSave();
    }
    if (e.key === "Escape") {
      setTitle(card.title);
      setIsEditing(false);
    }
  };

  return (
    <Draggable draggableId={card.id} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={`group relative bg-white p-2 rounded shadow-sm mb-2 text-sm text-slate-700 border border-gray-200
            ${
              snapshot.isDragging
                ? "shadow-xl ring-2 ring-blue-400 rotate-2"
                : "hover:bg-gray-50"
            }
          `}
          style={provided.draggableProps.style}
        >
          {isEditing ? (
            <input
              autoFocus
              className="w-full border border-blue-400 rounded px-1 outline-none"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              onBlur={handleSave}
              onKeyDown={handleKeyDown}
            />
          ) : (
            <>
              <span onClick={() => setIsEditing(true)}>{card.title}</span>

              <div className="absolute top-1 right-1 hidden group-hover:flex gap-1 bg-white/80 rounded">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsEditing(true);
                  }}
                  className="text-gray-400 hover:text-blue-500 font-bold px-1"
                  title="Editar"
                >
                  ✎
                </button>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onDelete();
                  }}
                  className="text-gray-400 hover:text-red-500 font-bold px-1"
                  title="Borrar"
                >
                  ×
                </button>
              </div>
            </>
          )}
        </div>
      )}
    </Draggable>
  );
}

export default CardItem;
