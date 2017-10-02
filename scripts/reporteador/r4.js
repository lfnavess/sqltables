function work(data) {
    "use strict";
    data = data.split("\n").map(a => a.split("\t"));
    var Colaboradores = CREATE_TABLE(
        "Colaboradores",
        [
            ["Colaborador ID", "nvarchar", 7, null, null, "NOT NULL", [[null, "PRIMARY KEY", null, null]]],
            ["Colaborador", "nvarchar", 50, null, null, "NULL", null],
            ["Email", "nvarchar", 50, null, null, "NULL", [[null, "UNIQUE", null, null]]],
            ["Lugar", "nvarchar", 50, null, null, "NULL", null],
            ["Empresa", "nvarchar", 50, null, null, "NULL", null],
            ["Empresa tipo", "nvarchar", 50, null, null, "NULL", null],
            ["Entidad", "nvarchar", 50, null, null, "NULL", null],
            ["Centro de costos ID", "int", null, null, null, "NULL", null],
            ["Centro de costos", "nvarchar", 50, null, null, "NULL", null],
            ["Puesto", "nvarchar", 50, null, null, "NULL", null],
            ["Nivel", "nvarchar", 50, null, null, "NULL", null],
            ["Dirección", "nvarchar", 50, null, null, "NULL", null],
            ["Dirección categoría", "nvarchar", 50, null, null, "NULL", null],
            ["Business Partner ID", "nvarchar", 7, null, null, "NULL", null],
            ["Business Partner", "nvarchar", 50, null, null, "NULL", null],
            ["Jefe ID", "nvarchar", 7, null, null, "NULL", null],
            ["Jefe", "nvarchar", 50, null, null, "NULL", null],
            ["Jefe email", "nvarchar", 50, null, null, "NULL", null],
            ["Director", "nvarchar", 50, null, null, "NULL", null]
        ]
    );
    var Inscripciones = CREATE_TABLE(
        "Inscripciones",
        [
            ["Inscripción ID", "int", null, null, null, "NOT NULL", [[null, "PRIMARY KEY", null, null]]],
            ["Fecha corte", "smalldatetime", null, null, null, "NOT NULL", null],
            ["Alumno ID", "nvarchar", 7, null, null, "NOT NULL", [[null, "FOREING KEY", Colaboradores, "Colaborador ID"]]],
            ["Curso ID", "int", null, null, null, "NOT NULL", null],
            ["Estado", "nvarchar", 50, null, null, "NOT NULL", null],
            ["Fecha inicio", "date", null, null, null, "NOT NULL", null],
            ["Curso", "nvarchar", 100, null, null, "NOT NULL", null],
            ["Estado2", "nvarchar", 50, null, null, "NULL", null],
            ["Progreso", "tinyint", null, null, null, "NOT NULL", null],
            ["Último progreso", "smalldatetime", null, null, null, "NULL", null],
            ["Completado", "tinyint", null, null, null, "NOT NULL", null],
            ["Fecha creado", "smalldatetime", null, null, null, "NOT NULL", null],
        ]
    );
    var s = `
		"Inscripciones"."Fecha corte",
		"Inscripciones"."Estado",
		"Inscripciones"."Fecha inicio",
		"Colaboradores"."Colaborador ID",
		"Colaboradores"."Colaborador",
		"Inscripciones"."Fecha inicio",
		"Inscripciones"."Curso",
		"Inscripciones"."Estado2",
		"Inscripciones"."Progreso",
		"Inscripciones"."Último progreso",
		"Colaboradores"."Email",
		"Colaboradores"."Lugar",
		"Colaboradores"."Empresa",
		"Colaboradores"."Entidad",
		"Colaboradores"."Centro de costos ID",
		"Colaboradores"."Centro de costos",
		"Colaboradores"."Puesto",
		"Colaboradores"."Nivel",
		"Colaboradores"."Dirección",
		"Colaboradores"."Dirección categoría",
		"Colaboradores"."Business Partner",
		"Colaboradores"."Jefe ID",
		"Colaboradores"."Jefe",
		"Colaboradores"."Jefe email",
		"Colaboradores"."Director",
		"Inscripciones"."Fecha creado",
		"Inscripciones"."Inscripción ID"
	`;
    var matuser = [
        ['"Alumno >PPG ID"', '"Colaborador ID"'],
        ['"Alumno >Nombre corto"', '"Colaborador"'],
        ['"Alumno >Email"', '"Email"'],
        ['"Alumno >Lugar"', '"Lugar"'],
        ['"Alumno >Lugar >Empresa"', '"Empresa"'],
        ['"Alumno >Lugar >Empresa >Tipo"', '"Empresa tipo"'],
        ['"Alumno >Lugar >Municipio >Entidad"', '"Entidad"'],
        ['"Alumno >Centro de costos >Nombre"', '"Centro de costos"'],
        ['"Alumno >Centro de costos >COMEX ID"', '"Centro de costos ID"'],
        ['"Alumno >Puesto >Nombre"', '"Puesto"'],
        ['"Alumno >Puesto >Nivel"', '"Nivel"'],
        ['"Alumno >Dirección"', '"Dirección"'],
        ['"Alumno >Dirección >Categoría"', '"Dirección categoría"'],
        ['"Alumno >Dirección >Business Partner >PPG ID"', '"Business Partner ID"'],
        ['"Alumno >Dirección >Business Partner >Nombre corto"', '"Business Partner"'],
        ['"Alumno >Jefe >PPG ID"', '"Jefe ID"'],
        ['"Alumno >Jefe >Nombre corto"', '"Jefe"'],
        ['"Alumno >Jefe >Email"', '"Jefe email"'],
        ['"Alumno >Director >Nombre corto"', '"Director"']
    ];
    var mat = [
        ['"Inscripción ID"'],
        ['"Fecha corte"'],
        ['"Estado"'],
        ['"Fecha inicio"'],
        ['"Curso >Nombre"', '"Curso"'],
        ['"Estado2"'],
        ['"Progreso"'],
        ['"Último progreso"'],
        ['"Fecha creado"'],
        ['"Alumno >PPG ID"', '"Alumno ID"'],
        ['"Curso ID"'],
        ['CASE WHEN"Progreso"=\'100\'THEN 100 ELSE 0 END', '"Completado"']
    ];

    var ori = CREATE_TABLE("ori", data.splice(0, 1)[0].map(c => [c, "nvarchar", 200, null, null, "NULL", null]));
    function sel(row, select_list) {
        for (var i = 0, si; i < select_list.length; i++) {
            si = colconv(select_list[i]);
        }
    }
    var parts, p;
    // var orisel = new Function("r", `return[${mat.map(m => colconv(m[0], ori)).join(",")}];`);
    var dcColaborador = matuser.map(m => colde(m[1] ? m[1] : m[0], Colaboradores));
    var osColaborador = colconv(matuser.map(m => m[0]).join(), [[ori]]);
    var dsInscripcion = mat.map(m => colde(m[1] ? m[1] : m[0], Inscripciones));
    var osInscripcion = colconv(mat.map(m => m[0]).join(), [[ori]]);

    function colconv(s, f) {
        var parts = [], ccc = [], o = [], isSearch;
        ccc.push(parts);
        for (var i = 0, c, si, u, p; i < s.length; i++) {
            c = s[i];
            if (!u && /\S/.test(c)) {
                si = i;
                if (c === '"') { si++; u = /"/; }
                else if (c === "'") { u = /'/; }
                else if (c === "(") { colins(c); }
                else if (c === ")") { colins(c); }
                else if (c === ",") { colins(c); }
                else if (c === ".") { colins(c); }
                else { u = /[\s"'(),.]/; }
            } else if (u && u.test(c)) {
                if (u.toString() === '/"/') { colins(s.substring(si, i), 1); }
                else if (u.toString() === "/'/") { colins(s.substring(si, i + 1), 2); }
                else { colins(s.substring(si, i--)); }
                u = undefined;
            }
        }
        if (u) {
            if (u.toString() === "/[\\s\"'(),.]/") { colins(s.substring(si)); }
            else { throw ("error"); }
        } else if (p === 1) { colins(); }
        var ff;
        if (isSearch) { ff = new Function("f", `return ${ccc.map(c => c.join("")).join("")};`); }
        else { ff = new Function("f", `return[${ccc.map(c => c.join("")).join()}];`); }
        if (o.length) { ff.o = o; }
        return ff;

        function colexp(ti, ci) { return `f[${ti}][${ci}]`; }
        function ttable(tt) { return f.indexOf(f.find(f => (f[1] || f[0][1]) === tt)); }
        function ccol(ti, c) { return colexp(ti, cddf(tableCol(f[ti][0], c))); }
        function onlyCol(c) {
            for (var i = 0, ti, ci; i < f.length; i++) {
                ti = f[i][0].cols.indexOf(f[i][0].cols.find(cc => cc[2] === c));
                if (ti >= 0) {
                    if (ci) { throw (`Nombre de columna '${c}' ambiguo`); }
                    ci = [i, ti];
                }
            }
            if (!ci) { throw (`Columna '${c}' no econtrada`); }
            return colexp(ci[0], ci[1]);
        }
        function colins(i, t) {
            if (p === 1 && t !== 1 && i !== ".") { parts[parts.length - 1] = onlyCol(parts[parts.length - 1]); p = undefined; }

            if (p === 1) {
                if (i === ".") { parts[parts.length - 1] = ttable(parts[parts.length - 1]); t = 1; }
                else { parts[parts.length - 1] = ccol(parts[parts.length - 1], i); t = undefined; }
            }
            else if (p === "(") {
                if (i === ",") { t = p; }
                else if (i === ")") { parts[parts.length - 1] = `this.o[${o.length - 1}].indexOf(${parts[parts.length - 1]})>=0`; }
                else { o[o.length - 1].push(isNaN(i) ? i.replace(/'/g, "") : Number(i)); t = p; }
            } else if (t) { parts.push(i); }
            else {
                if (i === "AND") { parts = ["&&"]; ccc.push(parts); isSearch = true; }
                else if (i === "OR") { parts = ["||"]; ccc.push(parts); isSearch = true; }
                else if (i === ",") { parts = []; ccc.push(parts); }
                else if (i === "NOT") { parts.push("!"); }
                else if (i === "CASE") { p = i; }
                else if (i === "WHEN") { if (p === "CASE") { p = i; } }
                else if (i === "THEN") { parts.push("?"); p = i; }
                else if (i === "ELSE") { parts.push(":"); p = i; }
                else if (i === "END") { p = i; }
                else if (i === "AND") { p = i; }
                else if (i === "IN") { o.push([]); t = i; }
                else if (i === "=") { parts.push("==="); t = "lo"; }
                else if (i === ">=") { parts.push(i); t = "lo"; }
                else if (i === "<=") { parts.push(i); t = "lo"; }
                else if (i === "!=" || i === "<>") { parts.push("!=="); t = "lo"; }
                else if (i === "<") { parts.push(i); t = "lo"; }
                else if (i === ">") { parts.push(i); t = "lo"; }
                else if (i === "(") { t = i; }
                else if (i === ".") { parts[parts.length - 1] = ttable(parts[parts.length - 1]); t = i; }
                else if (funcs[i]) { t = i; }
                else if (!isNaN(i)) { parts.push(Number(i)); }
                else if (p === ".") { parts[parts.length - 1] = ccol(parts[parts.length - 1], t) }
                else { parts.push(i); }
            }
            p = t;
        }
    }


    function colde(t, ta) {
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
        function colde2(i, t) { return tableCol(ta, i); }
    }
    var filtered = [];
    var f = '"Inscripciones"';
    var w = '"Empresa tipo" = \'INT COMEX [E]\' AND "Curso ID" IN(3853,3855,3806,3811,3896,3822,3838,3837,3830,3885,3813,3815,3829,3820,3800,3835,3865,3974) AND "inscripciones"."Estado" IN(\'Completado\',\'Incompleto\',\'Sin iniciar\')';

    var r = "";
    var ins = [];
    var alumnos = {
        select: '"Alumno ID",MAX("Fecha corte"),CASE WHEN AVG("Completado")=100 THEN\'Completado\'WHEN MAX("Último progreso")IS NOT NULL THEN\'Incompleto\'ELSE\'Sin iniciar\'END',
        from: [[ori, null], [Colaboradores, null, [[f => f[1][0], f => f[0][17]]], dcColaborador, osColaborador], [Inscripciones, null, [[f => f[2][0], f => f[0][67]]], dsInscripcion, osInscripcion]],
        group: '"Colaboradores"."Colaborador ID"',
        where: '"Colaboradores"."Empresa tipo"=\'INT COMEX [E]\'AND"Inscripciones"."Curso ID"IN(3853,3855,3806,3811,3896,3822,3838,3837,3830,3885,3813,3815,3829,3820,3800,3835,3865,3974)AND"Inscripciones"."Estado"IN(\'Completado\',\'Incompleto\',\'Sin iniciar\')'
    }
    alumnos.where = colconv(alumnos.where, alumnos.from);
    g(alumnos);
    function g(g) {
        g.fc = g.from.map(f => f[0].cols);
        g.group = colconv(g.group, g.from);
		s = colconv(s, g.from);
        g.tgroup = CREATE_TABLE(
            "table1",
            g.group(g.fc).map(c => [c[2], c[3][1], c[4], c[5], c[6], c[7] ? "NULL" : "NOT NULL", null]),
            [[null, "PRIMARY KEY", g.group(g.fc).map(c => [c[2]]), null, null]]
        );
        g.from.push([g.tgroup, null, [[f => f[3][0], f => f[1][0]]]]);
        g.fc = g.from.map(f => f[0].cols);
        //Insert nuevas columnas en table1 todas las de agregate function
        insertCol(g.tgroup, ['MAX1', "smalldatetime", null, null, null, "NOT NULL", [[null, "DEFAULT", null, null, "new funcs.MAX(f => f[2][1])"]]]);
        insertCol(g.tgroup, ['AVG10', "tinyint", null, null, null, "NOT NULL", [[null, "DEFAULT", null, null, "new funcs.AVG(f => f[2][10])"]]]);
        insertCol(g.tgroup, ['MAX7', "smalldatetime", null, null, null, "NOT NULL", [[null, "DEFAULT", null, null, "new funcs.MAX(f => f[2][7])"]]]);
        insertCol(g.tgroup, ['MIN3', "date", null, null, null, "NOT NULL", [[null, "DEFAULT", null, null, "new funcs.MIN(f => f[2][3])"]]]);
        var CursosDC = { group: colconv('"Inscripciones"."Curso"', g.from) };
        CursosDC.tgroup = CREATE_TABLE(
            "CurosDirecciónesC",
            [
                ['RI', "tinyint", null, null, null, "NOT NULL", null],
                ...CursosDC.group(g.fc).map(c => [c[2], c[3][1], c[4], c[5], c[6], c[7] ? "NULL" : "NOT NULL", null]),
                ['Inscripciones', "tinyint", null, null, null, "NOT NULL", [[null, "DEFAULT", null, null, "new funcs.COUNT(f => f[2][10])"]]]
            ],
            [[null, "PRIMARY KEY", [['RI'], ...CursosDC.group(g.fc).map(c => [c[2]])], null, null]]
        )
        CursosDC.f = [CursosDC.tgroup, null, [[f => f[4][1], f => f[2][4]]], null, null];
        g.from.push(CursosDC.f);
        g.fc = g.from.map(f => f[0].cols);
        CursosDC.tr = INSERT(CursosDC.f[0], ['RI', ...CursosDC.f[2].map(c => c[0](g.fc))], [1, ...CursosDC.f[2].map(c => 'Inscripciones')]);

        var CursosD = { group: colconv('"Inscripciones"."Curso"', g.from) }
        CursosD.tgroup = CREATE_TABLE(
            "CurosDirecciónes",
            [
                ['RI', "tinyint", null, null, null, "NOT NULL", null],
                ...CursosD.group(g.fc).map(c => [c[2], c[3][1], c[4], c[5], c[6], c[7] ? "NULL" : "NOT NULL", null]),
                ['Completado', "tinyint", null, null, null, "NOT NULL", [[null, "DEFAULT", null, null, "new funcs.AVG(f => f[2][10])"]]]
            ],
            [[null, "PRIMARY KEY", [['RI'], ...CursosD.group(g.fc).map(c => [c[2]])], null, null]]
        )
        CursosD.f = [CursosD.tgroup, null, [[f => f[5][1], f => f[2][4]]], null, null];
        g.from.push(CursosD.f);
        g.fc = g.from.map(f => f[0].cols);
        CursosD.tr = INSERT(CursosD.f[0], ['RI', ...CursosD.f[2].map(c => c[0](g.fc))], [1, ...CursosD.f[2].map(c => 'Inscripciones')]);

        for (var i = 0, colaborador, row, j, fr; i < data.length; i++) {
            fr = [data[i]];
            if (!fr[0][0]) { break; }
            //preparar todas las filas relacionadas
            for (j = 1, f; j < g.from.length; j++) {
                f = g.from[j];
                fr[j] = WHERE(f[0], f[2].map(c => [c[0](g.fc), parseInt(c[1](fr))]))[0];
                if (!fr[j] && f[3]) { fr[j] = INSERT(f[0], f[3], f[4](fr)); }
                //else if (!fr[j]) { fr[j] = INSERT(f[0], f[2].map(c => c[0](g.fc)), f[2].map(c => c[1](fr))); }
            }
            if (!g.where.call(g.where, fr)) { continue; }
			row = s(fr);
            for (var j = 0, f; j < g.from.length; j++) {
                f = g.from[j];
                if (!fr[j]) { fr[j] = INSERT(f[0], f[2].map(c => c[0](g.fc)), f[2].map(c => c[1](fr))); }
            }
            CursosDC.tr[CursosD.tc].v = fr;
            CursosD.tr[CursosD.tc].v = fr;
            //
            fr[3][1].v = fr;
            fr[3][2].v = fr;
            fr[3][3].v = fr;
            fr[3][4].v = fr;
        }
        for (var i = 0, r, r2, rows = []; i < g.tgroup.rows.length; i++) {
            r = g.tgroup.rows[i];
            r2 = [r[0], r[2].v, r[3].v === 100 ? 'Completado' : r[4].v !== null ? 'Incompleto' : 'Sin iniciar', r[5].v, 'Capacitación 2017', r[3].v, r[4].v];
            r2.rs = r[1].v;
            rows.push(r2);
        }
    }
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
    // for (var i = 0, s, e, u, m, b = [], br, cl, c; i < w.length; i++) {
    // c = w[i];
    // if (!u && /\S/.test(c)) {
    // s = i;
    // if (c === '"') { s++; u = /"/; }
    // else if (c === "'") { u = /'/; }
    // else if (c === "(") { s++; u = /\)/; }
    // else { u = /[\s"'(]/; }
    // } else if (u && u.test(c)) {
    // if (u.toString() === '/"/') { ins2(w.substring(s, i), 1); }
    // else if (u.toString() === "/'/") { ins2(w.substring(s, i + 1), 2); }
    // else if (u.toString() === "/\\)/") { ins2(w.substring(s, i), 3); }
    // else { ins2(w.substring(s, i--)); }
    // u = undefined;
    // }
    // }
    // if (u) {
    // if (u.toString() === "/[\\s\"'(]/") { ins2(w.substring(s)); }
    // else { throw ("error"); }
    // }

    //var tmp1 = new Function(`return ${search_condition.map(i => Array.isArray(i) ? i.join("") : i).join("")};`);
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
        st: ',MIN("Fecha inicio")AS"Fecha inicio",\'Capacitación 2017\')AS"Curso",AVG("Completado")AS"Progreso",MAX("Último progreso")AS"Último progreso",MAX("Fecha creado")AS"Fecha creado",MAX("Inscripción ID")AS"Inscripción ID",AVG("Completado")AS"Completado"',
        select: 'MAX("Fecha corte")AS"Fecha corte",CASE WHEN AVG("Completado")=100 THEN\'Completado\'WHEN MAX("Último progreso")IS NOT NULL THEN\'Incompleto\'ELSE\'Sin iniciar\'END AS"Estado",MIN("Fecha inicio")AS"Fecha inicio","Alumno","PPGID",COUNT("Curso")AS"Cursos",NULL AS"Estado2",AVG("Progreso")AS"Progreso",MAX("Último progreso")AS"Último progreso","Lugar","Empresa","Entidad","Centro de costos ID","Centro de costos","Puesto","Nivel","Dirección","Business Partner","Jefe","Jefe email","Director","Email",MAX("Fecha creado")AS"Fecha creado",MAX("Inscripción ID")AS"Inscripción ID","Empresa tipo",NULL AS"Curso ID",AVG("Completado")AS"Completado"',
        from: Inscripciones,
        group: '"Alumno","PPGID","Lugar","Empresa","Entidad","Centro de costos ID","Centro de costos","Puesto","Nivel","Dirección","Business Partner","Jefe","Jefe email","Director","Email","Empresa tipo"'
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