insert into sg_following (follower_id, following_id) 
values 
($1, $2) 
returning *; 