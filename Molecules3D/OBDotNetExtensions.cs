using OpenBabel;

namespace Molecules3D
{
	public static class OBDotNetExtensions
	{
		private static readonly OBElementTable obElementTable = new OBElementTable();

		public static string GetElementSymbol(this OBAtom obAtom)
		{
			return obElementTable.GetSymbol((int)obAtom.GetAtomicNum());
		}
	}
}