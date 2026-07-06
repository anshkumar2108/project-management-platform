create table workspaces(
workspace_id INT primary key,
name varchar(100) NOT NULL,
owner_id INT references users(id),
created_at DATE,
updated_at DATE
);