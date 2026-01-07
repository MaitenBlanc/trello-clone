package com.maiten.copytrello.domain;

import java.util.UUID;

public class Card {
    private String id;
    private String title;

    public Card() {
        this.id = UUID.randomUUID().toString();
    }

    public Card(String title) {
        this();
        this.title = title;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

}
