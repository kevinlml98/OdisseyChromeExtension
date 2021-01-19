drop database if exists odisseydb ;
create database odisseydb;

use odisseydb;

create table USERS(
US_Id int not null auto_increment primary key,
US_Email varchar(50) not null,
US_Admin int not null default 0
);

create table KEYWORDS(
KW_Id int not null auto_increment primary key,
KW_Value varchar(30) not null
);

create table SOUNDTRACKS(
ST_Id int not null auto_increment primary key,
ST_URL varchar(255) not null,
ST_Artist varchar(50) not null,
ST_Title varchar(30) not null,
ST_Album varchar(30) not null,
ST_Image varchar(255)
);


create table KWxST(
KW_Id int not null,
ST_Id int not null,

foreign key (KW_Id) references KEYWORDS(KW_Id),
foreign key (ST_Id) references SOUNDTRACKS(ST_Id)
);

create table USxST(
US_Id int not null,
ST_Id int not null,

foreign key (US_Id) references USERS(US_Id),
foreign key (ST_Id) references SOUNDTRACKS(ST_Id)
);

-- USUARIOS _____________________________________________________________________________________________
DROP PROCEDURE IF EXISTS AddUser;
DELIMITER $$
create procedure AddUser(in IN_US_Email varchar(50))
begin
insert into USERS(US_Email) values(IN_US_Email);
end
$$


DROP PROCEDURE IF EXISTS ReturnAllUsers;
DELIMITER $$
create procedure ReturnAllUsers()
begin
select * from USERS;
end
$$


DROP PROCEDURE IF EXISTS ReturnUser;
DELIMITER $$
create procedure ReturnUser(in IN_US_Id int)
begin
select * from USERS where US_Id = IN_US_Id;
end
$$

DROP PROCEDURE IF EXISTS AssingAdminUser;
DELIMITER $$
create procedure AssingAdminUser(in IN_US_Id int)
begin
update USERS set US_Admin = 1 where US_Id = IN_US_ID;
end
$$

DROP PROCEDURE IF EXISTS DeleteUser;
DELIMITER $$
create procedure DeleteUser(in IN_US_Id int)
begin
delete from USxST where USxST.US_Id = IN_US_Id;
delete from USERS where USERS.US_Id = IN_US_Id;
end
$$

DROP PROCEDURE IF EXISTS FavoriteSound;
DELIMITER $$
create procedure FavoriteSound(in IN_USxST_US_Id int, in IN_USxST_ST_Id int)
begin
insert into USxST(US_Id,ST_Id) values (IN_USxST_US_Id,IN_USxST_ST_Id);
end
$$

-- SOUNDTRACKS ___________________________________________________________________________________________________________________________

DROP PROCEDURE IF EXISTS ReturnAllSoundtracks;
DELIMITER $$
create procedure ReturnAllSoundtracks()
begin
select * from SOUNDTRACKS;
end
$$



DROP PROCEDURE IF EXISTS DeleteSoundtracks;
DELIMITER $$
create procedure DeleteSoundtracks(in IN_ST_Id int)
begin
delete from KWxST where KWxST.ST_Id = IN_ST_Id;
delete from SOUNDTRACKS where SOUNDTRACKS.ST_Id = IN_ST_Id;
end
$$


DROP PROCEDURE IF EXISTS AddSoundtacks;
DELIMITER $$
create procedure AddSoundtacks(in IN_ST_URL varchar(255), in IN_ST_Artist varchar(50), in IN_ST_Title varchar(30),in IN_ST_Album varchar(30))
begin
insert into SOUNDTRACKS(ST_URL,ST_Artist,ST_Title,ST_Album) values (IN_ST_URL, IN_ST_Artist, IN_ST_Title,IN_ST_Album);
end
$$


 
-- Keywords _________________________________________________________________________________________________________________
DROP PROCEDURE IF EXISTS AddKeyword;
DELIMITER $$
create procedure AddKeyword(in IN_KW_Value varchar(30))
begin
insert into KEYWORDS(KW_Value) values (IN_KW_Value);
end
$$

DROP PROCEDURE IF EXISTS AssingnKeyword;
DELIMITER $$
create procedure AssingnWord(in IN_KWxST_KW_Id int, in IN_KWxST_ST_Id int)
begin
insert into KWxST(KW_Id,ST_Id) values (IN_KWxST_KW_Id,IN_KWxST_ST_Id);
end
$$


-- Search ______________________________________________________________________________________________________________
DROP PROCEDURE IF EXISTS SearchSoundtracks;
DELIMITER $$
create procedure SearchSoundtracks(in IN_KW_Value varchar(30))
begin
select SOUNDTRACKS.ST_Id,SOUNDTRACKS.ST_Title,SOUNDTRACKS.ST_Artist,SOUNDTRACKS.ST_URL,SOUNDTRACKS.ST_Album,SOUNDTRACKS.ST_Image from SOUNDTRACKS
inner join KWxST on KWxST.ST_Id = SOUNDTRACKS.ST_Id
inner join KEYWORDS on KEYWORDS.KW_Id = KWxST.KW_Id where KEYWORDS.KW_Value = IN_KW_Value;
end
$$

-- Search Email _______________________________________________________________________________________________________
DROP PROCEDURE IF EXISTS SearchEmail;
DELIMITER $$
create procedure SearchEmail(in IN_US_Email varchar(50))
begin
select USERS.US_Id from USERS where USERS.US_Email = IN_US_Email;
end
$$


