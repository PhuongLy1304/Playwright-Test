--Kiểm tra khi [Stock]=0.01
USE OnlineShop
GO

INSERT INTO Products (Name,Price,Discount,Stock,CategoryId,SupplierId,Description)
VALUES
	(N'CPU2',100,10,0.01,1,1,'test21')
