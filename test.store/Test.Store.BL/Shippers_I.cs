using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Test.Store.Entities;

namespace Test.Store.BL
{
    public interface Shippers_I
    {
        Task<InternalResponse> getShippers();
    }
}
