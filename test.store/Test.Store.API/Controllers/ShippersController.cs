using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Test.Store.BL;
using Test.Store.Entities;

namespace Test.Store.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    public class ShippersController : ControllerBase
    {
        private readonly Shippers_I _interface;

        /// <summary>
        /// ShippersController
        /// </summary>
        /// <param name="objInterface"></param>
        public ShippersController(Shippers_I objInterface) { _interface = objInterface; }


        /// <summary>
        /// getShippers
        /// </summary>
        /// <returns></returns>
        [HttpGet("[action]")]
        public async Task<ActionResult<InternalResponse>> getShippers()
        {
            InternalResponse ir = new InternalResponse();
            try
            {
                ir = await _interface.getShippers();
                return Ok(ir);
            }
            catch (Exception ex) { return BadRequest(new InternalResponse { msn = ex.Message }); }
        }
    }
}
