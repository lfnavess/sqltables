function work(data) {
    //data = data.split("\n").map(function(a) { return a.split("\t"); });
    var Posiciones = CREATE_TABLE(
        "Posiciones",
        [
            ["Posición ID", "int", null, null, "IDENTITY", "NULL", [[null, "PRIMARY KEY", null, null]]],
            ["Email", "nvarchar", 50, null, null, "NULL", [[null, "UNIQUE", null, null]]]
        ]
        
    )
    var Colaboradores = CREATE_TABLE(
        "Colaboradores",
        [
            ["Colaborador ID", "int", null, null, null, "NOT NULL", [[null, "PRIMARY KEY", null, null]]],
            ["Nombre corto", "nvarchar", 50, null, null, "NOT NULL", null],
            ["Usuario", "nvarchar", 6, null, null, "NOT NULL", [[null, "UNIQUE", null, null]]],
            ["Posición", "int", null, null, null, "NULL", [[null, "UNIQUE", null, null], [null, "FOREING KEY", Posiciones, "Posición ID"]]]
        ]
    );
    var Inscripciones = CREATE_TABLE(
        "Inscripciones",
        [
            ["Fecha corte", "smalldatetime", null, null, null, "NOT NULL", null],
            ["Estado", "nvarchar", 50, null, null, "NOT NULL", null],
            ["Alumno >Nombre corto", "nvarchar", 50, null, null, "NOT NULL", null],
            ["Alumno >Usuario", "nvarchar", 6, null, null, "NOT NULL", null],
            ["Curso >Nombre", "nvarchar", 100, null, null, "NOT NULL", null],
            ["Estado2", "nvarchar", 50, null, null, "NULL", null],
            ["Progreso", "tinyint", null, null, null, "NOT NULL", null],
            ["Último progreso", "smalldatetime", null, null, null, "NULL", null],
            ["Alumno >Posición >Email", "nvarchar", 50, null, null, "NULL", null],
            ["Alumno >Posición >Teléfono", "nvarchar", 50, null, null, "NULL", null],
            ["Alumno >Posición >Teléfono Móvil", "nvarchar", 50, null, null, "NULL", null],
            ["Alumno >Posición >Lugar", "nvarchar", 50, null, null, "NULL", null]
        ]
    );
    var formats = [
        "Inscripciones",
        [
            ["Fecha corte", "DD/MM/YYYY hh:mm:ss a", "DD/MM/YYYY HH:mm"],
            ["Estado", null, null],
            ["Alumno >Nombre corto", null, null],
            ["Alumno >Usuario", null, null],
            ["Curso >Nombre", null, null, null],
            ["Estado2", null, null, null],
            ["Progreso", null, null, null],
            ["Último progreso", null, "DD/MM/YYYY hh:mm:ss a", "DD/MM/YYYY HH:mm"],
            ["Alumno >Posición >Email", null, null, null],
            ["Alumno >Posición >Teléfono", null, null, null],
            ["Alumno >Posición >Teléfono Móvil", null, null, null],
            ["Alumno >Posición >Lugar", null, null, null]
        ]
    ];
    var ori = CREATE_TABLE("ori", data.splice(1)[0].map(c => [c, "nvarchar", 200, null, null, "NULL", null]));
    for(var i = 0; i < data.length; i++){ if(!data[i]){ break; } }
    ori.rows =  i < data.length ? data.slice(0, i) : data;
    var exp = {
        "IN": function(left, data){ return data.indexOf(left) > -1; }
    }
    
    var filtered = [];
    var conditions = '"Alumno >Posición >Lugar >Empresa >Tipo" = \'INT COMEX [C]\' AND "Curso" IN() AND "Estado" IN(\'Completado\',\'Incompleto\',\'Sin iniciar\')';
    var selcols = formats[1].map(c => c[0]);
    for(var i = 0, row; i < ori.rows.length; i++){
        row = SELECT(ori, ori.rows[i], selcols);
        for(var j = 0; j < formats[1].length; j++){
            if(formats[1][j][1]){ row[j] = moment(row[j].replace(". m.", ".m."), formats[1][j][1], true).format(formats[1][j][2]); }
        }
        row = INSERT(formats[0], selcols, row);
        
    }
    row["Fecha corte"] = function(){ return this[0]; }
    
    

    //console.log(Resultados.rows.map(function(r) { return r.map(function(c) { return Array.isArray(c) ? c[0] : c; }).join("\t"); }).join("\n"));

    function getColorForPercentage(pct) {
        //https://stackoverflow.com/questions/7128675/from-green-to-red-color-depend-on-percentage
        var percentColors = [
            { pct: 0.0, color: { r: 0xf8, g: 0x69, b: 0x6b } },
            { pct: 0.5, color: { r: 0xff, g: 0xeb, b: 0x84 } },
            { pct: 1.0, color: { r: 0x63, g: 0xbe, b: 0x7b } }
        ];
        for (var i = 1; i < percentColors.length - 1; i++) { if (pct < percentColors[i].pct) { break; } }
        var lower = percentColors[i - 1];
        var upper = percentColors[i];
        var pctUpper = (pct - lower.pct) / (upper.pct - lower.pct);
        var pctLower = 1 - pctUpper;
        var color = {
            r: Math.floor(lower.color.r * pctLower + upper.color.r * pctUpper),
            g: Math.floor(lower.color.g * pctLower + upper.color.g * pctUpper),
            b: Math.floor(lower.color.b * pctLower + upper.color.b * pctUpper)
        };
        return '#{0}{1}{2}'.format(
            "0{0}".format(color.r.toString(16)).substr(-2),
            "0{0}".format(color.g.toString(16)).substr(-2),
            "0{0}".format(color.b.toString(16)).substr(-2)
        );
        //return 'rgb(' + [color.r, color.g, color.b].join(',') + ')';
    }
    function csc(data) {
        var ci = indexCol(ColPK.map(function(c) { return data[c]; }));
        if (ci[0]) { ci = ci[1]; }
        else {
            ci = ci[1];
            insertCol(Resultados, ["{0}|{1}".format(data[2], data[3]), "tinyint", null, null, null, "NOT NULL", [[null, "DEFAULT", null, null, "[0,0,0,[]]"]]], ci);
            for (var i = 0; i < 4; i++) { Resultados.rows[i][ci] = data[i]; }
        }
        return ci;
    }
    function rsc(row) {
        var s = WHERE(Resultados, [["CR", row[0]], ["Categoría", row[1]], ["Pregunta", row[2]]])[0];
        return s || INSERT(Resultados, ["CR", "Categoría", "Pregunta"], row);
    }
    function prome(row, pp) {
        pp[1]++;
        pp[2] += SELECT(Interacciones, row, ["Peso"]);
        pp[0] = pp[2] / pp[1];
        pp[3].push(row);
    }
    function countD(row, pp) {
        var tmp = [SELECT(Interacciones, row, ["Inscripcion"])];
        var arri = arrind(pp[3], tmp);
        if (arri[0]) { tmp = arri[0]; }
        else { pp[0]++; tmp[1] = []; pp[3].insertAt(tmp, arri[1]); }
        tmp[1].push(row);
    }
    function indexCol(a, e) {
        if (!e && e != 0) { e = Resultados.cols.length - 1; }
        for (var s = 0, i, r, b; s <= e;) {
            i = s + Math.round((e - s) / 2);
            b = ColPK.map(c => Resultados.rows[c][i]);
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
    function arrind(arr, a) {
        for (var s = 0, e = arr.length - 1, i, r, b; s <= e;) {
            i = s + Math.round((e - s) / 2);
            b = arr[i];
            r = compare(a[0], b[0]);
            if (r > 0) { s = i + 1; } else if (r) { e = i - 1; } else { s = i; break; }
        }
        return [!r ? b : null, s];
    }
}