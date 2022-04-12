
namespace Test.Store.Entities
{
    public class InternalResponse
    {
        public object value { get; set; }
        public bool state { get; set; } = false;
        public string msn { get; set; } = string.Empty;
    }

    public class InternalResponse<T>
    {
        public T value { get; set; }
        public bool state { get; set; } = false;
        public string msn { get; set; } = string.Empty;
    }
}
