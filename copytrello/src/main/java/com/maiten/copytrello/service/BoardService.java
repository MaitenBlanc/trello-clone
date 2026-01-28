package com.maiten.copytrello.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.maiten.copytrello.dto.BoardRequest;
import com.maiten.copytrello.model.Board;
import com.maiten.copytrello.repository.BoardRepository;

@Service
public class BoardService {

    @Autowired
    private BoardRepository boardRepository;

    public Board createBoard(BoardRequest request) {

        // Validation
        if (boardRepository.existsByName(request.getName())) {
            throw new IllegalArgumentException("Board with name '" + request.getName() + "' already exists.");
        }

        Board board = new Board();
        board.setName(request.getName());
        return boardRepository.save(board);
    }

    public List<Board> getAllBoards() {
        return boardRepository.findAll();
    }

    public Board getBoardByName(String name) {
        return boardRepository.findByName(name).orElse(null);
    }

    public Board getBoardById(String id) {
        return boardRepository.findById(id).orElse(null);
    }

    public Board save(Board board) {
        return boardRepository.save(board);
    }

    public void deleteBoard(String id) {
        boardRepository.deleteById(id);
    }


}