package com.maiten.copytrello.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class BoardRequest {
    @NotBlank(message = "El nombre del tablero es obligatorio")
    private String name;
}
