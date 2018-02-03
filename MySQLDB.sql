DROP schema restaurantapi;
CREATE schema restaurantapi;
use restaurantapi;


/*Drop existing Tables */
drop table restaurants;
drop table menus;
drop table menuitems;

/* Create Tables */
create table restaurants(RID int NOT NULL,
                         RNAME varchar(20),
                         ADDRESS varchar(100),
                         PHONE varchar(12),
                         primary key (RID));
                         
create table menus(MID int NOT NULL,
                   MNAME varchar(50),
                   RID int NOT NULL,
                   primary key (MID),
                   CONSTRAINT fk_rid FOREIGN KEY (RID)
                   REFERENCES restaurants(RID)
                   ON DELETE CASCADE
                   ON UPDATE CASCADE);
                   
create table menuitems(MIID int NOT NULL,
                       MITEMNAME varchar(50),
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

select * from menuitems;

insert into restaurants values(200, 'Paradise', 'E.Flamingo Road', '702-934-3333'); 