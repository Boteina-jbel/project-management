INSERT INTO profile (code, name, hold) VALUES
    ('ADMIN', 'Admin', 0),
    ('PM', 'Project Manager', 0),
    ('TM', 'Team Member', 0),
    ('SH', 'Stakeholder', 0);

INSERT INTO endpoint (method, value, hold) Values
    ('GET', '/user', 0),
    ('POST', '/user', 0),
    ('PUT', '/user/id/*', 0),
    ('GET', '/user/id/*', 0),
    ('GET', '/user/username/*', 0),
    ('DELETE', '/user/id/*', 0);

INSERT INTO endpoint (method, value, hold) Values
    ('GET', '/project', 0),
    ('POST', '/project', 0),
    ('PUT', '/project/id/*', 0),
    ('GET', '/project/id/*', 0),
    ('GET', '/project/name/*', 0),
    ('DELETE', '/project/id/*', 0);

INSERT INTO endpoint (method, value, hold) Values
    ('POST', '/feature-task', 0),
    ('GET', '/feature-task/*', 0),
    ('PUT', '/feature-task/*', 0),
    ('DELETE', '/feature-task/*', 0),
    ('GET', '/feature-task/project/*', 0),
    ('GET', '/feature-task/priority/*', 0),
    ('GET', '/feature-task/search', 0),
    ('PUT', '/feature-task/*/assign', 0),
    ('PUT', '/feature-task/*/status', 0);

INSERT INTO endpoint (method, value, hold) Values
    ('POST', '/bug-task', 0),
    ('GET', '/bug-task/*', 0),
    ('PUT', '/bug-task/*', 0),
    ('DELETE', '/bug-task/*', 0),
    ('GET', '/bug-task/project/*', 0),
    ('GET', '/bug-task/severity/*', 0),
    ('PUT', '/bug-task/*/assign', 0),
    ('PUT', '/bug-task/*/status', 0);

INSERT INTO endpoint (method, value, hold) Values
    ('POST', '/comment', 0),
    ('GET', '/comment', 0),
    ('GET', '/comment/*', 0),
    ('GET', '/comment/task/*', 0),
    ('PUT', '/comment/*', 0),
    ('DELETE', '/comment/*', 0);

INSERT INTO endpoint (method, value, hold) Values
    ('POST', '/security/login', 0),
    ('POST', '/security/logout', 0);

INSERT INTO endpoint (method, value, hold) Values
    ('POST', '/task-statuses', 0),
    ('GET', '/task-statuses', 0),
    ('GET', '/task-statuses/*', 0),
    ('DELETE', '/task-statuses/*', 0);


