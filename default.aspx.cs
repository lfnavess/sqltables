using System;
using System.Collections.Generic;
using NJ = Newtonsoft.Json;
using SD = System.Data;
using SDSc = System.Data.SqlClient;

public partial class SICC_v1_default : System.Web.UI.Page {
    static SICC_v1_default() {
        thistables.table(new table() {
            name = "lfn_feedback_item",
            update = false,
            insert = false,
            delete = false,
            dbname = "lfn_feedback_item",
            cols = new List<col> {
                new col(){name="id",select=true,insert=false,update=false,pk=true },
                new col(){name="position",select=true,insert=false,update=false},
                new col(){name="label",select=true,insert=false,update=false},
                new col(){name="name",select=true,insert=true,update=true},
                new col(){name="presentation",select=true,insert=true,update=true}
            }
        });
        thistables.table(new table() {
            name = "lfn_feedback_value",
            update = false,
            insert = false,
            delete = false,
            dbname = "lfn_feedback_value",
            cols = new List<col> {
                new col(){name="completed",select=true,insert=false,update=false,pk=true },
                new col(){name="item",select=true,insert=true,update=true},
                new col(){name="value",select=true,insert=false,update=true}
            }
        });
    }
    protected void Page_Load(object sender, EventArgs e) {}
    //v 31/07/2014
    private static void addparameter(SDSc.SqlCommand SqlCommand, string name, List<string> row, int index, object value) {
        if (index >= 0 && (index >= row.Count || row[index] == string.Empty || row[index] == null))
            SqlCommand.Parameters.AddWithValue(string.Format("@{0}", name), DBNull.Value);
        else if (index >= 0)
            SqlCommand.Parameters.AddWithValue(string.Format("@{0}", name), row[index]);
        else
            SqlCommand.Parameters.AddWithValue(string.Format("@{0}", name), value);
    }

    [System.Web.Services.WebMethod]
    public static string getTable(string json) {
        try {
            returnval rv = json;
            var ttt = thistables.table(rv.name);
            string tmp = ttt.merge(rv);
            tmp.Replace(",null,",",a,");
            return tmp;
        } catch (Exception e) { return e.Message; }
    }

    public class returnval {
        public static implicit operator returnval(string value) {
            return (returnval)(new NJ.JsonSerializer()).Deserialize(new NJ.Linq.JTokenReader(NJ.Linq.JObject.Parse(value)), typeof(returnval));
        }
        public static implicit operator string(returnval value) {
            return Newtonsoft.Json.JsonConvert.SerializeObject(value);
        }
        public string name { get; set; }
        public int childcol { get; set; }
        public List<object[]> rows { get; set; }
        public List<returnval> childs { get; set; }
    }
    public class valss {
        public void Add(string s, object o) { cells.Add(s, o); }
        Dictionary<string, object> _cells = new Dictionary<string, object>();
		public Dictionary<string, object> cells { get { return _cells; } }
        public string cols {
            get {
                List<string> list = new List<string>();
                foreach (var item in cells)
                    list.Add(item.Key);
                return string.Format("[{0}]", string.Join("],[", list.ToArray()));
            }
        }
        public string values {
            get {
                List<string> list = new List<string>();
                foreach (var item in cells){ list.Add(item.Key); }
                return string.Format("@{0}", string.Join(",@", list.ToArray()));
            }
        }
        public string sets {
            get {
                List<string> list = new List<string>();
                foreach (var item in cells) {
                    if (item.Key == "updated_date" || item.Key.EndsWith("_UPD")) { list.Add(string.Format("[{0}]=GETDATE()", item.Key)); } 
					else { list.Add(string.Format("[{0}]=@{0}", item.Key)); }
                }
                return string.Join(",", list.ToArray());
            }
        }

        public string debug {
            get {
                List<string> list = new List<string>();
                foreach (var item in cells)
                    list.Add(string.Format("[{0}]={1}", item.Key, item.Value));
                return string.Join(",", list.ToArray());
            }
        }
        public void Parameters(SDSc.SqlCommand SqlCommand) {
            foreach (var item in cells) {
                if (item.Key == "login" || item.Key == "inserted_login" || item.Key == "updated_login") { SqlCommand.Parameters.AddWithValue(string.Format("@{0}", item.Key), 1); }
                else if (item.Key == "inserted_user" || item.Key == "updated_user" || item.Key.EndsWith("_UPU")) { SqlCommand.Parameters.AddWithValue(string.Format("@{0}", item.Key), 1); }
                else if (item.Key == "updated_date" || item.Key.EndsWith("_UPD")) { } 
				else if (item.Value == null) { SqlCommand.Parameters.AddWithValue(string.Format("@{0}", item.Key), DBNull.Value); }
                else { SqlCommand.Parameters.AddWithValue(string.Format("@{0}", item.Key), item.Value); }
            }
        }
    }

