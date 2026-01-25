package com.natours.service.common.exception.handler;

import com.natours.service.common.dto.BaseErrorResponse;
import com.natours.service.common.exception.ResourceNotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.time.Instant;

@RestControllerAdvice
public class GlobalExceptionHandler {
    @ExceptionHandler(ResourceNotFoundException.class)
    public ResponseEntity<BaseErrorResponse> handleResourceNotFoundException(ResourceNotFoundException e) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND)
                .body(BaseErrorResponse.builder()
                        .code(HttpStatus.NOT_FOUND.value())
                        .error(e.getMessage())
                        .timestamp(Instant.now())
                        .build()
                );
    }
}
