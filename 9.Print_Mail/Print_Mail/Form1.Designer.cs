namespace Print_Mail
{
    partial class Default_Form
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
			System.ComponentModel.ComponentResourceManager resources = new System.ComponentModel.ComponentResourceManager(typeof(Default_Form));
			this.printDocument1 = new System.Drawing.Printing.PrintDocument();
			this.Load_Name = new System.Windows.Forms.Button();
			this.button1 = new System.Windows.Forms.Button();
			this.button2 = new System.Windows.Forms.Button();
			this.label1 = new System.Windows.Forms.Label();
			this.No_of_File = new System.Windows.Forms.Label();
			this.openFileDialog1 = new System.Windows.Forms.OpenFileDialog();
			this.Data_All = new System.Windows.Forms.TextBox();
			this.choose_no = new System.Windows.Forms.TextBox();
			this.label2 = new System.Windows.Forms.Label();
			this.label3 = new System.Windows.Forms.Label();
			this.label4 = new System.Windows.Forms.Label();
			this.SuspendLayout();
			// 
			// Load_Name
			// 
			this.Load_Name.Location = new System.Drawing.Point(88, 150);
			this.Load_Name.Margin = new System.Windows.Forms.Padding(6);
			this.Load_Name.Name = "Load_Name";
			this.Load_Name.Size = new System.Drawing.Size(204, 69);
			this.Load_Name.TabIndex = 1;
			this.Load_Name.Text = "Open File_csv";
			this.Load_Name.UseVisualStyleBackColor = true;
			this.Load_Name.Click += new System.EventHandler(this.OPEN_CSV);
			// 
			// button1
			// 
			this.button1.Location = new System.Drawing.Point(354, 150);
			this.button1.Margin = new System.Windows.Forms.Padding(6);
			this.button1.Name = "button1";
			this.button1.Size = new System.Drawing.Size(204, 69);
			this.button1.TabIndex = 2;
			this.button1.Text = "See File PDF";
			this.button1.UseVisualStyleBackColor = true;
			this.button1.Click += new System.EventHandler(this.Save_File_PDF);
			// 
			// button2
			// 
			this.button2.Location = new System.Drawing.Point(624, 150);
			this.button2.Margin = new System.Windows.Forms.Padding(6);
			this.button2.Name = "button2";
			this.button2.Size = new System.Drawing.Size(204, 69);
			this.button2.TabIndex = 3;
			this.button2.Text = "Example_Form";
			this.button2.UseVisualStyleBackColor = true;
			this.button2.Click += new System.EventHandler(this.Example_Click);
			// 
			// label1
			// 
			this.label1.AutoSize = true;
			this.label1.Font = new System.Drawing.Font("Microsoft Sans Serif", 11.25F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(222)));
			this.label1.Location = new System.Drawing.Point(630, 241);
			this.label1.Margin = new System.Windows.Forms.Padding(6, 0, 6, 0);
			this.label1.Name = "label1";
			this.label1.Size = new System.Drawing.Size(145, 36);
			this.label1.TabIndex = 4;
			this.label1.Text = "Total File:";
			// 
			// No_of_File
			// 
			this.No_of_File.AutoSize = true;
			this.No_of_File.Font = new System.Drawing.Font("Microsoft Sans Serif", 11.25F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(222)));
			this.No_of_File.Location = new System.Drawing.Point(786, 241);
			this.No_of_File.Margin = new System.Windows.Forms.Padding(6, 0, 6, 0);
			this.No_of_File.Name = "No_of_File";
			this.No_of_File.Size = new System.Drawing.Size(32, 36);
			this.No_of_File.TabIndex = 5;
			this.No_of_File.Text = "0";
			// 
			// openFileDialog1
			// 
			this.openFileDialog1.FileName = "openFileDialog1";
			// 
			// Data_All
			// 
			this.Data_All.Font = new System.Drawing.Font("Microsoft Sans Serif", 12F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(222)));
			this.Data_All.Location = new System.Drawing.Point(52, 308);
			this.Data_All.Margin = new System.Windows.Forms.Padding(6);
			this.Data_All.Multiline = true;
			this.Data_All.Name = "Data_All";
			this.Data_All.Size = new System.Drawing.Size(470, 442);
			this.Data_All.TabIndex = 6;
			// 
			// choose_no
			// 
			this.choose_no.Font = new System.Drawing.Font("Microsoft Sans Serif", 10.875F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(222)));
			this.choose_no.Location = new System.Drawing.Point(433, 241);
			this.choose_no.Margin = new System.Windows.Forms.Padding(6);
			this.choose_no.Name = "choose_no";
			this.choose_no.Size = new System.Drawing.Size(125, 40);
			this.choose_no.TabIndex = 7;
			// 
			// label2
			// 
			this.label2.AutoSize = true;
			this.label2.Font = new System.Drawing.Font("Microsoft Sans Serif", 11.25F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(222)));
			this.label2.Location = new System.Drawing.Point(236, 241);
			this.label2.Margin = new System.Windows.Forms.Padding(6, 0, 6, 0);
			this.label2.Name = "label2";
			this.label2.Size = new System.Drawing.Size(173, 36);
			this.label2.TabIndex = 8;
			this.label2.Text = "Choose No:";
			// 
			// label3
			// 
			this.label3.AutoSize = true;
			this.label3.Location = new System.Drawing.Point(545, 440);
			this.label3.Name = "label3";
			this.label3.Size = new System.Drawing.Size(371, 300);
			this.label3.TabIndex = 9;
			this.label3.Text = resources.GetString("label3.Text");
			// 
			// label4
			// 
			this.label4.AutoSize = true;
			this.label4.Font = new System.Drawing.Font("Microsoft Sans Serif", 18F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(222)));
			this.label4.Location = new System.Drawing.Point(232, 59);
			this.label4.Name = "label4";
			this.label4.Size = new System.Drawing.Size(455, 55);
			this.label4.TabIndex = 10;
			this.label4.Text = "HW5 : PRINT MAIL";
			// 
			// Default_Form
			// 
			this.AutoScaleDimensions = new System.Drawing.SizeF(12F, 25F);
			this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
			this.ClientSize = new System.Drawing.Size(928, 808);
			this.Controls.Add(this.label4);
			this.Controls.Add(this.label3);
			this.Controls.Add(this.label2);
			this.Controls.Add(this.choose_no);
			this.Controls.Add(this.Data_All);
			this.Controls.Add(this.No_of_File);
			this.Controls.Add(this.label1);
			this.Controls.Add(this.button2);
			this.Controls.Add(this.button1);
			this.Controls.Add(this.Load_Name);
			this.Margin = new System.Windows.Forms.Padding(6);
			this.Name = "Default_Form";
			this.Text = "Print_Mail";
			this.ResumeLayout(false);
			this.PerformLayout();

        }

        #endregion

        private System.Drawing.Printing.PrintDocument printDocument1;
        private System.Windows.Forms.Button Load_Name;
        private System.Windows.Forms.Button button1;
        private System.Windows.Forms.Button button2;
        private System.Windows.Forms.Label label1;
        private System.Windows.Forms.Label No_of_File;
        private System.Windows.Forms.OpenFileDialog openFileDialog1;
        private System.Windows.Forms.TextBox Data_All;
        private System.Windows.Forms.TextBox choose_no;
		private System.Windows.Forms.Label label2;
		private System.Windows.Forms.Label label3;
		private System.Windows.Forms.Label label4;
	}
}

