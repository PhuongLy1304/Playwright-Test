--Kiểm tra khi [Stock] để trống
USE OnlineShop
GO

INSERT INTO Products (Name,Price,Discount,Stock,CategoryId,SupplierId,Description)
VALUES
	(N'CPU//',100,10,null,1,1,'test21')
