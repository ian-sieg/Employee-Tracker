INSERT INTO department (dept_name)
VALUES  ("Executive"),
        ("Research & Development"),
        ("Communications"),
        ("Maintenance"),
        ("Quality Control"),
        ("Human Resources");

INSERT INTO roles (title, salary, dept_id)
VALUES  ("CEO", 43000, 1),
        ("Product Tester", 100000, 5),
        ("Developer", 87000, 2),
        ("Plumber", 145000, 4),
        ("HR Associate", 47000, 6),
        ("Domain Squatter", 75000, 3),
        ("Senior Developer", 156000, 2),
        ("Senior Human Resource", 48000, 6),
        ("Senior QC tester", 100001, 5);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES  ("Craig", "Pelton", 1, NULL),
        ("Ian", "Duncan", 9, 1),
        ("Sean", "Garrity", 8, 1),
        ("Troy", "Barnes", 4, 1),
        ("Abed", "Nadir", 6, 1),
        ("Elroy", "Patashnik", 7, 1),
        ("Britta", "Perry", 2, 2),
        ("Gilbert", "Hawthorne", 3, 6),
        ("Annie", "Edison", 5, 3),
        ("Benjamin", "Chang", 5, 3);
