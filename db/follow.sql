insert into sg_following (follower_id, tofollow_id) 
values 
($1, $2) 
returning *; 
