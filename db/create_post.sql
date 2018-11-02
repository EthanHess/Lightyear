-- TODO Post media could be image or video ---! Likely URL? 

insert into sg_posts (author_id, title, author_nam, author_image, post_media) 
values 
(${author_id}, ${title}, ${author_name}, ${author_image}, ${post_media})
returning *; 