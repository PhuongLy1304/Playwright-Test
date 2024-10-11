--Kiểm tra khi [Price]=0
USE OnlineShop
GO

INSERT INTO Products (Name,Price,Discount,Stock,CategoryId,SupplierId,Description)
VALUES
	(N'Penn',0,10,100,1,1,'test21')
