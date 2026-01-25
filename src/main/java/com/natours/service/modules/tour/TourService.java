package com.natours.service.modules.tour;

import com.natours.service.common.exception.ResourceNotFoundException;
import com.natours.service.modules.tour.dto.GetTourResponse;
import com.natours.service.modules.tour.dto.GetToursResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.stereotype.Service;

import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class TourService {
    private final NamedParameterJdbcTemplate jdbcTemplate;

    public GetToursResponse getTours(int page, int size) {
        List<GetToursResponse.Tour> tours = jdbcTemplate.query(
                """
                        SELECT
                            t.id,
                            t.name,
                            t.slug,
                            t.duration,
                            t.max_group_size,
                            t.difficulty,
                            t.ratings_average,
                            t.ratings_quantity,
                            t.price,
                            t.summary,
                            t.description,
                            t.price_discount,
                            t.image_cover,
                            u.id as guide_id,
                            u.name as guide_name,
                            u.email as guide_email
                        FROM tours t
                        JOIN users u
                        ON t.user_id = u.id
                        WHERE t.is_deleted = FALSE
                        LIMIT :size
                        OFFSET (:page - 1) * :size
                        """,
                new MapSqlParameterSource()
                        .addValue("page", page)
                        .addValue("size", size),
                (rs, rowNum) -> {
                    GetToursResponse.Tour.Guide guide = GetToursResponse.Tour.Guide.builder()
                            .id(rs.getString("guide_id"))
                            .name(rs.getString("guide_name"))
                            .email(rs.getString("guide_email"))
                            .build();
                    return GetToursResponse.Tour.builder()
                            .id(rs.getString("id"))
                            .name(rs.getString("name"))
                            .slug(rs.getString("slug"))
                            .duration(rs.getInt("duration"))
                            .maxGroupSize(rs.getInt("max_group_size"))
                            .difficulty(rs.getString("difficulty"))
                            .ratingsAverage(rs.getDouble("ratings_average"))
                            .ratingsQuantity(rs.getInt("ratings_quantity"))
                            .price(rs.getBigDecimal("price"))
                            .summary(rs.getString("summary"))
                            .description(rs.getString("description"))
                            .priceDiscount(rs.getBigDecimal("price_discount"))
                            .imageCover(rs.getString("image_cover"))
                            .guide(guide)
                            .build();
                }
        );

        return GetToursResponse.builder()
                .tours(tours)
                .build();
    }

    public GetTourResponse getTour(String id) {
        try {
            GetTourResponse.Tour tour = jdbcTemplate.queryForObject(
                    """
                            SELECT
                                t.id,
                                t.name,
                                t.slug,
                                t.duration,
                                t.max_group_size,
                                t.difficulty,
                                t.ratings_average,
                                t.ratings_quantity,
                                t.price,
                                t.summary,
                                t.description,
                                t.price_discount,
                                t.image_cover,
                                u.id as guide_id,
                                u.name as guide_name,
                                u.email as guide_email
                            FROM tours t
                            JOIN users u
                            ON t.user_id = u.id
                            WHERE t.id = :id AND t.is_deleted = FALSE
                            """,
                    new MapSqlParameterSource()
                            .addValue("id", id),
                    (rs, rowNum) -> {
                        GetTourResponse.Tour.Guide guide = GetTourResponse.Tour.Guide.builder()
                                .id(rs.getString("guide_id"))
                                .name(rs.getString("guide_name"))
                                .email(rs.getString("guide_email"))
                                .build();
                        return GetTourResponse.Tour.builder()
                                .id(rs.getString("id"))
                                .name(rs.getString("name"))
                                .slug(rs.getString("slug"))
                                .duration(rs.getInt("duration"))
                                .maxGroupSize(rs.getInt("max_group_size"))
                                .difficulty(rs.getString("difficulty"))
                                .ratingsAverage(rs.getDouble("ratings_average"))
                                .ratingsQuantity(rs.getInt("ratings_quantity"))
                                .price(rs.getBigDecimal("price"))
                                .summary(rs.getString("summary"))
                                .description(rs.getString("description"))
                                .priceDiscount(rs.getBigDecimal("price_discount"))
                                .imageCover(rs.getString("image_cover"))
                                .guide(guide)
                                .build();
                    }
            );

            return GetTourResponse.builder()
                    .tour(tour)
                    .build();
        } catch (EmptyResultDataAccessException e) {
            log.error(e.getMessage());
            throw new ResourceNotFoundException("Tour", "id", id);
        }
    }
}
