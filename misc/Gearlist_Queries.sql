use myschema;

# Data to users
insert into users (first_name, last_name, email, password)
values ('Dennis', 'Levin', 'dennis@levin.com', 'asdagadasdasf'),
	   ('Tom', 'Haverford', 'tom@cs.com', 'asdagadasdasf'),
       ('Ron', 'Swanson', 'ron@swansong.com', 'asdagadasdasf');

# User Queries
select * from users;

# Data to items
insert into items (name, description, weight_oz, image_url, user_id)
values ('Big Agnes Copper Spur UL1', 'UL tent', '41.10', '/images/copperspurul1.jpg', 2),
	   ('ZPacks Quilt', 'Green', '15', '/images/quilt.jpg', 2),
       ('Rainpaints', 'Black', '9.111', '/images/reirainpants.jpg', 2);

# Item Queries
select * from items join users on items.user_id = users.id;
select * from items;

# Data to lists
insert into lists (name, description, user_id, item_id)
values ('Mountaineering', 'Winter mountaineering', 2, 2),
	   ('Ultralight', 'For summer', 2, 1);
       
# List Queries
select * from lists;
select * from lists join items on lists.item_id = items.id join users on lists.user_id = users.id;
select lists.* from lists join items on lists.item_id = items.id where lists.item_id = 1;