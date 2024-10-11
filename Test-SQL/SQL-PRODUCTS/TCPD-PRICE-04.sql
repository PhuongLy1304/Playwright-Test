--Kiểm tra khi [Price] rỗng
USE OnlineShop
GO

INSERT INTO Products (Name,Price,Discount,Stock,CategoryId,SupplierId,Description)
VALUES
	(N'Balo',null,10,100,1,1,'test21')
