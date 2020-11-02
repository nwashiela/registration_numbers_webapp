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

-- registration=> table registration_numbers;
--  id | regnumbers | allreg_id 
-- ----+------------+-----------
--   1 | cy 123123  |          
--   2 | cy 123123  |          
--   3 | cy 123123  |          
-- (3 rows)
