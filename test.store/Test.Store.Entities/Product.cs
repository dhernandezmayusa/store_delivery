using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Test.Store.Entities
{
    public class Product
    {
        public int COD_PRODUCT { get; set; }
        public string DESCRIPTION_PRODUCT { get; set; }
        public bool STATE_PRODUCT { get; set; }
        public DateTime  DATE_MAKE { get; set; }
        public DateTime DATE_VALIDITY { get; set; }
        public int COD_SUPPLIER { get; set; }
        public string DESCRIPTION_SUPPLIER { get; set; }
        public string CNPJ_SUPPLIER { get; set; }
    }
}
