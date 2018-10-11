using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Net;
using System.Threading;
using System.Windows.Forms;

namespace TE
{
    partial class PickTimeInterval
    {
        /// <summary>
        /// Required designer variable.
        /// </summary>
        private System.ComponentModel.IContainer components = null;

        /// <summary>
        /// Clean up any resources being used.
        /// </summary>
        /// <param name="disposing">true if managed resources should be disposed; otherwise, false.</param>

        protected override void Dispose(bool disposing)
        {
            if (disposing && (components != null))
            {
                components.Dispose();
            }
            base.Dispose(disposing);
        }

        #region Windows Form Designer generated code

        /// <summary>
        /// Required method for Designer support - do not modify
        /// the contents of this method with the code editor.
        /// </summary>
        private void InitializeComponent()
        {
			this.DataBtn = new System.Windows.Forms.Button();
			this.dateTimePicker1 = new System.Windows.Forms.DateTimePicker();
			this.dateTimePicker2 = new System.Windows.Forms.DateTimePicker();
			this.label1 = new System.Windows.Forms.Label();
			this.label2 = new System.Windows.Forms.Label();
			this.label3 = new System.Windows.Forms.Label();
			this.SuspendLayout();
			// 
			// DataBtn
			// 
			this.DataBtn.FlatStyle = System.Windows.Forms.FlatStyle.Flat;
			this.DataBtn.Location = new System.Drawing.Point(131, 184);
			this.DataBtn.Margin = new System.Windows.Forms.Padding(4);
			this.DataBtn.Name = "DataBtn";
			this.DataBtn.Size = new System.Drawing.Size(99, 31);
			this.DataBtn.TabIndex = 4;
			this.DataBtn.Text = "OK";
			this.DataBtn.UseVisualStyleBackColor = true;
			this.DataBtn.Click += new System.EventHandler(this.DataBtn_Click);
			// 
			// dateTimePicker1
			// 
			this.dateTimePicker1.Location = new System.Drawing.Point(131, 94);
			this.dateTimePicker1.Name = "dateTimePicker1";
			this.dateTimePicker1.Size = new System.Drawing.Size(200, 22);
			this.dateTimePicker1.TabIndex = 5;
			this.dateTimePicker1.ValueChanged += new System.EventHandler(this.dateTimePicker1_ValueChanged_1);
			// 
			// dateTimePicker2
			// 
			this.dateTimePicker2.Location = new System.Drawing.Point(131, 144);
			this.dateTimePicker2.Name = "dateTimePicker2";
			this.dateTimePicker2.Size = new System.Drawing.Size(200, 22);
			this.dateTimePicker2.TabIndex = 6;
			this.dateTimePicker2.ValueChanged += new System.EventHandler(this.dateTimePicker2_ValueChanged);
			// 
			// label1
			// 
			this.label1.AutoSize = true;
			this.label1.Location = new System.Drawing.Point(25, 99);
			this.label1.Name = "label1";
			this.label1.Size = new System.Drawing.Size(67, 16);
			this.label1.TabIndex = 7;
			this.label1.Text = "Start Date";
			// 
			// label2
			// 
			this.label2.AutoSize = true;
			this.label2.Location = new System.Drawing.Point(25, 150);
			this.label2.Name = "label2";
			this.label2.Size = new System.Drawing.Size(64, 16);
			this.label2.TabIndex = 8;
			this.label2.Text = "End Date";
			// 
			// label3
			// 
			this.label3.AutoSize = true;
			this.label3.BorderStyle = System.Windows.Forms.BorderStyle.FixedSingle;
			this.label3.Font = new System.Drawing.Font("Microsoft Sans Serif", 11.75F);
			this.label3.Location = new System.Drawing.Point(131, 32);
			this.label3.Name = "label3";
			this.label3.Size = new System.Drawing.Size(137, 22);
			this.label3.TabIndex = 9;
			this.label3.Text = "Select data range";
			this.label3.Click += new System.EventHandler(this.label3_Click);
			// 
			// PickTimeInterval
			// 
			this.AutoScaleDimensions = new System.Drawing.SizeF(8F, 16F);
			this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
			this.ClientSize = new System.Drawing.Size(381, 228);
			this.Controls.Add(this.label3);
			this.Controls.Add(this.label2);
			this.Controls.Add(this.label1);
			this.Controls.Add(this.dateTimePicker2);
			this.Controls.Add(this.dateTimePicker1);
			this.Controls.Add(this.DataBtn);
			this.Font = new System.Drawing.Font("Microsoft Sans Serif", 9.75F);
			this.FormBorderStyle = System.Windows.Forms.FormBorderStyle.FixedSingle;
			this.Margin = new System.Windows.Forms.Padding(4);
			this.MaximizeBox = false;
			this.MinimizeBox = false;
			this.Name = "PickTimeInterval";
			this.ShowIcon = false;
			this.Load += new System.EventHandler(this.SearchEngine_Load);
			this.ResumeLayout(false);
			this.PerformLayout();

        }

        private void filterResults_ItemCheck(object sender, EventArgs e)
        {
            throw new NotImplementedException();
        }

        #endregion
        private System.Windows.Forms.Button DataBtn;
        private DateTimePicker dateTimePicker1;
        private DateTimePicker dateTimePicker2;
        private Label label1;
        private Label label2;
        private Label label3;
    }
}