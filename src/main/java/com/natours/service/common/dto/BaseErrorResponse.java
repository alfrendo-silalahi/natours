package com.natours.service.common.dto;

import java.time.Instant;

import lombok.*;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class BaseErrorResponse {
    private int code;
    private String error;
    private Instant timestamp;
}
