using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Test.Store.Entities
{
   public class OrderDetail
    {
        public int productid { get; set; }
        public int unitprice { get; set; }
        public int qty { get; set; }
        public int discount { get; set; }

    }
}
