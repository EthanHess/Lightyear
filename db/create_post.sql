-- TODO Post media could be image or video ---! Likely URL? 

insert into sg_posts (author_id, title, author_name, author_image, post_media) 
values 
($1, $2, $3, $4, $5)
returning *; 