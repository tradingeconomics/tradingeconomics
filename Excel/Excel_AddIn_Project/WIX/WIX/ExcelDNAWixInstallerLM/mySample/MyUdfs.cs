using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace mysample
{
    using ExcelDna.Integration;

    public static class MyUdfs
    {
        [ExcelFunction(Name="BestFootballClub",Description = "My first .NET function")]
        public static string BestFootballClub(string name)
        {
            return "FC Nantes";
        }
    }
}
