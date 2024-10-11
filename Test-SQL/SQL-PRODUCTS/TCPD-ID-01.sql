use OnlineShop
if exists(
select TABLE_NAME,DATA_TYPE,CHARACTER_MAXIMUM_LENGTH,NUMERIC_PRECISION, NUMERIC_SCALE
from INFORMATION_SCHEMA.COLUMNS
where
	TABLE_NAME='Products'
	and COLUMN_NAME ='Id'
	and DATA_TYPE ='int'
	and CHARACTER_MAXIMUM_LENGTH is null
)
begin 
	print 'Status : passed'
end
else begin
	print 'Status :failed'
end


------

