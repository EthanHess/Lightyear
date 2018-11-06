--- TODO update params here

insert into sg_archives (author_id, post_media, title, main_url) 
values 
($1, $2, $3, $4)
returning *; 