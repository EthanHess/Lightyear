--- TODO update params here

insert into sg_archives (author_id, title, post_media) 
values 
(${author_id}, ${title}, ${post_media})
returning *; 