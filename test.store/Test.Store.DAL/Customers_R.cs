using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Test.Store.BL;
using Test.Store.Entities;
using Test.Store.Utility;

namespace Test.Store.DAL
{
   public class Customers_R : Customers_I
    {
        private readonly Connection _conexion;
        public Customers_R() { _conexion = Connection.Instancia; }

        public async Task<InternalResponse> getCustomers()
        {
      
            InternalResponse ir = await Task.Run(() => _conexion.transaction(NameConnection.Instance.TEST_STORE_TECNOLOGY, "getOrdersXClients"));
            return ir;
        }

   
    }
}
