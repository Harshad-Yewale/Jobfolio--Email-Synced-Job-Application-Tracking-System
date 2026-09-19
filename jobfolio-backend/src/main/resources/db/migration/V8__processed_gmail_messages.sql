CREATE TABLE processed_gmail_messages (
                                          id BIGSERIAL PRIMARY KEY,
                                          email_connection_id BIGINT NOT NULL REFERENCES email_connections(id),
                                          gmail_message_id VARCHAR(50) NOT NULL,
                                          processed_at TIMESTAMP NOT NULL DEFAULT NOW(),
                                          UNIQUE (email_connection_id, gmail_message_id)
);

CREATE INDEX idx_processed_gmail_messages_processed_at ON processed_gmail_messages(processed_at);