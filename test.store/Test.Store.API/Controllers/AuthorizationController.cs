using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Test.Store.BL;
using Test.Store.Entities;

namespace Test.Store.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthorizationController : ControllerBase
    {
        private readonly ManagementToken_I managementToken;
        private readonly IConfiguration _configuration;
        private readonly Authenticate _authenticate;
        private readonly Authentication _authentication;


        /// <summary>
        /// AuthorizationController
        /// </summary>
        /// <param name="_managementToken"></param>
        /// <param name="configuration"></param>
        public AuthorizationController(ManagementToken_I _managementToken, IConfiguration configuration)
        {
            managementToken = _managementToken;
            _configuration = configuration;
            _authenticate = _configuration.GetSection("Authenticate").Get<Authenticate>();
            _authentication = _configuration.GetSection("Authentication").Get<Authentication>();
        }

        /// <summary>
        /// generateToken
        /// </summary>
        /// <returns></returns>
        [HttpPost("[action]")]
        public async Task<ActionResult<InternalResponse>> generateToken()
        {
            try
            {
                InternalResponse ir = await managementToken.generateJWT(_authenticate, _authentication);
                return ir.state ? Ok(ir) : BadRequest(ir);
            }
            catch (Exception ex)
            {
                return BadRequest(new InternalResponse { msn = ex.Message });
            }
        }
    }
}
