package com.natours.service.config;

import java.sql.Connection;
import javax.sql.DataSource;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.jspecify.annotations.NonNull;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.stereotype.Component;

@Slf4j
@RequiredArgsConstructor
@Component
public class DatabaseConnectionChecker implements ApplicationRunner {
    private final DataSource dataSource;

    @Override
    public void run(@NonNull ApplicationArguments args) throws Exception {
        log.info("Checking database connection...");

        try (Connection connection = dataSource.getConnection()) {
            if (connection.isValid(2)) {
                log.info("Database connection successful");
                log.info("Database: {}", connection.getMetaData().getDatabaseProductName());
            } else {
                throw new RuntimeException("Database connection validation failed");
            }
        }
    }
}
