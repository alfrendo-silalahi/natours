package com.natours.service.modules.tour;

import com.natours.service.common.dto.BaseResponse;
import com.natours.service.modules.tour.dto.GetTourResponse;
import com.natours.service.modules.tour.dto.GetToursResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.Instant;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/v1/tours")
public class TourController {
    private final TourService tourService;

    @GetMapping
    public ResponseEntity<BaseResponse<GetToursResponse>> getTours(
            @RequestParam(required = false, defaultValue = "1") int page,
            @RequestParam(required = false, defaultValue = "10") int size
    ) {
        GetToursResponse getToursResponse = tourService.getTours(page, size);
        return ResponseEntity.ok(
                BaseResponse.<GetToursResponse>builder()
                        .code(HttpStatus.OK.value())
                        .message("success")
                        .data(getToursResponse)
                        .timestamp(Instant.now())
                        .build()
        );
    }

    @GetMapping("/{id}")
    public ResponseEntity<BaseResponse<GetTourResponse>> getTour(
            @PathVariable String id
    ) {
        GetTourResponse getTourResponse = tourService.getTour(id);
        return ResponseEntity.ok(
                BaseResponse.<GetTourResponse>builder()
                        .code(HttpStatus.OK.value())
                        .message("success")
                        .data(getTourResponse)
                        .timestamp(Instant.now())
                        .build()
        );
    }
}
