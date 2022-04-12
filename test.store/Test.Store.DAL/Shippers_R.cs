using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Test.Store.BL;
using Test.Store.Entities;
using Test.Store.Utility;

namespace Test.Store.DAL
{
   public class Shippers_R : Shippers_I
    {
        private readonly Connection _conexion;
        public Shippers_R() { _conexion = Connection.Instancia; }

        public async Task<InternalResponse> getShippers()
        {

            InternalResponse ir = await Task.Run(() => _conexion.transaction(NameConnection.Instance.TEST_STORE_TECNOLOGY, "getShippers"));
            return ir;
        }
    }
}
