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

INSERT INTO profile_endpoint (profile_id, endpoint_id, `hold`) values
((select id from profile where code = 'ADMIN'), (select id from endpoint where method = 'GET' and value = '/user'), 0),
((select id from profile where code = 'ADMIN'), (select id from endpoint where method = 'POST' and value = '/user'), 0),
((select id from profile where code = 'ADMIN'), (select id from endpoint where method = 'PUT' and value = '/user/id/*'), 0),
((select id from profile where code = 'ADMIN'), (select id from endpoint where method = 'GET' and value = '/user/id/*'), 0),
((select id from profile where code = 'ADMIN'), (select id from endpoint where method = 'GET' and value = '/user/username/*'), 0),
((select id from profile where code = 'ADMIN'), (select id from endpoint where method = 'DELETE' and value = '/user/id/*'), 0);
