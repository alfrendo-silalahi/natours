package com.natours.service.common.dto;

import lombok.*;

import java.time.Instant;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class BaseResponse<T> {
    private int code;
    private String message;
    private T data;
    private Instant timestamp;
}
