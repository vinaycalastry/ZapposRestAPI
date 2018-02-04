DROP schema restaurantapi;
CREATE schema restaurantapi;
use restaurantapi;


/*Drop existing Tables */
drop table restaurants;
drop table menus;
drop table menuitems;

/* Create Tables */
create table restaurants(RID int NOT NULL AUTO_INCREMENT,
                         RNAME varchar(20),
                         ADDRESS varchar(100),
                         PHONE varchar(12),
                         primary key (RID));
                         
create table menus(MID int NOT NULL AUTO_INCREMENT,
                   MNAME varchar(50),
                   MDETAILS varchar(200),
                   RID int NOT NULL,
                   primary key (MID),
                   CONSTRAINT fk_rid FOREIGN KEY (RID)
                   REFERENCES restaurants(RID)
                   ON DELETE CASCADE
                   ON UPDATE CASCADE);
                   
create table menuitems(MIID int NOT NULL AUTO_INCREMENT,
                       MITEMNAME varchar(50),
                       MITEMDETAILS varchar(200),
                       MITEMPRICE DECIMAL(5,2) NOT NULL,
                       MID int NOT NULL,
                       RID int NOT NULL,
                       primary key (MIID),
                       CONSTRAINT fk_rid2 FOREIGN KEY (RID)
                       REFERENCES restaurants(RID)
                       ON DELETE CASCADE
                       ON UPDATE CASCADE,
                       CONSTRAINT fk_mid FOREIGN KEY (MID)
                       REFERENCES menus(MID)
                       ON DELETE CASCADE
                       ON UPDATE CASCADE);
                  
                       
commit;

select * from restaurants;
select * from menus;
select * from menuitems;

delete from restaurants;

insert into menus(MNAME, MDETAILS, RID) values('Breakfast', 'All dishes relating to breakfast before 11:00AM are stored here', 1);
insert into menuitems(MITEMNAME, MITEMDETAILS, MID, RID) values('TEST', 'test2',2,2 );