INSERT INTO profile_endpoint (profile_id, endpoint_id, `hold`) values
    ((select id from profile where code = 'ADMIN'), (select id from endpoint where method = 'GET' and value = '/user'), 0),
    ((select id from profile where code = 'ADMIN'), (select id from endpoint where method = 'POST' and value = '/user'), 0),
    ((select id from profile where code = 'ADMIN'), (select id from endpoint where method = 'PUT' and value = '/user/id/*'), 0),
    ((select id from profile where code = 'ADMIN'), (select id from endpoint where method = 'GET' and value = '/user/id/*'), 0),
    ((select id from profile where code = 'ADMIN'), (select id from endpoint where method = 'GET' and value = '/user/username/*'), 0),
    ((select id from profile where code = 'ADMIN'), (select id from endpoint where method = 'DELETE' and value = '/user/id/*'), 0),

    ((select id from profile where code = 'ADMIN'), (select id from endpoint where method = 'GET' and value = '/project'), 0),
    ((select id from profile where code = 'ADMIN'), (select id from endpoint where method = 'POST' and value = '/project'), 0),
    ((select id from profile where code = 'ADMIN'), (select id from endpoint where method = 'PUT' and value = '/project/id/*'), 0),
    ((select id from profile where code = 'ADMIN'), (select id from endpoint where method = 'GET' and value = '/project/id/*'), 0),
    ((select id from profile where code = 'ADMIN'), (select id from endpoint where method = 'GET' and value = '/project/name/*'), 0),
    ((select id from profile where code = 'ADMIN'), (select id from endpoint where method = 'DELETE' and value = '/project/id/*'), 0),

    ((select id from profile where code = 'ADMIN'), (select id from endpoint where method = 'POST' and value = '/feature-task'), 0),
    ((select id from profile where code = 'ADMIN'), (select id from endpoint where method = 'PUT' and value = '/feature-task/*'), 0),
    ((select id from profile where code = 'ADMIN'), (select id from endpoint where method = 'GET' and value = '/feature-task/*'), 0),
    ((select id from profile where code = 'ADMIN'), (select id from endpoint where method = 'GET' and value = '/feature-task/project/*'), 0),
    ((select id from profile where code = 'ADMIN'), (select id from endpoint where method = 'GET' and value = '/feature-task/priority/*'), 0),
    ((select id from profile where code = 'ADMIN'), (select id from endpoint where method = 'GET' and value = '/feature-task/search'), 0),
    ((select id from profile where code = 'ADMIN'), (select id from endpoint where method = 'PUT' and value = '/feature-task/*/assign'), 0),
    ((select id from profile where code = 'ADMIN'), (select id from endpoint where method = 'PUT' and value = '/feature-task/*/status'), 0),
    ((select id from profile where code = 'ADMIN'), (select id from endpoint where method = 'DELETE' and value = '/feature-task/*'), 0),

    ((select id from profile where code = 'ADMIN'), (select id from endpoint where method = 'POST' and value = '/bug-task'), 0),
    ((select id from profile where code = 'ADMIN'), (select id from endpoint where method = 'PUT' and value = '/bug-task/*'), 0),
    ((select id from profile where code = 'ADMIN'), (select id from endpoint where method = 'GET' and value = '/bug-task/*'), 0),
    ((select id from profile where code = 'ADMIN'), (select id from endpoint where method = 'GET' and value = '/bug-task/project/*'), 0),
    ((select id from profile where code = 'ADMIN'), (select id from endpoint where method = 'GET' and value = '/bug-task/severity/*'), 0),
    ((select id from profile where code = 'ADMIN'), (select id from endpoint where method = 'PUT' and value = '/bug-task/*/assign'), 0),
    ((select id from profile where code = 'ADMIN'), (select id from endpoint where method = 'PUT' and value = '/bug-task/*/status'), 0),
    ((select id from profile where code = 'ADMIN'), (select id from endpoint where method = 'DELETE' and value = '/bug-task/*'), 0),

    ((select id from profile where code = 'ADMIN'), (select id from endpoint where method = 'POST' and value = '/comment'), 0),
    ((select id from profile where code = 'ADMIN'), (select id from endpoint where method = 'GET' and value = '/comment'), 0),
    ((select id from profile where code = 'ADMIN'), (select id from endpoint where method = 'PUT' and value = '/comment/*'), 0),
    ((select id from profile where code = 'ADMIN'), (select id from endpoint where method = 'GET' and value = '/comment/*'), 0),
    ((select id from profile where code = 'ADMIN'), (select id from endpoint where method = 'GET' and value = '/comment/task/*'), 0),
    ((select id from profile where code = 'ADMIN'), (select id from endpoint where method = 'DELETE' and value = '/comment/*'), 0),

    ((select id from profile where code = 'ADMIN'), (select id from endpoint where method = 'POST' and value = '/security/login'), 0),
    ((select id from profile where code = 'ADMIN'), (select id from endpoint where method = 'POST' and value = '/security/logout'), 0),

    ((select id from profile where code = 'ADMIN'), (select id from endpoint where method = 'POST' and value = '/task-statuses'), 0),
    ((select id from profile where code = 'ADMIN'), (select id from endpoint where method = 'GET' and value = '/task-statuses'), 0),
    ((select id from profile where code = 'ADMIN'), (select id from endpoint where method = 'GET' and value = '/task-statuses/*'), 0),
    ((select id from profile where code = 'ADMIN'), (select id from endpoint where method = 'DELETE' and value = '/task-statuses/*'), 0);



