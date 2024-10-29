namespace _APP_DEV_PROJECT__CAFE
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
			System.ComponentModel.ComponentResourceManager resources = new System.ComponentModel.ComponentResourceManager(typeof(Form1));
			this.LinkLabel = new System.Windows.Forms.LinkLabel();
			this.Login_Button = new System.Windows.Forms.Button();
			this.label2 = new System.Windows.Forms.Label();
			this.password_textbox = new System.Windows.Forms.TextBox();
			this.label1 = new System.Windows.Forms.Label();
			this.username_textbox = new System.Windows.Forms.TextBox();
			this.pictureBox1 = new System.Windows.Forms.PictureBox();
			this.pictureBox2 = new System.Windows.Forms.PictureBox();
			((System.ComponentModel.ISupportInitialize)(this.pictureBox1)).BeginInit();
			((System.ComponentModel.ISupportInitialize)(this.pictureBox2)).BeginInit();
			this.SuspendLayout();
			// 
			// LinkLabel
			// 
			this.LinkLabel.AutoSize = true;
			this.LinkLabel.Font = new System.Drawing.Font("Comic Sans MS", 10.875F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
			this.LinkLabel.LinkColor = System.Drawing.Color.FromArgb(((int)(((byte)(192)))), ((int)(((byte)(255)))), ((int)(((byte)(192)))));
			this.LinkLabel.Location = new System.Drawing.Point(155, 664);
			this.LinkLabel.Name = "LinkLabel";
			this.LinkLabel.Size = new System.Drawing.Size(258, 40);
			this.LinkLabel.TabIndex = 14;
			this.LinkLabel.TabStop = true;
			this.LinkLabel.Text = "Continue as Guest";
			this.LinkLabel.LinkClicked += new System.Windows.Forms.LinkLabelLinkClickedEventHandler(this.LinkLabel_LinkClicked);
			// 
			// Login_Button
			// 
			this.Login_Button.BackColor = System.Drawing.Color.FromArgb(((int)(((byte)(255)))), ((int)(((byte)(128)))), ((int)(((byte)(128)))));
			this.Login_Button.Cursor = System.Windows.Forms.Cursors.Arrow;
			this.Login_Button.Font = new System.Drawing.Font("Comic Sans MS", 12F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
			this.Login_Button.Location = new System.Drawing.Point(210, 577);
			this.Login_Button.Name = "Login_Button";
			this.Login_Button.Size = new System.Drawing.Size(143, 62);
			this.Login_Button.TabIndex = 13;
			this.Login_Button.Text = "Login";
			this.Login_Button.UseVisualStyleBackColor = false;
			this.Login_Button.Click += new System.EventHandler(this.Login_Button_Click);
			// 
			// label2
			// 
			this.label2.AutoSize = true;
			this.label2.Font = new System.Drawing.Font("Comic Sans MS", 12F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
			this.label2.ForeColor = System.Drawing.SystemColors.ButtonHighlight;
			this.label2.Location = new System.Drawing.Point(72, 437);
			this.label2.Name = "label2";
			this.label2.Size = new System.Drawing.Size(168, 45);
			this.label2.TabIndex = 12;
			this.label2.Text = "Password:";
			// 
			// password_textbox
			// 
			this.password_textbox.Font = new System.Drawing.Font("Comic Sans MS", 13.875F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
			this.password_textbox.Location = new System.Drawing.Point(107, 488);
			this.password_textbox.Name = "password_textbox";
			this.password_textbox.PasswordChar = '*';
			this.password_textbox.Size = new System.Drawing.Size(359, 59);
			this.password_textbox.TabIndex = 11;
			// 
			// label1
			// 
			this.label1.AutoSize = true;
			this.label1.Font = new System.Drawing.Font("Comic Sans MS", 12F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
			this.label1.ForeColor = System.Drawing.SystemColors.ButtonHighlight;
			this.label1.Location = new System.Drawing.Point(72, 306);
			this.label1.Name = "label1";
			this.label1.Size = new System.Drawing.Size(179, 45);
			this.label1.TabIndex = 10;
			this.label1.Text = "Username:";
			// 
			// username_textbox
			// 
			this.username_textbox.AccessibleDescription = "";
			this.username_textbox.Font = new System.Drawing.Font("Comic Sans MS", 13.875F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
			this.username_textbox.Location = new System.Drawing.Point(107, 357);
			this.username_textbox.Name = "username_textbox";
			this.username_textbox.Size = new System.Drawing.Size(359, 59);
			this.username_textbox.TabIndex = 9;
			// 
			// pictureBox1
			// 
			this.pictureBox1.Image = ((System.Drawing.Image)(resources.GetObject("pictureBox1.Image")));
			this.pictureBox1.Location = new System.Drawing.Point(190, 63);
			this.pictureBox1.Name = "pictureBox1";
			this.pictureBox1.Size = new System.Drawing.Size(192, 190);
			this.pictureBox1.SizeMode = System.Windows.Forms.PictureBoxSizeMode.StretchImage;
			this.pictureBox1.TabIndex = 8;
			this.pictureBox1.TabStop = false;
			// 
			// pictureBox2
			// 
			this.pictureBox2.BorderStyle = System.Windows.Forms.BorderStyle.Fixed3D;
			this.pictureBox2.Location = new System.Drawing.Point(25, 22);
			this.pictureBox2.Name = "pictureBox2";
			this.pictureBox2.Size = new System.Drawing.Size(516, 760);
			this.pictureBox2.TabIndex = 15;
			this.pictureBox2.TabStop = false;
			// 
			// Form1
			// 
			this.AutoScaleDimensions = new System.Drawing.SizeF(12F, 25F);
			this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
			this.BackColor = System.Drawing.Color.FromArgb(((int)(((byte)(41)))), ((int)(((byte)(44)))), ((int)(((byte)(55)))));
			this.ClientSize = new System.Drawing.Size(565, 810);
			this.Controls.Add(this.LinkLabel);
			this.Controls.Add(this.Login_Button);
			this.Controls.Add(this.label2);
			this.Controls.Add(this.password_textbox);
			this.Controls.Add(this.label1);
			this.Controls.Add(this.username_textbox);
			this.Controls.Add(this.pictureBox1);
			this.Controls.Add(this.pictureBox2);
			this.Cursor = System.Windows.Forms.Cursors.Default;
			this.FormBorderStyle = System.Windows.Forms.FormBorderStyle.None;
			this.Icon = ((System.Drawing.Icon)(resources.GetObject("$this.Icon")));
			this.Name = "Form1";
			this.StartPosition = System.Windows.Forms.FormStartPosition.CenterScreen;
			this.Text = "Form1";
			((System.ComponentModel.ISupportInitialize)(this.pictureBox1)).EndInit();
			((System.ComponentModel.ISupportInitialize)(this.pictureBox2)).EndInit();
			this.ResumeLayout(false);
			this.PerformLayout();

		}

		#endregion

		private System.Windows.Forms.LinkLabel LinkLabel;
		private System.Windows.Forms.Button Login_Button;
		private System.Windows.Forms.Label label2;
		private System.Windows.Forms.TextBox password_textbox;
		private System.Windows.Forms.Label label1;
		private System.Windows.Forms.TextBox username_textbox;
		private System.Windows.Forms.PictureBox pictureBox1;
		private System.Windows.Forms.PictureBox pictureBox2;
	}
}

