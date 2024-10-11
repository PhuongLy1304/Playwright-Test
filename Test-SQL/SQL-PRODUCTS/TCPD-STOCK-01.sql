--Kiểm tra khi [Stock]=0
USE OnlineShop
GO

INSERT INTO Products (Name,Price,Discount,Stock,CategoryId,SupplierId,Description)
VALUES
	(N'CPU25',100,10,0,1,1,'test21')
