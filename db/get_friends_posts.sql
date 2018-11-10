select * from sg_posts where user_id in ($1:csv); 

-- reference 

-- will want to do this eventually via reference to scale big

-- SELECT postid
-- FROM Post
-- INNER JOIN Friendship ON Friendship.userid = @UserId AND Post.authorid = Friendship.friendid
-- INNER JOIN Permission ON Post.postid = Permission.postid AND Permission.userid = @UserId