<%@ Page Language="C#" AutoEventWireup="true" CodeFile="default.aspx.cs" Inherits="SICC_v1_default" ViewStateMode="Disabled" %>

<!DOCTYPE html>

<html lang="es-mx">
<head id="Head1" runat="server">
    <title></title>
    <link href="favicon.ico" rel="icon" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link href="scripts/reporteador/normalize.min.css" rel="stylesheet" />
    <link href="scripts/reporteador/r2.css" rel="stylesheet" />
    <script src="scripts/reporteador/plugins.js"></script>
    <script src="scripts/reporteador/r2.js"></script>
    <script src="scripts/reporteador/r5.js"></script>
</head>
<body>
    <form id="form1" runat="server">
    <script>
        var d1, d2;

        fetch("default.aspx/getTable", {
            cache: "no-store", mode: "cors", method: "POST", headers: { 'Content-Type': "application/json", 'Accept': "application/json" }, body: JSON.stringify({ json: JSON.stringify({ name: "lfn_feedback_item" }) })
        })
            .then(function(response) { if(!response.ok) { throw "error"; } return response.json(); })
            .then(function(data) { try { d1 = JSON.parse(data.d).rows; second() } catch(e) { throw data.d; } });

        function second() {
            fetch("default.aspx/getTable", {
                cache: "no-store", mode: "cors", method: "POST", headers: { 'Content-Type': "application/json", 'Accept': "application/json" }, body: JSON.stringify({ json: JSON.stringify({ name: "lfn_feedback_value" }) })
            })
                .then(function(response) { if(!response.ok) { throw "error"; } return response.json(); })
                .then(function(data) { try { d2 = JSON.parse(data.d).rows; work(); } catch(e) { throw data.d; } });
        }
    </script>
    </form>
</body>
</html>
