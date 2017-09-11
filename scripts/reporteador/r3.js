function work(data) {
    data = data.split("\n").map(function(a) { return a.split("\t"); });
    CREATE_TABLE(
        "Interacciones",
        [
            ["Inscripcion", "int", null, null, null, "NOT NULL", null],
            ["Categoría", "nvarchar", 50, null, null, "NOT NULL", null],
            ["Pregunta", "nvarchar", 50, null, null, "NOT NULL", null],
            ["Peso", "tinyint", null, null, null, "NOT NULL", null],
            ["Lugar", "nvarchar", 50, null, null, "NOT NULL", null],
            ["Nivel", "nvarchar", 50, null, null, "NULL", null],
            ["Sexo", "nvarchar", 1, null, null, "NOT NULL", null],
            ["Edad", "tinyint", null, null, null, "NULL", null],
            ["Empresa", "nvarchar", 50, null, null, "NOT NULL", null],
            ["Empresa tipo", "nvarchar", 50, null, null, "NOT NULL", null],
            ["Banda", "nvarchar", 50, null, null, "NULL", null],
            ["Dirección", "nvarchar", 50, null, null, "NULL", null],
            ["Antigüedad", "tinyint", null, null, null, "NOT NULL", null]
        ],
        [
            [null, "PRIMARY KEY", [["Inscripcion"], ["Pregunta"]], null, null],
            [null, "UNIQUE", [["Pregunta"], ["Inscripcion"]], null, null]
        ]
    );
    var hCols = [["Sexo", 1], ["Edad", 1], ["Nivel", 1]];
    var Resultados = CREATE_TABLE(
        "Resultados",
        [
            ["CR", "tinyint", null, null, null, "NOT NULL", null],
            ["Categoría", "nvarchar", 50, null, null, "NOT NULL", null],
            ["Pregunta", "nvarchar", 50, null, null, "NOT NULL", null]
        ],
        [[null, "PRIMARY KEY", [["CR"], ["Categoría"], ["Pregunta"]], null, null]]
    )
    INSERT(Resultados, Resultados.cols, [0, 1, 1]);
    INSERT(Resultados, Resultados.cols, [1, 1, 2]);
    for (var i = 1, row = [2]; i < Resultados.cols.length; i++) { row[i] = Resultados.cols[i][2]; }
    INSERT(Resultados, Resultados.cols, row);
    INSERT(Resultados, Resultados.cols, [3, ".", "."]);//Row col vals
    var rcont = rsc([4, "Totales", "1"]);
    var rcat = rsc([4, "Totales", "2"]);
    
    var ColPK = [0, 1, 3];
    var cit = csc([2, ".", "Totales", "."]);
    
    for (var i = 1, length = data.length - 1, row, result, ci; i < length; i++) {
        row = INSERT("Interacciones", data[0], data[i]);
        countD(row, rcont[cit]);
        prome(row, rcat[cit]);
        result = SELECT("Interacciones", row, ["Categoría", "Pregunta"]);
        result = rsc([5, result[0], result[1]]);
        prome(row, result[cit]);
        for (j = 0; j < hCols.length; j++) {
            ci = [3, j, hCols[j][0]];
            ci[3] = SELECT("Interacciones", row, [ci[2]]);
            ci = csc(ci);
            prome(row, rcat[ci]);
            prome(row, result[ci]);
        }
    }
    console.log(Resultados.rows.map(function(r){ return r.map(function(c){ return Array.isArray(c) ? c[0] : c; }).join("\t"); }).join("\n"));
    
    function csc(data){
        var ci = indexCol(ColPK.map(function(c) { return data[c]; }));
        if(ci[0]){ ci = ci[1]; }
        else{
            ci = ci[1];
            Resultados.cols.insertAt(insertCol(Resultados, ["{0}|{1}".format(data[2],data[3]), "tinyint", null, null, null, "NOT NULL", null]), ci);
            for (var i = 0; i < 4; i++) { Resultados.rows[i].insertAt(data[i], ci); }
            for (; i < Resultados.rows.length; i++) { Resultados.rows[i].insertAt([0, 0, 0, []], ci); }
        }
        return ci;
    }
    function rsc(row){
        var s = WHERE(Resultados, [["CR", row[0]], ["Categoría", row[1]], ["Pregunta", row[2]]])[0];
        if (s) { row = s; } 
        else {
            for (var i = 3; i < Resultados.cols.length; i++) { row.push([0, 0, 0, []]); }
            row = INSERT(Resultados, Resultados.cols, row);
        }
        return row;
    }
    function prome(row, pp) {
        pp[1]++;
        pp[2] += SELECT("Interacciones", row, ["Peso"]);
        pp[0] = pp[2] / pp[1];
        pp[3].push(row);
    }
    function countD(row, pp){
        var tmp = [SELECT("Interacciones", row, ["Inscripcion"])];
        var arri = arrind(pp[1], tmp);
        if(arri[0]){ tmp = arri[0]; }
        else{ pp[0]++; tmp[1] = []; pp[3].insertAt(tmp, arri); }
        tmp[3].push(row);
    }
    function indexCol(a, e) {
        if (!e && e != 0) { e = Resultados.cols.length - 1; }
        for (var s = 0, i, r, b; s <= e;) {
            i = s + Math.round((e - s) / 2);
            b = ColPK.map(function(c) { return Resultados.rows[c][i]; });
            r = cddc(a, b);
            if (r > 0) { s = i + 1; } else if (r) { e = i - 1; } else { s = i; break; }
        }
        return [!r ? b : null, s];
    }
    function cddc(a, b) {
        for (var i = 0, r = 0; i < a.length && !r; i++) { r = compare(a[i], b[i]); }
        return r;
    }
    function compare(a, b) {
        a = collate(1, a); b = collate(1, b);
        return a === null ? (b === null ? 0 : 1) : b === null ? (a === null ? 0 : -1) : (a > b ? 1 : a < b ? -1 : 0) * 1
    }
    function arrind (arr, a){
        a = a[0];
        for(var s = 0, e = arr.length -1, i,r,b; s <= e;){
            i = s + Math.round((e - s) / 2);
            b = arr[i][0];
            r = compare(a, b);
            if (r > 0) { s = i + 1; } else if (r) { e = i - 1; } else { s = i; break; }
        }
        return [!r ? b : null, s];
    }
}