using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Test.Store.Entities;

namespace Test.Store.BL
{
   public interface Orders_I
    {
        Task<InternalResponse> getOrdersCodOrder(int custid);
        Task<InternalResponse> postOrder(Order order);
    }
}
