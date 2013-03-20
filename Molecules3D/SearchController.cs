using System.Collections.Generic;
using System.Drawing;
using System.Web.Http;

namespace Molecules3D
{
    public class SearchController : ApiController
    {
	    private const int Carbon = 0x00909090;
	    private const int Nitrogen = 0x003050F8;
	    private const int Oxygen = 0x00EE2010;

	    public MoleculeDto Get(string searchTerm)
	    {
		    return new MoleculeDto {Atoms = Atoms, Bonds = Bonds};
	    }

	    private static IEnumerable<AtomDto> Atoms
	    {
		    get
		    {
			    yield return new AtomDto(-2.974, 1.8129, -0.00445, Carbon);
			    yield return new AtomDto(-1.5395, 1.8129, -0.00445, Nitrogen);
			    yield return new AtomDto(-0.7244, 2.952, -0.00305, Carbon);
			    yield return new AtomDto(0.5677, 2.5873, -0.00245, Nitrogen);
			    yield return new AtomDto(0.6221, 1.2074, -0.00345, Carbon);
			    yield return new AtomDto(-0.7729, 0.7416, -0.00505, Carbon);
			    yield return new AtomDto(-1.0105, -0.702, -0.00625, Carbon);
			    yield return new AtomDto(-2.1487, -1.1619, -0.01265, Oxygen);
			    yield return new AtomDto(0.0995, -1.5278, 0.00025, Nitrogen);
			    yield return new AtomDto(1.3798, -0.9848, -0.00515, Carbon);
			    yield return new AtomDto(2.338, -1.7521, -0.01125, Oxygen);
			    yield return new AtomDto(1.6146, 0.3011, -0.00405, Nitrogen);
			    yield return new AtomDto(2.974, 0.7593, -0.00335, Carbon);
			    yield return new AtomDto(-0.0712, -2.952, 0.01265, Carbon);
		    }
	    }

	    private static IEnumerable<BondDto> Bonds
	    {
		    get
		    {
				yield return new BondDto(-2.974, 1.8129, -0.00445, -1.5395, 1.8129, -0.00445);
				yield return new BondDto(-1.5395, 1.8129, -0.00445, -0.7244, 2.952, -0.00305);
				yield return new BondDto(-0.7244, 2.952, -0.00305, 0.5677, 2.5873, -0.00245);
				yield return new BondDto(-1.5395, 1.8129, -0.00445, -0.7729, 0.7416, -0.00505);
				yield return new BondDto(0.5677, 2.5873, -0.00245, 0.6221, 1.2074, -0.00345);
				yield return new BondDto(0.6221, 1.2074, -0.00345, -0.7729, 0.7416, -0.00505);
				yield return new BondDto(0.6221, 1.2074, -0.00345, 1.6146, 0.3011, -0.00405);
				yield return new BondDto(-0.7729, 0.7416, -0.00505, -1.0105, -0.702, -0.00625);
				yield return new BondDto(-1.0105, -0.702, -0.00625, -2.1487, -1.1619, -0.01265);
				yield return new BondDto(-1.0105, -0.702, -0.00625, 0.0995, -1.5278, 0.00025);
				yield return new BondDto(0.0995, -1.5278, 0.00025, 1.3798, -0.9848, -0.00515);
				yield return new BondDto(0.0995, -1.5278, 0.00025, -0.0712, -2.952, 0.01265);
				yield return new BondDto(1.3798, -0.9848, -0.00515, 2.338, -1.7521, -0.01125);
				yield return new BondDto(1.3798, -0.9848, -0.00515, 1.6146, 0.3011, -0.00405);
				yield return new BondDto(1.6146, 0.3011, -0.00405, 2.974, 0.7593, -0.00335);
			}
	    }
    }
}