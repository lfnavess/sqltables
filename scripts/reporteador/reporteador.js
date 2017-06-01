if (!String.prototype.format) {
    //http://stackoverflow.com/questions/18405736/is-there-a-c-sharp-string-format-equivalent-in-javascript
    String.prototype.format = function() {
        var args = arguments;
        return this.replace(/{(\d+)}/g, function(match, number) { return typeof args[number] !== undefined ? args[number] : match; });
    };
}
if (!Array.prototype.insertAt) {
    //http://stackoverflow.com/questions/586182/javascript-insert-item-into-array-at-a-specific-index
    Array.prototype.insertAt = function(index, item) {
        if (index === -1 || index === null || item === undefined) { return this; }
        this.splice(index, 0, item);
        return this;
    };
}
if (!Array.prototype.indexOf2) {
    Array.prototype.indexOf2 = function(a, o, s, e) {
        var rows = this;
        if (s === undefined) { s = 0; }
        if (e === undefined) { e = this.length - 1; }
        for (var i, b, m, mi, r = -1; s <= e;) {
            i = s + Math.round((e - s) / 2);
            b = this[i];
            for (m = o[1], mi = 0, r = 0; mi < m.length && !r; mi++) { r = compare_s(a[mi], b[m[mi][0]], m[mi][1]); }
            if (r > 0) { s = i + 1; }
            else if (r) { e = i - 1; }
            else if (!o[3]) { s = i + 1; }
            else { s = i; break; }
        }
        return [r ? null : s, r ? s : null, r ? null : b];
    };
}
if (!Array.prototype.orderBy) {
    Array.prototype.orderBy = function(m, s) {
        if (s === undefined) { s = 0; }
        var a = this;
        for (s++; s < a.length; s++) {
            a.move(s, a.indexOf2(m[1].map(function(m) { return a[s][m[0]]; }), m, 0, s - 1)[1]);
        }
        return a;
    };
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
if (!Array.prototype.parse) {
    Array.prototype.parse = function(s) { return s.length ? this[s] : s; };
}
if (!Array.prototype.remove) {
    Array.prototype.remove = function(v) {
        //http://stackoverflow.com/questions/3596089/how-to-add-and-remove-array-value-in-jquery
        this.splice(this.indexOf(v) === -1 ? this.length : this.indexOf(v), 1);
        return this;
    };
}
if (!Array.prototype.insert) {
    Array.prototype.insert = function(v) {
        var a = this;
        if (!a.meta[2].find(function(i) { return i[2]; })) { a.push(v); return a; }
        for (var i = a[2], ii = 0; ii < i.length; ii++) {
            if (i[ii][3] && a[3][ii].indexOf2(i[ii][1].map(function(i) { return v[i[0]]; }), i)[0] !== null) {
                return "value duplicated in index" + i[ii][0];
            }
        }
        for (var i = a[4], ii = 0, v2, v3; ii < i.length; i++) {
            v2 = i[2].map(function(m) { return v[m[1]]; });
            v3 = i[2].map(function(m) { return m[1]; });
            if (!searchdata(a[1], v3, v2)) { return "Valor no encontrado en la tabla {0}".format(i[2][0]); }
        }
        for (i = a[2], ii = 0; ii < i.length; ii++) {
            a[3][ii].insertAt(a[3][ii].indexOf2(i[ii][1].map(function(i) { return v[i[0]]; }), i)[1], v);
        }
        return a;
    };
}
function searchdata(table, map, v2) {
    //buscar un index que coincida con las columnas y que sea único
    var ind = table[2].find(function(i) { return i[1].every(function(c) { return map.indexOf(c[0]) !== -1; }); });
    if (ind) {
        ind = table.indexOf2(ind[1].map(function(m) { return v2.splice(map.splice(map.indexOf(m[0]), 1)[0], 1)[0]; }))[2];
        return ind && map.every(function(t, i) { return v2[i] === ind[m]; }) ? ind : null;
    }
    //no hay index y por lo tanto se hace la búsqueda fila por fila

}
var resultados = [
    ['Columna', 'Valor', 'Totales']
];


(function () {
    var _dbs = [];
    _dbs.meta = [
        "jsdatabase",
        [["name", ["varchar", 50], false]],
        [["PK_jsdatabase",[[0,1]], true, true]],
        []
    ];
    prep(_dbs, {Columns:{},Keys:{},Indexes:{}});
    var dbs = {Databases:{}};
    window[_dbs[0]] = dbs;
    jsdatabase["CREATE DATABASE"] = function(meta,_db = []) {
        _db.meta = meta;
        _dbs.insert(prep(_db), {Columns:{},Keys:{},Indexes:{}});
        var db = { Tables:{}};
        dbs.Databases[_db[0]] = db;
        db["CREATE TABLE"] = function(meta, _ta = []) {
            _ta.meta = meta;
            var ta = { Columns: {}, Keys: {}, Indexes: {} };
            _db.insert(prep(_ta), ta);
            db.tables[_ta[0]] = ta;

            return ta;
        };
        db["SELECT"] = function(se) {

        };
        db["INSERT INTO"] = function(ins) {

        };
        db["UPDATE"] = function(up) {

        };
        db["DELETE"] = function(de) {

        };

        return db;
    }
    function prep (t, ob, rec){
        for (var r = t.meta[3], ri = 0; ri < r.length; ri++) { r[ri][0] = searchdata(reportes, [0], [r[ri][1]]); }
        if (!rec) {
            t[1].meta = [
                "Columns",
                [["Column Name", ["varchar", 50], false], ["Data type", null, false], ["Allow Nulls", "bit"]],
                [["IX_columname", [[0, 1]], false, true]],
                []
            ];
            prep(t[1], { Columns: {}, Keys: {}, Indexes: {} }, true);
        }

        t[1].forEach(function(col, coli){
            ob.Columns[col[0]] = col;
        });
        t.meta[2].forEach(function(ind, indi){
            t.meta[4][indi] = ind[2] ? t : [];
            ob.Indexes[ind[0]] = ind;
            t.meta[4][indi].indefxof2 = ind.indefxof2 = indefxof2;
            if(ind[3] && ind[1].length === 1){}
            function indefxof2(a, s, e) {
                var rows = t[4][indi];
                if (a.length !== ind[1].length){ retrun; }
                if(rows.length === 0 && !rows.close){
                    rows.close = true;
                    t[5].forEach(function(r){ 
                        if(!ind[1].every(function(ind){ return !t[1][ind[0]] || r[ind[0]] !== null; })){ return; }
                        t[4].insert(r);
                    });
                    delete rows.close;
                }
                if (s === undefined) { s = 0; }
                if (e === undefined) { e = rows.length - 1; }
                for (var i, b, m, mi, r = -1; s <= e;) {
                    i = s + Math.round((e - s) / 2);
                    b = rows[i];
                    for (m = ind[1], mi = 0, r = 0; mi < m.length && !r; mi++) { r = compare_s(a[mi], b[m[mi][0]], m[mi][1]); }
                    if (r > 0) { s = i + 1; }
                    else if (r) { e = i - 1; }
                    else if (!ind[3]) { s = i + 1; }
                    else { s = i; break; }
                }
                return [r ? null : s, r ? s : null, r ? null : b];
            };
            if(ind[2]){t[5].orderBy(ind[i]);}
        });
        return t;
        
    }
})();
var dbreportes = jsdatabase["CREATE DATABASE"]([
    "reportes",
    [["name", ["varchar", 50], false], ["columns", null, false], ["indexes", null, false], ["relations", null, false], ["rows", null, false]],
    [["PK_reportes", [[0, 1]], true, true]],
    []
]);
dbreportes["CREATE TABLE"](
    [
        "estados",
        [[1, "Estado", ["varchar", 20], false], [2, "*orden", "tinyint", false], [3, "*Color", "int", false]],
        [["PK_estados", [[0, 1]], true, true]],
        []
    ],[
        ['Completado', 1, 45136],
        ['Reprobado', 2, 16711680],
        ['Fuga', 3, 13056],
        ['Cancelado', 4, 0],
        ['Incapacidad', 5, 16760832],
        ['Vencido incompleto', 6, 12998929],
        ['Vencido sin iniciar', 7, 8600588],
        ['Incompleto', 8, 16776960],
        ['Sin iniciar', 9, 10921638],
        ['Programado', 10, 4485828]
    ]
);
dbreportes["CREATE TABLE"](
    [
        "reporte",
        [[1, "Estado", ["varchar", 20], false], [2, "Lugar", ["varchar", 50], true], [3, "Curso ID", "smallint", false]],
        [],
        [["FK_reporte_estados", "estados", [[0, 0]]]]
    
    ],[
        ['Completado', 'PARCAR', 75],
        ['Completado', 'PARCAR', 76],
        ['Completado', 'AGA', 76],
        ['Completado', 'KROMA TULTITLAN', 75]
    ]
);


//reportes.tables.create(table);
//var row_total = resultados[2];
//var total_cell = resultados[2][2];
var extractsh = [
    function(cell, index) { return results[0][index]; },
    function(cell, index) { return results[1][index]; }
];
//SELECT reporte.Estado, reporte.Lugar
//FROM reporte
//LEFT JOIN estados AS "reporte >estado" ON "reporte >estado".Estado = reporte.Estado
//WHERE reporte."Curso ID" = 75
//ORDER BY "reporte >estado"."*Orden", reporte.Lugar
var select = [
    [
        [[null, [0, 0]], [null, [0, 1]]],
        [["reporte", reporte], ["estados", estados, "LJ", [[[1, 0], "=", [0, 0]]]]],
        [[[0, 3], "=", 75]],
        [[[1, 1], 1], [[0, 2], 1]]
    ]
];

function makesss(s) {
    for (var i = 0; i < s.length; i++) {
        s[i][0] = s[i][0].length ? "(rows[{0}] ? rows[{0}][{1}] : null)".format(s[i][0][0], s[i][0][1]) : s[i][0];
        s[i][1] = s[i][1] === "=" ? "===" : s[i][1];
        s[i][2] = s[i][2].length ? "(rows[{0}] ? rows[{0}][{1}] : null)".format(s[i][2][0], s[i][2][1]) : s[i][2];
        s[i] = s[i].join(' ');
    }
    return s.join(" && ");
}
function parsedata(a, s) { return s.length ? (a[1][s[0]] ? a[1][s[0]][s[1]] : null) : s; }
function insert2(a, v, o, s) {
    a.insertAt(indexOf2(a, v, o, s)[1], v);
}
function indexOf2(a, v, o, s, e) {
    if (s === undefined) { s = 0; }
    if (e === undefined) { e = a.length - 1; }
    for (var i, r, b; s <= e;) {
        i = s + Math.round((e - s) / 2);
        b = a[i];
        for (var oi = 0, r; oi < o.length && !r; i++) { r = compare_s(a[oi], parsedata(b, o[oi][0]), o[1]); }
        if (r > 0) { s = i + 1; } else if (r < 0) { e = i - 1; } else { s = i; break; }
    }
    return [r === 0 ? b : null, s];
};
function compare_s(a, b, o) {
    if (o === undefined) { o = 1; }
    a = clear(a); b = clear(b);
    if (a === null || b === null) { return a === b ? 0 : a === null ? 1 : -1; }
    if (typeof a === 'string' && !isNaN(a) || typeof a === 'boolean' || typeof a === 'object' || typeof a === 'number') { a = +a; }
    if (typeof b === 'string' && !isNaN(a) || typeof b === 'boolean' || typeof b === 'object' || typeof a === 'number') { b = +b; }
    if (a.constructor !== b.constructor) { console.log("Compare: tipos no coinciden"); return; }
    if (typeof a === 'number') { return (a < b ? -1 : a === b ? 0 : 1) * o; }
    return a.localeCompare(b) * o;
}

for (var f = select[0][1], fi = 1; fi < f.length; fi++) { f[fi][3] = makesss(f[fi][3]); }
select[0][2] = makesss(select[2]);
for (var at = select[0][1][0][1], ari = 1, rows = [[], []]; ari < at.length; ari++) {
    rows[1][0] = at[ari];
    for (var t = select[0][1], ti = 1, bt, bri, r = true; i < t.length && r; ti++) {
        for (bt = t[ti][1], bri = 0, r = false; bri < bt.length && !r; bri++) {
            rows[1][ti] = bt[bri];
            r = eval(t[ti][3]);
        }
        if (!r) { r = t[ti][2] === "LJ"; }
    }
    if (r && eval(select[0][2])) {
        for (var s = select[0][1], si = 0; si < s.length; si++) { rows[0][si] = parsedata(rows, s[si][1]); }
        for (var o = select[0][3], oi = 0, data = []; oi < o.length; oi++) { data[oi] = parsedata(rows, o[oi][0]); }
        insert2(select, rows, orderby, 1);
    }
}


//    funcs = m.map(function(m) { return [m[0]]; });
//    data = m.map(function(m) { return rows[m[2][0]][m[2][1]]; });
//    res = t2[1].indexOf2(data, funcs);
//    if (res[0] === null) {
//        res[0] = t2[1][0].map(function() { null; });
//        for (var rmi = 0, rm; rmi < m.length; rmi++) {
//            rm = m[rmi];
//            res[0][rm[0][1]] = parsedata(rm[2]);
//        }
//        t2[1].insertAt(res[1], res[0]);
//    }
//    resrow[t2i] = res[0];
//    if (rms.length === 1) { rows[m[2][0]][rms[0][2][1]] = t2[3]; }
//}
//if (orderby) {
//    restrows.insert2(resrow, orderby);
//} else { restrows.push(resrow); }

//FROM 
//  reporte
//  LEFT JOIN estados AS "reporte >estado" ON "reporte >estado".estado = reporte.Estado
//  LEFT JOIN resultados AS "reporte >resultado" ON
//      "reporte >resultado"."columna" = 'Estado'
//      AND "reporte >resultado"."valor" = reporte.Estado

//total_cell.push(table[3]);

//tmp = results.indexOf2(['Estado', table[3][0][1]], extracts, 3);

////
//if (tmp[0]) { result_row = tmp[0]; }
//else {
//    result_row = ['Estado', data_row[0], []];
//    for (var i = 3; i < row_total.length; i++) { result_row[i] = []; }
//    results.insertAt(tmp[1], result_row);
//}
//result_row[2].push(data_row);

//tmp = result_row.indexOf2(['Lugar', data_row[1]], extractsh, 3);
//if (tmp[0]) { result_col = tmp[1]; }
//else {
//    result_col = tmp[1];
//    results[0].insertAt(result_col, 'Lugar');
//    results[1].insertAt(result_col, data_row[1]);
//    results[2].insertAt(result_col, []);
//    for (var i = 3; i < results.length; i++) { results[i].insertAt(result_col, []); }
//}
//row_total[result_col].push(data_row);
//result_row[result_col].push(data_row);
//}
var end = 1;

function clear(x) { return x === undefined || x === '' ? null : x; }
