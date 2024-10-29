namespace Forest
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
			this.Center_Picture = new System.Windows.Forms.PictureBox();
			this.Load_picture = new System.Windows.Forms.Button();
			this.openFileDialog1 = new System.Windows.Forms.OpenFileDialog();
			this.saveFileDialog1 = new System.Windows.Forms.SaveFileDialog();
			this.Box_R = new System.Windows.Forms.PictureBox();
			this.Box_G = new System.Windows.Forms.PictureBox();
			this.Box_B = new System.Windows.Forms.PictureBox();
			this.Box_All = new System.Windows.Forms.PictureBox();
			this.label_R = new System.Windows.Forms.Label();
			this.label_G = new System.Windows.Forms.Label();
			this.label_B = new System.Windows.Forms.Label();
			this.Calculate = new System.Windows.Forms.Button();
			this.Save_Picture = new System.Windows.Forms.Button();
			this.label1 = new System.Windows.Forms.Label();
			((System.ComponentModel.ISupportInitialize)(this.Center_Picture)).BeginInit();
			((System.ComponentModel.ISupportInitialize)(this.Box_R)).BeginInit();
			((System.ComponentModel.ISupportInitialize)(this.Box_G)).BeginInit();
			((System.ComponentModel.ISupportInitialize)(this.Box_B)).BeginInit();
			((System.ComponentModel.ISupportInitialize)(this.Box_All)).BeginInit();
			this.SuspendLayout();
			// 
			// Center_Picture
			// 
			this.Center_Picture.BorderStyle = System.Windows.Forms.BorderStyle.FixedSingle;
			this.Center_Picture.Location = new System.Drawing.Point(301, 71);
			this.Center_Picture.Name = "Center_Picture";
			this.Center_Picture.Size = new System.Drawing.Size(739, 700);
			this.Center_Picture.TabIndex = 0;
			this.Center_Picture.TabStop = false;
			this.Center_Picture.MouseMove += new System.Windows.Forms.MouseEventHandler(this.picture_mousemove);
			// 
			// Load_picture
			// 
			this.Load_picture.Font = new System.Drawing.Font("Microsoft Sans Serif", 12F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(222)));
			this.Load_picture.Location = new System.Drawing.Point(42, 71);
			this.Load_picture.Name = "Load_picture";
			this.Load_picture.Size = new System.Drawing.Size(223, 83);
			this.Load_picture.TabIndex = 1;
			this.Load_picture.Text = "Load Picture";
			this.Load_picture.UseVisualStyleBackColor = true;
			this.Load_picture.Click += new System.EventHandler(this.Load_Picture);
			// 
			// openFileDialog1
			// 
			this.openFileDialog1.FileName = "openFileDialog1";
			// 
			// saveFileDialog1
			// 
			this.saveFileDialog1.Filter = "JPEG Image (.jpeg)|*.jpeg";
			// 
			// Box_R
			// 
			this.Box_R.BorderStyle = System.Windows.Forms.BorderStyle.FixedSingle;
			this.Box_R.Location = new System.Drawing.Point(1102, 240);
			this.Box_R.Name = "Box_R";
			this.Box_R.Size = new System.Drawing.Size(130, 128);
			this.Box_R.TabIndex = 2;
			this.Box_R.TabStop = false;
			// 
			// Box_G
			// 
			this.Box_G.BorderStyle = System.Windows.Forms.BorderStyle.FixedSingle;
			this.Box_G.Location = new System.Drawing.Point(1102, 403);
			this.Box_G.Name = "Box_G";
			this.Box_G.Size = new System.Drawing.Size(130, 128);
			this.Box_G.TabIndex = 3;
			this.Box_G.TabStop = false;
			// 
			// Box_B
			// 
			this.Box_B.BorderStyle = System.Windows.Forms.BorderStyle.FixedSingle;
			this.Box_B.Location = new System.Drawing.Point(1102, 567);
			this.Box_B.Name = "Box_B";
			this.Box_B.Size = new System.Drawing.Size(130, 128);
			this.Box_B.TabIndex = 4;
			this.Box_B.TabStop = false;
			// 
			// Box_All
			// 
			this.Box_All.BorderStyle = System.Windows.Forms.BorderStyle.FixedSingle;
			this.Box_All.Location = new System.Drawing.Point(1102, 71);
			this.Box_All.Name = "Box_All";
			this.Box_All.Size = new System.Drawing.Size(130, 128);
			this.Box_All.TabIndex = 5;
			this.Box_All.TabStop = false;
			// 
			// label_R
			// 
			this.label_R.AutoSize = true;
			this.label_R.Font = new System.Drawing.Font("Microsoft Sans Serif", 10.125F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(222)));
			this.label_R.ForeColor = System.Drawing.SystemColors.Control;
			this.label_R.Location = new System.Drawing.Point(1255, 296);
			this.label_R.Name = "label_R";
			this.label_R.Size = new System.Drawing.Size(29, 31);
			this.label_R.TabIndex = 6;
			this.label_R.Text = "0";
			// 
			// label_G
			// 
			this.label_G.AutoSize = true;
			this.label_G.Font = new System.Drawing.Font("Microsoft Sans Serif", 10.125F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(222)));
			this.label_G.ForeColor = System.Drawing.SystemColors.Control;
			this.label_G.Location = new System.Drawing.Point(1255, 453);
			this.label_G.Name = "label_G";
			this.label_G.Size = new System.Drawing.Size(29, 31);
			this.label_G.TabIndex = 7;
			this.label_G.Text = "0";
			// 
			// label_B
			// 
			this.label_B.AutoSize = true;
			this.label_B.Font = new System.Drawing.Font("Microsoft Sans Serif", 10.125F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(222)));
			this.label_B.ForeColor = System.Drawing.SystemColors.Control;
			this.label_B.Location = new System.Drawing.Point(1255, 622);
			this.label_B.Name = "label_B";
			this.label_B.Size = new System.Drawing.Size(29, 31);
			this.label_B.TabIndex = 8;
			this.label_B.Text = "0";
			// 
			// Calculate
			// 
			this.Calculate.Font = new System.Drawing.Font("Microsoft Sans Serif", 12F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(222)));
			this.Calculate.Location = new System.Drawing.Point(42, 198);
			this.Calculate.Name = "Calculate";
			this.Calculate.Size = new System.Drawing.Size(223, 92);
			this.Calculate.TabIndex = 9;
			this.Calculate.Text = "Calculate Green Area";
			this.Calculate.UseVisualStyleBackColor = true;
			this.Calculate.Click += new System.EventHandler(this.calculate_Green_Area);
			// 
			// Save_Picture
			// 
			this.Save_Picture.Font = new System.Drawing.Font("Microsoft Sans Serif", 12F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(222)));
			this.Save_Picture.Location = new System.Drawing.Point(42, 679);
			this.Save_Picture.Name = "Save_Picture";
			this.Save_Picture.Size = new System.Drawing.Size(223, 92);
			this.Save_Picture.TabIndex = 10;
			this.Save_Picture.Text = "Save Picture";
			this.Save_Picture.UseVisualStyleBackColor = true;
			this.Save_Picture.Click += new System.EventHandler(this.Save_Click);
			// 
			// label1
			// 
			this.label1.AutoSize = true;
			this.label1.BackColor = System.Drawing.Color.Transparent;
			this.label1.Font = new System.Drawing.Font("Microsoft Sans Serif", 25.875F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(222)));
			this.label1.Location = new System.Drawing.Point(28, 343);
			this.label1.Name = "label1";
			this.label1.Size = new System.Drawing.Size(228, 79);
			this.label1.TabIndex = 11;
			this.label1.Text = "0.00%";
			// 
			// Form1
			// 
			this.AutoScaleDimensions = new System.Drawing.SizeF(12F, 25F);
			this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
			this.ClientSize = new System.Drawing.Size(1366, 814);
			this.Controls.Add(this.label1);
			this.Controls.Add(this.Save_Picture);
			this.Controls.Add(this.Calculate);
			this.Controls.Add(this.label_B);
			this.Controls.Add(this.label_G);
			this.Controls.Add(this.label_R);
			this.Controls.Add(this.Box_All);
			this.Controls.Add(this.Box_B);
			this.Controls.Add(this.Box_G);
			this.Controls.Add(this.Box_R);
			this.Controls.Add(this.Load_picture);
			this.Controls.Add(this.Center_Picture);
			this.Name = "Form1";
			this.Text = "Calculate Green Area";
			((System.ComponentModel.ISupportInitialize)(this.Center_Picture)).EndInit();
			((System.ComponentModel.ISupportInitialize)(this.Box_R)).EndInit();
			((System.ComponentModel.ISupportInitialize)(this.Box_G)).EndInit();
			((System.ComponentModel.ISupportInitialize)(this.Box_B)).EndInit();
			((System.ComponentModel.ISupportInitialize)(this.Box_All)).EndInit();
			this.ResumeLayout(false);
			this.PerformLayout();

		}

		#endregion

		private System.Windows.Forms.PictureBox Center_Picture;
		private System.Windows.Forms.Button Load_picture;
		private System.Windows.Forms.OpenFileDialog openFileDialog1;
		private System.Windows.Forms.SaveFileDialog saveFileDialog1;
		private System.Windows.Forms.PictureBox Box_R;
		private System.Windows.Forms.PictureBox Box_G;
		private System.Windows.Forms.PictureBox Box_B;
		private System.Windows.Forms.PictureBox Box_All;
		private System.Windows.Forms.Label label_R;
		private System.Windows.Forms.Label label_G;
		private System.Windows.Forms.Label label_B;
		private System.Windows.Forms.Button Calculate;
		private System.Windows.Forms.Button Save_Picture;
		private System.Windows.Forms.Label label1;
	}
}

