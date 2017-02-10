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
    public partial class testListTxt : Form
    {
        public testListTxt()
        {
            InitializeComponent();
            for (int i = 0; i < helperClass.cntry.Length; i++)
            {
                listBox1.Items.Insert(i, helperClass.cntry[i]);
            }
            listBox1.Items.Insert(0, "All");
            
        }

        private void button1_Click(object sender, EventArgs e)
        {

        }

        private void textBox1_TextChanged(object sender, EventArgs e)
        {


            var cc = new AutoCompleteStringCollection();
            cc.AddRange(listBox1.Items.Cast<string>().ToArray());

            //int[] fibarray = new int[] { 3, 4, 5, 6 };
            //
            //foreach (int elem in fibarray)
            //{
            //    listBox1.SelectedIndex = elem;
            //}
            //listBox1.SelectedIndex = 2;
            //listBox1.SelectedIndex = 3;
            //listBox1.SelectedIndex = 4;

            //TextBox oTextBox = (TextBox)sender;
            //
            //List<int> termsList = new List<int>();
            //for (int runs = 0; runs < listBox1.Items.Count; runs++)
            //{
            //    int iListIndex = oTextBox.TextLength == 0 ? -1 : listBox1.FindString(oTextBox.Text);
            //    termsList.Add(iListIndex);
            //}
            //
            ////int iListIndex = oTextBox.TextLength == 0 ? -1 : listBox1.FindString(oTextBox.Text);
            //foreach (int elem in termsList)
            //{
            //    listBox1.SelectedIndex = elem;
            //}
            

        }
    }
}
