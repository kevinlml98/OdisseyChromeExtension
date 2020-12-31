create database odisseydb;

use odisseydb;

create table USERS(
US_Id int not null auto_increment primary key,
US_Name varchar(50) not null,
US_Email varchar(50) not null,
US_Password varchar(50) not null
);

create table KEYWORDS(
KW_Id int not null auto_increment primary key,
KW_Value varchar(30) not null
);

create table SOUNDTRACKS(
ST_Id int not null auto_increment primary key,
ST_URL varchar(255) not null,
ST_Artist varchar(50) not null,
ST_Title varchar(30) not null
);


create table KWxST(
KWxST_KW_Id int not null,
KWxST_ST_Id int not null,

foreign key (KWxST_KW_Id) references KEYWORDS(KW_Id),
foreign key (KWxST_ST_Id) references SOUNDTRACKS(ST_Id)
);

-- USUARIOS _____________________________________________________________________________________________
DROP PROCEDURE IF EXISTS AddUSer;
DELIMITER $$
create procedure AddUser(in IN_US_Name varchar(50), in IN_US_Password varchar(50), in IN_US_Email varchar(50))
begin
insert into USERS(US_Name,US_Password,US_Email) values(IN_US_Name,IN_US_Password,IN_US_Email);
end
$$


DROP PROCEDURE IF EXISTS ReturnAllUsers;
DELIMITER $$
create procedure ReturnAllUsers()
begin
select US_Id,US_Name,US_Email from USERS;
end
$$


DROP PROCEDURE IF EXISTS ReturnUser;
DELIMITER $$
create procedure ReturnUser(in IN_US_Id int)
begin
select US_Id,US_Name,US_Email from USERS where US_Id = IN_US_Id;
end
$$

DROP PROCEDURE IF EXISTS DeleteUser;
DELIMITER $$
create procedure DeleteUser(in IN_US_Id int)
begin
delete from USERS where US_Id = IN_US_Id;
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
delete from SOUNDTRACKS where ST_Id = IN_ST_Id;
end
$$



DROP PROCEDURE IF EXISTS ReturnSoundtracks;
DELIMITER $$
create procedure ReturnSoundtracks(in IN_KW_Value varchar(30))
begin
select * from KWxST inner join  KEYWORDS on KEYWORDS.KW_Value = IN_KW_Value;
end
$$


DROP PROCEDURE IF EXISTS AddSoundtacks;
DELIMITER $$
create procedure AddSoundtacks(in IN_ST_URL varchar(255), in IN_ST_Artist varchar(50), in IN_ST_Title varchar(30))
begin
insert into SOUNDTRACKS(ST_URL,ST_Artist,ST_Title) values (IN_ST_URL, IN_ST_Artist, IN_ST_Title);
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
insert into KWxST(KWxST_KW_Id,KWxST_ST_Id) values (IN_KWxST_KW_Id,IN_KWxST_ST_Id);
end
$$


-- Search ______________________________________________________________________________________________________________
DROP PROCEDURE IF EXISTS SearchSoundtracks;
DELIMITER $$
create procedure SearchSoundtracks(in IN_KW_Value varchar(30))
begin
declare AUX_Id int;
select KW_Id from KEYWORDS where KW_Value = IN_KW_Value limit 1 into AUX_Id;
select ST_Id,ST_URL,ST_Artist,ST_Title from SOUNDTRACKS inner join KEYWORDS on KEYWORDS.KW_Id = AUX_ID;
end
$$



