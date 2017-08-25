var tables = [[1,"Tables"],[2,"DataTypes"],[3,"Columns"],[4,"Indexes"],[5,"IndexesColumns"],[6,"ForeingKeys"]];

tables[0].data = tables;
tables[1].data = [[1,"INT"],[2,"NVARCHAR"],[3,"BOOLEAN"],[4,"DATE"]];
tables[2].data = [
    [1,1,"TableID",1,false],[2,1,"TableName",2,false],
    [3,2,"DataTypeID",1,false],[4,2,"DataTypeName",2,false],
    [5,3,"ColumnID",1,false],[6,3,"Table",1,false],[7,3,"ColumnName",2,false],[8,3,"Allow null",3,false],
    [9,4,"IndexID",1,false],[10,4,"Table",1,false],[11,4,"IndexName",2,false],[12,4,"",false],[13,4,"Unique",false],
    [14,5,"Index",1,false],[15,5,"Column",2,false],[16,5,"Ascendig",3,false],
    [17,6,"Table",1,false],[18,6,"ForeingKeyName",2,false],[19,6,"FKColumn",1,false],[20,6,"PKColumn",1,false]
];
tables[3].data = [
    [1,1,"PK_Tables",true,true],[2,1,"IX_Table",false,true],
    [3,2,"PK_DataTypes",true,true],[4,2,"IX_Datatype",false,true],
    [5,3,"PK_Columns",true,true],[6,3,"IX_Column",false,true],
    [7,4,"PK_Indexes",true,true],[8,4,"IX_Index",false,true],
    [9,5,"PK_IndexesColumns",true,true],
    [10,6,"PK_ForeingKeys",true,true],[11,6,"IX_ForeingKey",false,true]
];
tables[4].data = [
    [1,1,true],[2,2,true],
    [3,3,true],[4,4,true],
    [5,5,true],[6,6,true],[6,7,true],
    [7,9,true],[8,11,true],
    [9,14,true],[9,15,true],
    [10,18,true],[11,19,true]
];

function addtable(tablename, columnas, indexes, foreingkeys){
    
    
}
function addrow(table, row){
    
}