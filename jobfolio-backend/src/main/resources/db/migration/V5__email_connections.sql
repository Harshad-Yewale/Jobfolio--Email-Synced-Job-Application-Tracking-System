CREATE TABLE email_connections (
                                   id BIGSERIAL PRIMARY KEY,
                                   user_id BIGINT NOT NULL REFERENCES users(id),
                                   email_address VARCHAR(150) NOT NULL,
                                   access_token TEXT NOT NULL,
                                   refresh_token TEXT NOT NULL,
                                   token_expiry TIMESTAMP NOT NULL,
                                   last_synced_at TIMESTAMP,
                                   sync_enabled BOOLEAN NOT NULL DEFAULT TRUE,
                                   connected_at TIMESTAMP NOT NULL DEFAULT NOW()
);