INSERT INTO profile_endpoint (profile_id, endpoint_id, `hold`) values
        ((select id from profile where code = 'PM'), (select id from endpoint where method = 'GET' and value = '/user'), 0),
        -- ((select id from profile where code = 'PM'), (select id from endpoint where method = 'POST' and value = '/user'), 0),
        ((select id from profile where code = 'PM'), (select id from endpoint where method = 'GET' and value = '/user/id/*'), 0),
        ((select id from profile where code = 'PM'), (select id from endpoint where method = 'GET' and value = '/user/username/*'), 0),

        ((select id from profile where code = 'PM'), (select id from endpoint where method = 'GET' and value = '/project'), 0),
        -- ((select id from profile where code = 'PM'), (select id from endpoint where method = 'POST' and value = '/project'), 0),
        -- ((select id from profile where code = 'PM'), (select id from endpoint where method = 'PUT' and value = '/project/id/*'), 0),
        ((select id from profile where code = 'PM'), (select id from endpoint where method = 'GET' and value = '/project/id/*'), 0),
        ((select id from profile where code = 'PM'), (select id from endpoint where method = 'GET' and value = '/project/name/*'), 0),

        ((select id from profile where code = 'PM'), (select id from endpoint where method = 'POST' and value = '/feature-task'), 0),
        ((select id from profile where code = 'PM'), (select id from endpoint where method = 'PUT' and value = '/feature-task/*'), 0),
        ((select id from profile where code = 'PM'), (select id from endpoint where method = 'GET' and value = '/feature-task/*'), 0),
        ((select id from profile where code = 'PM'), (select id from endpoint where method = 'GET' and value = '/feature-task/project/*'), 0),
        ((select id from profile where code = 'PM'), (select id from endpoint where method = 'GET' and value = '/feature-task/priority/*'), 0),
        ((select id from profile where code = 'PM'), (select id from endpoint where method = 'GET' and value = '/feature-task/search'), 0),
        ((select id from profile where code = 'PM'), (select id from endpoint where method = 'PUT' and value = '/feature-task/*/assign'), 0),
        ((select id from profile where code = 'PM'), (select id from endpoint where method = 'PUT' and value = '/feature-task/*/status'), 0),
        ((select id from profile where code = 'PM'), (select id from endpoint where method = 'DELETE' and value = '/feature-task/*'), 0),

        ((select id from profile where code = 'PM'), (select id from endpoint where method = 'POST' and value = '/bug-task'), 0),
        ((select id from profile where code = 'PM'), (select id from endpoint where method = 'PUT' and value = '/bug-task/*'), 0),
        ((select id from profile where code = 'PM'), (select id from endpoint where method = 'GET' and value = '/bug-task/*'), 0),
        ((select id from profile where code = 'PM'), (select id from endpoint where method = 'GET' and value = '/bug-task/project/*'), 0),
        ((select id from profile where code = 'PM'), (select id from endpoint where method = 'GET' and value = '/bug-task/severity/*'), 0),
        ((select id from profile where code = 'PM'), (select id from endpoint where method = 'PUT' and value = '/bug-task/*/assign'), 0),
        ((select id from profile where code = 'PM'), (select id from endpoint where method = 'PUT' and value = '/bug-task/*/status'), 0),
        ((select id from profile where code = 'PM'), (select id from endpoint where method = 'DELETE' and value = '/bug-task/*'), 0),

        ((select id from profile where code = 'PM'), (select id from endpoint where method = 'POST' and value = '/comment'), 0),
        ((select id from profile where code = 'PM'), (select id from endpoint where method = 'GET' and value = '/comment'), 0),
        ((select id from profile where code = 'PM'), (select id from endpoint where method = 'PUT' and value = '/comment/*'), 0),
        ((select id from profile where code = 'PM'), (select id from endpoint where method = 'GET' and value = '/comment/*'), 0),
        ((select id from profile where code = 'PM'), (select id from endpoint where method = 'GET' and value = '/comment/task/*'), 0),
        ((select id from profile where code = 'PM'), (select id from endpoint where method = 'DELETE' and value = '/comment/*'), 0),

        ((select id from profile where code = 'PM'), (select id from endpoint where method = 'POST' and value = '/security/login'), 0),
        ((select id from profile where code = 'PM'), (select id from endpoint where method = 'POST' and value = '/security/logout'), 0),

        ((select id from profile where code = 'PM'), (select id from endpoint where method = 'POST' and value = '/task-statuses'), 0),
        ((select id from profile where code = 'PM'), (select id from endpoint where method = 'GET' and value = '/task-statuses'), 0),
        ((select id from profile where code = 'PM'), (select id from endpoint where method = 'GET' and value = '/task-statuses/*'), 0);


