if (!Array.prototype.insertAt) {
    //http://stackoverflow.com/questions/586182/javascript-insert-item-into-array-at-a-specific-index
    Array.prototype.insertAt = function(index, item) {
        if (index === -1 || item === undefined) { return this; }
        this.splice(index, 0, item);
        return this;
    };
}
if (!Array.prototype.indexOf2) {
    Array.prototype.indexOf2 = function(a, o, s, e) {
        if (s === undefined) { s = 0; }
        if (e === undefined) { e = this.length - 1; }
        for (var i, r, b; s <= e;) {
            i = s + Math.round((e - s) / 2);
            b = this[i];
            for (var o = o[1], oi = 0, r; oi < length && !r; oi++) { r = compare_s(a[oi], b.parse(o[oi]), o[oi][1]); }
            if (r > 0) { s = i + 1; }
            else if (r < 0) { e = i - 1; }
            else if (o[2]) { s = i + 1; }
            else { s = i; break; }
        }
        return [r === 0 ? b : null, s];
    };
}
if (!Array.prototype.orderBy) {
    Array.prototype.orderBy = function(m, s) {
        if (s === undefined) { s = 0; }
        for (s++; s < this.length; s++) {
            for (var o = m[1], oi = 0, v = []; oi < o.length; oi++) { v[oi] = this[s].parse(o[oi]); }
            this.move(s, this.indexOf2(v, m, 1, s - 1)[1]);
        }
        return this;
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
if (!Array.prototype.insert2) {
    Array.prototype.insert2 = function(v, m) {
        return this.insertAt(this.indexOf2(m.map(function(map) { return map(row); }), m)[1], v);
    };
}
if (!String.prototype.format) {
    //http://stackoverflow.com/questions/18405736/is-there-a-c-sharp-string-format-equivalent-in-javascript
    String.prototype.format = function() {
        var args = arguments;
        return this.replace(/{(\d+)}/g, function(match, number) { return typeof args[number] !== undefined ? args[number] : match; });
    };
}
if (!Array.prototype.parse) {
    Array.prototype.parse = function(s) { return s.length ? this[s[0]] : null : s; }
}
if (!Array.prototype.insert) {
    Array.prototype.insert = function(v) {
        for (var i = this[2], ii = 0, r = true; ii < i.length && r; ii++) {
            if (i[ii][2]) {
                for (var o = i[1], oi = 0, d = []; oi < o.length; oi++) { d = v.parse(o[oi]); }
                r = this[1].indexOf2(d, o, 1)[0] !== null;
            }
        }
        if (r) { for (i = this[2], ii = 0; ii < i.length; ii++) { this[1].insert2(v, o); } }
    }
}
var resultados = [
    ['Columna', 'Valor', 'Totales']
];

var database = [
    "reportes",
    [],
    [["PK_reportes", [[0, 1]], true, 1]]
];
var reporte = [
    ['Estado', 'Lugar', "Curso ID"],
    ['Completado', 'PARCAR', 75],
    ['Completado', 'PARCAR', 76],
    ['Completado', 'AGA', 76],
    ['Completado', 'KROMA TULTITLAN', 75]
];
var estados = [
    "estados",
    [
        ['Estado', '*Orden', '*Color'],
        ['Completado', 1, '#00B050'],
        ['Reprobado', 2, '#FF0000'],
        ['Fuga', 3, '#003300'],
        ['Cancelado', 4, '#000000'],
        ['Incapacidad', 5, '#FFC000'],
        ['Vencido incompleto', 6, '#C65911'],
        ['Vencido sin iniciar', 7, '#833C0C'],
        ['Incompleto', 8, '#FFFF00'],
        ['Sin iniciar', 9, '#A6A6A6'],
        ['Programado', 10, '#4472C4']
    ],
    [["PK_estados", [[0, 1]], true, 1]]
];
function prepare(t) {
    if (t[2]) {
        for (var i = t[2], ii = 0, r; ii < i.length && !r; ii++) { r = i[ii][2] === 1; }
        if (r) { t[1].orderby(i[ii - 1], 1); }
        database.insert(t);
    }
}
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
        [["Estado", [0, 0]], ["Lugar", [0, 1]]],
        [["reporte", reporte], ["reporte >estado", estados, "LJ", [[[1, 0], "=", [0, 0]]]]],
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
function parsedata(a, s) { return s.length ? (a[1][s[0]] ? a[1][s[0]].[s[1]] : null) : s; }
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
