
if (!String.prototype.trimSingleLine) {
    //http://stackoverflow.com/questions/498970/how-do-i-trim-a-string-in-javascript
    String.prototype.trimSingleLine = function() {
        return this.replace(/^\s+|\s+$/g, '').replace(/\s+/g, ' ');
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
    };
}
if (!Array.prototype.move) {
    //http://stackoverflow.com/questions/5306680/move-an-array-element-from-one-array-position-to-another
    Array.prototype.move = function(old_index, new_index) {
        if (old_index === new_index) { return this; }
        if (new_index >= this.length) {
            var k = new_index - this.length;
            while (k-- + 1) { this.push(null); }
        }
        this.splice(new_index, 0, this.splice(old_index, 1)[0]);
        return this;
    };
}
if (!Array.prototype.removeAt) {
    Array.prototype.removeAt = function(count = 1, index) {
        this.splice(index, count);
        return this;
    };
}
if (!Array.prototype.insertAt) {
    //http://stackoverflow.com/questions/586182/javascript-insert-item-into-array-at-a-specific-index
    Array.prototype.insertAt = function(item, index) {
        if (index < 0 || !index && index !== 0) { return this; }
        this.splice(index, 0, item);
        return this;
    };
}
if (!Array.prototype.compare) {
    Array.prototype._compare = (new Intl.Collator(undefined, { sensitivity: 'base', numeric: true })).compare;
    Array.prototype.compare = function(a = null, b = null, order = 1) {
        if (!a && a !== 0 && a !== null) { a = null; }
        if (!b && b !== 0 && b !== null) { b = null; }
        return a === null ? b === null ? 0 : 1 : b === null ? -1 : this._compare(a, b) * order;
    };
}

class binaryArray extends Array {
    indexOf(searchElement, fromIndex = 0) {
        //https://oli.me.uk/2013/06/08/searching-javascript-arrays-with-a-binary-search/
        if (!this.ready) { this.sort(); }
        delete this.b;
        for (var e = this.length - 1, i, b, r, r0; fromIndex <= e;) {
            i = fromIndex + e >> 1;
            b = this[i];
            r = this.compare(searchElement, b);
            if (r > 0) { fromIndex = i + 1; } else if (r) { e = i - 1; } else { e = i - 1; r0 = i; this.b = b; }
        }
        this.s = fromIndex;
        return r0 >= 0 ? r0 : -1;
    }
    lastIndexOf(searchElement, fromIndex = this.length - 1) {
        if (!this.ready) { this.sort(); }
        delete this.b;
        for (var s = 0, i, b, r, r0; s <= fromIndex;) {
            i = s + fromIndex >> 1;
            b = this[i];
            r = this.compare(searchElement, b);
            if (r > 0) { s = i + 1; } else if (r) { fromIndex = i - 1; } else { s = i + 1; r0 = i; this.b = b; }
        }
        this.s = s;
        this.se = searchElement;
        return r0 >= 0 ? r0 : -1;
    }
    sort(compareFunction) {
        if (compareFunction) { this.compare = compareFunction; if (this.ready) { return; } }
        this.ready = true;
        for (var i = 0, val; i < this.length; i++) {
            val = this[i];
            if (this.lastIndexOf(val, i - 1) >= 0 && this.unique) { throw `value '${val}' already exist`; }
            this.move(i, this.s);
        }
        delete this.s;
        delete this.b;
        return this;
    }
    push(element) {
        for (var i = 0, val; i < arguments.length; i++) {
            val = arguments[i];
            if (this.lastIndexOf(val) >= 0 && this.unique) { throw `value '${val}' already exist`; }
            this.insertAt(arguments[i], this.s);
        }
        delete this.s;
        delete this.b;
        return this.length;
    }
    unshift(element) {
        for (var i = 0, val; i < arguments.length; i++) {
            val = arguments[i];
            if (this.indexOf(val) >= 0 && this.unique) { throw `value '${val}' already exist`; }
            this.insertAt(arguments[i], this.s);
        }
        delete this.s;
        delete this.b;
        return this.length;
    }
    compare(a = null, b = null, order = 1) {
        if (!a && a !== 0 && a !== null) { a = null; }
        if (!b && b !== 0 && b !== null) { b = null; }
        return a === null ? b === null ? 0 : 1 : b === null ? -1 : binaryArray.compare(a, b) * order;
    }
}
binaryArray.compare = (new Intl.Collator(undefined, { sensitivity: 'base', numeric: true })).compare;

