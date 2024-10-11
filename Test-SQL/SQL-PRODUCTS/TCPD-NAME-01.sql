--Kiểm tra khi [Name] 100 ký tự
USE OnlineShop
GO

INSERT INTO Products (Name,Price,Discount,Stock,CategoryId,SupplierId,Description)
VALUES
	(N'Cuộc sống không ngừng thay đổi, và mỗi khoảnh khắc đều là một cơ hội tốt',500,10,100,1,1,'test1')
