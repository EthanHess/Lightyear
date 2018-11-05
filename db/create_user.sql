--TODO have another table where they create w/password (bcrypt etc.)

insert into sg_users (user_id, email, name, profile_picture)
values
($1, $2, $3, $4)
returning *; 