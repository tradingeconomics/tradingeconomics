namespace testClassLib
{
    partial class forecastsFrm
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
            this.countryLstBx = new System.Windows.Forms.ListBox();
            this.selectedCountryLstBx = new System.Windows.Forms.ListBox();
            this.indicatorLstBx = new System.Windows.Forms.ListBox();
            this.selectedIndicatorLstBx = new System.Windows.Forms.ListBox();
            this.btnCntryAdd = new System.Windows.Forms.Button();
            this.btnCntryRemove = new System.Windows.Forms.Button();
            this.btnIndctrAdd = new System.Windows.Forms.Button();
            this.btnIndctrRemove = new System.Windows.Forms.Button();
            this.btnOK = new System.Windows.Forms.Button();
            this.btnCancel = new System.Windows.Forms.Button();
            this.label1 = new System.Windows.Forms.Label();
            this.label2 = new System.Windows.Forms.Label();
            this.label3 = new System.Windows.Forms.Label();
            this.label4 = new System.Windows.Forms.Label();
            this.cntryTextBox = new System.Windows.Forms.TextBox();
            this.indctrTextBox = new System.Windows.Forms.TextBox();
            this.activeCellPositionBox = new System.Windows.Forms.TextBox();
            this.label5 = new System.Windows.Forms.Label();
            this.SuspendLayout();
            // 
            // countryLstBx
            // 
            this.countryLstBx.BorderStyle = System.Windows.Forms.BorderStyle.None;
            this.countryLstBx.Font = new System.Drawing.Font("Microsoft Sans Serif", 9.75F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.countryLstBx.FormattingEnabled = true;
            this.countryLstBx.ItemHeight = 16;
            this.countryLstBx.Location = new System.Drawing.Point(14, 48);
            this.countryLstBx.Name = "countryLstBx";
            this.countryLstBx.ScrollAlwaysVisible = true;
            this.countryLstBx.SelectionMode = System.Windows.Forms.SelectionMode.MultiExtended;
            this.countryLstBx.Size = new System.Drawing.Size(187, 144);
            this.countryLstBx.TabIndex = 0;
            // 
            // selectedCountryLstBx
            // 
            this.selectedCountryLstBx.BorderStyle = System.Windows.Forms.BorderStyle.None;
            this.selectedCountryLstBx.Font = new System.Drawing.Font("Microsoft Sans Serif", 9.75F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.selectedCountryLstBx.FormattingEnabled = true;
            this.selectedCountryLstBx.ItemHeight = 16;
            this.selectedCountryLstBx.Location = new System.Drawing.Point(302, 48);
            this.selectedCountryLstBx.Name = "selectedCountryLstBx";
            this.selectedCountryLstBx.ScrollAlwaysVisible = true;
            this.selectedCountryLstBx.SelectionMode = System.Windows.Forms.SelectionMode.MultiExtended;
            this.selectedCountryLstBx.Size = new System.Drawing.Size(187, 144);
            this.selectedCountryLstBx.Sorted = true;
            this.selectedCountryLstBx.TabIndex = 1;
            // 
            // indicatorLstBx
            // 
            this.indicatorLstBx.BorderStyle = System.Windows.Forms.BorderStyle.None;
            this.indicatorLstBx.Font = new System.Drawing.Font("Microsoft Sans Serif", 9.75F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.indicatorLstBx.FormattingEnabled = true;
            this.indicatorLstBx.ItemHeight = 16;
            this.indicatorLstBx.Location = new System.Drawing.Point(14, 243);
            this.indicatorLstBx.Name = "indicatorLstBx";
            this.indicatorLstBx.ScrollAlwaysVisible = true;
            this.indicatorLstBx.SelectionMode = System.Windows.Forms.SelectionMode.MultiExtended;
            this.indicatorLstBx.Size = new System.Drawing.Size(187, 144);
            this.indicatorLstBx.Sorted = true;
            this.indicatorLstBx.TabIndex = 2;
            // 
            // selectedIndicatorLstBx
            // 
            this.selectedIndicatorLstBx.BorderStyle = System.Windows.Forms.BorderStyle.None;
            this.selectedIndicatorLstBx.Font = new System.Drawing.Font("Microsoft Sans Serif", 9.75F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.selectedIndicatorLstBx.FormattingEnabled = true;
            this.selectedIndicatorLstBx.ItemHeight = 16;
            this.selectedIndicatorLstBx.Location = new System.Drawing.Point(302, 243);
            this.selectedIndicatorLstBx.Name = "selectedIndicatorLstBx";
            this.selectedIndicatorLstBx.ScrollAlwaysVisible = true;
            this.selectedIndicatorLstBx.SelectionMode = System.Windows.Forms.SelectionMode.MultiExtended;
            this.selectedIndicatorLstBx.Size = new System.Drawing.Size(187, 144);
            this.selectedIndicatorLstBx.Sorted = true;
            this.selectedIndicatorLstBx.TabIndex = 3;
            // 
            // btnCntryAdd
            // 
            this.btnCntryAdd.FlatStyle = System.Windows.Forms.FlatStyle.Flat;
            this.btnCntryAdd.Location = new System.Drawing.Point(208, 89);
            this.btnCntryAdd.Name = "btnCntryAdd";
            this.btnCntryAdd.Size = new System.Drawing.Size(87, 29);
            this.btnCntryAdd.TabIndex = 4;
            this.btnCntryAdd.Text = "-->";
            this.btnCntryAdd.UseVisualStyleBackColor = true;
            this.btnCntryAdd.Click += new System.EventHandler(this.btnCntryAdd_Click);
            // 
            // btnCntryRemove
            // 
            this.btnCntryRemove.FlatStyle = System.Windows.Forms.FlatStyle.Flat;
            this.btnCntryRemove.Location = new System.Drawing.Point(208, 124);
            this.btnCntryRemove.Name = "btnCntryRemove";
            this.btnCntryRemove.Size = new System.Drawing.Size(87, 29);
            this.btnCntryRemove.TabIndex = 5;
            this.btnCntryRemove.Text = "<--";
            this.btnCntryRemove.UseVisualStyleBackColor = true;
            this.btnCntryRemove.Click += new System.EventHandler(this.btnCntryRemove_Click);
            // 
            // btnIndctrAdd
            // 
            this.btnIndctrAdd.FlatStyle = System.Windows.Forms.FlatStyle.Flat;
            this.btnIndctrAdd.Location = new System.Drawing.Point(208, 284);
            this.btnIndctrAdd.Name = "btnIndctrAdd";
            this.btnIndctrAdd.Size = new System.Drawing.Size(87, 29);
            this.btnIndctrAdd.TabIndex = 6;
            this.btnIndctrAdd.Text = "-->";
            this.btnIndctrAdd.UseVisualStyleBackColor = true;
            this.btnIndctrAdd.Click += new System.EventHandler(this.btnIndctrAdd_Click);
            // 
            // btnIndctrRemove
            // 
            this.btnIndctrRemove.FlatStyle = System.Windows.Forms.FlatStyle.Flat;
            this.btnIndctrRemove.Location = new System.Drawing.Point(208, 320);
            this.btnIndctrRemove.Name = "btnIndctrRemove";
            this.btnIndctrRemove.Size = new System.Drawing.Size(87, 29);
            this.btnIndctrRemove.TabIndex = 7;
            this.btnIndctrRemove.Text = "<--";
            this.btnIndctrRemove.UseVisualStyleBackColor = true;
            this.btnIndctrRemove.Click += new System.EventHandler(this.btnIndctrRemove_Click);
            // 
            // btnOK
            // 
            this.btnOK.FlatStyle = System.Windows.Forms.FlatStyle.Flat;
            this.btnOK.Font = new System.Drawing.Font("Microsoft Sans Serif", 9F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.btnOK.Location = new System.Drawing.Point(302, 415);
            this.btnOK.Name = "btnOK";
            this.btnOK.Size = new System.Drawing.Size(87, 29);
            this.btnOK.TabIndex = 8;
            this.btnOK.Text = "OK";
            this.btnOK.UseVisualStyleBackColor = true;
            this.btnOK.Click += new System.EventHandler(this.btnOK_Click);
            // 
            // btnCancel
            // 
            this.btnCancel.FlatStyle = System.Windows.Forms.FlatStyle.Flat;
            this.btnCancel.Font = new System.Drawing.Font("Microsoft Sans Serif", 9F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.btnCancel.Location = new System.Drawing.Point(401, 415);
            this.btnCancel.Name = "btnCancel";
            this.btnCancel.Size = new System.Drawing.Size(87, 29);
            this.btnCancel.TabIndex = 9;
            this.btnCancel.Text = "Cancel";
            this.btnCancel.UseVisualStyleBackColor = true;
            this.btnCancel.Click += new System.EventHandler(this.btnCancel_Click);
            // 
            // label1
            // 
            this.label1.AutoSize = true;
            this.label1.Font = new System.Drawing.Font("Microsoft Sans Serif", 9F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.label1.Location = new System.Drawing.Point(58, 10);
            this.label1.Name = "label1";
            this.label1.Size = new System.Drawing.Size(59, 15);
            this.label1.TabIndex = 10;
            this.label1.Text = "Countries";
            // 
            // label2
            // 
            this.label2.AutoSize = true;
            this.label2.Font = new System.Drawing.Font("Microsoft Sans Serif", 9F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.label2.Location = new System.Drawing.Point(336, 10);
            this.label2.Name = "label2";
            this.label2.Size = new System.Drawing.Size(110, 15);
            this.label2.TabIndex = 11;
            this.label2.Text = "Selected Countries";
            // 
            // label3
            // 
            this.label3.AutoSize = true;
            this.label3.Font = new System.Drawing.Font("Microsoft Sans Serif", 9F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.label3.Location = new System.Drawing.Point(58, 204);
            this.label3.Name = "label3";
            this.label3.Size = new System.Drawing.Size(60, 15);
            this.label3.TabIndex = 12;
            this.label3.Text = "Indicators";
            // 
            // label4
            // 
            this.label4.AutoSize = true;
            this.label4.Font = new System.Drawing.Font("Microsoft Sans Serif", 9F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.label4.Location = new System.Drawing.Point(336, 204);
            this.label4.Name = "label4";
            this.label4.Size = new System.Drawing.Size(111, 15);
            this.label4.TabIndex = 13;
            this.label4.Text = "Selected Indicators";
            // 
            // cntryTextBox
            // 
            this.cntryTextBox.BorderStyle = System.Windows.Forms.BorderStyle.None;
            this.cntryTextBox.Font = new System.Drawing.Font("Microsoft Sans Serif", 9.75F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.cntryTextBox.Location = new System.Drawing.Point(14, 30);
            this.cntryTextBox.Name = "cntryTextBox";
            this.cntryTextBox.Size = new System.Drawing.Size(187, 15);
            this.cntryTextBox.TabIndex = 14;
            this.cntryTextBox.TextChanged += new System.EventHandler(this.cntryTextBox_TextChanged);
            this.cntryTextBox.AutoSize = false;
            // 
            // indctrTextBox
            // 
            this.indctrTextBox.BorderStyle = System.Windows.Forms.BorderStyle.None;
            this.indctrTextBox.Font = new System.Drawing.Font("Microsoft Sans Serif", 9.75F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.indctrTextBox.Location = new System.Drawing.Point(14, 225);
            this.indctrTextBox.Name = "indctrTextBox";
            this.indctrTextBox.Size = new System.Drawing.Size(187, 15);
            this.indctrTextBox.TabIndex = 15;
            this.indctrTextBox.TextChanged += new System.EventHandler(this.indctrTextBox_TextChanged);
            this.indctrTextBox.AutoSize = false;
            // 
            // activeCellPositionBox
            // 
            this.activeCellPositionBox.Location = new System.Drawing.Point(23, 423);
            this.activeCellPositionBox.Name = "activeCellPositionBox";
            this.activeCellPositionBox.Size = new System.Drawing.Size(124, 21);
            this.activeCellPositionBox.TabIndex = 16;
            this.activeCellPositionBox.TextAlign = System.Windows.Forms.HorizontalAlignment.Center;
            // 
            // label5
            // 
            this.label5.AutoSize = true;
            this.label5.Location = new System.Drawing.Point(58, 404);
            this.label5.Name = "label5";
            this.label5.Size = new System.Drawing.Size(56, 15);
            this.label5.TabIndex = 17;
            this.label5.Text = "Start Cell";
            // 
            // forecastsFrm
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(7F, 15F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.ClientSize = new System.Drawing.Size(504, 461);
            this.ControlBox = false;
            this.Controls.Add(this.label5);
            this.Controls.Add(this.activeCellPositionBox);
            this.Controls.Add(this.indctrTextBox);
            this.Controls.Add(this.cntryTextBox);
            this.Controls.Add(this.label4);
            this.Controls.Add(this.label3);
            this.Controls.Add(this.label2);
            this.Controls.Add(this.label1);
            this.Controls.Add(this.btnCancel);
            this.Controls.Add(this.btnOK);
            this.Controls.Add(this.btnIndctrRemove);
            this.Controls.Add(this.btnIndctrAdd);
            this.Controls.Add(this.btnCntryRemove);
            this.Controls.Add(this.btnCntryAdd);
            this.Controls.Add(this.selectedIndicatorLstBx);
            this.Controls.Add(this.indicatorLstBx);
            this.Controls.Add(this.selectedCountryLstBx);
            this.Controls.Add(this.countryLstBx);
            this.Font = new System.Drawing.Font("Microsoft Sans Serif", 9F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.FormBorderStyle = System.Windows.Forms.FormBorderStyle.FixedSingle;
            this.Name = "forecastsFrm";
            this.StartPosition = System.Windows.Forms.FormStartPosition.CenterScreen;
            this.Text = "Forecasts";
            this.ResumeLayout(false);
            this.PerformLayout();

        }

        #endregion

        private System.Windows.Forms.ListBox countryLstBx;
        private System.Windows.Forms.ListBox selectedCountryLstBx;
        private System.Windows.Forms.ListBox indicatorLstBx;
        private System.Windows.Forms.ListBox selectedIndicatorLstBx;
        private System.Windows.Forms.Button btnCntryAdd;
        private System.Windows.Forms.Button btnCntryRemove;
        private System.Windows.Forms.Button btnIndctrAdd;
        private System.Windows.Forms.Button btnIndctrRemove;
        private System.Windows.Forms.Button btnOK;
        private System.Windows.Forms.Button btnCancel;
        private System.Windows.Forms.Label label1;
        private System.Windows.Forms.Label label2;
        private System.Windows.Forms.Label label3;
        private System.Windows.Forms.Label label4;
        private System.Windows.Forms.TextBox cntryTextBox;
        private System.Windows.Forms.TextBox indctrTextBox;
        private System.Windows.Forms.TextBox activeCellPositionBox;
        private System.Windows.Forms.Label label5;
    }
}