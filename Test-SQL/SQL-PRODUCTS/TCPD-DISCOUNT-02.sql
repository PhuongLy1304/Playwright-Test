--Kiểm tra khi [Discount]=0
USE OnlineShop
GO

INSERT INTO Products (Name,Price,Discount,Stock,CategoryId,SupplierId,Description)
VALUES
	(N'RAM',100,0,100,1,1,'test21')
