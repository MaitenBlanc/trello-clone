package com.maiten.copytrello.repository;

import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.maiten.copytrello.model.Board;

@Repository
public interface BoardRepository extends MongoRepository<Board, String> {
    Optional<Board> findByName(String name);

}