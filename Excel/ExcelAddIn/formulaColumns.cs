using ExcelDna.Integration;
using Microsoft.Office.Interop.Excel;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace testClassLib
{
    public class formulaColumns
    {
        public readonly Range _cells;
        public readonly string _formula;
        public readonly string _columns;
        public readonly Range _caller;

        public formulaColumns( string myFormula, string myColumns, Range cellPosition, Range caller)
        {
            _cells = cellPosition;
            _formula = myFormula;
            _columns = myColumns;
            _caller = caller; 
        }
    }
}
