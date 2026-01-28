import api from "./api";

export const boardService = {
  getAllBoards: async () => {
    const response = await api.get("/boards");
    return response.data;
  },

  createBoard: async (name) => {
    const response = await api.post("/boards", { name });
    return response.data;
  },

  getBoardByName: async (name) => {
    const response = await api.get(`/boards/${encodeURIComponent(name)}`);
    return response.data;
  },

  deleteBoard: async (id) => {
    const response = await api.delete(`/boards/${id}`);
    return response.data;
  },

  createList: async (boardId, listName) => {
    const response = await api.post(`/boards/${boardId}/lists`, {
      name: listName,
    });
    return response.data;
  },

  deleteList: async (boardId, listId) => {
    const response = await api.delete(`/boards/${boardId}/lists/${listId}`);
    return response.data;
  },

  createCard: async (boardId, listId, cardTitle) => {
    const response = await api.post(
      `/boards/${boardId}/lists/${listId}/cards`,
      { title: cardTitle }
    );
    return response.data;
  },

  deleteCard: async (boardId, listId, cardId) => {
    const response = await api.delete(
      `/boards/${boardId}/lists/${listId}/cards/${cardId}`
    );
    return response.data;
  },

  moveCard: async (boardId, sourceListId, destListId, cardId, newIndex) => {
    const response = await api.put(`/boards/${boardId}/cards/reorder`, {
      sourceListId,
      destListId,
      cardId,
      newIndex,
    });
    return response.data;
  },

  updateCard: async (boardId, listId, cardId, newTitle) => {
    const response = await api.put(
      `/boards/${boardId}/lists/${listId}/cards/${cardId}`,
      { title: newTitle }
    );
    return response.data;
  },
};
