using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;
using Test.Store.Entities;

namespace Test.Store.Utility
{
    public class Connection
    {
        private static Connection _instacia;
        private static readonly object Padlock = new object();
        private Connection() { }

        public static Connection Instancia
        {
            get
            {
                lock (Padlock)
                {
                    return _instacia ?? (_instacia = new Connection());
                }
            }
        }


        public SqlParameter[] SqlParameterCollection<T>(T entidad)
        {
            Type temp = typeof(T);
            List<SqlParameter> listaParametros = new List<SqlParameter>();
            var obj = entidad.GetType().GetProperties();
            foreach (PropertyInfo item in obj)
            {
                foreach (PropertyInfo pro in temp.GetProperties())
                {
                    if (pro.Name == item.Name)
                    {
                        var value = item.GetValue(entidad);
                        if (value != null)
                            listaParametros.Add(new SqlParameter($"@{pro.Name}", value));
                    }
                    else { continue; }
                }
            }
            return listaParametros.ToArray();
        }

        public async Task<InternalResponse> transaction(string cxn, string sp, SqlParameter[] parameters = null)
        {
            InternalResponse ir = new InternalResponse();
            try
            {
                using (SqlConnection conn = new SqlConnection(cxn))
                {
                    using (SqlCommand cmd = new SqlCommand(sp, conn) { CommandType = CommandType.StoredProcedure, CommandTimeout = 10, })
                    {
                        cmd.LoadParams(parameters);

                        if (conn.State == ConnectionState.Closed)
                            await conn.OpenAsync();

                        DataTable table = await cmd.ExecuteAndCreateDataTableAsync();
                        ir.value = JsonConvert.SerializeObject(table);
                        ir.state = true;
                        ir.msn = "OK";
                    }
                }
            }
            catch (Exception ex)
            {
                ir.value = "Error: " + ex.Message.Trim();
                ir.state = false;
                ir.msn = "CATCH";
            }
            return ir;
        }

      
    }
}