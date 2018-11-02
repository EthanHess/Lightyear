insert into sg_users (user_id, password, email, name, profile_picture)
values
(${user_id}, ${password}, ${email}, ${name}, ${profile_picture})
returning *; 