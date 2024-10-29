namespace Pi_Estimation_With_Monte_Carlo
{
	partial class Form1
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
			this.Input_Text = new System.Windows.Forms.TextBox();
			this.Estimate_Click = new System.Windows.Forms.Button();
			this.label2 = new System.Windows.Forms.Label();
			this.Pi_Result = new System.Windows.Forms.Label();
			this.label4 = new System.Windows.Forms.Label();
			this.Error_Result = new System.Windows.Forms.Label();
			this.Clear_Click = new System.Windows.Forms.Button();
			this.label3 = new System.Windows.Forms.Label();
			this.SuspendLayout();
			// 
			// label1
			// 
			this.label1.AutoSize = true;
			this.label1.Font = new System.Drawing.Font("Microsoft Sans Serif", 10.875F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(222)));
			this.label1.Location = new System.Drawing.Point(61, 52);
			this.label1.Name = "label1";
			this.label1.Size = new System.Drawing.Size(119, 33);
			this.label1.TabIndex = 1;
			this.label1.Text = "Interval:";
			// 
			// Input_Text
			// 
			this.Input_Text.Font = new System.Drawing.Font("Microsoft Sans Serif", 12F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(222)));
			this.Input_Text.Location = new System.Drawing.Point(200, 47);
			this.Input_Text.Name = "Input_Text";
			this.Input_Text.Size = new System.Drawing.Size(304, 44);
			this.Input_Text.TabIndex = 2;
			// 
			// Estimate_Click
			// 
			this.Estimate_Click.Font = new System.Drawing.Font("Microsoft Sans Serif", 10.125F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(222)));
			this.Estimate_Click.Location = new System.Drawing.Point(200, 107);
			this.Estimate_Click.Name = "Estimate_Click";
			this.Estimate_Click.Size = new System.Drawing.Size(152, 47);
			this.Estimate_Click.TabIndex = 3;
			this.Estimate_Click.Text = "Estimate";
			this.Estimate_Click.UseVisualStyleBackColor = true;
			this.Estimate_Click.Click += new System.EventHandler(this.Estimate_Click_Click);
			// 
			// label2
			// 
			this.label2.AutoSize = true;
			this.label2.Font = new System.Drawing.Font("Microsoft Sans Serif", 10.875F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(222)));
			this.label2.Location = new System.Drawing.Point(60, 173);
			this.label2.Name = "label2";
			this.label2.Size = new System.Drawing.Size(292, 33);
			this.label2.TabIndex = 4;
			this.label2.Text = "The Estimation of Pi :";
			// 
			// Pi_Result
			// 
			this.Pi_Result.AutoSize = true;
			this.Pi_Result.Font = new System.Drawing.Font("Microsoft Sans Serif", 10.125F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(222)));
			this.Pi_Result.Location = new System.Drawing.Point(365, 175);
			this.Pi_Result.Name = "Pi_Result";
			this.Pi_Result.Size = new System.Drawing.Size(66, 31);
			this.Pi_Result.TabIndex = 5;
			this.Pi_Result.Text = "xxxx";
			this.Pi_Result.TextAlign = System.Drawing.ContentAlignment.MiddleLeft;
			// 
			// label4
			// 
			this.label4.AutoSize = true;
			this.label4.Font = new System.Drawing.Font("Microsoft Sans Serif", 10.125F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(222)));
			this.label4.Location = new System.Drawing.Point(60, 233);
			this.label4.Name = "label4";
			this.label4.Size = new System.Drawing.Size(113, 31);
			this.label4.TabIndex = 6;
			this.label4.Text = "%Error :";
			// 
			// Error_Result
			// 
			this.Error_Result.AutoSize = true;
			this.Error_Result.Font = new System.Drawing.Font("Microsoft Sans Serif", 10.125F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(222)));
			this.Error_Result.Location = new System.Drawing.Point(179, 233);
			this.Error_Result.Name = "Error_Result";
			this.Error_Result.Size = new System.Drawing.Size(66, 31);
			this.Error_Result.TabIndex = 7;
			this.Error_Result.Text = "xxxx";
			this.Error_Result.TextAlign = System.Drawing.ContentAlignment.MiddleLeft;
			// 
			// Clear_Click
			// 
			this.Clear_Click.Font = new System.Drawing.Font("Microsoft Sans Serif", 10.125F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(222)));
			this.Clear_Click.Location = new System.Drawing.Point(358, 107);
			this.Clear_Click.Name = "Clear_Click";
			this.Clear_Click.Size = new System.Drawing.Size(146, 47);
			this.Clear_Click.TabIndex = 8;
			this.Clear_Click.Text = "Clear";
			this.Clear_Click.UseVisualStyleBackColor = true;
			this.Clear_Click.Click += new System.EventHandler(this.Clear_Click_Click);
			// 
			// label3
			// 
			this.label3.AutoSize = true;
			this.label3.Font = new System.Drawing.Font("Microsoft Sans Serif", 7.875F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(222)));
			this.label3.Location = new System.Drawing.Point(465, 286);
			this.label3.Name = "label3";
			this.label3.Size = new System.Drawing.Size(175, 25);
			this.label3.TabIndex = 9;
			this.label3.Text = "By : 6530182121";
			// 
			// Form1
			// 
			this.AutoScaleDimensions = new System.Drawing.SizeF(12F, 25F);
			this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
			this.ClientSize = new System.Drawing.Size(652, 320);
			this.Controls.Add(this.label3);
			this.Controls.Add(this.Clear_Click);
			this.Controls.Add(this.Error_Result);
			this.Controls.Add(this.label4);
			this.Controls.Add(this.Pi_Result);
			this.Controls.Add(this.label2);
			this.Controls.Add(this.Estimate_Click);
			this.Controls.Add(this.Input_Text);
			this.Controls.Add(this.label1);
			this.Name = "Form1";
			this.Text = "The Estimation of PI";
			this.ResumeLayout(false);
			this.PerformLayout();

		}

		#endregion
		private System.Windows.Forms.Label label1;
		private System.Windows.Forms.TextBox Input_Text;
		private System.Windows.Forms.Button Estimate_Click;
		private System.Windows.Forms.Label label2;
		private System.Windows.Forms.Label Pi_Result;
		private System.Windows.Forms.Label label4;
		private System.Windows.Forms.Label Error_Result;
		private System.Windows.Forms.Button Clear_Click;
		private System.Windows.Forms.Label label3;
	}
}

