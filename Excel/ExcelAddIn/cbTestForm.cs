using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace testClassLib
{
    public partial class cbTestForm : Form
    {
        public cbTestForm()
        {
            InitializeComponent();
            for (int i = 0; i < helperClass.cntry.Length; i++)
            {
                comboBox1.Items.Insert(i, helperClass.cntry[i]);
            }
            comboBox1.Items.Insert(0, "All");
            
        }

        private void button1_Click(object sender, EventArgs e)
        {

        }
    }
}
