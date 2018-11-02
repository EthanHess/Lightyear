--- TODO update params here

insert into sg_archives (author_id, title, author_nam, author_image, post_media) 
values 
(${author_id}, ${title}, ${author_name}, ${author_image}, ${post_media})
returning *; 