select * from sg_posts where user_id = $1; 


-- Join statement

-- select sg_posts.user_id, sg_users.user_id, sg_posts.title, sg_users.profile_picture
-- from sg_posts
-- inner join sg_users on sg_posts.user_id = sg_users.user_id