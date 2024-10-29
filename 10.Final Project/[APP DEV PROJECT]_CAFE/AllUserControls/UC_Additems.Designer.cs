namespace _APP_DEV_PROJECT__CAFE.AllUserControls
{
	partial class UC_Additems
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

		#region Component Designer generated code

		/// <summary> 
		/// Required method for Designer support - do not modify 
		/// the contents of this method with the code editor.
		/// </summary>
		private void InitializeComponent()
		{
			this.components = new System.ComponentModel.Container();
			this.label1 = new System.Windows.Forms.Label();
			this.label2 = new System.Windows.Forms.Label();
			this.txtCategory = new System.Windows.Forms.ComboBox();
			this.txt_ItemName = new System.Windows.Forms.TextBox();
			this.contextMenuStrip1 = new System.Windows.Forms.ContextMenuStrip(this.components);
			this.label3 = new System.Windows.Forms.Label();
			this.label4 = new System.Windows.Forms.Label();
			this.txt_Price = new System.Windows.Forms.TextBox();
			this.button1 = new System.Windows.Forms.Button();
			this.pictureBox1 = new System.Windows.Forms.PictureBox();
			this.pictureBox2 = new System.Windows.Forms.PictureBox();
			((System.ComponentModel.ISupportInitialize)(this.pictureBox1)).BeginInit();
			((System.ComponentModel.ISupportInitialize)(this.pictureBox2)).BeginInit();
			this.SuspendLayout();
			// 
			// label1
			// 
			this.label1.AutoSize = true;
			this.label1.Font = new System.Drawing.Font("Comic Sans MS", 24F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
			this.label1.Location = new System.Drawing.Point(398, 56);
			this.label1.Name = "label1";
			this.label1.Size = new System.Drawing.Size(369, 90);
			this.label1.TabIndex = 0;
			this.label1.Text = "New Items";
			// 
			// label2
			// 
			this.label2.AutoSize = true;
			this.label2.Font = new System.Drawing.Font("Comic Sans MS", 12F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
			this.label2.Location = new System.Drawing.Point(289, 174);
			this.label2.Name = "label2";
			this.label2.Size = new System.Drawing.Size(164, 45);
			this.label2.TabIndex = 1;
			this.label2.Text = "Category:";
			// 
			// txtCategory
			// 
			this.txtCategory.Font = new System.Drawing.Font("Comic Sans MS", 13.875F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
			this.txtCategory.FormattingEnabled = true;
			this.txtCategory.Items.AddRange(new object[] {
            "Cake",
            "Bakery",
            "Meal",
            "Soft Drink",
            "South Italian",
            "Tea & Milk",
            "Dessert"});
			this.txtCategory.Location = new System.Drawing.Point(284, 236);
			this.txtCategory.Name = "txtCategory";
			this.txtCategory.Size = new System.Drawing.Size(588, 60);
			this.txtCategory.TabIndex = 2;
			// 
			// txt_ItemName
			// 
			this.txt_ItemName.Font = new System.Drawing.Font("Comic Sans MS", 13.875F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
			this.txt_ItemName.Location = new System.Drawing.Point(284, 400);
			this.txt_ItemName.Name = "txt_ItemName";
			this.txt_ItemName.Size = new System.Drawing.Size(588, 59);
			this.txt_ItemName.TabIndex = 3;
			// 
			// contextMenuStrip1
			// 
			this.contextMenuStrip1.ImageScalingSize = new System.Drawing.Size(32, 32);
			this.contextMenuStrip1.Name = "contextMenuStrip1";
			this.contextMenuStrip1.Size = new System.Drawing.Size(61, 4);
			// 
			// label3
			// 
			this.label3.AutoSize = true;
			this.label3.Font = new System.Drawing.Font("Comic Sans MS", 12F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
			this.label3.Location = new System.Drawing.Point(289, 336);
			this.label3.Name = "label3";
			this.label3.Size = new System.Drawing.Size(200, 45);
			this.label3.TabIndex = 5;
			this.label3.Text = "Item Name:";
			// 
			// label4
			// 
			this.label4.AutoSize = true;
			this.label4.Font = new System.Drawing.Font("Comic Sans MS", 12F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
			this.label4.Location = new System.Drawing.Point(290, 501);
			this.label4.Name = "label4";
			this.label4.Size = new System.Drawing.Size(105, 45);
			this.label4.TabIndex = 7;
			this.label4.Text = "Price:";
			// 
			// txt_Price
			// 
			this.txt_Price.Font = new System.Drawing.Font("Comic Sans MS", 13.875F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
			this.txt_Price.Location = new System.Drawing.Point(284, 565);
			this.txt_Price.Name = "txt_Price";
			this.txt_Price.Size = new System.Drawing.Size(588, 59);
			this.txt_Price.TabIndex = 6;
			this.txt_Price.TextChanged += new System.EventHandler(this.txt_Price_TextChanged);
			// 
			// button1
			// 
			this.button1.BackColor = System.Drawing.Color.FromArgb(((int)(((byte)(0)))), ((int)(((byte)(118)))), ((int)(((byte)(225)))));
			this.button1.Font = new System.Drawing.Font("Comic Sans MS", 13.875F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
			this.button1.ForeColor = System.Drawing.SystemColors.ControlLightLight;
			this.button1.Location = new System.Drawing.Point(451, 655);
			this.button1.Name = "button1";
			this.button1.Size = new System.Drawing.Size(254, 67);
			this.button1.TabIndex = 8;
			this.button1.Text = "Add Item";
			this.button1.UseVisualStyleBackColor = false;
			this.button1.Click += new System.EventHandler(this.button1_Click);
			// 
			// pictureBox1
			// 
			this.pictureBox1.BackColor = System.Drawing.Color.LightPink;
			this.pictureBox1.Location = new System.Drawing.Point(19, 17);
			this.pictureBox1.Name = "pictureBox1";
			this.pictureBox1.Size = new System.Drawing.Size(1106, 756);
			this.pictureBox1.TabIndex = 9;
			this.pictureBox1.TabStop = false;
			// 
			// pictureBox2
			// 
			this.pictureBox2.BackColor = System.Drawing.SystemColors.ControlLightLight;
			this.pictureBox2.BorderStyle = System.Windows.Forms.BorderStyle.Fixed3D;
			this.pictureBox2.Location = new System.Drawing.Point(30, 31);
			this.pictureBox2.Name = "pictureBox2";
			this.pictureBox2.Size = new System.Drawing.Size(1080, 721);
			this.pictureBox2.TabIndex = 10;
			this.pictureBox2.TabStop = false;
			// 
			// UC_Additems
			// 
			this.AutoScaleDimensions = new System.Drawing.SizeF(12F, 25F);
			this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
			this.BackColor = System.Drawing.SystemColors.ControlLightLight;
			this.Controls.Add(this.button1);
			this.Controls.Add(this.label4);
			this.Controls.Add(this.txt_Price);
			this.Controls.Add(this.label3);
			this.Controls.Add(this.txt_ItemName);
			this.Controls.Add(this.txtCategory);
			this.Controls.Add(this.label2);
			this.Controls.Add(this.label1);
			this.Controls.Add(this.pictureBox2);
			this.Controls.Add(this.pictureBox1);
			this.Name = "UC_Additems";
			this.Size = new System.Drawing.Size(1150, 789);
			this.Leave += new System.EventHandler(this.UC_Additems_Leave);
			((System.ComponentModel.ISupportInitialize)(this.pictureBox1)).EndInit();
			((System.ComponentModel.ISupportInitialize)(this.pictureBox2)).EndInit();
			this.ResumeLayout(false);
			this.PerformLayout();

		}

		#endregion

		private System.Windows.Forms.Label label1;
		private System.Windows.Forms.Label label2;
		private System.Windows.Forms.ComboBox txtCategory;
		private System.Windows.Forms.TextBox txt_ItemName;
		private System.Windows.Forms.ContextMenuStrip contextMenuStrip1;
		private System.Windows.Forms.Label label3;
		private System.Windows.Forms.Label label4;
		private System.Windows.Forms.TextBox txt_Price;
		private System.Windows.Forms.Button button1;
		private System.Windows.Forms.PictureBox pictureBox1;
		private System.Windows.Forms.PictureBox pictureBox2;
	}
}
