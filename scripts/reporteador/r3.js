function work(data){
    data = data.split("\n").map(function(a){ return a.split("\t"); });
    CREATE_TABLE(
        "Interacciones",
        [
            ["Inscripcion", "int", null, null, null, "NOT NULL", null],
            ["Categoría", "nvarchar", 50, null, null, "NOT NULL", null],
            ["Pregunta", "tinyint", null, null, null, "NOT NULL", null],
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
    var hCols = [["sexo",1],["Edad",1]];
    var Resultados = CREATE_TABLE(
        "Resultados",
        [
            ["CR", "tinyint", null, null, null, "NOT NULL", null],
            ["Categoría", "nvarchar", 50, null, null, "NOT NULL", null],
            ["Pregunta", "nvarchar", 50, null, null, "NOT NULL", null]
        ],
        [[null, "PRIMARY KEY", [["CR"],["Categoría"],["Pregunta"]], null, null]]
    )
    var rcat =[];
    rcat[0] = INSERT("Resultados", Resultados.cols,[0, 1, 1]);
    rcat[1] = INSERT("Resultados", Resultados.cols,[1, 1, 2]);
    for(var i = 1, row = [2]; i < Resultados.cols.length; i++){ row[i] = Resultados.cols[i][2]; }
    rcat[2] = INSERT("Resultados", Resultados.cols, row);
    //Row col vals
    rcat[3] = INSERT("Resultados", Resultados.cols,[3, ".", "."]);
    rcat[4] = INSERT("Resultados", Resultados.cols,[4, "Totales", "."]);
    
    var a = [2,null,"Totales",null];
    var ColPK = [0,1,3];
    var ci = indexCol(ColPK.map(function(c){return a[c]; }))[1];
   
    Resultados.cols.insertAt(insertCol(Resultados, ["Totales", "tinyint", null, null, null, "NOT NULL", null]), ci);
    
    for(var i = 0; i < 4; i++){ Resultados.rows[i].insertAt(a[i], ci); }
    for(; i < Resultados.rows.length; i++){ Resultados.rows[i].insertAt([0,0,0,[]], ci); }
    
    var IndexCol = 3;
    
    for(var i = 1, length = data.length -1, row, v, result,pp, hresult; i < length; i++){
        row = INSERT("Interacciones",data[0],data[i]);
        v = SELECT("Interacciones", row, ["Categoría","Pregunta"]);
        result = WHERE("Resultados",[["CR",5],["Categoría", v[0]],["Pregunta",v[1]]])[0];
        if(!result){ result = INSERT("Resultados", ["Categoría","Pregunta","Total"],[v, [0,0,0,[]]]); }
        pp = SELECT("Resultados", result, ["Total"]);
        pp[1]++;
        pp[2] += SELECT("Interacciones", row, ["Peso"]);
        pp[0] = pp[2] / pp[1];
        pp[3].push(row);
        v = SELECT("Interacciones", row, ["EdadG"]);
        hresult = WHERE("HResultados", [["EdadG", v]])[0];
        if(!hresult){
            
        }
    }
           
    function indexCol(a, e){
        if (!e && e != 0) { e = Resultados.cols.length - 1; }
        for (var s = 0, i, r, b; s <= e;) {
            i = s + Math.round((e - s) / 2);
            b = ColPK.map(function(c){ return Resultados.rows[c][i]; });
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
        return a === null ? -1 : b === null ? 1 : (a > b ? 1 : a < b ? -1 : 0) * 1
    }
             
}