use OnlineShop
if exists(
	select *
	from INFORMATION_SCHEMA.TABLE_CONSTRAINTS as tc
	join INFORMATION_SCHEMA.KEY_COLUMN_USAGE as kcu
	on tc.CONSTRAINT_NAME = kcu.CONSTRAINT_NAME
	where tc.TABLE_NAME = 'Products' and tc.CONSTRAINT_TYPE= 'primary key' and kcu.COLUMN_NAME='Id'
)
begin
	print 'Status : passed'
end
else begin
	print 'Status : failed'
end

---
