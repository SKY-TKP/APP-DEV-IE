namespace _APP_DEV_PROJECT__CAFE
{
	partial class Dashboard
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
			Guna.UI2.AnimatorNS.Animation animation1 = new Guna.UI2.AnimatorNS.Animation();
			System.ComponentModel.ComponentResourceManager resources = new System.ComponentModel.ComponentResourceManager(typeof(Dashboard));
			this.panel2 = new System.Windows.Forms.Panel();
			this.guna2Transition1 = new Guna.UI2.WinForms.Guna2Transition();
			this.exit_button = new System.Windows.Forms.Button();
			this.placeorder = new System.Windows.Forms.Button();
			this.additems = new System.Windows.Forms.Button();
			this.updateitems = new System.Windows.Forms.Button();
			this.removeitems = new System.Windows.Forms.Button();
			this.logout_linklabel = new System.Windows.Forms.LinkLabel();
			this.panel1 = new System.Windows.Forms.Panel();
			this.uC_RemoveItems1 = new _APP_DEV_PROJECT__CAFE.AllUserControls.UC_RemoveItems();
			this.uC_UpdateItems1 = new _APP_DEV_PROJECT__CAFE.AllUserControls.UC_UpdateItems();
			this.uC_PlaceOrder2 = new _APP_DEV_PROJECT__CAFE.AllUserControls.UC_PlaceOrder();
			this.uC_Welcome2 = new _APP_DEV_PROJECT__CAFE.AllUserControls.UC_Welcome();
			this.uC_Additems1 = new _APP_DEV_PROJECT__CAFE.AllUserControls.UC_Additems();
			this.uC_PlaceOrder1 = new _APP_DEV_PROJECT__CAFE.AllUserControls.UC_PlaceOrder();
			this.uC_Welcome1 = new _APP_DEV_PROJECT__CAFE.AllUserControls.UC_Welcome();
			this.panel2.SuspendLayout();
			this.panel1.SuspendLayout();
			this.SuspendLayout();
			// 
			// panel2
			// 
			this.panel2.BackColor = System.Drawing.Color.White;
			this.panel2.Controls.Add(this.uC_RemoveItems1);
			this.panel2.Controls.Add(this.uC_UpdateItems1);
			this.panel2.Controls.Add(this.uC_PlaceOrder2);
			this.panel2.Controls.Add(this.uC_Welcome2);
			this.panel2.Controls.Add(this.uC_Additems1);
			this.panel2.Controls.Add(this.uC_PlaceOrder1);
			this.panel2.Controls.Add(this.uC_Welcome1);
			this.guna2Transition1.SetDecoration(this.panel2, Guna.UI2.AnimatorNS.DecorationType.None);
			this.panel2.Location = new System.Drawing.Point(339, 27);
			this.panel2.Name = "panel2";
			this.panel2.Size = new System.Drawing.Size(1150, 789);
			this.panel2.TabIndex = 3;
			// 
			// guna2Transition1
			// 
			this.guna2Transition1.AnimationType = Guna.UI2.AnimatorNS.AnimationType.HorizSlide;
			this.guna2Transition1.Cursor = null;
			animation1.AnimateOnlyDifferences = true;
			animation1.BlindCoeff = ((System.Drawing.PointF)(resources.GetObject("animation1.BlindCoeff")));
			animation1.LeafCoeff = 0F;
			animation1.MaxTime = 1F;
			animation1.MinTime = 0F;
			animation1.MosaicCoeff = ((System.Drawing.PointF)(resources.GetObject("animation1.MosaicCoeff")));
			animation1.MosaicShift = ((System.Drawing.PointF)(resources.GetObject("animation1.MosaicShift")));
			animation1.MosaicSize = 0;
			animation1.Padding = new System.Windows.Forms.Padding(0);
			animation1.RotateCoeff = 0F;
			animation1.RotateLimit = 0F;
			animation1.ScaleCoeff = ((System.Drawing.PointF)(resources.GetObject("animation1.ScaleCoeff")));
			animation1.SlideCoeff = ((System.Drawing.PointF)(resources.GetObject("animation1.SlideCoeff")));
			animation1.TimeCoeff = 0F;
			animation1.TransparencyCoeff = 0F;
			this.guna2Transition1.DefaultAnimation = animation1;
			// 
			// exit_button
			// 
			this.exit_button.BackColor = System.Drawing.Color.Tomato;
			this.guna2Transition1.SetDecoration(this.exit_button, Guna.UI2.AnimatorNS.DecorationType.None);
			this.exit_button.FlatAppearance.BorderColor = System.Drawing.Color.LightCoral;
			this.exit_button.FlatAppearance.BorderSize = 0;
			this.exit_button.FlatStyle = System.Windows.Forms.FlatStyle.Flat;
			this.exit_button.Font = new System.Drawing.Font("Microsoft Sans Serif", 10.875F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(222)));
			this.exit_button.ForeColor = System.Drawing.SystemColors.ControlLightLight;
			this.exit_button.Location = new System.Drawing.Point(12, 12);
			this.exit_button.Name = "exit_button";
			this.exit_button.Size = new System.Drawing.Size(72, 45);
			this.exit_button.TabIndex = 4;
			this.exit_button.Text = "X";
			this.exit_button.UseVisualStyleBackColor = false;
			this.exit_button.Click += new System.EventHandler(this.exit_button_Click_1);
			// 
			// placeorder
			// 
			this.placeorder.BackColor = System.Drawing.Color.FromArgb(((int)(((byte)(0)))), ((int)(((byte)(118)))), ((int)(((byte)(225)))));
			this.placeorder.BackgroundImageLayout = System.Windows.Forms.ImageLayout.None;
			this.guna2Transition1.SetDecoration(this.placeorder, Guna.UI2.AnimatorNS.DecorationType.None);
			this.placeorder.FlatAppearance.BorderSize = 0;
			this.placeorder.FlatStyle = System.Windows.Forms.FlatStyle.Flat;
			this.placeorder.Font = new System.Drawing.Font("Microsoft Sans Serif", 12F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(222)));
			this.placeorder.ForeColor = System.Drawing.SystemColors.ButtonHighlight;
			this.placeorder.Location = new System.Drawing.Point(71, 99);
			this.placeorder.Name = "placeorder";
			this.placeorder.Size = new System.Drawing.Size(263, 58);
			this.placeorder.TabIndex = 0;
			this.placeorder.Text = "Place Order";
			this.placeorder.UseVisualStyleBackColor = false;
			this.placeorder.Click += new System.EventHandler(this.placeorder_Click);
			// 
			// additems
			// 
			this.additems.BackColor = System.Drawing.Color.FromArgb(((int)(((byte)(0)))), ((int)(((byte)(118)))), ((int)(((byte)(225)))));
			this.additems.BackgroundImageLayout = System.Windows.Forms.ImageLayout.None;
			this.guna2Transition1.SetDecoration(this.additems, Guna.UI2.AnimatorNS.DecorationType.None);
			this.additems.DialogResult = System.Windows.Forms.DialogResult.Cancel;
			this.additems.FlatAppearance.BorderSize = 0;
			this.additems.FlatStyle = System.Windows.Forms.FlatStyle.Flat;
			this.additems.Font = new System.Drawing.Font("Microsoft Sans Serif", 12F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(222)));
			this.additems.ForeColor = System.Drawing.SystemColors.ButtonHighlight;
			this.additems.Location = new System.Drawing.Point(71, 216);
			this.additems.Name = "additems";
			this.additems.Size = new System.Drawing.Size(263, 58);
			this.additems.TabIndex = 1;
			this.additems.Text = "Add Items";
			this.additems.UseVisualStyleBackColor = false;
			this.additems.Click += new System.EventHandler(this.additems_Click);
			// 
			// updateitems
			// 
			this.updateitems.BackColor = System.Drawing.Color.FromArgb(((int)(((byte)(0)))), ((int)(((byte)(118)))), ((int)(((byte)(225)))));
			this.updateitems.BackgroundImageLayout = System.Windows.Forms.ImageLayout.None;
			this.guna2Transition1.SetDecoration(this.updateitems, Guna.UI2.AnimatorNS.DecorationType.None);
			this.updateitems.FlatAppearance.BorderSize = 0;
			this.updateitems.FlatStyle = System.Windows.Forms.FlatStyle.Flat;
			this.updateitems.Font = new System.Drawing.Font("Microsoft Sans Serif", 12F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(222)));
			this.updateitems.ForeColor = System.Drawing.SystemColors.ButtonHighlight;
			this.updateitems.Location = new System.Drawing.Point(42, 333);
			this.updateitems.Name = "updateitems";
			this.updateitems.Size = new System.Drawing.Size(289, 58);
			this.updateitems.TabIndex = 2;
			this.updateitems.Text = "Update Items";
			this.updateitems.UseVisualStyleBackColor = false;
			this.updateitems.Click += new System.EventHandler(this.updateitems_Click);
			// 
			// removeitems
			// 
			this.removeitems.AutoEllipsis = true;
			this.removeitems.BackColor = System.Drawing.Color.FromArgb(((int)(((byte)(0)))), ((int)(((byte)(118)))), ((int)(((byte)(225)))));
			this.removeitems.BackgroundImageLayout = System.Windows.Forms.ImageLayout.None;
			this.removeitems.Cursor = System.Windows.Forms.Cursors.Help;
			this.guna2Transition1.SetDecoration(this.removeitems, Guna.UI2.AnimatorNS.DecorationType.None);
			this.removeitems.FlatAppearance.BorderSize = 0;
			this.removeitems.FlatStyle = System.Windows.Forms.FlatStyle.Flat;
			this.removeitems.Font = new System.Drawing.Font("Microsoft Sans Serif", 12F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(222)));
			this.removeitems.ForeColor = System.Drawing.SystemColors.ButtonHighlight;
			this.removeitems.Location = new System.Drawing.Point(48, 452);
			this.removeitems.Name = "removeitems";
			this.removeitems.Size = new System.Drawing.Size(283, 58);
			this.removeitems.TabIndex = 3;
			this.removeitems.Text = "Remove Items";
			this.removeitems.UseVisualStyleBackColor = false;
			this.removeitems.Click += new System.EventHandler(this.removeitems_Click);
			// 
			// logout_linklabel
			// 
			this.logout_linklabel.AutoSize = true;
			this.guna2Transition1.SetDecoration(this.logout_linklabel, Guna.UI2.AnimatorNS.DecorationType.None);
			this.logout_linklabel.Font = new System.Drawing.Font("Microsoft Sans Serif", 13.875F, ((System.Drawing.FontStyle)((System.Drawing.FontStyle.Bold | System.Drawing.FontStyle.Italic))), System.Drawing.GraphicsUnit.Point, ((byte)(222)));
			this.logout_linklabel.LinkColor = System.Drawing.Color.White;
			this.logout_linklabel.Location = new System.Drawing.Point(98, 672);
			this.logout_linklabel.Name = "logout_linklabel";
			this.logout_linklabel.Size = new System.Drawing.Size(147, 42);
			this.logout_linklabel.TabIndex = 5;
			this.logout_linklabel.TabStop = true;
			this.logout_linklabel.Text = "LogOut";
			this.logout_linklabel.LinkClicked += new System.Windows.Forms.LinkLabelLinkClickedEventHandler(this.logout_linklabel_LinkClicked);
			// 
			// panel1
			// 
			this.panel1.BackColor = System.Drawing.Color.FromArgb(((int)(((byte)(0)))), ((int)(((byte)(118)))), ((int)(((byte)(225)))));
			this.panel1.Controls.Add(this.logout_linklabel);
			this.panel1.Controls.Add(this.removeitems);
			this.panel1.Controls.Add(this.updateitems);
			this.panel1.Controls.Add(this.additems);
			this.panel1.Controls.Add(this.placeorder);
			this.guna2Transition1.SetDecoration(this.panel1, Guna.UI2.AnimatorNS.DecorationType.None);
			this.panel1.Location = new System.Drawing.Point(28, 29);
			this.panel1.Name = "panel1";
			this.panel1.Size = new System.Drawing.Size(312, 787);
			this.panel1.TabIndex = 2;
			// 
			// uC_RemoveItems1
			// 
			this.uC_RemoveItems1.BackColor = System.Drawing.SystemColors.ControlLightLight;
			this.guna2Transition1.SetDecoration(this.uC_RemoveItems1, Guna.UI2.AnimatorNS.DecorationType.None);
			this.uC_RemoveItems1.Location = new System.Drawing.Point(3, 0);
			this.uC_RemoveItems1.Name = "uC_RemoveItems1";
			this.uC_RemoveItems1.Size = new System.Drawing.Size(1150, 789);
			this.uC_RemoveItems1.TabIndex = 9;
			// 
			// uC_UpdateItems1
			// 
			this.uC_UpdateItems1.BackColor = System.Drawing.SystemColors.ControlLightLight;
			this.guna2Transition1.SetDecoration(this.uC_UpdateItems1, Guna.UI2.AnimatorNS.DecorationType.None);
			this.uC_UpdateItems1.Location = new System.Drawing.Point(3, 4);
			this.uC_UpdateItems1.Name = "uC_UpdateItems1";
			this.uC_UpdateItems1.Size = new System.Drawing.Size(1150, 789);
			this.uC_UpdateItems1.TabIndex = 8;
			// 
			// uC_PlaceOrder2
			// 
			this.uC_PlaceOrder2.AutoSize = true;
			this.uC_PlaceOrder2.BackColor = System.Drawing.SystemColors.ControlLightLight;
			this.guna2Transition1.SetDecoration(this.uC_PlaceOrder2, Guna.UI2.AnimatorNS.DecorationType.None);
			this.uC_PlaceOrder2.Location = new System.Drawing.Point(3, 0);
			this.uC_PlaceOrder2.Name = "uC_PlaceOrder2";
			this.uC_PlaceOrder2.Size = new System.Drawing.Size(1150, 789);
			this.uC_PlaceOrder2.TabIndex = 7;
			// 
			// uC_Welcome2
			// 
			this.uC_Welcome2.AutoSize = true;
			this.uC_Welcome2.BackColor = System.Drawing.SystemColors.ControlLightLight;
			this.guna2Transition1.SetDecoration(this.uC_Welcome2, Guna.UI2.AnimatorNS.DecorationType.None);
			this.uC_Welcome2.Location = new System.Drawing.Point(-3, 0);
			this.uC_Welcome2.Name = "uC_Welcome2";
			this.uC_Welcome2.Size = new System.Drawing.Size(1150, 789);
			this.uC_Welcome2.TabIndex = 6;
			// 
			// uC_Additems1
			// 
			this.uC_Additems1.AutoSize = true;
			this.uC_Additems1.BackColor = System.Drawing.SystemColors.ControlLightLight;
			this.guna2Transition1.SetDecoration(this.uC_Additems1, Guna.UI2.AnimatorNS.DecorationType.None);
			this.uC_Additems1.Location = new System.Drawing.Point(3, 0);
			this.uC_Additems1.Name = "uC_Additems1";
			this.uC_Additems1.Size = new System.Drawing.Size(1150, 789);
			this.uC_Additems1.TabIndex = 4;
			// 
			// uC_PlaceOrder1
			// 
			this.uC_PlaceOrder1.AutoSize = true;
			this.uC_PlaceOrder1.BackColor = System.Drawing.SystemColors.ControlLightLight;
			this.guna2Transition1.SetDecoration(this.uC_PlaceOrder1, Guna.UI2.AnimatorNS.DecorationType.None);
			this.uC_PlaceOrder1.Location = new System.Drawing.Point(0, -760);
			this.uC_PlaceOrder1.Name = "uC_PlaceOrder1";
			this.uC_PlaceOrder1.Size = new System.Drawing.Size(1158, 789);
			this.uC_PlaceOrder1.TabIndex = 3;
			// 
			// uC_Welcome1
			// 
			this.uC_Welcome1.BackColor = System.Drawing.SystemColors.ControlLightLight;
			this.guna2Transition1.SetDecoration(this.uC_Welcome1, Guna.UI2.AnimatorNS.DecorationType.None);
			this.uC_Welcome1.Location = new System.Drawing.Point(0, 0);
			this.uC_Welcome1.Name = "uC_Welcome1";
			this.uC_Welcome1.Size = new System.Drawing.Size(0, 0);
			this.uC_Welcome1.TabIndex = 0;
			// 
			// Dashboard
			// 
			this.AutoScaleDimensions = new System.Drawing.SizeF(12F, 25F);
			this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
			this.AutoSize = true;
			this.BackColor = System.Drawing.Color.FromArgb(((int)(((byte)(0)))), ((int)(((byte)(118)))), ((int)(((byte)(225)))));
			this.ClientSize = new System.Drawing.Size(1549, 845);
			this.Controls.Add(this.exit_button);
			this.Controls.Add(this.panel1);
			this.Controls.Add(this.panel2);
			this.guna2Transition1.SetDecoration(this, Guna.UI2.AnimatorNS.DecorationType.None);
			this.FormBorderStyle = System.Windows.Forms.FormBorderStyle.None;
			this.Icon = ((System.Drawing.Icon)(resources.GetObject("$this.Icon")));
			this.Name = "Dashboard";
			this.SizeGripStyle = System.Windows.Forms.SizeGripStyle.Hide;
			this.StartPosition = System.Windows.Forms.FormStartPosition.CenterScreen;
			this.Text = "Dashboard";
			this.Load += new System.EventHandler(this.Dashboard_Load);
			this.panel2.ResumeLayout(false);
			this.panel2.PerformLayout();
			this.panel1.ResumeLayout(false);
			this.panel1.PerformLayout();
			this.ResumeLayout(false);

		}

		#endregion
		private System.Windows.Forms.Panel panel2;
		private Guna.UI2.WinForms.Guna2Transition guna2Transition1;
		private System.Windows.Forms.Button exit_button;
		private AllUserControls.UC_Welcome uC_Welcome1;
		private AllUserControls.UC_PlaceOrder uC_PlaceOrder1;
		private System.Windows.Forms.Button placeorder;
		private System.Windows.Forms.Button additems;
		private System.Windows.Forms.Button updateitems;
		private System.Windows.Forms.Button removeitems;
		private System.Windows.Forms.LinkLabel logout_linklabel;
		private System.Windows.Forms.Panel panel1;
		private AllUserControls.UC_Welcome uC_Welcome2;
		private AllUserControls.UC_Additems uC_Additems1;
		private AllUserControls.UC_PlaceOrder uC_PlaceOrder2;
		private AllUserControls.UC_UpdateItems uC_UpdateItems1;
		private AllUserControls.UC_RemoveItems uC_RemoveItems1;
	}
}