INSERT INTO profile_endpoint (profile_id, endpoint_id, `hold`) values
            ((select id from profile where code = 'TM'), (select id from endpoint where method = 'GET' and value = '/project'), 0),
            ((select id from profile where code = 'TM'), (select id from endpoint where method = 'GET' and value = '/project/id/*'), 0),
            ((select id from profile where code = 'TM'), (select id from endpoint where method = 'GET' and value = '/project/name/*'), 0),

            -- ((select id from profile where code = 'TM'), (select id from endpoint where method = 'POST' and value = '/feature-task'), 0),
            -- ((select id from profile where code = 'TM'), (select id from endpoint where method = 'PUT' and value = '/feature-task/*'), 0),
            ((select id from profile where code = 'TM'), (select id from endpoint where method = 'GET' and value = '/feature-task/*'), 0),
            ((select id from profile where code = 'TM'), (select id from endpoint where method = 'GET' and value = '/feature-task/project/*'), 0),
            ((select id from profile where code = 'TM'), (select id from endpoint where method = 'GET' and value = '/feature-task/priority/*'), 0),
            ((select id from profile where code = 'TM'), (select id from endpoint where method = 'GET' and value = '/feature-task/search'), 0),
            ((select id from profile where code = 'TM'), (select id from endpoint where method = 'PUT' and value = '/feature-task/*/status'), 0),
            -- ((select id from profile where code = 'TM'), (select id from endpoint where method = 'DELETE' and value = '/feature-task/*'), 0),

            -- ((select id from profile where code = 'TM'), (select id from endpoint where method = 'POST' and value = '/bug-task'), 0),
            -- ((select id from profile where code = 'TM'), (select id from endpoint where method = 'PUT' and value = '/bug-task/*'), 0),
            ((select id from profile where code = 'TM'), (select id from endpoint where method = 'GET' and value = '/bug-task/*'), 0),
            ((select id from profile where code = 'TM'), (select id from endpoint where method = 'GET' and value = '/bug-task/project/*'), 0),
            ((select id from profile where code = 'TM'), (select id from endpoint where method = 'GET' and value = '/bug-task/severity/*'), 0),
            ((select id from profile where code = 'TM'), (select id from endpoint where method = 'PUT' and value = '/bug-task/*/status'), 0),
            -- ((select id from profile where code = 'TM'), (select id from endpoint where method = 'DELETE' and value = '/bug-task/*'), 0),

            ((select id from profile where code = 'TM'), (select id from endpoint where method = 'POST' and value = '/comment'), 0),
            ((select id from profile where code = 'TM'), (select id from endpoint where method = 'GET' and value = '/comment'), 0),
            ((select id from profile where code = 'TM'), (select id from endpoint where method = 'PUT' and value = '/comment/*'), 0),
            ((select id from profile where code = 'TM'), (select id from endpoint where method = 'GET' and value = '/comment/*'), 0),
            ((select id from profile where code = 'TM'), (select id from endpoint where method = 'GET' and value = '/comment/task/*'), 0),
            ((select id from profile where code = 'TM'), (select id from endpoint where method = 'DELETE' and value = '/comment/*'), 0),

            ((select id from profile where code = 'TM'), (select id from endpoint where method = 'POST' and value = '/security/login'), 0),
            ((select id from profile where code = 'TM'), (select id from endpoint where method = 'POST' and value = '/security/logout'), 0);


