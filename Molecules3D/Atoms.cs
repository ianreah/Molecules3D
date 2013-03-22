using System.Collections.Generic;
using System.Linq;

namespace Molecules3D
{
	public static class Atoms
	{
		public static Dictionary<string, int> Colors = new Dictionary<string, int>
		                                              {
			                                              {"C", 0x00909090},
														  {"N", 0x003050F8},
														  {"O", 0x00EE2010},
														  {"H", 0x00D3D3D3}
		                                              };

		public static IEnumerable<AtomDto> CentralizeAtoms(this IEnumerable<AtomDto> atoms)
		{
			var atomList = atoms.ToList();

			var xOffset = (atomList.Min(a => a.X) + atomList.Max(a => a.X)) / 2.0;
			var yOffset = (atomList.Min(a => a.Y) + atomList.Max(a => a.Y)) / 2.0;
			var zOffset = (atomList.Min(a => a.Z) + atomList.Max(a => a.Z)) / 2.0;

			return atomList.Select(a => new AtomDto(a.X - xOffset, a.Y - yOffset, a.Z - zOffset, a.Color));
		}
	}
}