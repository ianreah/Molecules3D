using System.Drawing;
using System.Linq;
using OpenBabel;

namespace Molecules3D
{
	public static class OBDotNetExtensions
	{
		private static readonly OBElementTable obElementTable = new OBElementTable();

		public static int GetElementColor(this OBAtom obAtom)
		{
			var rgb = obElementTable.GetRGB((int)obAtom.GetAtomicNum())
				                    .Select(x => (int)(x * 255))
									.ToArray();

			return Color.FromArgb(0, rgb[0], rgb[1], rgb[2]).ToArgb();
		}
	}
}
