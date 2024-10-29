namespace Balloon
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
			this.components = new System.ComponentModel.Container();
			this.button1 = new System.Windows.Forms.Button();
			this.button2 = new System.Windows.Forms.Button();
			this.timer1 = new System.Windows.Forms.Timer(this.components);
			this.pictureBox1 = new System.Windows.Forms.PictureBox();
			this.button3 = new System.Windows.Forms.Button();
			this.button4 = new System.Windows.Forms.Button();
			this.label1 = new System.Windows.Forms.Label();
			this.clock = new System.Windows.Forms.Label();
			this.label2 = new System.Windows.Forms.Label();
			this.button5 = new System.Windows.Forms.Button();
			this.button6 = new System.Windows.Forms.Button();
			((System.ComponentModel.ISupportInitialize)(this.pictureBox1)).BeginInit();
			this.SuspendLayout();
			// 
			// button1
			// 
			this.button1.Font = new System.Drawing.Font("Microsoft Sans Serif", 12F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(222)));
			this.button1.Location = new System.Drawing.Point(51, 51);
			this.button1.Name = "button1";
			this.button1.Size = new System.Drawing.Size(143, 66);
			this.button1.TabIndex = 0;
			this.button1.Text = "Start";
			this.button1.UseVisualStyleBackColor = true;
			this.button1.Click += new System.EventHandler(this.start_click);
			// 
			// button2
			// 
			this.button2.Font = new System.Drawing.Font("Microsoft Sans Serif", 12F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(222)));
			this.button2.Location = new System.Drawing.Point(51, 139);
			this.button2.Name = "button2";
			this.button2.Size = new System.Drawing.Size(143, 66);
			this.button2.TabIndex = 1;
			this.button2.Text = "Stop";
			this.button2.UseVisualStyleBackColor = true;
			this.button2.Click += new System.EventHandler(this.stop_click);
			// 
			// timer1
			// 
			this.timer1.Tick += new System.EventHandler(this.timer1_Tick);
			// 
			// pictureBox1
			// 
			this.pictureBox1.BackColor = System.Drawing.SystemColors.ButtonHighlight;
			this.pictureBox1.BorderStyle = System.Windows.Forms.BorderStyle.FixedSingle;
			this.pictureBox1.Location = new System.Drawing.Point(258, 51);
			this.pictureBox1.Name = "pictureBox1";
			this.pictureBox1.Size = new System.Drawing.Size(677, 558);
			this.pictureBox1.TabIndex = 2;
			this.pictureBox1.TabStop = false;
			this.pictureBox1.Paint += new System.Windows.Forms.PaintEventHandler(this.pictureBox1_Paint);
			// 
			// button3
			// 
			this.button3.Font = new System.Drawing.Font("Microsoft Sans Serif", 12F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(222)));
			this.button3.Location = new System.Drawing.Point(51, 285);
			this.button3.Name = "button3";
			this.button3.Size = new System.Drawing.Size(143, 55);
			this.button3.TabIndex = 3;
			this.button3.Text = "Up";
			this.button3.UseVisualStyleBackColor = true;
			this.button3.Click += new System.EventHandler(this.up_Vx_click);
			// 
			// button4
			// 
			this.button4.Font = new System.Drawing.Font("Microsoft Sans Serif", 12F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(222)));
			this.button4.Location = new System.Drawing.Point(51, 351);
			this.button4.Name = "button4";
			this.button4.Size = new System.Drawing.Size(143, 55);
			this.button4.TabIndex = 4;
			this.button4.Text = "Down";
			this.button4.UseVisualStyleBackColor = true;
			this.button4.Click += new System.EventHandler(this.down_Vx_click);
			// 
			// label1
			// 
			this.label1.AutoSize = true;
			this.label1.Font = new System.Drawing.Font("Microsoft Sans Serif", 12F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(222)));
			this.label1.Location = new System.Drawing.Point(89, 232);
			this.label1.Name = "label1";
			this.label1.Size = new System.Drawing.Size(72, 37);
			this.label1.TabIndex = 5;
			this.label1.Text = "V_x";
			this.label1.TextAlign = System.Drawing.ContentAlignment.TopCenter;
			// 
			// clock
			// 
			this.clock.AutoSize = true;
			this.clock.Font = new System.Drawing.Font("Microsoft Sans Serif", 12F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(222)));
			this.clock.Location = new System.Drawing.Point(819, 628);
			this.clock.Name = "clock";
			this.clock.Size = new System.Drawing.Size(62, 37);
			this.clock.TabIndex = 6;
			this.clock.Text = "0.0";
			// 
			// label2
			// 
			this.label2.AutoSize = true;
			this.label2.Font = new System.Drawing.Font("Microsoft Sans Serif", 12F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(222)));
			this.label2.Location = new System.Drawing.Point(89, 437);
			this.label2.Name = "label2";
			this.label2.Size = new System.Drawing.Size(72, 37);
			this.label2.TabIndex = 9;
			this.label2.Text = "V_y";
			this.label2.TextAlign = System.Drawing.ContentAlignment.TopCenter;
			// 
			// button5
			// 
			this.button5.Font = new System.Drawing.Font("Microsoft Sans Serif", 12F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(222)));
			this.button5.Location = new System.Drawing.Point(60, 553);
			this.button5.Name = "button5";
			this.button5.Size = new System.Drawing.Size(143, 55);
			this.button5.TabIndex = 8;
			this.button5.Text = "Down";
			this.button5.UseVisualStyleBackColor = true;
			this.button5.Click += new System.EventHandler(this.down_Vy_click);
			// 
			// button6
			// 
			this.button6.Font = new System.Drawing.Font("Microsoft Sans Serif", 12F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(222)));
			this.button6.Location = new System.Drawing.Point(60, 487);
			this.button6.Name = "button6";
			this.button6.Size = new System.Drawing.Size(143, 55);
			this.button6.TabIndex = 7;
			this.button6.Text = "Up";
			this.button6.UseVisualStyleBackColor = true;
			this.button6.Click += new System.EventHandler(this.up_Vy_click);
			// 
			// Form1
			// 
			this.AutoScaleDimensions = new System.Drawing.SizeF(12F, 25F);
			this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
			this.BackColor = System.Drawing.Color.SkyBlue;
			this.ClientSize = new System.Drawing.Size(991, 688);
			this.Controls.Add(this.label2);
			this.Controls.Add(this.button5);
			this.Controls.Add(this.button6);
			this.Controls.Add(this.clock);
			this.Controls.Add(this.label1);
			this.Controls.Add(this.button4);
			this.Controls.Add(this.button3);
			this.Controls.Add(this.pictureBox1);
			this.Controls.Add(this.button2);
			this.Controls.Add(this.button1);
			this.Name = "Form1";
			this.Text = "Balloon";
			((System.ComponentModel.ISupportInitialize)(this.pictureBox1)).EndInit();
			this.ResumeLayout(false);
			this.PerformLayout();

		}

		#endregion

		private System.Windows.Forms.Button button1;
		private System.Windows.Forms.Button button2;
		private System.Windows.Forms.Timer timer1;
		private System.Windows.Forms.PictureBox pictureBox1;
		private System.Windows.Forms.Button button3;
		private System.Windows.Forms.Button button4;
		private System.Windows.Forms.Label label1;
		private System.Windows.Forms.Label clock;
		private System.Windows.Forms.Label label2;
		private System.Windows.Forms.Button button5;
		private System.Windows.Forms.Button button6;
	}
}

