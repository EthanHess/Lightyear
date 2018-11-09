--- TODO how to handle Auth0? We need a password as well if they're not using auth0

create table if not exists sg_users ( 
    id serial primary key, 
    user_id text not null, 
    name text not null, 
    email text not null, 
    profile_picture text not null 
); 

create table if not exists sg_posts (
    id serial primary key, 
    -- user_id int references sg_users (id), 
    user_id text not null,
    title text not null, 
    author_name text not null, 
    author_image text not null, 
    post_media text not null --- Can be null? 
); 

--- TODO may want to reference id 

create table if not exists sg_archives (
    id serial primary key, 
    author_id text not null, 
    post_media text not null, 
    title text not null, 
    main_url text not null
); 

-- follower_id text not null references sg_users (user_id), 
-- following_id text not null references sg_users (user_id)

create table if not exists sg_following (
    id serial primary key,
    follower_id text not null, 
    toFollow_id text not null
); 

create table if not exists sg_likes (
    id serial primary key, 
    post_id int references sg_posts (id), 
    user_id text not null, 
    author_name text not null, 
    author_image text not null
)

--TODO add likes and followers

-- JOIN EXAMPLE
-- SELECT helo_posts.author_id, helo_users.auth0_id, helo_posts.title, helo_users.profile_picture
-- FROM helo_posts
-- INNER JOIN helo_users ON helo_posts.author_id=helo_users.auth0_id;