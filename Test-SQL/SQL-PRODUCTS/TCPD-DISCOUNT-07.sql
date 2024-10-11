--Kiểm tra khi [Discount] để trống
USE OnlineShop
GO

INSERT INTO Products (Name,Price,Discount,Stock,CategoryId,SupplierId,Description)
VALUES
	(N'Gương',100,null,100,1,1,'test21')
