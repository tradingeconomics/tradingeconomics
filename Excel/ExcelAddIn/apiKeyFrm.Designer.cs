namespace testClassLib
{
    partial class apiKeyFrm
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
            this.apiKeyTextBox = new System.Windows.Forms.TextBox();
            this.btnOK = new System.Windows.Forms.Button();
            this.btnCancel = new System.Windows.Forms.Button();
            this.label1 = new System.Windows.Forms.Label();
            this.btnGetKey = new System.Windows.Forms.Button();
            this.lblGetKey = new System.Windows.Forms.Label();
            this.SuspendLayout();
            // 
            // apiKeyTextBox
            // 
            this.apiKeyTextBox.Anchor = ((System.Windows.Forms.AnchorStyles)((((System.Windows.Forms.AnchorStyles.Top | System.Windows.Forms.AnchorStyles.Bottom) 
            | System.Windows.Forms.AnchorStyles.Left) 
            | System.Windows.Forms.AnchorStyles.Right)));
            this.apiKeyTextBox.BorderStyle = System.Windows.Forms.BorderStyle.None;
            this.apiKeyTextBox.Font = new System.Drawing.Font("Microsoft Sans Serif", 9.75F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.apiKeyTextBox.Location = new System.Drawing.Point(61, 55);
            this.apiKeyTextBox.Margin = new System.Windows.Forms.Padding(4, 5, 4, 5);
            this.apiKeyTextBox.Name = "apiKeyTextBox";
            this.apiKeyTextBox.Size = new System.Drawing.Size(402, 39);
            this.apiKeyTextBox.TabIndex = 0;
            this.apiKeyTextBox.Text = "\r\n";
            this.apiKeyTextBox.TextAlign = System.Windows.Forms.HorizontalAlignment.Center;
            this.apiKeyTextBox.TextChanged += new System.EventHandler(this.apiKeyTextBox_TextChanged);
            this.apiKeyTextBox.AutoSize = false;
            // 
            // btnOK
            // 
            this.btnOK.BackColor = System.Drawing.Color.White;
            this.btnOK.FlatAppearance.BorderSize = 0;
            this.btnOK.FlatStyle = System.Windows.Forms.FlatStyle.Flat;
            this.btnOK.Font = new System.Drawing.Font("Microsoft Sans Serif", 12F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.btnOK.Location = new System.Drawing.Point(475, 55);
            this.btnOK.Margin = new System.Windows.Forms.Padding(4, 5, 4, 5);
            this.btnOK.Name = "btnOK";
            this.btnOK.Size = new System.Drawing.Size(112, 39);
            this.btnOK.TabIndex = 1;
            this.btnOK.TabStop = false;
            this.btnOK.Text = "Submit";
            this.btnOK.UseVisualStyleBackColor = false;
            this.btnOK.Click += new System.EventHandler(this.btnOK_Click);
            // 
            // btnCancel
            // 
            this.btnCancel.DialogResult = System.Windows.Forms.DialogResult.Cancel;
            this.btnCancel.FlatStyle = System.Windows.Forms.FlatStyle.Flat;
            this.btnCancel.Font = new System.Drawing.Font("Microsoft Sans Serif", 9F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.btnCancel.Location = new System.Drawing.Point(350, 366);
            this.btnCancel.Margin = new System.Windows.Forms.Padding(4, 5, 4, 5);
            this.btnCancel.Name = "btnCancel";
            this.btnCancel.Size = new System.Drawing.Size(112, 39);
            this.btnCancel.TabIndex = 2;
            this.btnCancel.Text = "Cancel";
            this.btnCancel.UseVisualStyleBackColor = true;
            this.btnCancel.Visible = false;
            this.btnCancel.Click += new System.EventHandler(this.btnCancel_Click);
            // 
            // label1
            // 
            this.label1.AutoSize = true;
            this.label1.Font = new System.Drawing.Font("Microsoft Sans Serif", 12F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.label1.Location = new System.Drawing.Point(57, 99);
            this.label1.Margin = new System.Windows.Forms.Padding(4, 0, 4, 0);
            this.label1.Name = "label1";
            this.label1.Size = new System.Drawing.Size(285, 20);
            this.label1.TabIndex = 3;
            this.label1.Text = "Leave blank to use with limited access .";
            // 
            // btnGetKey
            // 
            this.btnGetKey.BackColor = System.Drawing.Color.White;
            this.btnGetKey.FlatStyle = System.Windows.Forms.FlatStyle.Flat;
            this.btnGetKey.Location = new System.Drawing.Point(475, 166);
            this.btnGetKey.Margin = new System.Windows.Forms.Padding(3, 4, 3, 4);
            this.btnGetKey.Name = "btnGetKey";
            this.btnGetKey.Size = new System.Drawing.Size(112, 40);
            this.btnGetKey.TabIndex = 4;
            this.btnGetKey.Text = "Get Key";
            this.btnGetKey.UseVisualStyleBackColor = false;
            this.btnGetKey.Click += new System.EventHandler(this.btnGetKey_Click);
            // 
            // lblGetKey
            // 
            this.lblGetKey.AutoSize = true;
            this.lblGetKey.ForeColor = System.Drawing.SystemColors.ControlText;
            this.lblGetKey.Location = new System.Drawing.Point(57, 176);
            this.lblGetKey.Name = "lblGetKey";
            this.lblGetKey.Size = new System.Drawing.Size(381, 20);
            this.lblGetKey.TabIndex = 5;
            this.lblGetKey.Text = "To get your personal key just click on Get Key button.";
            // 
            // apiKeyFrm
            // 
            this.AcceptButton = this.btnOK;
            this.AutoScaleDimensions = new System.Drawing.SizeF(9F, 20F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.BackColor = System.Drawing.SystemColors.Control;
            this.CancelButton = this.btnCancel;
            this.ClientSize = new System.Drawing.Size(652, 265);
            this.Controls.Add(this.lblGetKey);
            this.Controls.Add(this.btnGetKey);
            this.Controls.Add(this.label1);
            this.Controls.Add(this.btnCancel);
            this.Controls.Add(this.btnOK);
            this.Controls.Add(this.apiKeyTextBox);
            this.Font = new System.Drawing.Font("Microsoft Sans Serif", 12F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.FormBorderStyle = System.Windows.Forms.FormBorderStyle.FixedSingle;
            this.Margin = new System.Windows.Forms.Padding(4, 5, 4, 5);
            this.MaximizeBox = false;
            this.MinimizeBox = false;
            this.Name = "apiKeyFrm";
            this.ShowIcon = false;
            this.StartPosition = System.Windows.Forms.FormStartPosition.CenterScreen;
            this.Text = "Insert API Key";
            this.ResumeLayout(false);
            this.PerformLayout();

        }

        #endregion

        private System.Windows.Forms.TextBox apiKeyTextBox;
        private System.Windows.Forms.Button btnOK;
        private System.Windows.Forms.Button btnCancel;
        private System.Windows.Forms.Label label1;
        private System.Windows.Forms.Button btnGetKey;
        private System.Windows.Forms.Label lblGetKey;
    }
}