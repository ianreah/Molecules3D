using System.Web.Http;

namespace Molecules3D
{
    public class SearchController : ApiController
    {
        public string Get(string searchTerm)
        {
            return string.Format("3D Chemical Structure for {0}", searchTerm);
        }
    }
}