using System;
//using System.Collections.Generic;
//using System.ComponentModel;
//using System.Data;
using System.Diagnostics;
//using System.Drawing;
//using System.IO;
//using System.Linq;
//using System.Text;
//using System.Threading.Tasks;
using System.Windows.Forms;

namespace TE
{
    public partial class About : Form
    {
        public About()
        {
            InitializeComponent();
        }

        private void logBtn_Click(object sender, EventArgs e)
        {
            try
            {
                Process.Start(AppDomain.CurrentDomain.BaseDirectory + @"\teLogs");
            }
            catch (Exception ex)
            {
                helperClass.log.Error(ex);
            }                        
        }

        private void linkLabel1_LinkClicked(object sender, LinkLabelLinkClickedEventArgs e)
        {
            try
            {
                Process.Start("http://docs.tradingeconomics.com/?shell");
            }
            catch (Exception ex)
            {
                helperClass.log.Error(ex);
            }            
        }

        private void linkLabel2_LinkClicked(object sender, LinkLabelLinkClickedEventArgs e)
        {
            try
            {
                Process.Start("http://tradingeconomics.com/contact.aspx?subject=excel");
            }
            catch (Exception ex)
            {
                helperClass.log.Error(ex);
            }            
        }
    }
}
