using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Molecules3D;

namespace Molecules3DTests
{
	[TestClass]
	public class MoleculeDtoTests
	{
		[TestMethod]
		public void FromMolFile()
		{
			var dtoUnderTest = MoleculeDto.FromMolFile(() => Assembly.GetExecutingAssembly().GetManifestResourceStream("Molecules3DTests.TestResources.test.mol"));

			AssertAtoms(ExpectedAtoms.ToList(), dtoUnderTest.Atoms.ToList());
			AssertBonds(ExpectedBonds.ToList(), dtoUnderTest.Bonds.ToList());
		}

		private void AssertAtoms(List<AtomDto> expected, List<AtomDto> actual)
		{
			Assert.AreEqual(expected.Count, actual.Count);
			for (int i = 0; i < expected.Count; i++)
			{
				var expectedAtom = expected[i];
				var actualAtom = actual[i];

				Assert.AreEqual(expectedAtom.Color, actualAtom.Color);
				Assert.AreEqual(expectedAtom.X, actualAtom.X, 0.000001);
				Assert.AreEqual(expectedAtom.Y, actualAtom.Y, 0.000001);
				Assert.AreEqual(expectedAtom.Z, actualAtom.Z, 0.000001);
			}
		}

		private void AssertBonds(List<BondDto> expected, List<BondDto> actual)
		{
			Assert.AreEqual(expected.Count, actual.Count);
			for (int i = 0; i < expected.Count; i++)
			{
				var expectedBond = expected[i];
				var actualBond = actual[i];

				Assert.AreEqual(expectedBond.FromX, actualBond.FromX, 0.000001);
				Assert.AreEqual(expectedBond.FromY, actualBond.FromY, 0.000001);
				Assert.AreEqual(expectedBond.FromZ, actualBond.FromZ, 0.000001);

				Assert.AreEqual(expectedBond.ToX, actualBond.ToX, 0.000001);
				Assert.AreEqual(expectedBond.ToY, actualBond.ToY, 0.000001);
				Assert.AreEqual(expectedBond.ToZ, actualBond.ToZ, 0.000001);
			}
		}

		private IEnumerable<AtomDto> ExpectedAtoms
		{
			get
			{
				yield return new AtomDto(-2.974, 1.8129, -0.00445, Atoms.Colors["C"]);
				yield return new AtomDto(-1.5395, 1.8129, -0.00445, Atoms.Colors["N"]);
				yield return new AtomDto(-0.7244, 2.952, -0.00315, Atoms.Colors["C"]);
				yield return new AtomDto(0.5677, 2.5873, -0.00255, Atoms.Colors["N"]);
				yield return new AtomDto(0.6221, 1.2074, -0.00355, Atoms.Colors["C"]);
				yield return new AtomDto(-0.7728, 0.7416, -0.00515, Atoms.Colors["C"]);
				yield return new AtomDto(-1.0105, -0.702, -0.00625, Atoms.Colors["C"]);
				yield return new AtomDto(-2.1486, -1.1619, -0.01265, Atoms.Colors["O"]);
				yield return new AtomDto(0.0995, -1.5278, 0.00025, Atoms.Colors["N"]);
				yield return new AtomDto(1.3798, -0.9848, -0.00515, Atoms.Colors["C"]);
				yield return new AtomDto(2.3381, -1.7521, -0.01135, Atoms.Colors["O"]);
				yield return new AtomDto(1.6146, 0.3011, -0.00405, Atoms.Colors["N"]);
				yield return new AtomDto(2.974, 0.7593, -0.00345, Atoms.Colors["C"]);
				yield return new AtomDto(-0.0712, -2.952, 0.01265, Atoms.Colors["C"]);
			}
		}

		private IEnumerable<BondDto> ExpectedBonds
		{
			get
			{
				yield return new BondDto(-2.974, 1.8129, -0.00445, -1.5395, 1.8129, -0.00445);
				yield return new BondDto(-1.5395, 1.8129, -0.00445, -0.7244, 2.952, -0.00315);
				yield return new BondDto(-1.5395, 1.8129, -0.00445, -0.7728, 0.7416, -0.00515);
				yield return new BondDto(-0.7244, 2.952, -0.00315, 0.5677, 2.5873, -0.00255);
				yield return new BondDto(0.5677, 2.5873, -0.00255, 0.6221, 1.2074, -0.00355);
				yield return new BondDto(0.6221, 1.2074, -0.00355, -0.7728, 0.7416, -0.00515);
				yield return new BondDto(0.6221, 1.2074, -0.00355, 1.6146, 0.3011, -0.00405);
				yield return new BondDto(-0.7728, 0.7416, -0.00515, -1.0105, -0.702, -0.00625);
				yield return new BondDto(-1.0105, -0.702, -0.00625, -2.1486, -1.1619, -0.01265);
				yield return new BondDto(-1.0105, -0.702, -0.00625, 0.0995, -1.5278, 0.00025);
				yield return new BondDto(0.0995, -1.5278, 0.00025, 1.3798, -0.9848, -0.00515);
				yield return new BondDto(0.0995, -1.5278, 0.00025, -0.0712, -2.952, 0.01265);
				yield return new BondDto(1.3798, -0.9848, -0.00515, 2.3381, -1.7521, -0.01135);
				yield return new BondDto(1.3798, -0.9848, -0.00515, 1.6146, 0.3011, -0.00405);
				yield return new BondDto(1.6146, 0.3011, -0.00405, 2.974, 0.7593, -0.00345);
			}
		}
	}
}
