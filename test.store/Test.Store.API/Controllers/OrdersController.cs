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
    public class OrdersController : ControllerBase
    {
        private readonly Orders_I _interface;

        /// <summary>
        /// OrdersController
        /// </summary>
        /// <param name="objInterface"></param>
        public OrdersController(Orders_I objInterface) { _interface = objInterface; }

        /// <summary>
        /// getOrdersCodOrder
        /// </summary>
        /// <param name="codOrder"></param>
        /// <returns></returns>
        [HttpGet("[action]")]
        public async Task<ActionResult<InternalResponse>> getOrdersCodOrder(int codOrder)
        {
            InternalResponse ir = new InternalResponse();
            try
            {
                ir = await _interface.getOrdersCodOrder(codOrder);
                return Ok(ir);
            }
            catch (Exception ex) { return BadRequest(new InternalResponse { msn = ex.Message }); }
        }

        /// <summary>
        /// postOrder
        /// </summary>
        /// <param name="order"></param>
        /// <returns></returns>
        [HttpPost("[action]")]
        public async Task<ActionResult<InternalResponse>> postOrder(Order order)
        {
            InternalResponse ir = new InternalResponse();
            try
            {
                ir = await _interface.postOrder(order);
                return Ok(ir);
            }
            catch (Exception ex) { return BadRequest(new InternalResponse { msn = ex.Message }); }

        }
    }
}
