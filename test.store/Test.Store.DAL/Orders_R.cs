using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Test.Store.BL;
using Test.Store.Entities;
using Test.Store.Utility;

namespace Test.Store.DAL
{
    public class Orders_R : Orders_I
    {
        private readonly Connection _conexion;
        public Orders_R() { _conexion = Connection.Instancia; }

        public async Task<InternalResponse> getOrdersCodOrder(int custid)
        {

            SqlParameter[] parameter = {
                new SqlParameter { ParameterName = "@custid", Value = custid }
            };

            InternalResponse ir = await Task.Run(() => _conexion.transaction(NameConnection.Instance.TEST_STORE_TECNOLOGY, "getOrdersXClient", parameter));
            return ir;
        }

        public async Task<InternalResponse> postOrder(Order order)
        {

            SqlParameter[] parametros =
            {
               new SqlParameter { ParameterName= "@custid", Value = order.custid},
               new SqlParameter { ParameterName= "@empid", Value = order.empid},
               new SqlParameter { ParameterName= "@orderdate", Value = order.orderdate},
               new SqlParameter { ParameterName= "@requireddate", Value = order.requireddate},
               new SqlParameter { ParameterName= "@shippeddate", Value = order.shippeddate},
               new SqlParameter { ParameterName= "@shipperid", Value = order.shipperid},
               new SqlParameter { ParameterName= "@freight", Value = order.freight},
               new SqlParameter { ParameterName= "@shipname", Value = order.shipname},
               new SqlParameter { ParameterName= "@shipaddress", Value = order.shipaddress},
               new SqlParameter { ParameterName= "@shipcity", Value = order.shipcity},
               new SqlParameter { ParameterName= "@shipregion", Value = order.shipregion},
               new SqlParameter { ParameterName= "@shippostalcode", Value = order.shippostalcode},
               new SqlParameter { ParameterName= "@shipcountry", Value = order.shipcountry},
               new SqlParameter { ParameterName= "@orderdetail", Value = GetTable(order.orderdetail)}
            };



            InternalResponse ir = await Task.Run(() => _conexion.transaction(NameConnection.Instance.TEST_STORE_TECNOLOGY, "InsertOrder", parametros));
            return ir;
        }


        public DataTable GetTable(OrderDetail orderDetail)
        {
       
            DataTable table = new DataTable();
            table.Columns.Add("productid", typeof(int));
            table.Columns.Add("unitprice", typeof(int));
            table.Columns.Add("qty", typeof(int));
            table.Columns.Add("discount", typeof(int));

            table.Rows.Add(orderDetail.productid, orderDetail.unitprice, orderDetail.qty, orderDetail.discount);

            return table;
        }
    }
}
