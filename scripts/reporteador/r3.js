function work(data) {
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
    var vcs = vCols.map(function(c) { return c[0]; });

    for (var i = 1, length = data.length - 1, row, result, ci; i < length; i++) {
        row = INSERT(Interacciones, data[0], data[i]);
        countD(row, rcont[cit]);
        prome(row, rcat[cit]);
        result = SELECT(Interacciones, row, vcs);
        result = rsc([5, result[0], result[1]]);
        prome(row, result[cit]);
        for (j = 0; j < hCols.length; j++) {
            ci = [3, j, hCols[j][0]];
            ci[3] = SELECT(Interacciones, row, [ci[2]]);
            ci = csc(ci);
            countD(row, rcont[ci]);
            prome(row, rcat[ci]);
            prome(row, result[ci]);
        }
    }
    Resultados.rows.remove(0, 2);
    var table = document.createElement("table"); document.body.appendChild(table);
    var tbody = document.createElement("tbody"); table.appendChild(tbody);
    var prevci; var twi = 0;
    Resultados.rows.forEach(function(r, ri) {
        var tr = document.createElement("tr"); tbody.appendChild(tr);
        r.remove(0); var prevri;
        if (ri === 1) {
            tr.style.verticalAlign = "bottom";
            tr.style.height = "95px";
        }
        if (ri < 4) { tr.style.fontWeight = "bold"; }
        r.forEach(function(c, ci) {
            c = Array.isArray(c) ? c[0].toFixed(0) : c;
            if (ri === 0) {
                var wi = ci === 1 ? 200 : 28;
                if (prevri && prevri.innerText.trimSingleLine() === c) {
                    prevri.setAttribute("colspan", (prevri.getAttribute("colspan") || 1) * 1 + 1);
                    prevri.style.width = prevri.getAttribute("colspan") * wi + "px";
                    prevri.style.textAlign = "center";
                    return;
                }
                twi += wi;
                table.style.width = twi + "px";
            }
            if (ci === 0 && prevci && prevci.innerText.trimSingleLine() === c) {
                prevci.setAttribute("rowspan", (prevci.getAttribute("rowspan") || 1) * 1 + 1);
                return;
            }
            var td = document.createElement("td"); tr.appendChild(td);
            if (ri == 1 && ci > 13 || ci === 0) {
                var div = document.createElement("div"); td.appendChild(div);
                div.style.transform = "rotate(-90.0deg)";
                div.style.marginBottom = "8px";
                div.textContent = c;
            } else { td.textContent = c; }
            if (ri < 4 || ci < 3) { td.style.border = "1px solid black"; }
            if (ri > 2 && ci > 1) {
                td.style.textAlign = "center";
                td.style.backgroundColor = getColorForPercentage(c / 100);
            }
            if (ci < 3) { td.style.fontWeight = "bold"; }
            if (ri === 0) {
                if (ci === 3) { td.style.backgroundColor = "#DDEBF7"; }
                else if (ci === 5) { td.style.backgroundColor = "#FCE4D6"; }
                if (wi != 28) { td.style.width = wi + "px"; }
                prevri = td;
            }
            if (ci === 0) { prevci = td; }
        });
    });

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
            Resultados.cols.insertAt(insertCol(Resultados, ["{0}|{1}".format(data[2], data[3]), "tinyint", null, null, null, "NOT NULL", null]), ci);
            for (var i = 0; i < 4; i++) { Resultados.rows[i].insertAt(data[i], ci); }
            for (; i < Resultados.rows.length; i++) { Resultados.rows[i].insertAt([0, 0, 0, []], ci); }
        }
        return ci;
    }
    function rsc(row) {
        var s = WHERE(Resultados, [["CR", row[0]], ["Categoría", row[1]], ["Pregunta", row[2]]])[0];
        if (s) { row = s; }
        else {
            for (var i = 3; i < Resultados.cols.length; i++) { row[i] = [0, 0, 0, []]; }
            row = INSERT(Resultados, Resultados.cols, row);
        }
        return row;
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