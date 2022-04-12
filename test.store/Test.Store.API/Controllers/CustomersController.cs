using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using Test.Store.BL;
using Test.Store.Entities;

namespace Test.Store.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    public class CustomersController : ControllerBase
    {
        private readonly Customers_I  _interface;

        /// <summary>
        /// ProductController
        /// </summary>
        /// <param name="objInterface"></param>
        public CustomersController(Customers_I objInterface) { _interface = objInterface; }


        /// <summary>
        /// getProducts
        /// </summary>
        /// <returns></returns>
        [HttpGet("[action]")]
        public async Task<ActionResult<InternalResponse>> getCustomers()
        {
            InternalResponse ir = new InternalResponse();
            try
            {
                ir = await _interface.getCustomers();
                return Ok(ir);
            }
            catch (Exception ex) { return BadRequest(new InternalResponse { msn = ex.Message }); }
        }


 
    }
}
