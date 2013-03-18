using System.Runtime.Serialization;

namespace Molecules3D
{
	[DataContract]
	public class AtomDto
	{
		public AtomDto(double x, double y, double z, string element)
		{
			this.X = x;
			this.Y = y;
			this.Z = z;
			this.Element = element;
		}

		[DataMember]
		public double X { get; set; }

		[DataMember]
		public double Y { get; set; }

		[DataMember]
		public double Z { get; set; }

		[DataMember]
		public string Element { get; set; }
	}
}