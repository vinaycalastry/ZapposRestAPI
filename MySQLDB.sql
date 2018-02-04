DROP schema restaurantapi;
CREATE schema restaurantapi;
use restaurantapi;


/*Drop existing Tables */
drop table IF EXISTS restaurants;
drop table IF EXISTS menus;
drop table IF EXISTS menuitems;

/* Create Tables */
create table IF NOT EXISTS restaurants(
                                        RID int NOT NULL AUTO_INCREMENT,
                                        RNAME varchar(20),
                                        ADDRESS varchar(100),
                                        PHONE varchar(12),
                                        primary key (RID)
                                      );
                         
create table IF NOT EXISTS menus(
                                    MID int NOT NULL AUTO_INCREMENT,
                                    MNAME varchar(50),
                                    MDETAILS varchar(200),
                                    RID int NOT NULL,
                                    primary key (MID),
                                    CONSTRAINT fk_rid FOREIGN KEY (RID)
                                    REFERENCES restaurants(RID)
                                    ON DELETE CASCADE
                                );
                   
create table IF NOT EXISTS menuitems(
                                        MIID int NOT NULL AUTO_INCREMENT,
                                        MITEMNAME varchar(50),
                                        MITEMDETAILS varchar(200),
                                        MITEMPRICE DECIMAL(5,2) NOT NULL,
                                        MID int NOT NULL,
                                        RID int NOT NULL,
                                        primary key (MIID),
                                        CONSTRAINT fk_rid2 FOREIGN KEY (RID)
                                        REFERENCES restaurants(RID)
                                        ON DELETE CASCADE,
                                        CONSTRAINT fk_mid FOREIGN KEY (MID)
                                        REFERENCES menus(MID)
                                        ON DELETE CASCADE
                                    );
                  
                       
