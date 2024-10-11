--Kiểm tra khi [Discount]=-0.01
USE OnlineShop
GO

INSERT INTO Products (Name,Price,Discount,Stock,CategoryId,SupplierId,Description)
VALUES
	(N'ROM',100,-0.01,100,1,1,'test21')
