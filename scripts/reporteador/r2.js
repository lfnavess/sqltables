if(!String.prototype.trimSingleLine){
    //http://stackoverflow.com/questions/498970/how-do-i-trim-a-string-in-javascript
    String.prototype.trimSingleLine = function () {
        return this.replace(/^\s+|\s+$/g, '').replace(/\s+/g, ' ');
    };
}
if (!String.prototype.format) {
    //http://stackoverflow.com/questions/18405736/is-there-a-c-sharp-string-format-equivalent-in-javascript
    String.prototype.format = function() {
        var args = arguments;
        return this.replace(/{(\d+)}/g, function(match, number) { return typeof args[number] !== undefined ? args[number] : match; });
    };
}


var dn = { null: 1, "NULL": 1, "NOT NULL": 0 };
var tiden = 1;
var tciden = 1;
var t = [];
var aaa = function(a) { return a; }
var bbb = function(b) {  b = [tiden++, b]; t.push(b); return b; }
var ccc = function (c) { c.unshift(tciden++); t[0].rows.push(c); return c; }

addtable(
    "Columns",
    [
        ["ColumnID", "int", null, null, "IDENTITY", "NOT NULL", "PRIMARY KEY"],
        ["Table", "int", null, null, null, "NOT NULL", "Tables"],
        ["column_name", "nvarchar", 50, null, null, "NOT NULL", null],
        ["data_type", "int", null, null, null, "NOT NULL", "DataTypes"],
        ["precision", "int", null, null, null, null, null],
        ["COLLATE", "int", null, null, null, "NOT NULL", null],
        ["IDENTITY", "int", null, null, null, null, null],
        ["NULLS", "bit", null, null, null, "NOT NULL", null],
        ["CONSTRAINTTYPE", "int", null, null, null, null, "CONSTRAINTTYPES"]
    ]
);
addtable(
    "Tables",
    [
        ["TableID", "int", null, null, "IDENTITY", "NOT NULL", "PRIMARY KEY"],
        ["table_name", "nvarchar", 50, null, null, "NOT NULL", "UNIQUE"]
    ]
).rows = t;
addtable(
    "DataTypes",
    [
        ["DataTypeID", "tinyint", null, null, null, "NOT NULL", "PRIMARY KEY"],
        ["DataTypeName", "nvarchar", 50, null, null, "NOT NULL", "UNIQUE"],
        ["min", "bigint", null, null, null, null, null],
        ["max", "bigint", null, null, null, null, null]
    ]
);
t[2].rows.push([1,"bit",0,1]);
t[2].rows.push([2,"tinyint",0,255]);
t[2].rows.push([3,"smallint",-32768, 32767]);
t[2].rows.push([4,"int",-2147483648, 2147483647]);
t[2].rows.push([5,"bigint",-9223372036854775808, 9223372036854775807]);
t[2].rows.push([6,"nvarchar",null,null]);
addtable(
    "CONSTRAINTTYPES",
    [
        ["CONSTRAINTTYPEID", "tinyint", null, null, null, "NOT NULL", "PRIMARY KEY"],
        ["CONSTRAINTTYPE", "nvarchar", 50, null, null, "NOT NULL", "UNIQUE"]
    ]
);
t[3].rows.push([1,"PRIMARY KEY"]);
t[3].rows.push([2,"UNIQUE"]);
t[3].rows.push([3,"FROREING KEY"]);
addtable(
    "CONSTRAINTS",
    [
        ["ConstraintID", "int", null, null, "IDENTITY", "NOT NULL", "PRIMARY KEY"],
        ["Table", "int", null, null, null, "NOT NULL", "Tables"],
        ["constraint_name", "nvarchar", 50, null, null, "NOT NULL", "UNIQUE"],
        ["CONSTRAINTTYPE", "int", null, null, null, "NOT NULL", "CONSTRAINTTYPES"]
    ]
);
addtable(
    "CONSTRAINTSCOLUMNS",
    [
        ["Constraint", "int", null, null, null, "NOT NULL", "CONSTRAINTS"],
        ["column", "int", null, null, null, "NOT NULL", "Columns"],
        ["order", "bit", null, null, null, "NOT NULL", null],
        ["ref_column", "int", null, null, null, null, "Columns"]
    ],
    [[null, "PRIMARY KEY", [["Constraint"], ["Column"]]]]
);

t[1].cols[0][6] = tiden;
t[0].cols[0][6] = tciden;
aaa = function(a) { return WHERE(t[3], [["DataTypeName", a]]); }
bbb = function(b) { b = INSERT(t[1], [t[1].cols[1]], [b]); return b; }
ccc = function(c) { c = INSERT(t[0], t[0].cols.slice(1), c); return c; }

ADDCONSTRAINT("Columns", undefined, "PRIMARY KEY", [["ColumnID"]], null, null);
ADDCONSTRAINT("Columns", undefined, "UNIQUE", [["Table"], ["column_name"]], null,null);
ADDCONSTRAINT("Columns", undefined, "FROREING KEY", [["Table"]], "Tables", [["TableID"]]);
ADDCONSTRAINT("Tables", undefined, "PRIMARY KEY", [["TableID"]], null, null);
ADDCONSTRAINT("Tables", undefined, "UNIQUE", [["table_name"]], null, null);

addtable("Puestos", [["PuestoID", 1], ["Puesto", 2]], [["PK_Puesto", true, true, [["PuestoID"]]], ["IX_Puesto", false, true, [["Puesto"]]]]);

