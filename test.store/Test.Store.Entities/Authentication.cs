
namespace Test.Store.Entities
{
 public class Authentication
  {

    public string SecretKey { get; set; }
    public string Issuer { get; set; }
    public string Audience { get; set; }
    public int Expire { get; set; }

  }
}
