using Microsoft.Office.Interop.Excel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace testClassLib
{
    public class frmClmRng
    {
        public readonly Range _cells;
        public readonly string _formula;
        public readonly string[] _columns;


        public frmClmRng(string myFormula, string[] myColumns, Range cellPosition)
        {
            _cells = cellPosition;
            _formula = myFormula;
            _columns = myColumns;
        }
    }
}
