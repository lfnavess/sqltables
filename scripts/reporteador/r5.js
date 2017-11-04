function work(data) {
    "use strict";
    //data = data.split("\n").map(function(a) { return a.split("\t"); });
    var Competencias = CREATE_TABLE(
        "Competencias",
        [
            ["Competencia", "nvarchar", 50, null, null, "NOT NULL", [[null, "PRIMARY KEY", null, null]]],
            ["position", "smallint", null, null, null, "NOT NULL", [[null, "UNIQUE", null, null]]],
            ["Style", "nvarchar", 100, null, null, "NOT NULL", null]
        ]
    );
    INSERT(Competencias, '"Competencia","position","Style"', ["Comunicación", "1", "background-color:#FFF2CC;"]);
    INSERT(Competencias, '"Competencia","position","Style"', ["Trabajo en Equipo", "2", "background-color:#FFF2CC;"]);
    INSERT(Competencias, '"Competencia","position","Style"', ["Negociación", "3", "background-color:#FFF2CC;"]);
    INSERT(Competencias, '"Competencia","position","Style"', ["Liderazgo", "4", "background-color:#FFF2CC;"]);
    INSERT(Competencias, '"Competencia","position","Style"', ["Creativaidad e Innovación", "5", "background-color:#FFF2CC;"]);
    INSERT(Competencias, '"Competencia","position","Style"', ["Planeación", "6", "background-color:#FFF2CC;"]);

    var CompetenciaP = CREATE_TABLE(
        "CompetenciaP",
        [
            ["Pregunta", "nvarchar", 50, null, null, "NOT NULL", [[null, "PRIMARY KEY", null, null]]],
            ["Competencia", "nvarchar", 50, null, null, "NOT NULL", [[null, "FOREING KEY", "Competencias", "Competencia"]]]
        ]
    );
    INSERT(CompetenciaP, '"Competencia","Pregunta"', ["Planeación", "P06"]);
    INSERT(CompetenciaP, '"Competencia","Pregunta"', ["Planeación", "P07"]);
    INSERT(CompetenciaP, '"Competencia","Pregunta"', ["Planeación", "P08"]);
    INSERT(CompetenciaP, '"Competencia","Pregunta"', ["Planeación", "P09"]);
    INSERT(CompetenciaP, '"Competencia","Pregunta"', ["Planeación", "P10"]);
    INSERT(CompetenciaP, '"Competencia","Pregunta"', ["Planeación", "P11"]);
    INSERT(CompetenciaP, '"Competencia","Pregunta"', ["Planeación", "P12"]);
    INSERT(CompetenciaP, '"Competencia","Pregunta"', ["Planeación", "P13"]);
    INSERT(CompetenciaP, '"Competencia","Pregunta"', ["Planeación", "P14"]);

    INSERT(CompetenciaP, '"Competencia","Pregunta"', ["Trabajo en Equipo", "P15"]);
    INSERT(CompetenciaP, '"Competencia","Pregunta"', ["Trabajo en Equipo", "P16"]);
    INSERT(CompetenciaP, '"Competencia","Pregunta"', ["Trabajo en Equipo", "P17"]);
    INSERT(CompetenciaP, '"Competencia","Pregunta"', ["Trabajo en Equipo", "P18"]);
    INSERT(CompetenciaP, '"Competencia","Pregunta"', ["Trabajo en Equipo", "P19"]);
    INSERT(CompetenciaP, '"Competencia","Pregunta"', ["Trabajo en Equipo", "P20"]);
    INSERT(CompetenciaP, '"Competencia","Pregunta"', ["Trabajo en Equipo", "P21"]);
    INSERT(CompetenciaP, '"Competencia","Pregunta"', ["Trabajo en Equipo", "P22"]);
    INSERT(CompetenciaP, '"Competencia","Pregunta"', ["Trabajo en Equipo", "P23"]);
    INSERT(CompetenciaP, '"Competencia","Pregunta"', ["Trabajo en Equipo", "P24"]);

    INSERT(CompetenciaP, '"Competencia","Pregunta"', ["Negociación", "P25"]);
    INSERT(CompetenciaP, '"Competencia","Pregunta"', ["Negociación", "P26"]);
    INSERT(CompetenciaP, '"Competencia","Pregunta"', ["Negociación", "P27"]);
    INSERT(CompetenciaP, '"Competencia","Pregunta"', ["Negociación", "P28"]);
    INSERT(CompetenciaP, '"Competencia","Pregunta"', ["Negociación", "P29"]);
    INSERT(CompetenciaP, '"Competencia","Pregunta"', ["Negociación", "P30"]);
    INSERT(CompetenciaP, '"Competencia","Pregunta"', ["Negociación", "P31"]);
    INSERT(CompetenciaP, '"Competencia","Pregunta"', ["Negociación", "P32"]);
    INSERT(CompetenciaP, '"Competencia","Pregunta"', ["Negociación", "P33"]);
    INSERT(CompetenciaP, '"Competencia","Pregunta"', ["Negociación", "P34"]);

    INSERT(CompetenciaP, '"Competencia","Pregunta"', ["Liderazgo", "P35"]);
    INSERT(CompetenciaP, '"Competencia","Pregunta"', ["Liderazgo", "P36"]);
    INSERT(CompetenciaP, '"Competencia","Pregunta"', ["Liderazgo", "P37"]);
    INSERT(CompetenciaP, '"Competencia","Pregunta"', ["Liderazgo", "P38"]);
    INSERT(CompetenciaP, '"Competencia","Pregunta"', ["Liderazgo", "P39"]);
    INSERT(CompetenciaP, '"Competencia","Pregunta"', ["Liderazgo", "P40"]);
    INSERT(CompetenciaP, '"Competencia","Pregunta"', ["Liderazgo", "P41"]);
    INSERT(CompetenciaP, '"Competencia","Pregunta"', ["Liderazgo", "P42"]);
    INSERT(CompetenciaP, '"Competencia","Pregunta"', ["Liderazgo", "P43"]);
    INSERT(CompetenciaP, '"Competencia","Pregunta"', ["Liderazgo", "P44"]);
    INSERT(CompetenciaP, '"Competencia","Pregunta"', ["Liderazgo", "P45"]);
    INSERT(CompetenciaP, '"Competencia","Pregunta"', ["Liderazgo", "P46"]);
    INSERT(CompetenciaP, '"Competencia","Pregunta"', ["Liderazgo", "P47"]);
    INSERT(CompetenciaP, '"Competencia","Pregunta"', ["Liderazgo", "P48"]);

    INSERT(CompetenciaP, '"Competencia","Pregunta"', ["Creatividad e Innovación", "P49"]);
    INSERT(CompetenciaP, '"Competencia","Pregunta"', ["Creatividad e Innovación", "P50"]);
    INSERT(CompetenciaP, '"Competencia","Pregunta"', ["Creatividad e Innovación", "P51"]);
    INSERT(CompetenciaP, '"Competencia","Pregunta"', ["Creatividad e Innovación", "P52"]);
    INSERT(CompetenciaP, '"Competencia","Pregunta"', ["Creatividad e Innovación", "P53"]);
    INSERT(CompetenciaP, '"Competencia","Pregunta"', ["Creatividad e Innovación", "P54"]);
    INSERT(CompetenciaP, '"Competencia","Pregunta"', ["Creatividad e Innovación", "P55"]);
    INSERT(CompetenciaP, '"Competencia","Pregunta"', ["Creatividad e Innovación", "P56"]);
    INSERT(CompetenciaP, '"Competencia","Pregunta"', ["Creatividad e Innovación", "P57"]);

    INSERT(CompetenciaP, '"Competencia","Pregunta"', ["Planeación", "P58"]);
    INSERT(CompetenciaP, '"Competencia","Pregunta"', ["Planeación", "P59"]);
    INSERT(CompetenciaP, '"Competencia","Pregunta"', ["Planeación", "P60"]);
    INSERT(CompetenciaP, '"Competencia","Pregunta"', ["Planeación", "P61"]);
    INSERT(CompetenciaP, '"Competencia","Pregunta"', ["Planeación", "P62"]);
    INSERT(CompetenciaP, '"Competencia","Pregunta"', ["Planeación", "P63"]);
    INSERT(CompetenciaP, '"Competencia","Pregunta"', ["Planeación", "P64"]);
    INSERT(CompetenciaP, '"Competencia","Pregunta"', ["Planeación", "P65"]);
    INSERT(CompetenciaP, '"Competencia","Pregunta"', ["Planeación", "P66"]);

    var ValueR = CREATE_TABLE(
        "ValueR",
        [
            ["value", "nvarchar", 255, null, null, "NOT NULL", [[null, "PRIMARY KEY", null, null]]],
            ["rate", "smallint", null, null, null, "NOT NULL", null]
        ]
    );
    INSERT(ValueR, '"value","rate"', ["Nunca", "0"]);
    INSERT(ValueR, '"value","rate"', ["Rara Vez", "33"]);
    INSERT(ValueR, '"value","rate"', ["Casi Siempre", "67"]);
    INSERT(ValueR, '"value","rate"', ["Siempre", "100"]);

    var mdl_feedback_item = CREATE_TABLE(
        "mdl_feedback_item",
        [
            ["id", "bigint", null, null, null, "NOT NULL", [[null, "PRIMARY KEY", null, null]]],
            ["position", "smallint", null, null, null, "NOT NULL", [[null, "UNIQUE", null, null]]],
            ["label", "nvarchar", 255, null, null, "NOT NULL", [[null, "UNIQUE", null, null]]],
            ["name", "nvarchar", 255, null, null, "NOT NULL", null],
            ["typ", "nvarchar", 255, null, null, "NOT NULL", null],
            ["Competencia", "nvarchar", 50, null, null, "NULL", [[null, "FOREING KEY", "Competencias", "Competencia"]]]
        ]
    );

    var mdl_feedback_item_value = CREATE_TABLE(
        "mdl_feedback_item_value",
        [
            ["item", "bigint", null, null, null, "NOT NULL", [[null, "FOREING KEY", "mdl_feedback_item", "id"]]],
            ["position", "tinyint", null, null, null, "NOT NULL", null],
            ["value", "nvarchar", 255, null, null, "NOT NULL", null],
            ["rate", "smallint", null, null, null, "NULL", null]
        ],
        [
            [null, "PRIMARY KEY", [["item"], ["position"]], null, null],
            [null, "UNIQUE", [["item"], ["value"]], null, null]
        ]
    );

    var mdl_feedback_completed = CREATE_TABLE("mdl_feedback_completed", [["id", "bigint", null, null, null, "NOT NULL", [[null, "PRIMARY KEY", null, null]]]]);

    var mdl_feedback_value = CREATE_TABLE(
        "mdl_feedback_value",
        [
            ["completed", "bigint", null, null, null, "NOT NULL", [[null, "FOREING KEY", "mdl_feedback_completed", "id"]]],
            ["item", "bigint", null, null, null, "NOT NULL", [[null, "FOREING KEY", "mdl_feedback_item", "id"]]],
            ["value", "nvarchar", 255, null, null, "NOT NULL", null],
            ["rate", "smallint", null, null, null, "NULL", null]
        ],
        [[null, "PRIMARY KEY", [["completed"], ["item"]], null, null]]
    );

    var interactions = CREATE_TABLE(
        "interactions",
        [
            ["completed", "bigint", null, null, null, "NOT NULL", null],
            ["Site", "nvarchar", 255, null, null, "NOT NULL", null],
            ["Cargo", "nvarchar", 255, null, null, "NOT NULL", null],
            ["Sexo", "nvarchar", 255, null, null, "NOT NULL", null],
            ["Grado Académico", "nvarchar", 255, null, null, "NOT NULL", null],
            ["Edad", "nvarchar", 255, null, null, "NOT NULL", null],
            ["item", "bigint", null, null, null, "NOT NULL", null],
            ["position", "smallint", null, null, null, "NOT NULL", null],
            ["Competencia", "nvarchar", 50, null, null, "NOT NULL", null],
            ["label", "nvarchar", 255, null, null, "NOT NULL", null],
            ["Pregunta", "nvarchar", 255, null, null, "NOT NULL", null],
            ["value", "nvarchar", 255, null, null, "NOT NULL", null],
            ["rate", "smallint", null, null, null, "NULL", null]
        ],
        [[null, "PRIMARY KEY", [["completed"], ["item"]], null, null]]
    );
    var from = [d1, CompetenciaP, Competencias, mdl_feedback_item];
    for(var i = 1, values, r = []; i < from[0].length; i++) {
        r[0] = from[0][i];
        r[1] = WHERE(from[1], [["Pregunta", r[0][2]]])[0];
        r[2] = r[1] ? r[1][1] : null;
        r[3] = INSERT(from[3], '"id","position","label","name","typ","Competencia"', [r[0][0], r[0][1], r[0][2], r[0][3], r[0][4][0], r[2] ? r[2][0] : null]);
        values = r[0][4].split(">>>>>")[1].split("<<<<<")[0].split("|");
        for(var j = 0, k, v; j < values.length; j++) {
            k = values[j]; v = null;
            if(k.indexOf("####") >= 0) { k = k.split("####"); v = k[0] === "-1" ? null : k[0]; k = k[1]; }
            else {
                v = WHERE(ValueR, [["value", k]])[0];
                if(v) { v = v[1]; }
            }
            INSERT(mdl_feedback_item_value, '"item","position","value","rate"', [r[3][0], j + 1, k, v]);
        }
        if(r[0][4][0] === "d") { insertCol(mdl_feedback_completed, [r[3][3], "nvarchar", 255, null, null, "NULL", null], ci); }
    }
    var from = [d2, mdl_feedback_completed, mdl_feedback_item, mdl_feedback_item_value, mdl_feedback_value];
    for(var i = 1, from_r = []; i < from[0].length; i++) {
        from_r[0] = from[0][i];
        from_r[1] = WHERE(from[1], [["id", parseInt(from_r[0][0])]])[0];
        from_r[1] = from_r[1] || INSERT(from[1], '"id"', from_r[0][0]);
        from_r[2] = WHERE(from[2], [["id", parseInt(from_r[0][1])]])[0];
        from_r[3] = WHERE(from[3], [["item", parseInt(from_r[0][1])], ["position", parseInt(from_r[0][2])]])[0];
        if(from_r[2][4] === "d") {
            var c = from[1].cols.find(c => c.compare(from_r[2][3], c[2]) === 0);
            from_r[1][cddf(c)] = from_r[3][2];
        } else { from_r[4] = INSERT(from[4], '"completed","item","value","rate"', [from_r[1][0], from_r[2][0], from_r[3][2], from_r[3][3]]); }
    }
    for(var i = 0, r; i < mdl_feedback_value.rows.length; i++) {
        r = mdl_feedback_value.rows[i];
        INSERT(
            interactions,
            '"completed","Site","Cargo","Sexo","Grado Académico","Edad","item","position","Competencia","label","Pregunta","value","rate"',
            [...r[0], r[1][0], r[1][1], r[1][5][0], r[1][2], r[1][3], r[2], r[3]]
        );
    }

    var vCols = [["Competencia", 1], ["name", 1]];
    var hCols = [
        ["Site", 1, "background-color:#DDEBF7;"],
        ["Cargo", 1, "background-color:#FCE4D6;"],
        ["Sexo", 1, "background-color:#EDEDED;"],
        ["Grado Académico", 1, "background-color:#EDEDED;"],
        ["Edad", 1, "background-color:#EDEDED;"]
    ];
    var Resultados = CREATE_TABLE(
        "Resultados",
        [
            ["CR", "tinyint", null, null, null, "NOT NULL", null],
            ["Competencia", "nvarchar", 50, null, null, "NOT NULL", null],
            ["Pregunta", "nvarchar", 255, null, null, "NOT NULL", null]
        ],
        [[null, "PRIMARY KEY", [["CR"], ["Competencia"], ["Pregunta"]], null, null]]
    );

    INSERT(Resultados, Resultados.cols, [0, 1, 1]);
    INSERT(Resultados, Resultados.cols, [1, 1, 2]);
    for(var i = 1, row = [2]; i < Resultados.cols.length; i++) { row[i] = Resultados.cols[i][2]; }
    INSERT(Resultados, Resultados.cols, row);
    for(var i = 1, row = [3]; i < Resultados.cols.length; i++) { row[i] = Resultados.cols[i][2]; }
    INSERT(Resultados, Resultados.cols, row);
    var ColPK = [0, 1, 3];
    var cols = new binaryArray();
    cols.compare = function(a, b, o) {
        for(var i = 0, r = 0, ia, ib; i < ColPK.length && !r; i++) {
            r = ColPK[i];
            ia = a || a === 0 ? Array.isArray(a) ? a[r] : a : null;
            ib = b || b === 0 ? Array.isArray(b) ? b[r] : b : null;
            r = this.__proto__.compare(ia, ib, o);
        }
        return r;
    };
    cols.unique = true;
    cols.push([0, 1, 2, 3]);
    cols.push([1, 1, "Competencia", "Competencia"]);
    cols.push([1, 2, "Pregunta", "Pregunta"]);

    function csc2(data) {
        var i = cols.lastIndexOf(data);
        if(i >= 0) { return i; }
        cols.insertAt(data, cols.s);
        insertCol(Resultados, [`${data[2]}|${data[3]}`, "tinyint", null, null, null, "NOT NULL", [[null, "DEFAULT", null, null, "new funcs.AVG(f => f[12])"]]], cols.s);
        for(var i = 0; i <= 3; i++) { Resultados.rows[i][cols.s] = data[i]; }
        Resultados.rows[4][cols.s] = new funcs.COUNT(true, f => f[0]);
        return cols.s;
    }
    var rcont = rsc([4, "Totales", "1.Encuestas"]);
    var rcat = rsc([4, "Totales", "2.Promedio"]);

    var cit = csc2([2, 0, "Totales", "Totales"]);
    var vcs = vCols.map(c => c[0]);
    var ñ = '5,"Competencia","Pregunta"'; ñ = function(f) { return [5, f[8], f[10]]; };
    hCols = hCols.map((c, i, n) => { n = cddf(tableCol(interactions, c[0])); return f => [3, i, c[0], f[n]]; });
    for(var i = 0, row, p, ci, j; i < interactions.rows.length; i++) {
        row = interactions.rows[i];
        p = rsc(ñ(row));
        p[cit].v = rcat[cit].v = rcont[cit].v = row;
        for(j = 0; j < hCols.length; j++) {
            ci = csc2(hCols[j](row));
            p[ci].v = rcat[ci].v = rcont[ci].v = row;
        }
    }
    Resultados.rows.removeAt(2, 0);

    var table = document.createElement("table"); document.body.appendChild(table);
    var tbody = document.createElement("tbody"); table.appendChild(tbody);
    var prevci = [], prevri = []; var twi = 0;
    Resultados.rows.forEach(function(r, ri) {
        var tr = document.createElement("tr"); tbody.appendChild(tr);
        r.removeAt(1, 0);
        if(ri === 1) {
            tr.style.verticalAlign = "bottom";
            tr.style.height = "95px";
        }
        if(ri < 4) { tr.style.fontWeight = "bold"; }
        r.forEach(function(c, ci) {
            var c2 = c;
            c = c !== null && typeof c === "object" ? ci < 2 ? c[0] : c.v || c.v === 0 ?  c.v.toFixed(0) : c.v : c;
            if(ri === 0) {
                var wi = ci === 1 ? 200 : 28;
                if(prevri[ri] && prevri[ri].innerText.trimSingleLine() === c) {
                    prevci[ci] = prevri[ri];
                    prevri[ri].setAttribute("colspan", (prevri[ri].getAttribute("colspan") || 1) * 1 + 1);
                    prevri[ri].style.width = prevri[ri].getAttribute("colspan") * wi + "px";
                    return;
                }
                twi += wi;
                table.style.width = twi + "px";
            }
            if((ci === 0 || ci < 3 && ri < 2) && prevci[ci] && prevci[ci].innerText.trimSingleLine() === c) {
                prevri[ri] = prevci[ci];
                prevci[ci].setAttribute("rowspan", (prevci[ci].getAttribute("rowspan") || 1) * 1 + 1);
                return;
            }
            var td = document.createElement("td"); tr.appendChild(td);
            if(ri === 0) { td.style.verticalAlign = "bottom"; td.style.textAlign = "center"; }
            if(ri === 0 && ci === 2 || ri === 2 && ci === 0) { td.style.backgroundColor = "#BFBFBF"; }
            if(ri === 1 && ci > 2) { td.style.backgroundColor = prevci[ci].style.backgroundColor; }
            if(ri === 1 && ci > 13 || ci === 0 || ri === 0 && ci === 2) {
                var div = document.createElement("div"); td.appendChild(div);
                div.style.transform = "rotate(-90.0deg)";
                div.style.marginBottom = "8px";
                div.textContent = c;
            } else { td.textContent = c; }
            if(ri < 4 || ci < 3) { td.style.border = "1px solid black"; }
            if(ri >= 2 && ci === 1) {
                td.style.backgroundColor = prevri[ri].style.backgroundColor;
            }
            if(ri > 2 && ci > 1) { td.style.textAlign = "center"; td.style.backgroundColor = getColorForPercentage(c / 100); }
            if(ri >= 4 && ci === 0) {
                for(var i = 0, ss = c2[1].split(";").map(s => s.split(":")); i < ss.length && ss[i][0]; i++) { td.style[ss[i][0]] = ss[i][1]; }
            }
            if(ci < 3) { td.style.fontWeight = "bold"; }
            if(ri === 0) {
                if(ci === 3) { td.style.backgroundColor = "#DDEBF7"; }
                else if(ci === 5) { td.style.backgroundColor = "#FCE4D6"; }
                if(wi !== 28) { td.style.width = wi + "px"; }
            }
            prevri[ri] = td;
            prevci[ci] = td;
        });
    });

    function getColorForPercentage(pct) {
        //https://stackoverflow.com/questions/7128675/from-green-to-red-color-depend-on-percentage
        var percentColors = [
            { pct: 0.0, c: { r: 0xf8, g: 0x69, b: 0x6b } },
            { pct: 0.5, c: { r: 0xff, g: 0xeb, b: 0x84 } },
            { pct: 1.0, c: { r: 0x63, g: 0xbe, b: 0x7b } }
        ];
        for(var i = 1; i < percentColors.length - 1; i++) { if(pct < percentColors[i].pct) { break; } }
        var l = percentColors[i - 1];
        var u = percentColors[i];
        var pu = (pct - l.pct) / (u.pct - l.pct);
        var pl = 1 - pu;
        var c = { r: l.c.r * pl + u.c.r * pu | 0, g: l.c.g * pl + u.c.g * pu | 0, b: l.c.b * pl + u.c.b * pu | 0 };
        return `#${`0${c.r.toString(16)}`.substr(-2)}${`0${c.g.toString(16)}`.substr(-2)}${`0${c.b.toString(16)}`.substr(-2)}`;
        //return 'rgb(' + [color.r, color.g, color.b].join(',') + ')';
    }
    function csc(data) {
        var ci = indexCol(ColPK.map(c => data[c]));
        if(ci[0]) { ci = ci[1]; }
        else {
            ci = ci[1];
            insertCol(Resultados, [`${data[2]}|${data[3]}`, "tinyint", null, null, null, "NOT NULL", [[null, "DEFAULT", null, null, "new funcs.AVG(f => f[3])"]]], ci);
            for(var i = 0; i < 4; i++) { Resultados.rows[i][ci] = data[i]; }
            Resultados.rows[4][ci] = new funcs.COUNT(true, f => f[0]);
        }
        return ci;
    }
    function rsc(row) {
        var s = WHERE(Resultados, [["CR", row[0]], ["Competencia", row[1]], ["Pregunta", row[2]]])[0];
        return s || INSERT(Resultados, ["CR", "Competencia", "Pregunta"], row);
    }
    function indexCol(a, e) {
        if(!e && e !== 0) { e = Resultados.cols.length - 1; }
        for(var s = 0, i, b, r = -1; s <= e;) {
            i = s + Math.round((e - s) / 2);
            b = ColPK.map(c => Resultados.rows[c][i]);
            r = cddc(a, b);
            if(r > 0) { s = i + 1; } else if(r) { e = i - 1; } else { s = i; break; }
        }
        return [!r ? b : null, s];
    }
    function cddc(a, b) {
        for(var i = 0, r = 0; i < a.length && !r; i++) { r = compare(a[i], b[i]); }
        return r;
    }
}