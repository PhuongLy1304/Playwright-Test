--Kiểm tra khi [Name] 101 ký tự
USE OnlineShop
GO

INSERT INTO Products (Name,Price,Discount,Stock,CategoryId,SupplierId,Description)
VALUES
	(N'Cuộc sống không ngừng thay đổi, và mỗi khoảnh khắc đều là một cơ hội tốtt',500,10,100,1,1,'test1')
