if (!Array.prototype.WHERE) {
    Array.prototype.WHERE = function(search_condition){ return this[search_condition[0]] === search_condition[1];}
}



var tiden = 1;
var tciden = 1;
var t = [];
addtable(
    "Tables",
    [
        ["TableID","INT",undefined,"IDENTITY","NOT NULL","PRIMARY KEY"],
        ["table_name","NVARCHAR(50)",undefined,undefined,"NOT NULL","UNIQUE"]
    ]
);
addtable(
    "DataTypes",
    [
        ["DataTypeID","INT",undefined,"IDENTITY","NOT NULL","PRIMARY KEY"],
        ["DataTypeName","NVARCHAR(50)",undefined,undefined,"NOT NULL","UNIQUE"]
    ]
);
addtable(
    "CONSTRAINTTYPES",
    [
        ["CONSTRAINTTYPEID","INT",undefined,"IDENTITY","NOT NULL","PRIMARY KEY"],
        ["CONSTRAINTTYPE","NVARCHAR(50)",undefined,undefined,"NOT NULL","UNIQUE"]
    ]
);
adtable(
    "Columns",
    [
        ["ColumnID","INT",undefined,"IDENTITY","NOT NULL","PRIMARY KEY"],
        ["Table","INT",undefined,undefined,"NOT NULL","Tables"],
        ["column_name","NVARCHAR(50)",undefined,undefined,"NOT NULL",undefined],
        ["data_type","INT",undefined,undefined,"NOT NULL","DataTypes"],
        ["COLLATE","INT",undefined,undefined,"NOT NULL",undefined],
        ["IDENTITY","BIT",undefined,undefined,undefined,undefined],
        ["NULLS","BIT",undefined,undefined,"NOT NULL",undefined],
        ["CONSTRAINTTYPE","INT",undefined,undefined,undefined,"CONSTRAINTTYPES"]
    ],
    [[undefined,"UNIQUE",[["Table"],["column_name"]]]]
);
addtable(
    "CONSTRAINTS",
    [
        ["ConstraintID","INT",undefined,"IDENTITY","NOT NULL","PRIMARY KEY"],
        ["Table","INT",undefined,undefined,"NOT NULL","Tables"],
        ["constraint_name","NVARCHAR(50)",undefined,undefined,"NOT NULL","UNIQUE"],
        ["CONSTRAINTTYPE","INT",undefined,undefined,"NOT NULL","CONSTRAINTTYPES"]
    ]
);
addtable(
    "CONSTRAINTSCOLUMNS",
    [
        ["Constraint","INT",undefined,undefined,"NOT NULL","CONSTRAINTS"],
        ["column","INT",undefined,undefined,"NOT NULL","Columns"],
        ["ref_column","INT",undefined,undefined,undefined,"Columns"],
        ["order","BIT",undefined,undefined,undefined,undefined]
    ],
    [[undefined,"PRIMARY KEY",[["Constraint"],["Column"]]]]
);

addtable("Puestos",[["PuestoID",1],["Puesto",2]],[["PK_Puesto",true,true,[["PuestoID"]]],["IX_Puesto",false,true,[["Puesto"]]]]);

function INSERT(array, cols, vals){
    var r = cols.map(function(c,i){ return vals[i]; });
    array.push(r);
    return r;
}
function SELECT(table,row,cols){
    cols = cols.map(function(c){ return a(c); });
    if(cols.length === 1){ return cols[0]; }
    return cols;
    function a(col){ return row[col]; }
}
//"Latin1_General_CS_AS";

function addtable(tablename, column_definition, table_constraint){
    if(t.length > 0 && t.find(function(t){ return t[1] === tablename; })){ showAlert("Tablename exist allready"); }
    var tableid = SELECT(undefined, INSERT(t,[0,1],[tiden++,tablename]),[0]);
    column_definition.every(function(c){
        if(c[4] === undefined){ c[4] = 1; }
        if(c[6] === undefined){ c[6] = true; }
        var coid = SELECT(undefined, INSERT(
            t[2],
            ["ColumnID","Table","column_name","data_type","COLLATE","IDENTITY","NULLS"],
            [tciden++,tableid,c[2],c[3],c[4],c[5],c[6]]
        ),[0]);
        if(c[7]){
            var ct = c[7]==="PRIMARY KEY"?1:c[7]==="UNIQUE"?2:3;
            var cname = "{0}_{1}{2}".format(ct===1?"PK":ct===2?"IX":"FK",tablename,ct===1?"":"_{0}".format(c[2]));
            var cid = t[3].INSERT(["Table","constraint_name","CONSTRAINTTYPE"],[tableid,cname,ct]).SELECT("ConstraintID");
            var ccrid = ct === 3 ? ccrid = c[2].WHERE([["Table",c[7]],["CONSTRAINTTYPE",1]]).SELECT("ColumnID") : null;
            var co = c[7] === 1 || c[7] === 2 ? 1 : null;
            t[4].INSERT(["Constraint","column","ref_column",""],[cid,coid,ccrid,co]);
        }
    });
    table_constraint.every(function(c){
        if(c[0] === undefined){ c[0] = "{0}_{1}{2}".format(ct===1?"PK":ct===2?"IX":"FK",tablename,ct===1?"":"_{0}".format(c[2])); }
        c[1] = c[1]==="PRIMARY KEY"?1:c[1]==="UNIQUE"?2:3;
        var cid = t[3].INSERT(["Table","constraint_name","CONSTRAINTTYPE"],[tableid,cname,ct]).SELECT("ConstraintID");
        c[2].every(function(co){
            c[0] = t.WHERE([["table_name","Columns"]]).rows.WHERE([["Table",tableid],["column_name",co[0]]]).SELECT("ColumnID");
            c[1] = (c[0] === 1 || c[0] === 2) && c[1] === undefined ?  1 : null;
            t[4].INSERT(["Constraint","column","ref_column","order"],[cid,c[0],null,c[1]]);
        });
    });
}
function addrow(table, row){
    
}

function showAlert(message){
    alert(message + "\ncomunicate a Red Educativa:\n    (+52 55) 1669-3455 ext. 3455\n    rededucativa@ppg.com");
}