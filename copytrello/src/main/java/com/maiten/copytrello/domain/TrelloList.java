package com.maiten.copytrello.domain;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

public class TrelloList {
    private String id;
    private String name;
    private List<Card> cards = new ArrayList<>();

    public TrelloList() {
        this.id = UUID.randomUUID().toString();
    }

    public TrelloList(String name) {
        this();
        this.name = name;
    }

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

    public List<Card> getCards() {
        if (cards == null) cards = new ArrayList<>();
        return cards;
    }

    public void setCards(List<Card> cards) {
        this.cards = cards;
    }

    public void addCard(Card card) {
        if (this.cards == null) this.cards = new ArrayList<>();
        this.cards.add(card);
    }

}
