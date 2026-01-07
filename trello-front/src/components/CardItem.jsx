import { Draggable } from "@hello-pangea/dnd";

function CardItem({ card, index, onDelete }) {
  return (
    <Draggable draggableId={card.id} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={`group relative bg-white p-2 rounded shadow-sm mb-2 text-sm text-slate-700 border border-gray-200
            ${snapshot.isDragging ? 'shadow-xl ring-2 ring-blue-400 rotate-2' : 'hover:bg-gray-50'}
          `}
          style={provided.draggableProps.style}
        >
          {card.title}
          
          <button 
            onClick={(e) => {
              e.stopPropagation();
              onDelete();
            }}
            className="absolute top-1 right-1 hidden group-hover:block text-gray-400 hover:text-red-500 font-bold px-1"
          >
            ×
          </button>
        </div>
      )}
    </Draggable>
  )
}

export default CardItem