    public static tables thistables {
        get { return _thistables; }
    } static tables _thistables = new tables();

    public class tables {
        public table table(string tablename) {
            foreach (var item in list)
                if (item.name == tablename) return item;
            throw new Exception("Not found");
        }
        public table table(table tab) {
            foreach (var item in list)
                if (item == tab) return item;
                else if (item.name == tab.name)
                    throw new Exception("Name allready exist");
            list.Add(tab);
            return tab;
        }
        List<table> list { get { return _list; } } List<table> _list = new List<table>();
    }
    public class table {
        public string name { get; set; }
        public string dbname { get; set; }
        public string whereparam { get; set; }
        public string prefix { get; set; }
        public bool insert { get; set; }
        public bool update { get; set; }
        public bool delete { get; set; }
        public List<col> cols { get; set; }
        public col pk {
            get {
                foreach (col item in cols) if (item.pk) return item;
                return null;
            }
        }
        public returnval merge(returnval val, SDSc.SqlTransaction SqlTransaction) {
            valss lcols1;
            valss lcols2;
            SD.DataTable DataTable;
            SDSc.SqlCommand SqlCommand;
            if (val.rows != null) {
                for (int i = 0; i < val.rows.Count; i++) {
                    DataTable = new SD.DataTable();
                    lcols1 = new valss();
                    if (Convert.ToString(val.rows[i][0])[0] == 'D') {
                        if (!delete) throw new Exception("No delete permission");
                        val.rows[i][0] = Convert.ToInt32(Convert.ToString(val.rows[i][0]).Substring(1));
                        for (int j = 0; j < cols.Count; j++) if (cols[j].pk) lcols1.Add(cols[j].name, val.rows[i][j]); ;
                        SqlCommand = new SDSc.SqlCommand() {
                            CommandText = string.Format(
                                "DELETE FROM {0} WHERE {1};SELECT {2} FROM {0} WHERE {1};"
                                , dbname
                                , lcols1.sets
                                , selectcols
                            ),
                            Connection = SqlTransaction.Connection,
                            Transaction = SqlTransaction
                        };
                        lcols1.Parameters(SqlCommand);
                        (new SDSc.SqlDataAdapter(SqlCommand)).Fill(DataTable);
                        for (int ii = 0, length = DataTable.Columns.Count; ii < length; ii++) { val.rows[i][ii] = null; }
                    } else if (Convert.ToString(val.rows[i][0])[0] == 'I' || Convert.ToInt32(val.rows[i][0]) < 0) {
                        if (!insert) throw new Exception("No insert permission");
                        if (Convert.ToString(val.rows[i][0])[0] == 'I') {
                            val.rows[i][0] = Convert.ToInt32(Convert.ToString(val.rows[i][0]).Substring(1));
                            lcols2 = new valss();
                            for (int j = 0; j < cols.Count; j++) {
                                if (cols[j].pk) lcols2.Add(cols[j].name, val.rows[i].Length > j ? val.rows[i][j] : null);
                                if (cols[j].insert) lcols1.Add(cols[j].name, val.rows[i].Length > j ? val.rows[i][j] : null);
                            }
                            SqlCommand = new SDSc.SqlCommand() {
                                CommandText = string.Format(
                                    "INSERT INTO {0}({1})VALUES({2});SELECT {3} FROM {0} WHERE {4};"
                                    , dbname
                                    , lcols1.cols
                                    , lcols1.values
                                    , selectcols
                                    , lcols2.sets
                                ),
                                Connection = SqlTransaction.Connection,
                                Transaction = SqlTransaction
                            };
                            lcols1.Parameters(SqlCommand);
                            (new SDSc.SqlDataAdapter(SqlCommand)).Fill(DataTable);
                            val.rows[i] = DataTable.Rows[0].ItemArray;
                        } else {
                            for (int j = 0; j < cols.Count; j++) if (cols[j].insert) lcols1.Add(cols[j].name, val.rows[i].Length > j ? val.rows[i][j] : null);
                            SqlCommand = new SDSc.SqlCommand() {
                                CommandText = string.Format(
                                    "INSERT INTO {0}({1})VALUES({2});SELECT {3} FROM {0} WHERE[{4}]=@@IDENTITY;"
                                    , dbname
                                    , lcols1.cols
                                    , lcols1.values
                                    , selectcols
                                    , pk
                                ),
                                Connection = SqlTransaction.Connection,
                                Transaction = SqlTransaction
                            };
                            lcols1.Parameters(SqlCommand);
                            (new SDSc.SqlDataAdapter(SqlCommand)).Fill(DataTable);
                            if (val.childs != null) {
                                foreach (var child in val.childs) {
                                    foreach (var childrow in child.rows) {
                                        if (Convert.ToInt32(childrow[child.childcol]) == Convert.ToInt32(val.rows[i][0])) {
                                            childrow[child.childcol] = DataTable.Rows[0].ItemArray[0];
                                        }
                                    }
                                }
                            }
                            val.rows[i] = DataTable.Rows[0].ItemArray;
                        }
                    } else {
                        if (!update) throw new Exception("No update permission");
                        lcols2 = new valss();
                        for (int j = 0; j < cols.Count; j++){
                            if (cols[j].pk){ lcols2.Add(cols[j].name, val.rows[i][j]); }
                            else if (cols[j].update){ lcols1.Add(cols[j].name, val.rows[i].Length > j ? val.rows[i][j] : null); }
						}
                        SqlCommand = new SDSc.SqlCommand() {
                            CommandText = string.Format(
                                "UPDATE {0} SET {1} WHERE {2};SELECT {3} FROM {0} WHERE {2};"
                                , dbname
                                , lcols1.sets
                                , lcols2.sets
                                , selectcols
                            ),
                            Connection = SqlTransaction.Connection,
                            Transaction = SqlTransaction
                        };
                        lcols1.Parameters(SqlCommand);
                        lcols2.Parameters(SqlCommand);
                        (new SDSc.SqlDataAdapter(SqlCommand)).Fill(DataTable);
                        val.rows[i] = DataTable.Rows[0].ItemArray;
                    }
                }
            }
            return val;
        }
        public returnval merge(returnval val) {
            if (val.rows == null && val.childs == null) {
                SD.DataTable DataTable;
                using (SDSc.SqlConnection SqlConnection = new SDSc.SqlConnection(System.Configuration.ConfigurationManager.ConnectionStrings["moodleConnectionString1"].ConnectionString)) {
                    DataTable = new SD.DataTable();
                    (new SDSc.SqlDataAdapter(new SDSc.SqlCommand() {
                        CommandText = string.Format(
                            "SELECT {0}{1}{2};"
                            , selectcols.Replace("@currentuser", "1")
                            , dbname == null ? "" : string.Format(" FROM {0}", dbname)
                            , whereparam == null ? "" : string.Format(" WHERE {0}", whereparam
                                .Replace("@currentuser", "1")
                                .Replace("@currentlogin", "1"))
                        ),
                        Connection = SqlConnection
                    })).Fill(DataTable);
                };
                val.rows = new List<object[]>();
                foreach (SD.DataRow DataRow in DataTable.Rows) { val.rows.Add(DataRow.ItemArray); }
            } else {
                using (SDSc.SqlConnection SqlConnection = new SDSc.SqlConnection(System.Configuration.ConfigurationManager.ConnectionStrings["moodleConnectionString1"].ConnectionString)) {
                    SqlConnection.Open();
                    SDSc.SqlTransaction SqlTransaction = SqlConnection.BeginTransaction();
                    try {
                        merge(val, SqlTransaction);
                        if (val.childs != null) {
                            foreach (returnval subtable in val.childs) {
                                thistables.table(subtable.name).merge(subtable, SqlTransaction);
                                if (subtable.childs != null) {
                                    foreach (returnval subtable2 in subtable.childs) {
                                        thistables.table(subtable2.name).merge(subtable2, SqlTransaction);
                                    }
                                }
                            }
                        }
                        SqlTransaction.Commit();
                    } catch (Exception e) {
                        SqlTransaction.Rollback();
                        throw e;
                    }
                }
            }
            return val;
        }
        public string selectcols {
            get {
                List<string> lcolss = new List<string>();
                for (int i = 0; i < cols.Count; i++) if (cols[i].select) lcolss.Add(string.Format(" {0} ", cols[i].name));
                return string.Join(",", lcolss.ToArray());
            }
        }
        public override string ToString() {
            return name;
        }
    }
    public class col {
        public string name { get; set; }
        public bool pk { get; set; }
        public bool select { get; set; }
        public bool update { get; set; }
        public bool insert { get; set; }
        public override string ToString() {
            return name;
        }
    }
}