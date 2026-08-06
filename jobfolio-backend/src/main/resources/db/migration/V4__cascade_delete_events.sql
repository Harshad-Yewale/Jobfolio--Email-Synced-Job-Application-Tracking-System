ALTER TABLE application_events
DROP CONSTRAINT application_events_application_id_fkey;

ALTER TABLE application_events
    ADD CONSTRAINT application_events_application_id_fkey
        FOREIGN KEY (application_id) REFERENCES applications(id) ON DELETE CASCADE;