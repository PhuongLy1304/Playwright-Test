--Kiểm tra khi [Discount]=90.01
USE OnlineShop
GO

INSERT INTO Products (Name,Price,Discount,Stock,CategoryId,SupplierId,Description)
VALUES
	(N'RAM/ROM',100,90.01,100,1,1,'test21')
