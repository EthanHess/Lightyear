insert into sg_likes (post_id, user_id, liker_name, liker_image)
values 
($1, $2, $3, $4) 
returning *; 