package com.maiten.copytrello.model;

import java.util.ArrayList;
import java.util.List;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import com.maiten.copytrello.domain.Card;
import com.maiten.copytrello.domain.TrelloList;

@Document(collection = "boards")
public class Board {
    @Id
    private String id;
    private String name;
    private List<TrelloList> lists = new ArrayList<>();

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public List<TrelloList> getLists() {
        return lists;
    }

    public void setLists(List<TrelloList> lists) {
        this.lists = lists;
    }

    public void addList(TrelloList list) {
        this.lists.add(list);
    }

    public void removeCard(String listId, String cardId) {
        if (this.lists != null) {
            for (TrelloList list : this.lists) {
                if (list.getId().equals(listId)) {
                    list.getCards().removeIf(c -> c.getId().equals(cardId));
                    break;
                }
            }
        }
    }

    public void moveCard(String sourceListId, String destListId, String cardId, int newIndex) {
        TrelloList sourceList = null;
        TrelloList destList = null;

        for (TrelloList list : this.lists) {
            if (list.getId().equals(sourceListId))
                sourceList = list;
            if (list.getId().equals(destListId))
                destList = list;
        }

        if (sourceList != null && destList != null) {
            Card cardToMove = null;

            for (int i = 0; i < sourceList.getCards().size(); i++) {
                if (sourceList.getCards().get(i).getId().equals(cardId)) {
                    cardToMove = sourceList.getCards().remove(i);
                    break;
                }
            }

            if (cardToMove != null) {
                if (newIndex >= destList.getCards().size()) {
                    destList.getCards().add(cardToMove);
                } else {
                    destList.getCards().add(newIndex, cardToMove);
                }
            }
        }
    }
}