--Kiểm tra khi [Discount]=89.99
USE OnlineShop
GO

INSERT INTO Products (Name,Price,Discount,Stock,CategoryId,SupplierId,Description)
VALUES
	(N'CPU/RAM',100,89.99,100,1,1,'test21')
