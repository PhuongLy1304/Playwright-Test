--Kiểm tra khi [Price]=-0.01
USE OnlineShop
GO

INSERT INTO Products (Name,Price,Discount,Stock,CategoryId,SupplierId,Description)
VALUES
	(N'Gấu bông',-0.01,10,100,1,1,'test21')
