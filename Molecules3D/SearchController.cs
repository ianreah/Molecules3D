using System.Collections.Generic;
using System.Drawing;
using System.Reflection;
using System.Web.Http;

namespace Molecules3D
{
	public class SearchController : ApiController
	{
		// GET api/search/{searchTerm} - search for a molecule
		public MoleculeDto Get(string searchTerm)
		{
			// For now, just return the default molecule!
			return Get();
		}

		// GET api/search - return the default molecule
		public MoleculeDto Get()
		{
			return MoleculeDto.FromMolFile(() => Assembly.GetExecutingAssembly().GetManifestResourceStream("Molecules3D.MolFiles.caffeine.mol"));
		}
	}
}