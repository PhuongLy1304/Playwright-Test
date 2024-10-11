--Kiểm tra khi [Discount]=90
USE OnlineShop
GO

INSERT INTO Products (Name,Price,Discount,Stock,CategoryId,SupplierId,Description)
VALUES
	(N'CPU/ROM',100,90,100,1,1,'test21')