class rows extends binaryArray {
    sort() {
        var rows = this;
        rows.ready = true;
        var t = rows.constr[3][0] === 1;
        for (var alln = cdde(rows.constr), i = 0, row; i < rows.constr[1].rows.length; i++) {
            row = rows.constr[1].rows[i];
            if (rows.tesnull(row)) { if (!alln) { throw "Value NULL not allowed"; } continue; }
            if (rows.lastIndexOf(row, t ? i - 1 : undefined) >= 0) { throw "Value not unique"; }
            if (t) { rows.move(i, rows.s); } else { rows.insertAt(row, rows.s); }
        }
        return this;
    }
    compare(a, b) {
        for (var i = 0, r = 0, ia, ib; i < this.ind.length && !r; i++) {
            r = this.ind[i];
            ia = a ? a[r[1]] : null;
            ib = b ? b[r[1]] : null;
            if (r[0].FK) {
                ia = !ia && ia !== 0 ? null : Array.isArray(ia) ? ia[cddf(r[0].FK)] : ia;
                ib = !ib && ib !== 0 ? null : Array.isArray(ib) ? ib[cddf(r[0].FK)] : ib;
            }
            r = r[0].compare(ia, ib, r[2]);
        }
        return r;
    }
    tesnull(row) {
        for (var i = 0, r; i < this.ind.length; i++) {
            r = row[this.ind[i][1]];
            if (!r && r !== 0 && r !== null) { r = row[this.ind[i][1]] = null; return true; }
        }
    }
    set constr(constr) {
        if (constr[3][0] <= 2) { this.unique = true; }
        this._c = constr;
        this.ind = this.constr.ccols.map(c => [c[1], cddf(c[1]), [2]]);
        if (this.ready) { this.sort(); }
    }
    get constr() { return this._c; }
}

var dn = { null: 1, "NULL": 1, "NOT NULL": 0 };
var tiden = 1;
var tciden = 1;
var t = new rows;
var aaa = function(a) { return a; };
var bbb = function(b) { b = [tiden++, b]; t[t.length] = b; return b; };
var ccc = function(c) { c.unshift(tciden++); t[0].rows[t[0].rows.length] = c; return c; };
var Collator = new Intl.Collator("es-MX", { sensitivity: 'base', numeric: true });
var funcs = {
    MAX: class MAX {
        constructor(expresion) { this.e = expresion; this.rs = []; this._v = null; }
        set v(f) {
            this.rs.push(f);
            f = this.e(f);
            if (f === null) { return; }
            if (this._v === null || compare(f, this._v) > 0) { this._v = f; }
        }
        get v() { return this._v; }
    },
    MIN: class MIN {
        constructor(expresion) { this.e = expresion; this.rs = []; this._v = null; }
        set v(f) {
            this.rs.push(f);
            f = this.e(f);
            if (f === null) { return; }
            if (compare(f, this._v) < 0) { this._v = f; }
        }
        get v() { return this._v; }
    },
    AVG: class AVG {
        constructor(expresion) { this.e = expresion; this.rs = []; this.s = 0; this.c = 0; this._v = null; }
        set v(f) {
            this.rs.push(f);
            f = this.e(f);
            if (f === null) { return; }
            this.s += f; this.c++; this._v = this.s / this.c;
        }
        get v() { return this._v; }
    },
    COUNT: class COUNT {
        constructor(unique, expresion) { this.e = expresion; this.rs = new binaryArray; this.rs.unique = true; this._v = null; this.u = unique ? [] : null; }
        set v(f) {
            this.rs.push(f);
            f = this.e(f);
            if (f === null) { return; }
            if (!this._v) { this._v = 0; }
            if (this.u) {
                if (this.u.indexOf(f) < 0) { this.u.insertAt(f, this.u.s); this._v++; }
            } else { this._v++; }
        }
        get v() { return this._v; }
    }
};


