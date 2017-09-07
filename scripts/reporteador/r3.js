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
            ["EdadG", "nvarchar", 50, null, null, "NULL", null],
            ["Empresa", "nvarchar", 50, null, null, "NOT NULL", null],
            ["Empresa tipo", "nvarchar", 50, null, null, "NOT NULL", null],
            ["Banda", "nvarchar", 50, null, null, "NULL", null],
            ["Dirección", "nvarchar", 50, null, null, "NULL", null],
            ["AntigüedadG", "nvarchar", 50, null, null, "NOT NULL", null]
        ],
        [
            [null, "PRIMARY KEY", [["Inscripcion"], ["Pregunta"]], null, null],
            [null, "UNIQUE", [["Pregunta"], ["Inscripcion"]], null, null]
        ]
    );

    CREATE_TABLE(
        "Resultados",
        [
            ["Categoría", "nvarchar", 50, null, null, "NOT NULL", null],
            ["Pregunta", "tinyint", null, null, null, "NOT NULL", null],
            ["Promedio", "promedio", null, null, null, "NULL", null]
        ],
        [[null, "PRIMARY KEY", [["Categoría"],["Pregunta"]], null, null]]
    )
    CREATE_TABLE(
        "HResultados",
        [
            ["EdadG", "nvarchar", 50, null, null, "NULL", [[null, "PRIMARY KEY", null, null]]],
            ["Promedio", "promedio", null, null, null, "NULL", null]
        ]
    )
    for(var i = 1, length = data.length -1, row, v, result,pp, hresult; i < length; i++){
        row = INSERT("Interacciones",data[0],data[i]);
        v = SELECT("Interacciones", row, ["Categoría","Pregunta"]);
        result = WHERE("Resultados",[["Pregunta",v]])[0];
        if(!result){ result = INSERT("Resultados", ["Categoría","Pregunta","Promedio"],[v, [0,0,0,[]]]); }
        pp = SELECT("Resultados", result, ["Promedio"]);
        pp[1]++;
        pp[2] += SELECT("Interacciones", row, ["Peso"]);
        pp[0] = pp[2] / pp[1];
        pp[3].push(row);
        v = SELECT("Interacciones", row, ["EdadG"]);
        hresult = WHERE("HResultados", [["EdadG", v]])[0];
        if(!hresult){
            
        }
    }
                
}