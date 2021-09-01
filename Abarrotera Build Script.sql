CREATE DATABASE Abarrotera;
use Abarrotera;

CREATE TABLE Products (
	prodId varchar(128) PRIMARY KEY,
    prodName varchar(64) NOT NULL,
    buyPrice float,
    sellPrice float,
    stock int,
    presentation ENUM('empaquetado', 'por unidad')
);

CREATE TABLE Providers (
	provId int PRIMARY KEY AUTO_INCREMENT,
    provName char(32) NOT NULL,
    provPhoneNum char(10)
);

CREATE TABLE Clients (
	clientId int PRIMARY KEY AUTO_INCREMENT,
    clientName varchar(16) NOT NULL,
    clientSecondName varchar(20) NOT NULL,
    clientEmail varchar(255) NOT NULL,
    clientPhoneNum char(10),
    balance float
);

CREATE TABLE BuyRecord (
	buyId int AUTO_INCREMENT,
    provId int,
    buyDate datetime(2),
    total float,
    FOREIGN KEY(provId) REFERENCES Providers(provId),
    PRIMARY KEY(buyId, provId)
);

-- ppp is Price per Product
/*
	TODO: In the procedures for the 'log tables' get and assign the price of the products table. NOT REFERENCES.
		reason: The prices of the products can change along the time, so the abarrotera owner will
        have to change the price of the product directly in the products table, and in case the ppp columns are linked
        to the buy/sell price columns in products table, all prices changes in the logs table with them. Therefore,
        is important get the price in the moment without link columns.
*/
CREATE TABLE BuyLog (
	buyId int,
    prodId char(128),
    quantityBought int,
    pppBought float,
    FOREIGN KEY(buyId) REFERENCES BuyRecord(buyId),
    FOREIGN KEY(prodId) REFERENCES Products(prodId),
    PRIMARY KEY(buyId, prodId)
);

CREATE TABLE SellRecord (
	sellId int AUTO_INCREMENT,
    clientId int,
    sellDate datetime(2),
    total float,
    FOREIGN KEY(clientId) REFERENCES Clients(clientId),
    PRIMARY KEY(sellId, clientId)
);

CREATE TABLE SellLog (
	sellId int,
    prodId char(128),
    quantityBought int,
    pppSold float,
    FOREIGN KEY(sellId) REFERENCES SellRecord(sellId),
    FOREIGN KEY(prodId) REFERENCES Products(prodId),
    PRIMARY KEY(sellId, prodId)
);