CREATE_TABLE(
    "Columns",
    [
        ["ColumnID", "int", null, null, "IDENTITY", "NOT NULL", null],
        ["Table", "int", null, null, null, "NOT NULL", null],
        ["column_name", "nvarchar", 128, null, null, "NOT NULL", null],
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
t[2].rows[0] = [1, "bit", 0, 1];
t[2].rows[1] = [2, "tinyint", 0, 255];
t[2].rows[2] = [3, "smallint", -32768, 32767];
t[2].rows[3] = [4, "int", -2147483648, 2147483647];
t[2].rows[4] = [5, "bigint", -9223372036854775808, 9223372036854775807];
t[2].rows[5] = [6, "nvarchar", null, null];
t[2].rows[6] = [7, "date", -62135575200000, 253402236000000];
t[2].rows[7] = [8, "smalldatetime", -2208967200000, 3453339599000];
t[2].rows[8] = [9, "datetime", -6847783200000, 253402322399997];
t[2].rows[9] = [10, "duration", -2208967200000, 3453339599000];
t[2].rows[10] = [11, "promedio", null, null];
CREATE_TABLE(
    "CONSTRAINTTYPES",
    [
        ["CONSTRAINTTYPEID", "tinyint", null, null, null, "NOT NULL", null],
        ["CONSTRAINTTYPE", "nvarchar", 50, null, null, "NOT NULL", null],
        ["CODE", "nvarchar", 2, null, null, "NOT NULL", null]
    ]
);
t[3].rows[0] = [1, "PRIMARY KEY", "PK"];
t[3].rows[1] = [2, "UNIQUE", "IX"];
t[3].rows[2] = [3, "FOREING KEY", "FK"];
t[3].rows[3] = [4, "DEFAULT", "DF"];
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
        ["ref_column", "int", null, null, null, null, null],
        ["constant_expression", "nvarchar", 200, null, null, null, null]
    ]
);

t[1].cols[0][6] = tiden;
t[0].cols[0][6] = tciden;
aaa = function(a) { return WHERE(t[2], [[t[2].cols[1], a]])[0]; };
bbb = function(b) { return INSERT(t[1], [t[1].cols[1]], [b]); };
ccc = function(c) { return INSERT(t[0], t[0].cols.slice(1), c); };
t[0].rows.forEach(function(r) { r[3] = WHERE(t[2], [[t[2].cols[1], r[3]]])[0]; });

ADDCONSTRAINT("Tables", null, "PRIMARY KEY", [["TableID"]], null, null);
ADDCONSTRAINT("Tables", null, "UNIQUE", [["table_name"]], null, null);
ADDCONSTRAINT("DataTypes", null, "PRIMARY KEY", [["DataTypeID"]], null, null);
ADDCONSTRAINT("DataTypes", null, "UNIQUE", [["DataTypeName"]], null, null);
ADDCONSTRAINT("Columns", null, "PRIMARY KEY", [["ColumnID"]], null, null);
ADDCONSTRAINT("Columns", null, "FOREING KEY", [["Table"]], "Tables", ["TableID"]);
ADDCONSTRAINT("Columns", null, "FOREING KEY", [["data_type"]], "DataTypes", ["DataTypeID"]);
ADDCONSTRAINT("Columns", null, "UNIQUE", [["Table"], ["column_name"]], null, null);
ADDCONSTRAINT("CONSTRAINTTYPES", null, "PRIMARY KEY", [["CONSTRAINTTYPEID"]], null, null);
ADDCONSTRAINT("CONSTRAINTTYPES", null, "UNIQUE", [["CONSTRAINTTYPE"]], null, null);
ADDCONSTRAINT("CONSTRAINTS", null, "PRIMARY KEY", [["ConstraintID"]], null, null);
ADDCONSTRAINT("CONSTRAINTS", null, "UNIQUE", [["constraint_name"]], null, null);
ADDCONSTRAINT("CONSTRAINTS", null, "FOREING KEY", [["Table"]], "Tables", ["TableID"]);
ADDCONSTRAINT("CONSTRAINTS", null, "FOREING KEY", [["CONSTRAINTTYPE"]], "CONSTRAINTTYPES", ["CONSTRAINTTYPEID"]);
ADDCONSTRAINT("CONSTRAINTSCOLUMNS", null, "FOREING KEY", [["Constraint"]], "CONSTRAINTS", ["ConstraintID"]);
ADDCONSTRAINT("CONSTRAINTSCOLUMNS", null, "FOREING KEY", [["column"]], "Columns", ["ColumnID"]);
ADDCONSTRAINT("CONSTRAINTSCOLUMNS", null, "FOREING KEY", [["ref_column"]], "Columns", ["ColumnID"]);
ADDCONSTRAINT("CONSTRAINTSCOLUMNS", null, "PRIMARY KEY", [["Constraint"], ["column"]], null, null);

