package com.maiten.copytrello.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.maiten.copytrello.domain.Card;
import com.maiten.copytrello.domain.TrelloList;
import com.maiten.copytrello.dto.BoardRequest;
import com.maiten.copytrello.model.Board;
import com.maiten.copytrello.service.BoardService;

@RestController
@RequestMapping("/api/boards")
public class BoardController {

    @Autowired
    private BoardService boardService;

    @PostMapping
    public ResponseEntity<Board> createBoard(@RequestBody BoardRequest request) {
        Board createdBoard = boardService.createBoard(request);
        return new ResponseEntity<>(createdBoard, HttpStatus.CREATED);
    }

    @GetMapping
    public List<Board> getAllBoards() {
        return boardService.getAllBoards();
    }

    @GetMapping("/{name}")
    public Board getBoardByName(@PathVariable String name) {
        return boardService.getBoardByName(name);
    }

    @PostMapping("/{id}/lists")
    public Board addListToBoard(@PathVariable String id, @RequestBody TrelloList list) {
        Board board = boardService.getBoardById(id);

        if (board != null) {
            board.addList(new TrelloList(list.getName()));
            return boardService.save(board);
        }
        return null;
    }

    @PostMapping("/{boardId}/lists/{listId}/cards")
    public Board addCard(@PathVariable String boardId, @PathVariable String listId, @RequestBody Card card) {
        Board board = boardService.getBoardById(boardId);

        if (board != null) {
            for (TrelloList list : board.getLists()) {
                if (list.getId().equals(listId)) {
                    list.addCard(new Card(card.getTitle()));
                    return boardService.save(board);
                }
            }
        }
        return null;
    }

    @DeleteMapping("/{boardId}/lists/{listId}/cards/{cardId}")
    public Board deleteCard(@PathVariable String boardId, @PathVariable String listId, @PathVariable String cardId) {
        Board board = boardService.getBoardById(boardId);

        if (board != null) {
            board.removeCard(listId, cardId);
            return boardService.save(board);
        }
        return null;
    }

    @PutMapping("/{boardId}/cards/reorder")
    public Board reorderCards(@PathVariable String boardId, @RequestBody MoveCardRequest request) {
        Board board = boardService.getBoardById(boardId);

        if (board != null) {
            board.moveCard(request.sourceListId, request.destListId, request.cardId, request.newIndex);
            return boardService.save(board);
        }
        return null;
    }

    @PutMapping("/{boardId}/lists/{listId}/cards/{cardId}")
    public Board updateCard(@PathVariable String boardId, @PathVariable String listId, @PathVariable String cardId, @RequestBody Card cardData) {
        Board board = boardService.getBoardById(boardId);

        if (board != null) {
            board.updateCard(listId, cardId, cardData.getTitle());
            return boardService.save(board);
        }
        return null;
    }

    @DeleteMapping("/{boardId}/lists/{listId}")
    public Board deleteList(@PathVariable String boardId, @PathVariable String listId) {
        Board board = boardService.getBoardById(boardId);

        if (board != null) {
            board.removeList(listId);
            return boardService.save(board);
        }
        return null;
    }

    @DeleteMapping("/{boardId}")
    public void deleteBoard(@PathVariable String boardId) {
        boardService.deleteBoard(boardId);
    }

    public static class MoveCardRequest {
        public String sourceListId;
        public String destListId;
        public String cardId;
        public int newIndex;
    }

}