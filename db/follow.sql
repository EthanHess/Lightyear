insert into sg_following (post_id, user_id, author_name, author_image) 
values 
($1, $2) 
returning *; 