function ADDCONSTRAINT(table, name, type, cols, reftable, refcols, expre = null) {
    if (typeof table === "string") { table = WHERE(t[1], [[t[1].cols[1], table]])[0]; if (!table) { throw "table not found"; } }
    if (typeof type === "string") { type = WHERE(t[3], [[t[3].cols[1], type]])[0]; if (!type) { throw `type '${type}' not found`; } }
    if (typeof reftable === "string") { reftable = WHERE(t[1], [[t[1].cols[1], reftable]])[0]; if (!reftable) { throw "reftable not found"; } }
    cols.forEach(function(c, i) {
        if (typeof c[0] === "string") {
            c[0] = WHERE(t[0], [[t[0].cols[1], table], [t[0].cols[2], c[0]]])[0];
            if (!c[0]) { throw "col not found"; }
        }
        c[1] = c[1] ? c[1] : 1;
    });
    if (!name) { name = `${type[2]}_${table[1].toLowerCase()}${type[0] === 1 ? "" : `_${cols[0][0][2].toLowerCase()}}`}`; }
    if (reftable) {
        refcols.forEach(function(c, i) {
            if (typeof c === "string") { c = WHERE(t[0], [[t[0].cols[1], reftable], [t[0].cols[2], refcols[0]]])[0]; if (!c) { throw "refcol not found"; } refcols[i] = c; }
            if (!refcols[i].constraints.find(function(cc) { return cc[3][0] < 3; })) { throw "FK contraint is not unique"; }
        });
    }
    var constr = INSERT(t[4], t[4].cols.slice(1), [table, name, type]);
    if (type[0] === 1) {
        constr.rows = table.rows;
        table.PK = constr;
    } else if (type[0] === 2) { constr.rows = new rows; }
    constr.ccols = cols.map(function(c, i) {
        var c1 = [constr, c[0], c[1] = type[0] > 2 ? null : c[1], refcols ? refcols[i] : null, expre];
        c = INSERT(t[5], t[5].cols, c1);
        if (type[0] === 1) { c[1].PK = c1; }
        else if (type[0] === 3) { c[1].FK = c[3]; }
        else if (type[0] === 4) { c[1].DEF = c[4]; }
        return c;
    });
    if (type[0] <= 2) { constr.rows.constr = constr; }
    cols.forEach(function(c, i) { c[0].constraints.push(constr); });
    table.constraints.push(constr);
    return constr;
}
function cddc(cn, a, b) {
    for (var ci = 0, r = 0; ci < cn.ccols.length && !r; ci++) {
        r = cddf(cn.ccols[ci][1]);
        r = compare(a[r], b[r], cn.ccols[ci]);
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
function table(table) {
    var r = WHERE(t[1], [[t[1].cols[1], table]])[0];
    if (!r) { throw `Invalid object name '${table}'`; }
    return r;
}
function tableCol(table, col) {
    var c = WHERE(t[0], [[t[0].cols[1], table], [t[0].cols[2], col]])[0];
    if (!c) { throw `Invalid column name '${col}'.`; }
    return c;
}
function getval(row, col) { return row[col[1].cols.indexOf(col)]; }
function compare(a, b, cnc = [null, [], 1]) {
    if (cnc[1].FK) { a = Array.isArray(a) ? a[cddf(cnc[1].FK)] : a; b = Array.isArray(b) ? b[cddf(cnc[1].FK)] : b; }
    return a === null ? b === null ? 0 : 1 : b === null ? -1 : Collator.compare(a, b) * cnc[2];
}
function collate(collate, v) {
    if (typeof v === "string") { return v.toLocaleUpperCase().accentFold(); }
    return v;
}
function WHERE(table, conditions) {
    table = tablestr(table); if (!table) { throw "Tabla no existe"; }
    conditions.forEach(function(c) { c[0] = colstr(table, c[0]); if (!c[0]) { throw "Columna no existe"; } });
    var rs = [];
    var cc = table.constraints.find(function(c) {
        return c[3][0] < 3 && c.ccols.every(function(cc) { return conditions.some(function(con) { return con[0] === cc[1]; }); });
    });
    if (cc) {
        var row = [];
        for (var i = 0; i < cc.ccols.length; i++) {
            row[cddf(cc.ccols[i][1])] = conditions.find(function(con) { return con[0] === cc.ccols[i][1]; })[1];
        }
        iscon(cc.rows.indexOf(row) >= 0 ? cc.rows.b : null);
    } else { table.rows.forEach(iscon); }
    //if (con) { return rs[0]; }
    return rs;
    function iscon(r) { if (!r) { rs.push(null); } else if (conditions.every(function(c) { return r[cddf(c[0])] === c[1]; })) { rs.push(r); } }
}
function INSERT(table, cols, vals) {
    table = tablestr(table); if (!table) { throw "Tabla no existe"; }
    if (!cols) { cols = table.cols; }
    else {
        cols = cols.map(function(c) {
            var c2 = colstr(table, c); if (!c2) { throw "Columna {0} no existe".format(c); }
            return c2;
        });
    }
    var row = [];
    for (var ci = 0, c, val, tttt; ci < table.cols.length; ci++) {
        c = table.cols[ci];
        if (c[6]) { val = c[6]++; } else { val = vals[cols.indexOf(c)]; }
        if (c.FK && Array.isArray(val)) { val = val[cddf(c.FK)]; }
        if (moment.isMoment(val)) {
            if (c[3][0] === 7) { val = moment.format("DD/MM/YYYY"); }
            else if (c[3][0] === 8) { val = moment.format("DD/MM/YYYY HH:mm"); }
        }
        if (c.DEF && !val && val !== 0) { val = eval(c.DEF); }
        if (typeof val === "string") { val = val.trimSingleLine(); }
        if (!val && val !== 0) {
            if (!c[7]) { throw `Cannot insert the value NULL into column '${c[2]}', table '${table[1]}'; column does not allow nulls. INSERT fails.`; }
            val = null;
        } else if (!Array.isArray(val) && typeof val !== "object") {
            if (c[3][1] === "nvarchar") {
                if (typeof val !== "string") { val = val + ""; }
                if (val.length > c[4]) { throw `String or binary data would be truncated.`; }
            } else if (c[3][0] === 8) { //smalldatetime
                if (typeof val === "string") { val = moment.tz(val, "DD/MM/YYYY HH:mm", true, "America/Mexico_City"); }
                if (val < c[3][2]) { throw `${c[2]} Min date value reached`; }
                else if (val > c[3][3]) { throw `${c[2]} Max date value reached`; }
            } else if (c[3][0] === 7) { //date
                if (typeof val === "string") { val = moment.tz(val, "DD/MM/YYYY", true, "America/Mexico_City"); }
                if (val < c[3][2]) { throw `${c[2]} Min date value reached`; }
                else if (val > c[3][3]) { throw `${c[2]} "Max date value reached`; }
            } else {
                if (isNaN(val)) { throw `Conversion failed when converting the varchar value '${val}' to data type ${c[3][1]}.`; } else { val = parseInt(val); }
                if (val < c[3][2]) { throw "Min value reached"; }
                else if (val > c[3][3]) { throw `Arithmetic overflow error for data type ${c[3][1]}, value = ${val}.`; }
            }
            for (var i = 0, cc; i < c.constraints.length; i++) {
                cc = c.constraints[i];
                tttt = constorow(cc, row);
                if (cc[3][0] <= 2) {
                    tttt[ci] = val;
                    if (cc.rows.tesnull(tttt)) { continue; }
                    if (cc.rows.lastIndexOf(tttt) >= 0) { throw `Violation of ${cc[3][1]} constraint '${cc[2]}'.Cannot insert duplicate key in object '${table[1]}'.The duplicate key value is (${tttt.join()}).`; }
                } else {
                    cc = c.FK.constraints[0];
                    tttt[cddf(c.FK)] = val;
                    if (cddd(cc, tttt)) { continue; }
                    if (!dsfdsd(cc, tttt)[0]) { throw "Valor no existe en la tabla relacionada"; }
                }
            }
        }
        row[ci] = val;
    }
    for (var i = 0, cc, tttt, cc2; i < table.constraints.length; i++) {
        cc = table.constraints[i];
        if (cc[3][0] === 4) { continue; }
        if (cc[3][0] <= 2) {
            if (cc.rows.tesnull(row)) { continue; }
            cc.rows.insertAt(row, cc.rows.s);
        } else {
            cc2 = cc.ccols[0][3].constraints[0];
            tttt = constorow(cc, row);
            if (cddd(cc2, tttt)) { continue; }
            row[cddf(cc.ccols[0][1])] = dsfdsd(cc2, tttt)[0];
        }
    }
    if (!table.PK) { table.rows[table.rows.length] = row; }
    return row;
}
function constorow(constr, row) {
    var ret = [];
    for (var i = 0, val; i < constr.ccols.length; i++) {
        val = row[cddf(constr.ccols[i][1])];
        if (!val && val !== 0) { val = null; }
        ret[constr[3][0] < 3 ? cddf(constr.ccols[i][1]) : cddf(constr.ccols[i][3])] = val;
    }
    return ret;
}
function preparecontraint(constr) {
    constr.ready = true;
    for (var alln = cdde(constr), i = 0, row; i < constr[1].rows.length; i++) {
        row = constr[1].rows[i];
        if (alln && cddd(constr, row)) { continue; }
        var r = dsfdsd(constr, row, constr[3][0] === 1 ? i - 1 : null);
        if (r[0]) { throw "Valor duplicado"; }
        if (constr[3][0] === 1) { constr.rows.move(i, r[1]); }
        else { constr.rows.insertAt(row, r[1]); }
    }
    return constr;
}
function dsfdsd(constr, row, e) {
    if (!constr.ready) { preparecontraint(constr); }
    if (!e && e !== 0) { e = constr.rows.length - 1; }
    for (var s = 0, i, r = -1, t; s <= e;) {
        i = ~~((s + e) / 2);
        t = constr.rows[i];
        r = cddc(constr, row, t);
        if (r > 0) { s = i + 1; } else if (r) { e = i - 1; } else { s = i; break; }
    }
    return [!r ? t : null, s];
}

function SELECT(table, row, cols) {
    table = tablestr(table);
    if (!table) { throw "Tabla no existe"; }
    cols = cols.map(function(c) {
        c = colstr(table, c);
        if (!c) { throw "Columna no existe"; }
        return c;
    });
    row = cols.map(function(c) { return row[cddf(c)]; });
    if (cols.length === 1) { return row[0]; }
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
    table = bbb(table); table.cols = []; table.rows = new rows; table.constraints = [];
    column_definition.forEach(function(c) { return insertCol(table, c); });
    table_constraint && table_constraint.forEach(function(cc) { ADDCONSTRAINT(table, cc[0], cc[1], cc[2], cc[3], cc[4]); });
    return table;
}
function insertCol(t, c, at) {
    if (!at) { at = t.cols.length; }
    if (c[3] === null) { c[3] = 1; }
    if (c[4]) { c[4] = 1; }
    var c1 = ccc([t, c[0], aaa(c[1]), c[2], c[3], c[4], dn[c[5]]]);
    c1.constraints = [];
    t.cols.insertAt(c1, at);
    if (c[6]) {
        c[6].forEach(function(cc) { ADDCONSTRAINT(t, cc[0], cc[1], [[c1]], cc[2], cc[3] ? [cc[3]] : null, cc[4]); });
        if (c1.DEF && t.rows.length) { for (var i = 0; i < t.rows.length; i++) { t.rows[i].insertAt(eval(c1.DEF), at); } }
    }
    return c1;
}

function showAlert(message) {
    alert(message + "");
}