INSERT INTO profile_endpoint (profile_id, endpoint_id, `hold`) values
                    ((select id from profile where code = 'SH'), (select id from endpoint where method = 'GET' and value = '/project'), 0),
                    ((select id from profile where code = 'SH'), (select id from endpoint where method = 'GET' and value = '/project/id/*'), 0),
                    ((select id from profile where code = 'SH'), (select id from endpoint where method = 'GET' and value = '/project/name/*'), 0),

                    -- ((select id from profile where code = 'SH'), (select id from endpoint where method = 'POST' and value = '/feature-task'), 0),
                    -- ((select id from profile where code = 'SH'), (select id from endpoint where method = 'PUT' and value = '/feature-task/*'), 0),
                    -- ((select id from profile where code = 'SH'), (select id from endpoint where method = 'GET' and value = '/feature-task/*'), 0),
                    -- ((select id from profile where code = 'SH'), (select id from endpoint where method = 'GET' and value = '/feature-task/project/*'), 0),
                    -- ((select id from profile where code = 'SH'), (select id from endpoint where method = 'GET' and value = '/feature-task/priority/*'), 0),
                    -- ((select id from profile where code = 'SH'), (select id from endpoint where method = 'GET' and value = '/feature-task/search'), 0),
                    -- ((select id from profile where code = 'SH'), (select id from endpoint where method = 'PUT' and value = '/feature-task/*/status'), 0),
                    -- ((select id from profile where code = 'SH'), (select id from endpoint where method = 'DELETE' and value = '/feature-task/*'), 0),

                    ((select id from profile where code = 'SH'), (select id from endpoint where method = 'POST' and value = '/bug-task'), 0),
                    ((select id from profile where code = 'SH'), (select id from endpoint where method = 'PUT' and value = '/bug-task/*'), 0),
                    ((select id from profile where code = 'SH'), (select id from endpoint where method = 'GET' and value = '/bug-task/*'), 0),
                    ((select id from profile where code = 'SH'), (select id from endpoint where method = 'GET' and value = '/bug-task/project/*'), 0),
                    ((select id from profile where code = 'SH'), (select id from endpoint where method = 'GET' and value = '/bug-task/severity/*'), 0),
                    ((select id from profile where code = 'SH'), (select id from endpoint where method = 'PUT' and value = '/bug-task/*/status'), 0),
                    ((select id from profile where code = 'SH'), (select id from endpoint where method = 'DELETE' and value = '/bug-task/*'), 0),

                    ((select id from profile where code = 'SH'), (select id from endpoint where method = 'POST' and value = '/comment'), 0),
                    ((select id from profile where code = 'SH'), (select id from endpoint where method = 'GET' and value = '/comment'), 0),
                    ((select id from profile where code = 'SH'), (select id from endpoint where method = 'PUT' and value = '/comment/*'), 0),
                    ((select id from profile where code = 'SH'), (select id from endpoint where method = 'GET' and value = '/comment/*'), 0),
                    ((select id from profile where code = 'SH'), (select id from endpoint where method = 'GET' and value = '/comment/task/*'), 0),
                    ((select id from profile where code = 'SH'), (select id from endpoint where method = 'DELETE' and value = '/comment/*'), 0),

                    ((select id from profile where code = 'SH'), (select id from endpoint where method = 'POST' and value = '/security/login'), 0),
                    ((select id from profile where code = 'SH'), (select id from endpoint where method = 'POST' and value = '/security/logout'), 0);




