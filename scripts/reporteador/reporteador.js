if (!Array.prototype.insertAt) {
    //http://stackoverflow.com/questions/586182/javascript-insert-item-into-array-at-a-specific-index
    Array.prototype.insertAt = function(index, item) {
        if (index === -1 || item === undefined) { return this; }
        this.splice(index, 0, item);
        return this;
    };
}
if (!Array.prototype.indexOf2) {
    Array.prototype.indexOf2 = function(data, datamap, start_index, end_index) {
        var rows = this;
        if (start_index === undefined) { start_index = 0; }
        if (end_index === undefined) { end_index = rows.length - 1; }
        for (var middle_index, result, row; start_index <= end_index;) {
            middle_index = start_index + Math.round((end_index - start_index) / 2);
            row = rows[middle_index];
            result = compare(data, row, datamap, middle_index);
            if (result > 0) { start_index = middle_index + 1; }
            else if (result < 0) { end_index = middle_index - 1; }
            else { start_index = middle_index; break; }
        }
        return [result === 0 ? row : null, start_index];
    };
}
if (!Array.prototype.orderBy) {
    Array.prototype.orderBy = function(datamap) {
        var rows = this;
        for (var i = 2; i < rows.length; i++) {
            rows.move(i, rows.indexOf2(datamap.map(function(map) { return map(rows[i]); }), datamap, 1, i - 1)[1]);
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
    Array.prototype.insert2 = function(value, datamaps) {
        var rows = this;
        return rows.insertAt(rows.indexOf2(datamaps.map(function(map) { return map(row); }), datamaps)[1], value);
    };
}

var resultados = [
    ['Columna', 'Valor', 'Totales']
];

var reporte = [
    ['Estado', 'Lugar'],
    ['Completado', 'PARCAR'],
    ['Completado', 'PARCAR'],
    ['Completado', 'AGA'],
    ['Completado', 'KROMA TULTITLAN']
];

var estados = [
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
];
estados.orderBy([function(row) { return row[0]; }])
//var row_total = resultados[2];
//var total_cell = resultados[2][2];
var extracts = [
    function(row) { return row[0]; },
    function(row) { return row[1][1]; }
];
var extractsh = [
    function(cell, index) { return results[0][index]; },
    function(cell, index) { return results[1][index]; }
];
var from = {};
from.data = function(table, row, col) {
    return row[table[0].indexOf(col)];
}
from.equal = function(tablea, tableb) {
    var indexOfCol = table[0].indexOf(col);
    return table.indexOf2([data], function(row) { return row[indexOfCol]; })
}
var tsqlfuncs = {
    "=": function(left, right) {
        return tables[left[0]]
            .indexOf2(tables[right[0]][3], function(row) { return row[left[1]]; })[0];
    }
}
var select = [
    ["Estado", [0, 0]],
    ["Lugar", [0,1]]
]
var tables = [//FROM
    ["reporte", reporte, null],                                                 //reporte
    ["reporte >estado", estados, ["LJ", [[[1, 0], tsqlfuncs["="], [0, 0]]]]],   //LEFT JOIN estados AS "reporte >estado" ON "reporte >estado"Eestado = reporte.Estado
];
var orderby = [
    [[1, 1], 1],    //"reporte >estado"."*Orden"
    [[0, 2], 1]     //reporte.Lugar
];
var resrows = [];

function parsedata(s) { return typeof s === "string" ? s : tables[s[0]][3][s[1]]; }
orderby = orderby.map(function(or) { return [function(row) { return row[or[1]]; }, or[2]]; });
for (var table = tables[0], row_i = 1, resrow = []; row_i < table.length; row_i++) {
    resrow[0] = table[1][row_i];
    for (var t2i = 1, t2, rms, funcs, data, res; t2i < tables.length; t2i++) {
        t2 = tables[t2i];
        rms = tables[t2i][2][1];
        funcs = rms.map(function(rm) { return function(row) { return row[rm[0][1]]; } });
        data = rms.map(function(rm) { return parsedata(rm[2]); });
        res = t2[1].indexOf2(data, funcs);
        if (res[0] === null) {
            res[0] = t2[1][0].map(function() { null; });
            for (var rmi = 0, rm; rmi < rms.length; rmi++) {
                rm = rms[rmi];
                res[0][rm[0][1]] = parsedata(rm[2]);
            }
            t2[1].insertAt(res[1], res[0]);
        }
        resrow[t2i] = res[0];
        if (rms.length === 1) { tables[rms[0][2][0]][3][rms[0][2][1]] = t2[3]; }
    }
    if (orderby) {
        restrows.insert2(restrow, orderbymaps);
    } else { restrows.push(resrow); }

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
}
var end = 1;
function compare(a, b, extracts, index) {
    if (extracts) {
        if (extracts.length) {
            for (var cols_i = 0, result; cols_i < extracts.length && !result; cols_i++) {
                result = compare_s(a[cols_i], extracts[cols_i](b, index));
            }
            return result
        }
        return compare_s(a, extracts(b, index));
    }
    return compare_s(a, b);
}
function compare_s(a, b) {
    a = clear(a); b = clear(b);
    if (a === null || b === null) { return; }
    if (typeof a === 'string' && !isNaN(a) || typeof a === 'boolean' || typeof a === 'object') { a = +a; }
    if (typeof b === 'string' && !isNaN(a) || typeof b === 'boolean' || typeof b === 'object') { b = +b; }
    if (a.constructor !== b.constructor) { console.log("Compare: tipos no coinciden"); return; }
    if (typeof a === 'number') { return a < b ? -1 : a === b ? 0 : 1; }
    return a.localeCompare(b);
}
function clear(x) { return x === undefined || x === '' ? null : x; }
