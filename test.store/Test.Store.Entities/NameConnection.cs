using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Test.Store.Entities
{
   public class NameConnection
    {
        public static NameConnection Instance { get { lock (Padlock) { return _instance ?? (_instance = new NameConnection()); } } }

        #region Propiedades Privadas
        private static NameConnection _instance;
        private static readonly object Padlock = new object();
        #endregion Propiedades Privadas


        public string TEST_STORE_TECNOLOGY { get; set; }


    }
}
