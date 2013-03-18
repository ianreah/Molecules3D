using System.Collections.Generic;
using System.Web.Http;

namespace Molecules3D
{
    public class SearchController : ApiController
    {
        public IEnumerable<AtomDto> Get(string searchTerm)
        {
			yield return new AtomDto(1.0454, 0.0621, -0.0638, "C");
			yield return new AtomDto(2.4799, 0.0621, -0.0638, "N");
			yield return new AtomDto(3.2950, 1.2012, -0.0625, "C");
			yield return new AtomDto(4.5871, 0.8365, -0.0619, "N");
			yield return new AtomDto(4.6415, -0.5434, -0.0629, "C");
			yield return new AtomDto(3.2465, -1.0092, -0.0645, "C");
			yield return new AtomDto(3.0089, -2.4528, -0.0656, "C");
			yield return new AtomDto(1.8708, -2.9127, -0.0720, "O");
			yield return new AtomDto(4.1189, -3.2786, -0.0591, "N");
			yield return new AtomDto(5.3992, -2.7356, -0.0645, "C");
			yield return new AtomDto(6.3574, -3.5029, -0.0707, "O");
			yield return new AtomDto(5.6340, -1.4497, -0.0634, "N");
			yield return new AtomDto(6.9934, -0.9915, -0.0628, "C");
			yield return new AtomDto(3.9482, -4.7028, -0.0467, "C");
        }
    }
}