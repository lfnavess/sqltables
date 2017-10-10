function work(data) {
    "use strict";
    //data = data.split("\n").map(function(a) { return a.split("\t"); });
    var Categorias = CREATE_TABLE(
        "Categorias",
        [
            ["Categoría", "nvarchar", 50, null, null, "NOT NULL", [[null, "PRIMARY KEY", null, null]]],
            ["Style", "nvarchar", 100, null, null, "NOT NULL", null]
        ]
    );
    INSERT(Categorias, Categorias.cols, ["Evaluación de percepción", "background-color:#FFF2CC;"]);

    var Interacciones = CREATE_TABLE(
        "Interacciones",
        [
            ["Inscripcion", "int", null, null, null, "NOT NULL", null],
            ["Categoría", "nvarchar", 50, null, null, "NOT NULL", [[null, "FOREING KEY", "Categorias", "Categoría"]]],
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
    var vCols = [["Categoría", 1], ["Pregunta", 1]];
    var hCols = [
        ["Sexo", 1, "background-color:#DDEBF7;"],
        ["Edad", 1, "background-color:#FCE4D6;"],
        ["Nivel", 1, "background-color:#EDEDED;"]
    ];
    var Resultados = CREATE_TABLE(
        "Resultados",
        [
            ["CR", "tinyint", null, null, null, "NOT NULL", null],
            ["Categoría", "nvarchar", 50, null, null, "NOT NULL", null],
            ["Pregunta", "nvarchar", 50, null, null, "NOT NULL", null]
        ],
        [[null, "PRIMARY KEY", [["CR"], ["Categoría"], ["Pregunta"]], null, null]]
    );

    INSERT(Resultados, Resultados.cols, [0, 1, 1]);
    INSERT(Resultados, Resultados.cols, [1, 1, 2]);
    for (var i = 1, row = [2]; i < Resultados.cols.length; i++) { row[i] = Resultados.cols[i][2]; }
    INSERT(Resultados, Resultados.cols, row);
    for (var i = 1, row = [3]; i < Resultados.cols.length; i++) { row[i] = Resultados.cols[i][2]; }
    INSERT(Resultados, Resultados.cols, row);
    var ColPK = [0, 1, 3];
    var cols = new binaryArray();
    cols.compare = function(a, b, o) {
        for (var i = 0, r = 0, ia, ib; i < ColPK.length && !r; i++) {
            r = ColPK[i];
            ia = a ? a[r] : null;
            ib = b ? b[r] : null;
            r = this.__proto__.compare(ia, ib, o);
        }
        return r;
    }
    cols.unique = true;
    cols.push([0, 1, 2, 3]);
    cols.push([1, 1, "Categoría", "Categoría"]);
    cols.push([1, 2, "Pregunta", "Pregunta"]);

    function csc2(data) {
        if (cols.lastIndexOf(data) >= 0) { return cols.s; }
        else {
            cols.insertAt(data, cols.s);
            insertCol(Resultados, [`${data[2]}|${data[3]}`, "tinyint", null, null, null, "NOT NULL", [[null, "DEFAULT", null, null, "new funcs.AVG(f => f[3])"]]], cols.s);
            //for (var i = 0; i < 4; i++) { Resultados.rows[i][ci] = data[i]; }
            //Resultados.rows[4][ci] = new funcs.COUNT(true, f => f[0]);
        }
    }
    //csc2([2, 0, "Totales", "Totales"]);
    var rcont = rsc([4, "Totales", "1.Encuestas"]);
    var rcat = rsc([4, "Totales", "2.Promedio"]);

    Resultados.cols.indexOf([2, 0, "Totales", "Totales"]);
    var cit = csc([2, 0, "Totales", "Totales"]);
    var vcs = vCols.map(c => c[0]);
    var ñ = '5,"Categoría","Pregunta"'; ñ = function(f) { return [5, f[1], f[2]]; };
    hCols = hCols.map((c, i, n) => { n = cddf(tableCol(Interacciones, c[0])); return f => [3, i, c[0], f[n]]; });
    for (var i = 1, length = data.length - 1, row, p, ci, j; i < length; i++) {
        row = INSERT(Interacciones, data[0], data[i]);
        p = rsc(ñ(row));
        p[cit].v = rcat[cit].v = rcont[cit].v = row;
        for (j = 0; j < hCols.length; j++) {
            ci = csc(hCols[j](row));
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
        if (ri === 1) {
            tr.style.verticalAlign = "bottom";
            tr.style.height = "95px";
        }
        if (ri < 4) { tr.style.fontWeight = "bold"; }
        r.forEach(function(c, ci) {
            var c2 = c;
            c = c !== null && typeof c === "object" ? ci < 2 ? c[0] : c.v.toFixed(0) : c;
            if (ri === 0) {
                var wi = ci === 1 ? 200 : 28;
                if (prevri[ri] && prevri[ri].innerText.trimSingleLine() === c) {
                    prevci[ci] = prevri[ri];
                    prevri[ri].setAttribute("colspan", (prevri[ri].getAttribute("colspan") || 1) * 1 + 1);
                    prevri[ri].style.width = prevri[ri].getAttribute("colspan") * wi + "px";
                    return;
                }
                twi += wi;
                table.style.width = twi + "px";
            }
            if ((ci === 0 || ci < 3 && ri < 2) && prevci[ci] && prevci[ci].innerText.trimSingleLine() === c) {
                prevri[ri] = prevci[ci];
                prevci[ci].setAttribute("rowspan", (prevci[ci].getAttribute("rowspan") || 1) * 1 + 1);
                return;
            }
            var td = document.createElement("td"); tr.appendChild(td);
            if (ri === 0) { td.style.verticalAlign = "bottom"; td.style.textAlign = "center"; }
            if (ri === 0 && ci === 2 || ri === 2 && ci === 0) { td.style.backgroundColor = "#BFBFBF"; }
            if (ri === 1 && ci > 2) { td.style.backgroundColor = prevci[ci].style.backgroundColor; }
            if (ri === 1 && ci > 13 || ci === 0 || ri === 0 && ci === 2) {
                var div = document.createElement("div"); td.appendChild(div);
                div.style.transform = "rotate(-90.0deg)";
                div.style.marginBottom = "8px";
                div.textContent = c;
            } else { td.textContent = c; }
            if (ri < 4 || ci < 3) { td.style.border = "1px solid black"; }
            if (ri >= 2 && ci === 1) {
                td.style.backgroundColor = prevri[ri].style.backgroundColor;
            }
            if (ri > 2 && ci > 1) { td.style.textAlign = "center"; td.style.backgroundColor = getColorForPercentage(c / 100); }
            if (ri >= 4 && ci === 0) {
                for (var i = 0, ss = c2[1].split(";").map(s => s.split(":")); i < ss.length && ss[i][0]; i++) { td.style[ss[i][0]] = ss[i][1]; }
            }
            if (ci < 3) { td.style.fontWeight = "bold"; }
            if (ri === 0) {
                if (ci === 3) { td.style.backgroundColor = "#DDEBF7"; }
                else if (ci === 5) { td.style.backgroundColor = "#FCE4D6"; }
                if (wi !== 28) { td.style.width = wi + "px"; }
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
        for (var i = 1; i < percentColors.length - 1; i++) { if (pct < percentColors[i].pct) { break; } }
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
        if (ci[0]) { ci = ci[1]; }
        else {
            ci = ci[1];
            insertCol(Resultados, [`${data[2]}|${data[3]}`, "tinyint", null, null, null, "NOT NULL", [[null, "DEFAULT", null, null, "new funcs.AVG(f => f[3])"]]], ci);
            for (var i = 0; i < 4; i++) { Resultados.rows[i][ci] = data[i]; }
            Resultados.rows[4][ci] = new funcs.COUNT(true, f => f[0]);
        }
        return ci;
    }
    function rsc(row) {
        var s = WHERE(Resultados, [["CR", row[0]], ["Categoría", row[1]], ["Pregunta", row[2]]])[0];
        return s || INSERT(Resultados, ["CR", "Categoría", "Pregunta"], row);
    }
    function indexCol(a, e) {
        if (!e && e !== 0) { e = Resultados.cols.length - 1; }
        for (var s = 0, i, b, r = -1; s <= e;) {
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
}