using System;

namespace TE
{
    partial class SearchEngine
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
            this.search = new System.Windows.Forms.TextBox();
            this.searchResults = new System.Windows.Forms.ListBox();
            this.filterResults = new System.Windows.Forms.CheckedListBox();
            this.searchBtn = new System.Windows.Forms.Button();
            this.getDataBtn = new System.Windows.Forms.Button();
            this.label1 = new System.Windows.Forms.Label();
            this.firstPage = new System.Windows.Forms.Button();
            this.previousPage = new System.Windows.Forms.Button();
            this.nextPage = new System.Windows.Forms.Button();
            this.lastPage = new System.Windows.Forms.Button();
            this.pageBox = new System.Windows.Forms.TextBox();
            this.SuspendLayout();
            // 
            // search
            // 
            this.search.BorderStyle = System.Windows.Forms.BorderStyle.None;
            this.search.Location = new System.Drawing.Point(13, 13);
            this.search.Margin = new System.Windows.Forms.Padding(4);
            this.search.Name = "search";
            this.search.AutoSize = false;
            this.search.Size = new System.Drawing.Size(795, 17);
            this.search.TabIndex = 1;
            // 
            // searchResults
            // 
            this.searchResults.BorderStyle = System.Windows.Forms.BorderStyle.None;
            this.searchResults.Font = new System.Drawing.Font("Microsoft Sans Serif", 9.75F);
            this.searchResults.FormattingEnabled = true;
            this.searchResults.ItemHeight = 16;
            this.searchResults.Location = new System.Drawing.Point(212, 54);
            this.searchResults.Margin = new System.Windows.Forms.Padding(4);
            this.searchResults.Name = "searchResults";
            this.searchResults.Size = new System.Drawing.Size(703, 336);
            this.searchResults.TabIndex = 3;
            // 
            // filterResults
            // 
            this.filterResults.BorderStyle = System.Windows.Forms.BorderStyle.None;
            this.filterResults.CheckOnClick = true;
            this.filterResults.Font = new System.Drawing.Font("Microsoft Sans Serif", 9.75F);
            this.filterResults.FormattingEnabled = true;
            this.filterResults.Location = new System.Drawing.Point(13, 54);
            this.filterResults.Margin = new System.Windows.Forms.Padding(4);
            this.filterResults.Name = "filterResults";
            this.filterResults.Size = new System.Drawing.Size(191, 357);
            this.filterResults.Sorted = true;
            this.filterResults.TabIndex = 5;
            this.filterResults.SelectedIndexChanged += new System.EventHandler(this.filterResults_SelectedIndexChanged);
            // 
            // searchBtn
            // 
            this.searchBtn.FlatStyle = System.Windows.Forms.FlatStyle.Flat;
            this.searchBtn.Location = new System.Drawing.Point(816, 13);
            this.searchBtn.Margin = new System.Windows.Forms.Padding(4);
            this.searchBtn.Name = "searchBtn";
            this.searchBtn.Size = new System.Drawing.Size(99, 31);
            this.searchBtn.TabIndex = 2;
            this.searchBtn.Text = "Search";
            this.searchBtn.UseVisualStyleBackColor = true;
            this.searchBtn.Click += new System.EventHandler(this.searchBtn_Click);
            // 
            // getDataBtn
            // 
            this.getDataBtn.Enabled = false;
            this.getDataBtn.FlatStyle = System.Windows.Forms.FlatStyle.Flat;
            this.getDataBtn.Location = new System.Drawing.Point(816, 429);
            this.getDataBtn.Margin = new System.Windows.Forms.Padding(4);
            this.getDataBtn.Name = "getDataBtn";
            this.getDataBtn.Size = new System.Drawing.Size(99, 31);
            this.getDataBtn.TabIndex = 4;
            this.getDataBtn.Text = "OK";
            this.getDataBtn.UseVisualStyleBackColor = true;
            this.getDataBtn.Click += new System.EventHandler(this.getDataBtn_Click);
            // 
            // label1
            // 
            this.label1.AutoSize = true;
            this.label1.Location = new System.Drawing.Point(10, 34);
            this.label1.Margin = new System.Windows.Forms.Padding(4, 0, 4, 0);
            this.label1.Name = "label1";
            this.label1.Size = new System.Drawing.Size(58, 16);
            this.label1.TabIndex = 6;
            this.label1.Text = "Filter by:";
            // 
            // firstPage
            // 
            this.firstPage.Enabled = false;
            this.firstPage.FlatStyle = System.Windows.Forms.FlatStyle.Flat;
            this.firstPage.Location = new System.Drawing.Point(721, 397);
            this.firstPage.Name = "firstPage";
            this.firstPage.Size = new System.Drawing.Size(30, 25);
            this.firstPage.TabIndex = 7;
            this.firstPage.Text = "|<";
            this.firstPage.UseVisualStyleBackColor = true;
            this.firstPage.Click += new System.EventHandler(this.firstPage_Click);
            // 
            // previousPage
            // 
            this.previousPage.Enabled = false;
            this.previousPage.FlatStyle = System.Windows.Forms.FlatStyle.Flat;
            this.previousPage.Location = new System.Drawing.Point(757, 397);
            this.previousPage.Name = "previousPage";
            this.previousPage.Size = new System.Drawing.Size(30, 25);
            this.previousPage.TabIndex = 8;
            this.previousPage.Text = "<";
            this.previousPage.UseVisualStyleBackColor = true;
            this.previousPage.Click += new System.EventHandler(this.previousPage_Click);
            // 
            // nextPage
            // 
            this.nextPage.Enabled = false;
            this.nextPage.FlatStyle = System.Windows.Forms.FlatStyle.Flat;
            this.nextPage.Location = new System.Drawing.Point(849, 397);
            this.nextPage.Name = "nextPage";
            this.nextPage.Size = new System.Drawing.Size(30, 25);
            this.nextPage.TabIndex = 9;
            this.nextPage.Text = ">";
            this.nextPage.UseVisualStyleBackColor = true;
            this.nextPage.Click += new System.EventHandler(this.nextPage_Click);
            // 
            // lastPage
            // 
            this.lastPage.Enabled = false;
            this.lastPage.FlatStyle = System.Windows.Forms.FlatStyle.Flat;
            this.lastPage.Location = new System.Drawing.Point(885, 397);
            this.lastPage.Name = "lastPage";
            this.lastPage.Size = new System.Drawing.Size(30, 25);
            this.lastPage.TabIndex = 10;
            this.lastPage.Text = ">|";
            this.lastPage.UseVisualStyleBackColor = true;
            this.lastPage.Click += new System.EventHandler(this.lastPage_Click);
            // 
            // pageBox
            // 
            this.pageBox.BorderStyle = System.Windows.Forms.BorderStyle.FixedSingle;
            this.pageBox.Enabled = false;
            this.pageBox.Location = new System.Drawing.Point(793, 397);
            this.pageBox.MaximumSize = new System.Drawing.Size(50, 25);
            this.pageBox.MinimumSize = new System.Drawing.Size(50, 25);
            this.pageBox.Name = "pageBox";
            this.pageBox.AutoSize = false;
            this.pageBox.Size = new System.Drawing.Size(50, 25);
            this.pageBox.TabIndex = 11;
            // 
            // SearchEngine
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(8F, 16F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.ClientSize = new System.Drawing.Size(926, 470);
            this.Controls.Add(this.pageBox);
            this.Controls.Add(this.lastPage);
            this.Controls.Add(this.nextPage);
            this.Controls.Add(this.previousPage);
            this.Controls.Add(this.firstPage);
            this.Controls.Add(this.label1);
            this.Controls.Add(this.getDataBtn);
            this.Controls.Add(this.searchBtn);
            this.Controls.Add(this.filterResults);
            this.Controls.Add(this.searchResults);
            this.Controls.Add(this.search);
            this.Font = new System.Drawing.Font("Microsoft Sans Serif", 9.75F);
            this.FormBorderStyle = System.Windows.Forms.FormBorderStyle.FixedSingle;
            this.Margin = new System.Windows.Forms.Padding(4);
            this.MaximizeBox = false;
            this.MinimizeBox = false;
            this.Name = "SearchEngine";
            this.ShowIcon = false;
            this.ResumeLayout(false);
            this.PerformLayout();

        }

        private void filterResults_ItemCheck(object sender, EventArgs e)
        {
            throw new NotImplementedException();
        }

        #endregion
        private System.Windows.Forms.TextBox search;
        private System.Windows.Forms.ListBox searchResults;
        private System.Windows.Forms.CheckedListBox filterResults;
        private System.Windows.Forms.Button searchBtn;
        private System.Windows.Forms.Button getDataBtn;
        private System.Windows.Forms.Label label1;
        private System.Windows.Forms.Button firstPage;
        private System.Windows.Forms.Button previousPage;
        private System.Windows.Forms.Button nextPage;
        private System.Windows.Forms.Button lastPage;
        private System.Windows.Forms.TextBox pageBox;
    }
}