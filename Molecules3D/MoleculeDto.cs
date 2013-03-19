using System.Collections.Generic;
using System.Runtime.Serialization;

namespace Molecules3D
{
	[DataContract]
	public class MoleculeDto
	{
		[DataMember]
		public IEnumerable<AtomDto> Atoms { get; set; }
	}
}