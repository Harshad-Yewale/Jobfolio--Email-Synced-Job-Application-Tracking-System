CREATE TABLE application_events (
                                    id BIGSERIAL PRIMARY KEY,
                                    application_id BIGINT NOT NULL REFERENCES applications(id),
                                    old_status VARCHAR(30),
                                    new_status VARCHAR(30) NOT NULL,
                                    source VARCHAR(20) NOT NULL DEFAULT 'MANUAL',
                                    created_at TIMESTAMP NOT NULL DEFAULT NOW()
);