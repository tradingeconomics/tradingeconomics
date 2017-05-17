using Microsoft.Office.Interop.Excel;


namespace TE
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
