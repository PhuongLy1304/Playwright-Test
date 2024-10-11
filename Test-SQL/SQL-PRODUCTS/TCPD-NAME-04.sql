--Kiểm tra khi [Name] 100 ký tự
USE OnlineShop
GO

INSERT INTO Products (Name,Price,Discount,Stock,CategoryId,SupplierId,Description)
VALUES
	(null,500,10,100,1,1,'test1')
