using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Runtime.Serialization;

namespace Molecules3D
{
	[DataContract]
	public class MoleculeDto
	{
		[DataMember]
		public IEnumerable<AtomDto> Atoms { get; set; }

		[DataMember]
		public IEnumerable<BondDto> Bonds { get; set; }

		public static MoleculeDto FromMolFile(Func<Stream> molFileStreamSource)
		{
			var reader = new MolFileReader(molFileStreamSource);

			var result = new MoleculeDto
			             {
				             Atoms = reader.AtomData.Select(data => new AtomDto(data.Item1, data.Item2, data.Item3, Molecules3D.Atoms.Colors[data.Item4])).CentralizeAtoms()
			             };

			result.Bonds = reader.BondData.Select(data =>
								{
									var from = result.Atoms.ElementAt(data.Item1);
									var to = result.Atoms.ElementAt(data.Item2);

									return new BondDto(from.X, from.Y, from.Z, to.X, to.Y, to.Z);
								});

			return result;
		}
	}
}