using OpenBabel;
using System.Linq;

namespace Molecules3D
{
    public class MoleculeBuilder
    {
        private readonly OBMol molecule = new OBMol();

        public MoleculeBuilder FromSmiles(string smiles)
        {
            var obconv = new OBConversion();
            obconv.SetInFormat("smi");
            obconv.ReadString(molecule, smiles);
            return this;
        }

        public MoleculeBuilder Gen3D()
        {
            var generator = OBOp.FindType("Gen3D");
            generator.Do(molecule);
            return this;
        }

        public MoleculeDto ToDto()
        {
            var result = new MoleculeDto
            {
                Atoms = molecule.Atoms().Select(x => new AtomDto(x.GetX(), x.GetY(), x.GetZ(), Atoms.Colors[x.GetElementSymbol()])).CentralizeAtoms()
            };

            result.Bonds = molecule.Bonds().Select(x =>
                {
                    var from = result.Atoms.ElementAt((int)x.GetBeginAtomIdx()-1);
                    var to = result.Atoms.ElementAt((int)x.GetEndAtomIdx()-1);

                    return new BondDto(from.X, from.Y, from.Z, to.X, to.Y, to.Z);
                });
            return result;
        }
    }
}