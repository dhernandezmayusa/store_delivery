using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Test.Store.BL;
using Test.Store.Entities;

namespace Test.Store.DAL
{
    public class ManagementToken_R : ManagementToken_I
    {

        /// <summary>
        /// generateJWT
        /// </summary>
        /// <param name="_authentication"></param>
        /// <param name="_authenticate"></param>
        /// <returns></returns>
        public async Task<InternalResponse> generateJWT(Authenticate _authenticate, Authentication _authentication)
        {
            InternalResponse ir = new InternalResponse();
            try
            {
                //  Header
                var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_authentication.SecretKey));
                var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
                var header = new JwtHeader(creds);

                //  Claims
                var claims = new[] { new Claim(ClaimTypes.Name, _authenticate.user) };

                //  Payload
                var payload = new JwtPayload
                (
                    _authentication.Issuer,
                    _authentication.Audience,
                    claims,
                    DateTime.Now,
                    DateTime.UtcNow.AddMinutes(Convert.ToDouble(_authentication.Expire))
                );

                var token = new JwtSecurityToken(header, payload);

                //  Set data
                ir.value = new JwtSecurityTokenHandler().WriteToken(token);
                ir.msn = "Generate Token.";
                ir.state = true;
            }
            catch (Exception)
            {
                throw;
            }
            return ir;
        }
    }
}

