CREATE TABLE applications (
                              id BIGSERIAL PRIMARY KEY,
                              user_id BIGINT NOT NULL REFERENCES users(id),
                              job_title VARCHAR(200) NOT NULL,
                              company VARCHAR(200) NOT NULL,
                              job_url VARCHAR(500),
                              location VARCHAR(200),
                              source VARCHAR(50),
                              status VARCHAR(30) NOT NULL DEFAULT 'APPLIED',
                              applied_date TIMESTAMP NOT NULL DEFAULT NOW(),
                              updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE saved_jobs (
                            id BIGSERIAL PRIMARY KEY,
                            user_id BIGINT NOT NULL REFERENCES users(id),
                            job_title VARCHAR(200) NOT NULL,
                            company VARCHAR(200) NOT NULL,
                            job_url VARCHAR(500),
                            location VARCHAR(200),
                            source VARCHAR(50),
                            saved_at TIMESTAMP NOT NULL DEFAULT NOW()
);