function trns(val){
    if (typeof val === "string"){ val = val.trimSingleLine(); }
    if (!val && val !== 0){ val = null; }
    
}
function ADDCONSTRAINT(table, name, type, cols, reftable, refcols) {
    if (typeof table === "string") { table = WHERE(t[1], [[t[1].cols[1], table]])[0]; }
    if (typeof type === "string") { type = WHERE(t[3], [[t[3].cols[1], type]])[0]; }
    cols.forEach(function(c, i) { if (typeof c[0] === "string") { cols[i][0] = WHERE(t[0], [[t[0].cols[1], table],[t[0].cols[2], c[0]]]); } });
    if (!name) {
        name = "{0}_{1}{2}".format(
            type[0] === 1 ? "PK" : type[0] === 2 ? "IX" : "FK",
            table[1],
            type[0] === 1 ? "" : "_{0}".format(cols[0][2])
        );
    }
    var constr = INSERT(t[4], ["Table", "constraint_name", "CONSTRAINTTYPE"], [table, name, type]);
    table.constraints.push(constr);
    constr.ccols = cols.map(function(c) { return INSERT(t[5], ["Constraint", "column", "order"], [constr, c[0], 1]); });
    return constr;
}
function WHERE(table, conditions) {
    table = tablestr(table);
    conditions.forEach(function(c) { c[0] = colstr(table, c[0]); });
    var rs = [];
    var con = table.constraints.find(function(c) {
        return (c[3] === 1 || c[3] === 2) && c.constcols.every(function(cc) { return conditions.find(function(con) { return con[0] === cc; }); });
    });
    table.rows.forEach(function(r) { if (conditions.every(function(c) { return r[table.cols.indexOf(c[0])] === c[1]; })) { rs.push(r); } });
    if (con) { return rs[0]; }
    return rs;
}
function INSERT(table, cols, vals) {
    table = tablestr(table);
    cols = cols.map(function(c) { return colstr(table, c); });
    vals = table.cols.map(function(c) {
        var val;
        if (c[6]) { val = c[6]++; } else { val = vals[cols.indexOf(c)]; }
        if (typeof val === "string"){ val = val.trimSingleLine(); }        
        if (!val && val !== 0) { val = null; if (!c[7]) { showAlert("Value required"); } }
        else if(c[3][1] === "nvarchar"){
            if(typeof val !== "string"){ val = val + ""; }
            if(val.length > c[4]){ showAlert("Maxlength value reached"); }
        } else {
            if(isNaN(val)){ showAlert("Value is not a number"); } else { val = Number(val); }
            if(val < c[3][2]){ showAlert("Min value reached"); }
            else if(val > c[3][3]){ showAlert("Max value reached"); }
        }
        return val;
    });
    table.rows.push(vals);
    return vals;
}
function SELECT(table, row, cols) {
    row = cols.map(function(c) { return row[table.cols.indexOf(colstr(table, c))]; });
    if (row.length === 1) { return row[0]; }
    return row;
}
function tablestr(table) {
    if (typeof table === "string") { table = t.find(function(t) { return t[1] === table; }); }
    else if (typeof table === "number") { table = t[table]; }
    return table;
}
function colstr(table, c) {
    if (typeof c === "string") { c = table.cols.find(function(cc) { return cc[2] === c; }); }
    else if (typeof c === "number") { c = table.cols[c]; }
    return c;
}
//"Latin1_General_CS_AS";


function addtable(table, column_definition, table_constraint) {
    if (t.length > 0 && tablestr(table)) { showAlert("Tablename exist allready"); }
    table = bbb(table); table.rows = []; table.constraints = [];
    table.cols = column_definition.map(function(c) {
        if (c[3] === null) { c[3] = 1; }
        if (c[4]) { c[4] = 1; }
        c = ccc([table, c[0], aaa(c[1]), c[2], c[3], c[4], dn[c[5]], c[6]]);
        if (false) {
            var ct = c[5] === "PRIMARY KEY" ? 1 : c[5] === "UNIQUE" ? 2 : 3;
            var cname = "{0}_{1}{2}".format(ct === 1 ? "PK" : ct === 2 ? "IX" : "FK", tablename, ct === 1 ? "" : "_{0}".format(c[2]));
            var cid = t[3].INSERT(["Table", "constraint_name", "CONSTRAINTTYPE"], [tableid, cname, ct]).SELECT("ConstraintID");
            var ccrid = ct === 3 ? ccrid = c[2].WHERE([["Table", c[7]], ["CONSTRAINTTYPE", 1]]).SELECT("ColumnID") : null;
            var co = c[7] === 1 || c[7] === 2 ? 1 : null;
            t[4].INSERT(["Constraint", "column", "ref_column", ""], [cid, coid, ccrid, co]);
        }
        return c;
    });
    //table_constraint.forEach(function(c) {
    //    if (c[0] === undefined) { c[0] = "{0}_{1}{2}".format(ct === 1 ? "PK" : ct === 2 ? "IX" : "FK", tablename, ct === 1 ? "" : "_{0}".format(c[2])); }
    //    c[1] = c[1] === "PRIMARY KEY" ? 1 : c[1] === "UNIQUE" ? 2 : 3;
    //    var cid = t[3].INSERT(["Table", "constraint_name", "CONSTRAINTTYPE"], [tableid, cname, ct]).SELECT("ConstraintID");
    //    c[2].every(function(co) {
    //        c[0] = t.WHERE([["table_name", "Columns"]]).rows.WHERE([["Table", tableid], ["column_name", co[0]]]).SELECT("ColumnID");
    //        c[1] = (c[0] === 1 || c[0] === 2) && c[1] === undefined ? 1 : null;
    //        t[4].INSERT(["Constraint", "column", "ref_column", "order"], [cid, c[0], null, c[1]]);
    //    });
    //});
    return table;
}

function showAlert(message) {
    alert(message + "");
}