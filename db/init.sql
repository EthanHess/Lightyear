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

-- todo, when scales we also want to store like count (we'll store like object to get likers pics etc.)

create table if not exists sg_likes (
    id serial primary key, 
    post_id int not null, -- references sg_posts (id), 
    user_id text not null, 
    liker_name text not null, 
    liker_image text not null
);

-- alter table to add media? 
create table if not exists sg_comments (
    id serial primary key, 
    post_id int not null references sg_posts (id),
    user_id text not null references sg_users (user_id), 
    author_name text not null, 
    author_image text not null, 
    comment_text text not null, 
    comment_date text not null --date string
);