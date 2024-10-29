namespace Triangle
{
	partial class Triangle_calculater
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
			this.label1 = new System.Windows.Forms.Label();
			this.calculated_button = new System.Windows.Forms.Button();
			this.button2 = new System.Windows.Forms.Button();
			this.label2 = new System.Windows.Forms.Label();
			this.a_text = new System.Windows.Forms.TextBox();
			this.b_text = new System.Windows.Forms.TextBox();
			this.label3 = new System.Windows.Forms.Label();
			this.c_text = new System.Windows.Forms.TextBox();
			this.label4 = new System.Windows.Forms.Label();
			this.label5 = new System.Windows.Forms.Label();
			this.area_result_text = new System.Windows.Forms.Label();
			this.Reset_button = new System.Windows.Forms.Button();
			this.label6 = new System.Windows.Forms.Label();
			this.label7 = new System.Windows.Forms.Label();
			this.SuspendLayout();
			// 
			// label1
			// 
			this.label1.AutoSize = true;
			this.label1.Font = new System.Drawing.Font("Microsoft JhengHei UI", 19.875F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
			this.label1.Location = new System.Drawing.Point(307, 54);
			this.label1.Name = "label1";
			this.label1.Size = new System.Drawing.Size(440, 134);
			this.label1.TabIndex = 0;
			this.label1.Text = "Triangle \r\nArea calculation";
			this.label1.TextAlign = System.Drawing.ContentAlignment.MiddleCenter;
			this.label1.Click += new System.EventHandler(this.label1_Click);
			// 
			// calculated_button
			// 
			this.calculated_button.Font = new System.Drawing.Font("Microsoft Sans Serif", 13.875F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(222)));
			this.calculated_button.Location = new System.Drawing.Point(160, 523);
			this.calculated_button.Name = "calculated_button";
			this.calculated_button.Size = new System.Drawing.Size(197, 67);
			this.calculated_button.TabIndex = 1;
			this.calculated_button.Text = "Calculate";
			this.calculated_button.UseVisualStyleBackColor = true;
			this.calculated_button.Click += new System.EventHandler(this.calculated_button_Click);
			// 
			// button2
			// 
			this.button2.Font = new System.Drawing.Font("Microsoft Sans Serif", 13.875F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(222)));
			this.button2.Location = new System.Drawing.Point(680, 523);
			this.button2.Name = "button2";
			this.button2.Size = new System.Drawing.Size(197, 67);
			this.button2.TabIndex = 2;
			this.button2.Text = "Exit";
			this.button2.UseVisualStyleBackColor = true;
			this.button2.Click += new System.EventHandler(this.button2_Click);
			// 
			// label2
			// 
			this.label2.AutoSize = true;
			this.label2.Font = new System.Drawing.Font("Microsoft Sans Serif", 13.875F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(222)));
			this.label2.Location = new System.Drawing.Point(108, 238);
			this.label2.Name = "label2";
			this.label2.Size = new System.Drawing.Size(71, 42);
			this.label2.TabIndex = 3;
			this.label2.Text = "a =";
			// 
			// a_text
			// 
			this.a_text.Font = new System.Drawing.Font("Microsoft Sans Serif", 13.875F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(222)));
			this.a_text.Location = new System.Drawing.Point(193, 238);
			this.a_text.Name = "a_text";
			this.a_text.Size = new System.Drawing.Size(164, 49);
			this.a_text.TabIndex = 4;
			// 
			// b_text
			// 
			this.b_text.Font = new System.Drawing.Font("Microsoft Sans Serif", 13.875F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(222)));
			this.b_text.Location = new System.Drawing.Point(193, 327);
			this.b_text.Name = "b_text";
			this.b_text.Size = new System.Drawing.Size(164, 49);
			this.b_text.TabIndex = 6;
			// 
			// label3
			// 
			this.label3.AutoSize = true;
			this.label3.Font = new System.Drawing.Font("Microsoft Sans Serif", 13.875F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(222)));
			this.label3.Location = new System.Drawing.Point(108, 327);
			this.label3.Name = "label3";
			this.label3.Size = new System.Drawing.Size(71, 42);
			this.label3.TabIndex = 5;
			this.label3.Text = "b =";
			this.label3.Click += new System.EventHandler(this.label3_Click);
			// 
			// c_text
			// 
			this.c_text.Font = new System.Drawing.Font("Microsoft Sans Serif", 13.875F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(222)));
			this.c_text.Location = new System.Drawing.Point(193, 416);
			this.c_text.Name = "c_text";
			this.c_text.Size = new System.Drawing.Size(164, 49);
			this.c_text.TabIndex = 8;
			// 
			// label4
			// 
			this.label4.AutoSize = true;
			this.label4.Font = new System.Drawing.Font("Microsoft Sans Serif", 13.875F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(222)));
			this.label4.Location = new System.Drawing.Point(108, 416);
			this.label4.Name = "label4";
			this.label4.Size = new System.Drawing.Size(69, 42);
			this.label4.TabIndex = 7;
			this.label4.Text = "c =";
			// 
			// label5
			// 
			this.label5.AutoSize = true;
			this.label5.Font = new System.Drawing.Font("Microsoft Sans Serif", 16.125F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(222)));
			this.label5.Location = new System.Drawing.Point(459, 233);
			this.label5.Name = "label5";
			this.label5.Size = new System.Drawing.Size(168, 51);
			this.label5.TabIndex = 9;
			this.label5.Text = "Result :";
			// 
			// area_result_text
			// 
			this.area_result_text.AutoSize = true;
			this.area_result_text.Font = new System.Drawing.Font("Microsoft Sans Serif", 16.125F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(222)));
			this.area_result_text.Location = new System.Drawing.Point(520, 284);
			this.area_result_text.Name = "area_result_text";
			this.area_result_text.Size = new System.Drawing.Size(382, 51);
			this.area_result_text.TabIndex = 10;
			this.area_result_text.Text = "..............................";
			this.area_result_text.TextAlign = System.Drawing.ContentAlignment.MiddleLeft;
			// 
			// Reset_button
			// 
			this.Reset_button.Font = new System.Drawing.Font("Microsoft Sans Serif", 13.875F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(222)));
			this.Reset_button.Location = new System.Drawing.Point(420, 523);
			this.Reset_button.Name = "Reset_button";
			this.Reset_button.Size = new System.Drawing.Size(197, 67);
			this.Reset_button.TabIndex = 11;
			this.Reset_button.Text = "Reset";
			this.Reset_button.UseVisualStyleBackColor = true;
			this.Reset_button.Click += new System.EventHandler(this.Reset_button_Click);
			// 
			// label6
			// 
			this.label6.AutoSize = true;
			this.label6.Font = new System.Drawing.Font("Microsoft Sans Serif", 12F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(222)));
			this.label6.Location = new System.Drawing.Point(51, 175);
			this.label6.Name = "label6";
			this.label6.Size = new System.Drawing.Size(0, 37);
			this.label6.TabIndex = 12;
			this.label6.Click += new System.EventHandler(this.label6_Click);
			// 
			// label7
			// 
			this.label7.AutoSize = true;
			this.label7.Location = new System.Drawing.Point(703, 610);
			this.label7.Name = "label7";
			this.label7.Size = new System.Drawing.Size(331, 25);
			this.label7.TabIndex = 13;
			this.label7.Text = "6530182121_Thananop Kullapan";
			// 
			// Triangle_calculater
			// 
			this.AutoScaleDimensions = new System.Drawing.SizeF(12F, 25F);
			this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
			this.BackColor = System.Drawing.Color.PaleTurquoise;
			this.ClientSize = new System.Drawing.Size(1046, 644);
			this.Controls.Add(this.label7);
			this.Controls.Add(this.label6);
			this.Controls.Add(this.Reset_button);
			this.Controls.Add(this.area_result_text);
			this.Controls.Add(this.label5);
			this.Controls.Add(this.c_text);
			this.Controls.Add(this.label4);
			this.Controls.Add(this.b_text);
			this.Controls.Add(this.label3);
			this.Controls.Add(this.a_text);
			this.Controls.Add(this.label2);
			this.Controls.Add(this.button2);
			this.Controls.Add(this.calculated_button);
			this.Controls.Add(this.label1);
			this.Name = "Triangle_calculater";
			this.RightToLeftLayout = true;
			this.Text = "Triangle_calculater";
			this.ResumeLayout(false);
			this.PerformLayout();

		}

		#endregion

		private System.Windows.Forms.Label label1;
		private System.Windows.Forms.Button calculated_button;
		private System.Windows.Forms.Button button2;
		private System.Windows.Forms.Label label2;
		private System.Windows.Forms.TextBox a_text;
		private System.Windows.Forms.TextBox b_text;
		private System.Windows.Forms.Label label3;
		private System.Windows.Forms.TextBox c_text;
		private System.Windows.Forms.Label label4;
		private System.Windows.Forms.Label label5;
		private System.Windows.Forms.Label area_result_text;
		private System.Windows.Forms.Button Reset_button;
		private System.Windows.Forms.Label label6;
		private System.Windows.Forms.Label label7;
	}
}

