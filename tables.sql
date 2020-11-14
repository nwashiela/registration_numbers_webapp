create table town(
    id serial not null primary key,
    town_Names text not null,
    start_With text not null
);
create table registration_numbers(
        id serial not null primary key,
        regnumbers text not null,
        allReg_id int,
        foreign key(allReg_id) references town(id)
);
insert into town (town_names, start_with) values ('Cape Town', 'CA');
insert into town (town_names, start_with) values ('Bellville', 'CY');
insert into town (town_names, start_with) values ('Paarl', 'CJ');

--  insert into town (town_names, start_with) values ('Bellville', 'CY');

--  insert into town (town_names, start_with) values ('Paarl', 'CJ');

--  insert into town (town_names, start_with) values ('Cape Town', 'CA');


--  table registration_numbers;
--  id | regnumbers | allreg_id 
-- ----+------------+-----------
--   1 | cy 123123  |     2     
--   2 | ca 123123  |      1    
--   3 | cj 123123  |      3    
-- (3 rows)
