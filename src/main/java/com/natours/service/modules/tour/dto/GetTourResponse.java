package com.natours.service.modules.tour.dto;

import lombok.*;

import java.math.BigDecimal;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class GetTourResponse {
    private Tour tour;

    @Setter
    @Getter
    @AllArgsConstructor
    @NoArgsConstructor
    @Builder
    public static class Tour {
        private String id;
        private String name;
        private String slug;
        private Integer duration;
        private Integer maxGroupSize;
        private String difficulty;
        private Double ratingsAverage;
        private Integer ratingsQuantity;
        private BigDecimal price;
        private String summary;
        private String description;
        private BigDecimal priceDiscount;
        private String imageCover;
        private Guide guide;

        @Setter
        @Getter
        @AllArgsConstructor
        @NoArgsConstructor
        @Builder
        public static class Guide {
            private String id;
            private String name;
            private String email;
        }
    }
}
