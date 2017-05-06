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
        if (rows.length < 2) { return this; }
        for (var i = 1, row, j, data = [], insertAt; i < rows.length; i++) {
            for (row = rows[i], j = 0; j < datamap.length; j++) { data[j] = datamap[j](row); }
            rows.move(i, rows.indexOf2(data, datamap, 0, i - 1)[1]);
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

var results = [
    ['Columna', '', ''],
    ['', 'Valor', ''],
    ['', '', []]
];

var data = [
    ['Estado', 'Lugar'],
    ['Completado', 'PARCAR'],
    ['Completado', 'PARCAR'],
    ['Completado', 'AGA'],
    ['Completado', 'KROMA TULTITLAN']
];

var estados = [
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
estados.orderBy([function(row) { return row[0]; }]);

var row_total = results[2];
var total_cell = results[2][2];
var extracts = [
    function(row) { return row[0][1]; },
    function(row) { return row[1]; }
];
var extractsh = [
    function(cell, index) { return results[0][index]; },
    function(cell, index) { return results[1][index]; }
];
for (var data_i = 1, data_row, result_row, result_col, tmp; data_i < data.length; data_i++) {
    data_row = data[data_i];
    data_row[0] = estados.indexOf2(data_row, [function(row) { return row[0]; }])[0];

    total_cell.push(data_row);

    tmp = results.indexOf2(['Estado', data_row[0][1]], extracts, 3);
    if (tmp[0]) { result_row = tmp[0]; }
    else {
        result_row = ['Estado', data_row[0], []];
        for (var i = 3; i < row_total.length; i++) { result_row[i] = []; }
        results.insertAt(tmp[1], result_row);
    }
    result_row[2].push(data_row);

    tmp = result_row.indexOf2(['Lugar', data_row[1]], extractsh, 3);
    if (tmp[0]) { result_col = tmp[1]; }
    else {
        result_col = tmp[1];
        results[0].insertAt(result_col, 'Lugar');
        results[1].insertAt(result_col, data_row[1]);
        results[2].insertAt(result_col, []);
        for (var i = 3; i < results.length; i++) { results[i].insertAt(result_col, []); }
    }
    row_total[result_col].push(data_row);
    result_row[result_col].push(data_row);
}
var end = 1;
function compare(a, b, extracts, index) {
    if (extracts) {
        for (var cols_i = 0, result; cols_i < extracts.length && !result; cols_i++) {
            result = compare_s(a[cols_i], extracts[cols_i](b, index));
        }
        return result;
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
