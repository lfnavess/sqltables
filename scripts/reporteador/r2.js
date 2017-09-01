if (!String.prototype.trimSingleLine) {
    //http://stackoverflow.com/questions/498970/how-do-i-trim-a-string-in-javascript
    String.prototype.trimSingleLine = function() {
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
if (!String.prototype.accentFold) {
    //https://stackoverflow.com/questions/5700636/using-javascript-to-perform-text-matches-with-without-accented-characters
    String.prototype.accentFold = function() {
        return this.replace(
            /([àáâãäåāăąǎǟǡǻȁȃȧⱥɐḁẚạảấầẩẫậắằẳẵặɑɒ])|([ƀɓƃʙḃḅḇ])|([çćĉċčƈȼɕʗ])|([ďđɖɗƌȡḋḍḏḑḓ])|([èéêëēĕėęěǝȅȇȩɇɛɜɝɞḕḗḙḛẹẻẽếềểễệɘʚ])|([ƒḟ])|([ĝğġģɠǥǧǵɡɢʛḡɣɤ])|([ĥħȟɥɦʜḣḥḧḩḫẖ])|([ìíîïĩīĭįıǐȉȋɨɪḭḯỉị])|([ĵǰȷɉɟʄʝ])|([ķƙǩʞḱḳḵ])|([ĺļľŀłƚȴɫɬɭʟḷḹḻḽ])|([ɯɰɱḿṁṃ])|([ñńņňŉƞǹȵɲɳṅṇṉṋ])|([òóôõöøōŏőơǒǫǭǿȍȏȫȭȯȱɔɵṍṏṑṓọỏốồổỗộớờởỡợωɷ])|([ƥʠṕṗ])|([ɋ])|([ŕŗřȑȓɍɹɺɻɼɽɾɿʀʁṙṛṝṟ])|([ßśŝşšſșȿʂṡṣṥṧṩẛ])|([ţťŧƫƭʈțȶⱦʇṫṭṯṱẗ])|([ùúûüũūŭůűųưǔǖǘǚǜȕȗʉṳṵṷṹṻụủứừửữự])|([ʋʌṽṿ])|([ŵʍẁẃẅẇẉẘ])|([ẋẍ])|([ýÿŷƴȳɏʎʸʏẏẙỳỵỷỹ])|([źżžƶȥɀʐʑẑẓẕ])|([æǣǽ])|([ĳ])/gi,
            function(str, a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, r, s, t, u, v, w, x, y, z, ae, ij) {
                var tmp = a ? "a" : b ? "b" : c ? "c" : d ? "d" : e ? "e" : f ? "f" : g ? "g" : h ? "h" : i ? "i" : j ? "j" : k ? "k" : l ? "l" : m ? "m" : n ? "n" : o ? "o" : p ? "p" : q ? "q" : r ? "r" : s ? "s" : t ? "t" : u ? "u" : v ? "v" : w ? "w" : x ? "x" : y ? "y" : z ? "z" : ae ? "ae" : ij ? "ij" : "";
                return str === str.toUpperCase() ? tmp.toUpperCase() : tmp;
            }
        );
    }
}
if (!Array.prototype.move) {
    //http://stackoverflow.com/questions/5306680/move-an-array-element-from-one-array-position-to-another
    Array.prototype.move = function(old_index, new_index) {
        if (old_index === new_index) { return this; }
        if (new_index >= this.length) {
            var k = new_index - this.length;
            while (k-- + 1) { this.push(undefined); }
        }
        this.splice(new_index, 0, this.splice(old_index, 1)[0]);
        return this; // for testing purposes
    };
}
if (!Array.prototype.insertAt) {
    //http://stackoverflow.com/questions/586182/javascript-insert-item-into-array-at-a-specific-index
    Array.prototype.insertAt = function(item, index) {
        if (index === -1 || index === null || item === undefined) { return this; }
        this.splice(index, 0, item);
        return this;
    };
}

var dn = { null: 1, "NULL": 1, "NOT NULL": 0 };
var tiden = 1;
var tciden = 1;
var t = [];
var aaa = function(a) { return a; }
var bbb = function(b) { b = [tiden++, b]; t.push(b); return b; }
var ccc = function(c) { c.unshift(tciden++); t[0].rows.push(c); return c; }

CREATE_TABLE(
    "Columns",
    [
        ["ColumnID", "int", null, null, "IDENTITY", "NOT NULL", null],
        ["Table", "int", null, null, null, "NOT NULL", null],
        ["column_name", "nvarchar", 50, null, null, "NOT NULL", null],
        ["data_type", "int", null, null, null, "NOT NULL", null],
        ["precision", "int", null, null, null, null, null],
        ["COLLATE", "int", null, null, null, "NOT NULL", null],
        ["IDENTITY", "int", null, null, null, null, null],
        ["NULLS", "bit", null, null, null, "NOT NULL", null]
    ]
);
CREATE_TABLE(
    "Tables",
    [
        ["TableID", "int", null, null, "IDENTITY", "NOT NULL", null],
        ["table_name", "nvarchar", 50, null, null, "NOT NULL", null]
    ]
).rows = t;
CREATE_TABLE(
    "DataTypes",
    [
        ["DataTypeID", "tinyint", null, null, null, "NOT NULL", null],
        ["DataTypeName", "nvarchar", 50, null, null, "NOT NULL", null],
        ["min", "bigint", null, null, null, null, null],
        ["max", "bigint", null, null, null, null, null]
    ]
);
t[2].rows.push([1, "bit", 0, 1]);
t[2].rows.push([2, "tinyint", 0, 255]);
t[2].rows.push([3, "smallint", -32768, 32767]);
t[2].rows.push([4, "int", -2147483648, 2147483647]);
t[2].rows.push([5, "bigint", -9223372036854775808, 9223372036854775807]);
t[2].rows.push([6, "nvarchar", null, null]);
CREATE_TABLE(
    "CONSTRAINTTYPES",
    [
        ["CONSTRAINTTYPEID", "tinyint", null, null, null, "NOT NULL", null],
        ["CONSTRAINTTYPE", "nvarchar", 50, null, null, "NOT NULL", null]
    ]
);
t[3].rows.push([1, "PRIMARY KEY"]);
t[3].rows.push([2, "UNIQUE"]);
t[3].rows.push([3, "FROREING KEY"]);
CREATE_TABLE(
    "CONSTRAINTS",
    [
        ["ConstraintID", "int", null, null, "IDENTITY", "NOT NULL", null],
        ["Table", "int", null, null, null, "NOT NULL", null],
        ["constraint_name", "nvarchar", 50, null, null, "NOT NULL", null],
        ["CONSTRAINTTYPE", "int", null, null, null, "NOT NULL", null]
    ]
);
CREATE_TABLE(
    "CONSTRAINTSCOLUMNS",
    [
        ["Constraint", "int", null, null, null, "NOT NULL", null],
        ["column", "int", null, null, null, "NOT NULL", null],
        ["order", "bit", null, null, null, null, null],
        ["ref_column", "int", null, null, null, null, null]
    ]
);

t[1].cols[0][6] = tiden;
t[0].cols[0][6] = tciden;
aaa = function(a) { return WHERE(t[2], [[t[2].cols[1], a]])[0]; }
bbb = function(b) { return INSERT(t[1], [t[1].cols[1]], [b]); }
ccc = function(c) { return INSERT(t[0], t[0].cols.slice(1), c); }
t[0].rows.forEach(function(r) { r[3] = WHERE(t[2], [[t[2].cols[1], r[3]]])[0]; });

ADDCONSTRAINT("Columns", null, "PRIMARY KEY", [["ColumnID"]], null, null);
ADDCONSTRAINT("Columns", null, "FROREING KEY", [["Table"]], "Tables", ["TableID"]);
ADDCONSTRAINT("Columns", null, "UNIQUE", [["Table"], ["column_name"]], null, null);
ADDCONSTRAINT("Tables", null, "PRIMARY KEY", [["TableID"]], null, null);
ADDCONSTRAINT("Tables", null, "UNIQUE", [["table_name"]], null, null);
ADDCONSTRAINT("DataTypes", null, "PRIMARY KEY", [["DataTypeID"]], null, null);
ADDCONSTRAINT("DataTypes", null, "UNIQUE", [["DataTypeName"]], null, null);
ADDCONSTRAINT("CONSTRAINTTYPES", null, "PRIMARY KEY", [["CONSTRAINTTYPEID"]], null, null);
ADDCONSTRAINT("CONSTRAINTTYPES", null, "UNIQUE", [["CONSTRAINTTYPE"]], null, null);
ADDCONSTRAINT("CONSTRAINTS", null, "PRIMARY KEY", [["ConstraintID"]], null, null);
ADDCONSTRAINT("CONSTRAINTS", null, "FROREING KEY", [["Table"]], "Tables", ["TableID"]);
ADDCONSTRAINT("CONSTRAINTS", null, "UNIQUE", [["constraint_name"]], null, null);
ADDCONSTRAINT("CONSTRAINTSCOLUMNS", null, "FROREING KEY", [["Constraint"]], "CONSTRAINTS", ["ConstraintID"]);
ADDCONSTRAINT("CONSTRAINTSCOLUMNS", null, "FROREING KEY", [["column"]], "Columns", ["ColumnID"]);
ADDCONSTRAINT("CONSTRAINTSCOLUMNS", null, "FROREING KEY", [["ref_column"]], "Columns", ["ColumnID"]);
ADDCONSTRAINT("CONSTRAINTSCOLUMNS", null, "PRIMARY KEY", [["Constraint"], ["column"]], null, null);

CREATE_TABLE(
    "Puestos",
    [
        ["PuestoID", "smallint", null, null, "IDENTITY", "NOT NULL", [[null, "PRIMARY KEY", null, null]]],
        ["Puesto", "nvarchar", 50, null, null, "NOT NULL", [[null, "UNIQUE", null, null]]]
    ]
);
CREATE_TABLE(
    "Colaboradores",
    [
        ["Colaborador ID", "int", null, null, "IDENTITY", "NOT NULL", [[null, "PRIMARY KEY", null, null]]],
        ["Nombre(s)", "nvarchar", 50, null, null, "NOT NULL", null],
        ["Apellido paterno", "nvarchar", 50, null, null, "NOT NULL", null],
        ["Apellido materno", "nvarchar", 50, null, null, "NULL", null],
        ["Puesto", "smallint", null, null, null, "NULL", [[null, "FROREING KEY", "Puestos", "PuestoID"]]],
        ["Email", "nvarchar", 50, null, null, "NULL", [[null, "UNIQUE", null, null]]]
    ]
);

function trns(val) {
    if (typeof val === "string") { val = val.trimSingleLine(); }
    if (!val && val !== 0) { val = null; }

}

INSERT("Puestos", ["Puesto"], ["JEFE DE CAPACITACION"]);
INSERT(
    "Colaboradores",
    ["Nombre(s)", "Apellido paterno", "Apellido materno", "Puesto", "Email"],
    ["Albert Gonzalo", "Mejía", "Rodríguez", 1, "agmejiar@ppg.com"]
);

function ADDCONSTRAINT(table, name, type, cols, reftable, refcols) {
    if (typeof table === "string") { table = WHERE(t[1], [[t[1].cols[1], table]])[0]; }
    if (typeof type === "string") { type = WHERE(t[3], [[t[3].cols[1], type]])[0]; }
    if (typeof reftable === "string") { reftable = WHERE(t[1], [[t[1].cols[1], reftable]])[0]; }
    cols.forEach(function(c, i) { if (typeof c[0] === "string") { cols[i][0] = WHERE(t[0], [[t[0].cols[1], table], [t[0].cols[2], c[0]]])[0]; } });
    if (!name) { name = "{0}_{1}{2}".format(type[0] === 1 ? "PK" : type[0] === 2 ? "IX" : "FK", table[1], type[0] === 1 ? "" : "_{0}".format(cols[0][0][2])); }
    var constr = INSERT(t[4], t[4].cols.slice(1), [table, name, type]);
    table.constraints.push(constr);
    constr.ccols = cols.map(function(c, i) {
        if (!c[0].constraints) { c[0].constraints = []; }
        c[0].constraints.push(constr);
        if (type[0] === 3) {
            if (typeof refcols[i] === "string") { refcols[i] = WHERE(t[0], [[t[0].cols[1], reftable], [t[0].cols[2], refcols[i]]])[0]; }
            if (!refcols[i].constraints.find(function(cc){ return cc[3][0] < 3; })){ throw("FK contraint is not unique"); }
            return INSERT(t[5], ["Constraint", "column", "ref_column"], [constr, c[0], refcols[i]]);
        }
        if (c[1] === undefined) { c[1] = 1; }
        return INSERT(t[5], ["Constraint", "column", "order"], [constr, c[0], c[1]]);
    });
    if (type[0] === 1) {
        constr.rows = table.rows;
        for (var ai = 1, a, s, i, r = true; ai < table.rows.length; ai++) {
            a = table.rows[ai];
            if (cddc(constr, a, table.rows[ai - 1]) > 0) { continue; }
            for (s = 0, e = ai - 1; s <= e;) {
                i = s + Math.round((e - s) / 2);
                r = cddc(constr, a, table.rows[i]);
                if (r > 0) { s = i + 1; } else if (r) { e = i - 1; } else { s = i; break; }
            }
            if (!r) { throw ("Valor duplicado"); break; }
            table.rows.move(ai, s);
        }
    } else if (type[0] === 2) {
        constr.rows = [];
        for (var alln = cdde(constr), ai = 0, a, s, e, i, r = true; ai < table.rows.length; ai++) {
            a = table.rows[ai];
            if (alln && cddd(constr, a)) { continue; }
            for (s = 0, e = constr.rows.length - 1; s <= e;) {
                i = s + Math.round((e - s) / 2);
                r = cddc(constr, a, constr.rows[i]);
                if (r > 0) { s = i + 1; } else if (r) { e = i - 1; } else { s = i; break; }
            }
            if (!r) { throw ("Valor duplicado"); break; }
            constr.rows.insertAt(a, s);
        }
    } else { cols[0][0].FK = refcols[0]; }
    return constr;
}
function cddc(cn, a, b) {
    for (var ci = 0, r = 0; ci < cn.ccols.length && !r; ci++) {
        r = cddf(cn.ccols[ci][1]);
        r = compare(cn.ccols[ci], a[r], b[r]);
    }
    return r;
}
function cddd(cn, a) {
    for (var ci = 0, r = false; ci < cn.ccols.length && !r; ci++) { r = a[cddf(cn.ccols[ci][1])] === null; }
    return r;
}
function cdde(cn) {
    for (var ci = 0, r = 0; ci < cn.ccols.length && !r; ci++) { r = cn.ccols[ci][1][7]; }
    return r;
}
function cddf(col) { return col[1].cols.indexOf(col); }
function getval(row, col){ return row[col[1].cols.indexOf(col)]; }
function compare(cnc, a, b) {
    if (cnc[1].FK) { a = a.length ? a[cddf(cnc[1].FK)] : a; b = b.length ? b[cddf(cnc[1].FK)] : b; }
    a = collate(cnc[1][5], a); b = collate(cnc[1][5], b);
    return a === null ? -1 : b === null ? 1 : (a > b ? 1 : a < b ? -1 : 0) * cnc[2];
}
function collate(collate, v) {
    if (typeof v === "string") { return v.toLocaleUpperCase().accentFold(); }
    return v;
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
    var row = [];
    for(var cí = 0,c; ci < table.cols.length; c++){
        c = table.cols[ci];
        var val2;
        if (row[ci].length) { val2 = row[ci]; row[ci] = row[ci][cddf(c.FK)]; }
        if (c[6]) { row[ci] = c[6]++; } else { row[ci] = vals[cols.indexOf(c)]; }
        if (typeof row[ci] === "string") { row[ci] = row[ci].trimSingleLine(); }
        if (!row[ci] && row[ci] !== 0) { row[ci] = null; if (!c[7]) { throw ("Value required"); } }
        else {
            if (c[3][1] === "nvarchar") {
                if (typeof row[ci] !== "string") { row[ci] = row[ci] + ""; }
                if (row[ci].length > c[4]) { throw ("Maxlength value reached"); }
            } else {
                if (isNaN(row[ci])) { throw ("Value is not a number"); } else if (typeof row[ci] !== number) { row[ci] = Number(row[ci]); }
                if (row[ci] < c[3][2]) { throw ("Min value reached"); }
                else if (row[ci] > c[3][3]) { throw ("Max value reached"); }
            }
            for (var i = 0, cc; i < c.constraints.length; i++) {
                cc = c.constraints[i];
                if (cc.rows.length !== 1 && cc[2] === 3) { continue; }
                if(testcons(c.constraints[i], row)){};
            }
            if (c.FK) {
                val = val2 || WHERE(c.FK[1], [[c.FK, val]])[0];
                if (!val) { throw ("Valor no existente en Foreing Key") };
            }
        }
        return val;
    });
    var constr = table.constraints.find(function(co) { return co[2] === 1; });
    if (constr) {
        for (var s = 0, e = constr.rows.length - 1, i, r; s <= e;) {
            i = s + Math.round((e - s) / 2);
            r = cddc(constr, vals, constr.rows[i]);
            if (r > 0) { s = i + 1; } else if (r) { e = i - 1; } else { s = i; break; }
        }
        if (!r) { throw ("Valor duplicado"); break; }
        constr.rows.insertAt(vals, s);
    } else { table.rows.push(vals); }
    return vals;
}
function testcons(constr, row){
    var aaa = [];
    if(constr[3] < 3){ aaa[1] = dsfdsd(constr, row)[0]; }
    return WHERE(constr[3][1], [[constr[3], getval(row, constr[1])]])[0];
}
function preparecontraint(constr){
    constr.ready = true;
    for(var alln = cdde(constr), i = 0, row; i < constr[1].rows.length; i++){
        row = constr[1].rows[i];
        if (alln && cddd(constr, row)) { continue; }
        var  r = dsfdsd(constr, row, constr[1] === 1 ? i : null);
        if (r[0]) { throw ("Valor duplicado"); break; }
        if(constr[1] === 1){ table.rows.move(i, r[1]); }
        else{ constr.rows.insertAt(row, r[1]); }
    }
    return constr;
}
function dsfdsd(constr, row, e){
    if(!e && e != 0){ e =  constr.rows.length - 1; }
    if(!constr.ready){ preparecontraint(constr); }
    for (var s = 0, i, r, t; s <= e;) {
        i = s + Math.round((e - s) / 2);
        t = constr.rows[i];
        r = cddc(constr, row, t);
        if (r > 0) { s = i + 1; } else if (r) { e = i - 1; } else { s = i; break; }
    }
    return [!r ? t : null, s];
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

function CREATE_TABLE(table, column_definition, table_constraint) {
    if (t.length > 0 && tablestr(table)) { showAlert("Tablename exist allready"); }
    table = bbb(table); table.rows = []; table.constraints = [];
    table.cols = column_definition.map(function(c) {
        if (c[3] === null) { c[3] = 1; }
        if (c[4]) { c[4] = 1; }
        var c1 = ccc([table, c[0], aaa(c[1]), c[2], c[3], c[4], dn[c[5]]]);
        if (c[6]) { c1.constraints = c[6].map(function(cc) { return ADDCONSTRAINT(table, cc[0], cc[1], [[c1]], cc[2], [cc[3]]); }); }
        return c1;
    });
    table_constraint && table_constraint.forEach(function(cc) { ADDCONSTRAINT(table, cc[0], cc[1], cc[2], cc[3], cc[4]); });
    return table;
}

function showAlert(message) {
    alert(message + "");
}