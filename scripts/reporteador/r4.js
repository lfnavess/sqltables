function work(data) {
    "use strict";
    data = data.split("\n").map(a => a.split("\t"));
    var Inscripciones = CREATE_TABLE(
        "Inscripciones",
        [
            ["Fecha corte", "smalldatetime", null, null, null, "NOT NULL", null],
            ["Estado", "nvarchar", 50, null, null, "NOT NULL", null],
            ["Fecha inicio", "date", null, null, null, "NOT NULL", null],
            ["Alumno", "nvarchar", 50, null, null, "NOT NULL", null],
            ["PPG ID", "nvarchar", 7, null, null, "NOT NULL", null],
            ["Curso", "nvarchar", 100, null, null, "NOT NULL", null],
            ["Estado2", "nvarchar", 50, null, null, "NULL", null],
            ["Progreso", "tinyint", null, null, null, "NOT NULL", null],
            ["Último progreso", "smalldatetime", null, null, null, "NULL", null],
            ["Lugar", "nvarchar", 50, null, null, "NULL", null],
            ["Empresa", "nvarchar", 50, null, null, "NULL", null],
            ["Entidad", "nvarchar", 50, null, null, "NULL", null],
            ["Centro de costos ID", "int", null, null, null, "NULL", null],
            ["Centro de costos", "nvarchar", 50, null, null, "NULL", null],
            ["Puesto", "nvarchar", 50, null, null, "NULL", null],
            ["Nivel", "nvarchar", 50, null, null, "NULL", null],
            ["Dirección", "nvarchar", 50, null, null, "NULL", null],
            ["Business Partner", "nvarchar", 50, null, null, "NULL", null],
            ["Jefe", "nvarchar", 50, null, null, "NULL", null],
            ["Jefe email", "nvarchar", 50, null, null, "NULL", null],
            ["Director", "nvarchar", 50, null, null, "NULL", null],
            ["Email", "nvarchar", 50, null, null, "NULL", null],
            ["Fecha creado", "smalldatetime", null, null, null, "NULL", null],
            ["Inscripción ID", "int", null, null, null, "NULL", [[null, "PRIMARY KEY", null, null]]],
            ["Empresa tipo", "nvarchar", 50, null, null, "NULL", null],
            ["Curso ID", "int", null, null, null, "NULL", null],
            ["Completado", "tinyint", null, null, null, "NOT NULL", null]
        ]
    );
    var mat = [
        ['"Fecha corte"'],
        ['"Estado"'],
        ['"Fecha inicio"'],
        ['"Alumno >Nombre corto"', '"Alumno"'],
        ['"Alumno >Usuario"', '"PPG ID"'],
        ['"Curso >Nombre"', '"Curso"'],
        ['"Estado2"'],
        ['"Progreso"'],
        ['"Último progreso"'],
        ['"Alumno >Posición >Lugar"', '"Lugar"'],
        ['"Alumno >Posición >Lugar >Empresa"', '"Empresa"'],
        ['"Alumno >Posición >Lugar >Municipio >Entidad"', '"Entidad"'],
        ['"Alumno >Posición >CC >COMEX ID"', '"Centro de costos ID"'],
        ['"Alumno >Posición >CC >Nombre"', '"Centro de costos"'],
        ['"Alumno >Posición >Puesto >Nombre"', '"Puesto"'],
        ['"Alumno >Posición >Puesto >Nivel"', '"Nivel"'],
        ['"Alumno >Posición >Dirección"', '"Dirección"'],
        ['"Alumno >Posición >Dirección >Posición BP >Colaborador >Nombre corto"', '"Business Partner"'],
        ['"Alumno >Posición >Posición jefe >Colaborador >Nombre corto"', '"Jefe"'],
        ['"Alumno >Posición >Posición jefe >Email"', '"Jefe email"'],
        ['"Alumno >Posición >Posición director >Colaborador >Nombre corto"', '"Director"'],
        ['"Alumno >Posición >Email"', '"Email"'],
        ['"Fecha creado"'],
        ['"Inscripción ID"'],
        ['"Alumno >Posición >Lugar >Empresa >Tipo"', '"Empresa tipo"'],
        ['"Curso"', '"Curso ID"'],
        ['CASE WHEN"Progreso"=\'100\'THEN 100 ELSE 0 END', '"Completado"']
    ];
    
    window.funcs = {
        MAX: { 
            Accumulate (value) {  if (value != null) { if (!this.prev) { this.prev = value; } else if (this.prev < value) { this.prev = value; } } },
            Create(){ return { Accumulate: this.Accumulate }; }
        },
        MIN: {
            Accumulate (value) { if (!this.prev) { this.prev = value; } else if (this.prev > value) { this.prev = value; } },
            Create(){ return { Accumulate: this.Accumulate }; }
        },
        AVG: {
            Accumulate (value) { if (value != null) { this.count++; this.sum += value; } },
            Create(){ return { Accumulate: this.Accumulate, count: 0, sum: 0 }; }
        },
        COUNT: {
            Accumulate (value) { if (value != null) { this.count++; } },
            Create(){ return { Accumulate: this.Accumulate, count: 0 }; }
        }
    }
    var ori = CREATE_TABLE("ori", data.splice(0, 1)[0].map(c => [c, "nvarchar", 200, null, null, "NULL", null]));
    function sel(row, select_list) {
        for (var i = 0, si; i < select_list.length; i++) {
            si = colconv(select_list[i]);
        }
    }
    var parts, p;
    // var orisel = new Function("r", `return[${mat.map(m => colconv(m[0], ori)).join(",")}];`);
    var orisel = colconv(mat.map(m => m[0]).join(), ori);
    var descol = mat.map(m => colde(m[1] ? m[1] : m[0]));

    function colconv(s, t) {
        var parts = [], ccc = [];
        ccc.push(parts);
        for (var i = 0, c, si, u; i < s.length; i++) {
            c = s[i];
            if (!u && /\S/.test(c)) {
                si = i;
                if (c === '"') { si++; u = /"/; }
                else if (c === "'") { u = /'/; }
                else if (c === "(") { si++; u = /\)/; }
                else if (c === ",") { colins(c); }
                else { u = /[\s"'(,]/; }
            } else if (u && u.test(c)) {
                if (u.toString() === '/"/') { colins(s.substring(si, i), 1); }
                else if (u.toString() === "/'/") { colins(s.substring(si, i + 1), 2); }
                else if (u.toString() === "/\\)/") { colins(s.substring(si, i), 3); }
                else { colins(s.substring(si, i--)); }
                u = undefined;
            }
        }
        if (u) {
            if (u.toString() === "/[\\s\"'(,]/") { colins(s.substring(si)); }
            else { throw ("error"); }
        }
        return new Function("r", `return[${ccc.map(c => c.join("")).join()}];`);
        function ccol(col) { return `r[${cddf(tableCol(t, col))}]`; }
        function colins(i, t) {
            if (!t) {
                if (i === "CASE") { p = i; }
                else if (i === "WHEN") { if (p === "CASE") { p = i; } }
                else if (i === "THEN") { parts.push("?"); p = i; }
                else if (i === "ELSE") { parts.push(":"); p = i; }
                else if (i === "END") { p = i; }
                else if (i === "IN") { t = i; }
                else if (i === "=") { parts.push("==="); t = "lo"; }
                else if (i === ">=") { parts.push(i); t = "lo"; }
                else if (i === "<=") { parts.push(i); t = "lo"; }
                else if (i === "!=" || i === "<>") { parts.push("!=="); t = "lo"; }
                else if (i === "<") { parts.push(i); t = "lo"; }
                else if (i === ">") { parts.push(i); t = "lo"; }
                else if (i === ",") { parts = []; ccc.push(parts); }
                else if (funcs[i]) { t = i; }
                else if (!isNaN(i)) { parts.push(Number(i)); }
                else { parts.push(ccol(i)); }
            }
            if (t === 1) { parts.push(ccol(i)); }
            else if (t === 2) { parts.push(i); }
            else if (t === 3) {
                if (p === "IN") {
                    objs.refs.push(i.split(",").map(m => isNaN(m) ? m.replace(/'/g, "") : Number(m)));
                    parts[parts.length - 1] = `this.refs[${objs.refs.length - 1}].indexOf(${parts[parts.length - 1]})>=0`;
                }
                else if (funcs[p]) {
                    //parts.push(`funcs[${P}].Accumulate.call(${ccol()},${})`);
                }
            }
            p = t;
        }
    }


    function colde2(i, t) {
        return tableCol(Inscripciones, i);
    }
    function colde(t) {
        for (var i = 0, c, s, u; i < t.length; i++) {
            c = t[i];
            if (!u && /\S/.test(c)) {
                s = i;
                if (c === '"') { s++; u = /"/; }
                else { u = /[\s"'(]/; }
            } else if (u && u.test(c)) {
                if (u.toString() === '/"/') { parts = colde2(t.substring(s, i), 1); }
                else { parts = colde2(t.substring(s, i--)); }
                u = undefined;
            }
        }
        if (u) {
            if (u.toString() === "/[\\s\"'(]/") { parts = colde2(t.substring(s)); }
            else { throw ("error"); }
        }
        return parts;
    }
    var filtered = [];
    var s = '"Fecha corte", "Estado", "Fecha inicio", "Alumno", "PPGID", "Curso", "Estado2", "Progreso", "Último progreso", "Lugar", "Empresa", "Entidad", "Centro de costos ID", "Centro de costos", "Puesto", "Nivel", "Dirección", "Business Partner", "Jefe", "Jefe email", "Director", "Email", "Fecha creado", "Inscripción ID"';
    var f = '"Inscripciones"';
    var w = '"Empresa tipo" = \'INT COMEX [E]\' AND "Curso ID" IN(3853,3855,3806,3811,3896,3822,3838,3837,3830,3885,3813,3815,3829,3820,3800,3835,3865,3974) AND "inscripciones"."Estado" IN(\'Completado\',\'Incompleto\',\'Sin iniciar\')';

    var r = "";
    var ins = [];
    var objs = {
        f: [[Inscripciones]], refs: [], r: function(i) {
            if (!this._r[i]) {

            }
            return this._r[i];
        }, _r: []
    };
    var parts = [];
    var search_condition = [parts];
    var p;
    function table(table) {
        for (var i = 0, f; i < objs.f.length; i++) { f = objs.f[i]; if (f[1] ? collate(f[1]) : collate(f[0][1]) === collate(table)) { return i; } }
        throw (`Tabla "${table}" no encontrada`);
    }
    function onlycol(col, table) {
        if (table >= 0) { return `this.r(${table})[${cddf(tableCol(objs.f[table][0], col))}]`; }
        for (var i = 0, c, c2; i < objs.f.length; i++) {
            c2 = cddf(tableCol(objs.f[i][0], col));
            if (c2) {
                if (c) { throw (`Nombre columna "${col}" ambiguo`); }
                c = `this.r(${i})[${c2}]`;
            }
        }
        return c;
    }
    function ins2(i, t) {
        if (p === 1 && i !== ".") { parts[parts.length - 1] = onlycol(parts[parts.length - 1]); }
        if (!t) {
            if (i === "AND" || i === "OR") { parts = [i === "AND" ? "&&" : "||"]; search_condition.push(parts); }
            else if (i === "NOT") { parts.push("!"); }
            else if (i === "IN") { t = i; }
            else if (i === "=") { parts.push("==="); t = "lo"; }
            else if (i === ">=") { parts.push(i); t = "lo"; }
            else if (i === "<=") { parts.push(i); t = "lo"; }
            else if (i === "!=" || i === "<>") { parts.push("!=="); t = "lo"; }
            else if (i === "<") { parts.push(i); t = "lo"; }
            else if (i === ">") { parts.push(i); t = "lo"; }
            else if (i === ".") { parts[parts.length - 1] = table(parts[parts.length - 1]); t = i; }
            else { t = 1; }
        }
        if (t === 1) { if (p === ".") { parts[parts.length - 1] = onlycol(i, parts[parts.length - 1]); t = null; } else { parts.push(i); } }
        else if (t === 2) { parts.push(i); }
        else if (t === 3) {
            if (p === "IN") {
                objs.refs.push(i.split(",").map(m => isNaN(m) ? m.replace(/'/g, "") : Number(m)));
                parts[parts.length - 1] = `this.refs[${objs.refs.length - 1}].indexOf(${parts[parts.length - 1]})>=0`;
            }
        }
        p = t;
    }
    for (var i = 0, s, e, u, m, b = [], br, cl, c; i < w.length; i++) {
        c = w[i];
        if (!u && /\S/.test(c)) {
            s = i;
            if (c === '"') { s++; u = /"/; }
            else if (c === "'") { u = /'/; }
            else if (c === "(") { s++; u = /\)/; }
            else { u = /[\s"'(]/; }
        } else if (u && u.test(c)) {
            if (u.toString() === '/"/') { ins2(w.substring(s, i), 1); }
            else if (u.toString() === "/'/") { ins2(w.substring(s, i + 1), 2); }
            else if (u.toString() === "/\\)/") { ins2(w.substring(s, i), 3); }
            else { ins2(w.substring(s, i--)); }
            u = undefined;
        }
    }
    if (u) {
        if (u.toString() === "/[\\s\"'(]/") { ins2(w.substring(s)); }
        else { throw ("error"); }
    }

    var tmp1 = new Function(`return ${search_condition.map(i => Array.isArray(i) ? i.join("") : i).join("")};`);
    var dCols = [['Dirección', 1]];
    var dRows = ['Curso'];
    var dVals = [['Completado', 'AVG']];
    var Completado = CREATE_TABLE(
        "Completado",
        [
            ["CR", "tinyint", null, null, null, "NOT NULL", null],
            ["Curso", "nvarchar", 50, null, null, "NOT NULL", null]
        ],
        [[null, "PRIMARY KEY", [["CR"], ["Curso"]], null, null]]
    )
    INSERT(Completado, Completado.cols, [0, 1]);
    INSERT(Completado, Completado.cols, [1, 0]);
    for (var i = 1, row = [2]; i < Completado.cols.length; i++) { row[i] = Completado.cols[i][2]; }
    INSERT(Completado, Completado.cols, row);
    for (var i = 1, row = [3]; i < Completado.cols.length; i++) { row[i] = Completado.cols[i][2]; }
    INSERT(Completado, Completado.cols, row);
    var avgRow = rsc([4, "Completado"]);
    var ColPK = [0, 1, 3];
    var cit = csc([2, 0, "Completado", "Completado"]);
    var vcs = dCols.map(c => c[0]);
    var dsVals = colconv('Completado', Inscripciones);
    var dsRows = colconv('5,"Curso"', Inscripciones);
    var dsCols = dCols.map((c, i) => colconv(`3,${i},'${c[0]}',"${c[0]}"`, Inscripciones));

    var alumnos = {
        st: ',CASE WHEN AVG("Completado")=100 THEN\'Completado\'WHEN MAX("Último progreso")IS NOT NULL THEN\'Incompleto\'ELSE\'Sin iniciar\'END AS"Estado",MIN("Fecha inicio")AS"Fecha inicio",COUNT("Curso")AS"Cursos",AVG("Progreso")AS"Progreso",MAX("Último progreso")AS"Último progreso",MAX("Fecha creado")AS"Fecha creado",MAX("Inscripción ID")AS"Inscripción ID",AVG("Completado")AS"Completado"',
        select: 'MAX("Fecha corte")AS"Fecha corte",CASE WHEN AVG("Completado")=100 THEN\'Completado\'WHEN MAX("Último progreso")IS NOT NULL THEN\'Incompleto\'ELSE\'Sin iniciar\'END AS"Estado",MIN("Fecha inicio")AS"Fecha inicio","Alumno","PPGID",COUNT("Curso")AS"Cursos",NULL AS"Estado2",AVG("Progreso")AS"Progreso",MAX("Último progreso")AS"Último progreso","Lugar","Empresa","Entidad","Centro de costos ID","Centro de costos","Puesto","Nivel","Dirección","Business Partner","Jefe","Jefe email","Director","Email",MAX("Fecha creado")AS"Fecha creado",MAX("Inscripción ID")AS"Inscripción ID","Empresa tipo",NULL AS"Curso ID",AVG("Completado")AS"Completado"',
        from: Inscripciones,
        group: '"Alumno","PPGID","Lugar","Empresa","Entidad","Centro de costos ID","Centro de costos","Puesto","Nivel","Dirección","Business Partner","Jefe","Jefe email","Director","Email","Empresa tipo"'
    }
    var alumnos = {
        select: '"PPG ID",MAX("Fecha corte")',
        from: Inscripciones,
        group: '"PPG ID"',
        where: '"Empresa tipo" = \'INT COMEX [E]\' AND "Curso ID" IN(3853,3855,3806,3811,3896,3822,3838,3837,3830,3885,3813,3815,3829,3820,3800,3835,3865,3974) AND "inscripciones"."Estado" IN(\'Completado\',\'Incompleto\',\'Sin iniciar\')'
    }
    g(alumnos);
    function g(g){
        g.sgroup = colconv(g.group, g.from);
        g.tgroup = CREATE_TABLE("table1", g.sgroup(g.from.cols).map(c => [c[2], c[3][1], c[4], c[5], c[6], c[7] ? "NULL" : "NOT NULL", null]), [[null, "PRIMARY KEY", g.sgroup(g.from.cols).map(c => [c[2]]), null, null]]);
        g.from = [[g.from],[[g.tgroup.cols[0],g.from.cols[4]]]];
        //Insert nuevas columnas en table1 todas las de agregate function
        insertCol(g.tgroup, ['MAX0', "tinyint", null, null, null, "NOT NULL", [[null, "DEFAULT", null, null, "funcs.MAX.Create()"]]]);
        insertCol(g.tgroup, ['AVG26', "tinyint", null, null, null, "NOT NULL", [[null, "DEFAULT", null, null, "funcs.AVG.Create()"]]]);
        insertCol(g.tgroup, ['MAX8', "tinyint", null, null, null, "NOT NULL", [[null, "DEFAULT", null, null, "funcs.MAX.Create()"]]]);
        insertCol(g.tgroup, ['MIN2', "tinyint", null, null, null, "NOT NULL", [[null, "DEFAULT", null, null, "funcs.MIN.Create()"]]]);
        
        
        for(var i = 0, row, j,k; i < data.length; i++){
            row = data[i];
            if (!row[0]) { break; }
            row = objs._r[0] = INSERT(Inscripciones, descol, orisel(row));
            if (!tmp1.call(objs)) { continue; }
            //preparar todas las filas relacionadas
            g.fr = [row];
            for(j = 1; j < g.from.length; j++){
                g.fr[j] = WHERE(g.from[j][0][0][1], g.from[j].map(c => [c[0],getval(row,c[1])]))[0];
                if(!g.fr[j]){ g.fr[j] = INSERT(g.from[j][0][0][1], g.from[j].map(c => c[0]), g.from[j].map(c => getval(row,c[1]))); }
            }
            //
            g.fr[1][1].Accumulate(g.fr[0][0]);
            g.fr[1][2].Accumulate(g.fr[0][26]);
            g.fr[1][3].Accumulate(g.fr[0][8]);
            g.fr[1][4].Accumulate(g.fr[0][2]);
        }
    }
    
    for (var i = 0, row, drow, j, dcol; i < data.length; i++) {
        row = data[i];
        if (!row[0]) { break; }
        row = objs._r[0] = INSERT(Inscripciones, descol, orisel(row));
        if (!tmp1.call(objs)) { continue; }
        var alumno = alumnos.sgroup(row);
        alumno = WHERE(alumnos.tgroup, alumnos.tgroup.cols.map((c, i) => [c, alumno[i]]))[0];
        if (!alumno) { alumno = INSERT(alumnos.tgroup, null, alumnos.sgroup(row)); alumno.rows = []; }
        alumno.rows.push(row);
        //AVG(row, avgRow[cit]);
        //drow = rsc(dsRows(row));
        //AVG(row, drow[cit]);
        //for (j = 0; j < dsCols.length; j++) {
        //    dcol = csc(dsCols[j](row));
        //    AVG(row, avgRow[dcol]);
        //    AVG(row, drow[dcol]);
        //}
    }
    filtered;
    function rsc(row) {
        var s = WHERE(Completado, [["CR", row[0]], ["Curso", row[1]]])[0];
        return s || INSERT(Completado, ["CR", "Curso"], row);
    }
    function csc(data) {
        var ci = indexCol(ColPK.map(c => data[c]));
        if (ci[0]) { ci = ci[1]; }
        else {
            ci = ci[1];
            insertCol(Completado, ["{0}|{1}".format(data[2], data[3]), "tinyint", null, null, null, "NOT NULL", [[null, "DEFAULT", null, null, "[0,0,0,[]]"]]], ci);
            for (var i = 0; i < 4; i++) { Completado.rows[i][ci] = data[i]; }
        }
        return ci;
    }
    function indexCol(a, e) {
        if (!e && e != 0) { e = Completado.cols.length - 1; }
        for (var s = 0, i, r, b; s <= e;) {
            i = s + Math.round((e - s) / 2);
            b = ColPK.map(c => Completado.rows[c][i]);
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
    function AVG(row, pp) {
        pp[1]++;
        pp[2] += dsVals(row)[0];
        pp[0] = pp[2] / pp[1];
        pp[3].push(row);
    }

    function dsdfsd() {
        var selcols = formats[1].map(c => c[0]);
        for (var i = 0, row; i < ori.rows.length; i++) {
            row = SELECT(ori, ori.rows[i], selcols);
            //for (var j = 0; j < formats[1].length; j++) {
            //    if (formats[1][j][1]) { row[j] = moment(row[j].replace(". m.", ".m."), formats[1][j][1], true).format(formats[1][j][2]); }
            //}
            row = INSERT(formats[0], selcols, row);

        }
        row["Fecha corte"] = function() { return this[0]; }



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
}