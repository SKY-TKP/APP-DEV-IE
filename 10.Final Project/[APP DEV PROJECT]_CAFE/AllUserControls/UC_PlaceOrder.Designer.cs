namespace _APP_DEV_PROJECT__CAFE.AllUserControls
{
	partial class UC_PlaceOrder
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
			System.Windows.Forms.DataGridViewCellStyle dataGridViewCellStyle1 = new System.Windows.Forms.DataGridViewCellStyle();
			System.Windows.Forms.DataGridViewCellStyle dataGridViewCellStyle2 = new System.Windows.Forms.DataGridViewCellStyle();
			System.Windows.Forms.DataGridViewCellStyle dataGridViewCellStyle3 = new System.Windows.Forms.DataGridViewCellStyle();
			System.Windows.Forms.DataGridViewCellStyle dataGridViewCellStyle4 = new System.Windows.Forms.DataGridViewCellStyle();
			System.Windows.Forms.DataGridViewCellStyle dataGridViewCellStyle5 = new System.Windows.Forms.DataGridViewCellStyle();
			this.label1 = new System.Windows.Forms.Label();
			this.label2 = new System.Windows.Forms.Label();
			this.comboCatagory = new System.Windows.Forms.ComboBox();
			this.txtSearch = new System.Windows.Forms.TextBox();
			this.listBox1 = new System.Windows.Forms.ListBox();
			this.label3 = new System.Windows.Forms.Label();
			this.label4 = new System.Windows.Forms.Label();
			this.label5 = new System.Windows.Forms.Label();
			this.label6 = new System.Windows.Forms.Label();
			this.txtItemName = new System.Windows.Forms.TextBox();
			this.txtPrice = new System.Windows.Forms.TextBox();
			this.txtTotal = new System.Windows.Forms.TextBox();
			this.txtQuantityUpDown = new System.Windows.Forms.NumericUpDown();
			this.bthAddtoCart = new System.Windows.Forms.Button();
			this.directoryEntry1 = new System.DirectoryServices.DirectoryEntry();
			this.pictureBox1 = new System.Windows.Forms.PictureBox();
			this.pictureBox2 = new System.Windows.Forms.PictureBox();
			this.dataGridView1 = new System.Windows.Forms.DataGridView();
			this.btnRemove = new System.Windows.Forms.Button();
			this.btnPrint = new System.Windows.Forms.Button();
			this.txtTotalAmount = new System.Windows.Forms.TextBox();
			this.label7 = new System.Windows.Forms.Label();
			this.contextMenuStrip1 = new System.Windows.Forms.ContextMenuStrip(this.components);
			this.label8 = new System.Windows.Forms.Label();
			this.txtDisCount = new System.Windows.Forms.TextBox();
			this.Column1 = new System.Windows.Forms.DataGridViewTextBoxColumn();
			this.Column2 = new System.Windows.Forms.DataGridViewTextBoxColumn();
			this.Column3 = new System.Windows.Forms.DataGridViewTextBoxColumn();
			this.Column5 = new System.Windows.Forms.DataGridViewTextBoxColumn();
			this.Column4 = new System.Windows.Forms.DataGridViewTextBoxColumn();
			((System.ComponentModel.ISupportInitialize)(this.txtQuantityUpDown)).BeginInit();
			((System.ComponentModel.ISupportInitialize)(this.pictureBox1)).BeginInit();
			((System.ComponentModel.ISupportInitialize)(this.pictureBox2)).BeginInit();
			((System.ComponentModel.ISupportInitialize)(this.dataGridView1)).BeginInit();
			this.SuspendLayout();
			// 
			// label1
			// 
			this.label1.AutoSize = true;
			this.label1.Font = new System.Drawing.Font("Comic Sans MS", 16.125F, System.Drawing.FontStyle.Italic, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
			this.label1.ForeColor = System.Drawing.Color.FromArgb(((int)(((byte)(0)))), ((int)(((byte)(118)))), ((int)(((byte)(225)))));
			this.label1.Location = new System.Drawing.Point(31, 39);
			this.label1.Name = "label1";
			this.label1.Size = new System.Drawing.Size(267, 61);
			this.label1.TabIndex = 0;
			this.label1.Text = "Place Order";
			// 
			// label2
			// 
			this.label2.AutoSize = true;
			this.label2.Font = new System.Drawing.Font("Comic Sans MS", 10.875F, System.Drawing.FontStyle.Italic, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
			this.label2.Location = new System.Drawing.Point(35, 121);
			this.label2.Name = "label2";
			this.label2.Size = new System.Drawing.Size(148, 41);
			this.label2.TabIndex = 1;
			this.label2.Text = "Category:";
			// 
			// comboCatagory
			// 
			this.comboCatagory.Font = new System.Drawing.Font("Comic Sans MS", 9F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
			this.comboCatagory.FormattingEnabled = true;
			this.comboCatagory.Items.AddRange(new object[] {
            "Cake",
            "Bakery",
            "Meal",
            "Soft Drink",
            "South Italian",
            "Tea & Milk",
            "Dessert"});
			this.comboCatagory.Location = new System.Drawing.Point(43, 184);
			this.comboCatagory.Name = "comboCatagory";
			this.comboCatagory.Size = new System.Drawing.Size(245, 41);
			this.comboCatagory.TabIndex = 2;
			this.comboCatagory.SelectedIndexChanged += new System.EventHandler(this.comboCatagory_SelectedIndexChanged);
			// 
			// txtSearch
			// 
			this.txtSearch.Font = new System.Drawing.Font("Comic Sans MS", 9F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
			this.txtSearch.Location = new System.Drawing.Point(42, 250);
			this.txtSearch.Name = "txtSearch";
			this.txtSearch.Size = new System.Drawing.Size(202, 41);
			this.txtSearch.TabIndex = 3;
			this.txtSearch.Tag = "Search Item";
			this.txtSearch.Text = "Search";
			this.txtSearch.TextAlign = System.Windows.Forms.HorizontalAlignment.Center;
			this.txtSearch.TextChanged += new System.EventHandler(this.txtSearch_TextChanged);
			// 
			// listBox1
			// 
			this.listBox1.Font = new System.Drawing.Font("Comic Sans MS", 9F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
			this.listBox1.FormattingEnabled = true;
			this.listBox1.ItemHeight = 33;
			this.listBox1.Location = new System.Drawing.Point(44, 317);
			this.listBox1.Name = "listBox1";
			this.listBox1.Size = new System.Drawing.Size(245, 433);
			this.listBox1.TabIndex = 4;
			this.listBox1.SelectedIndexChanged += new System.EventHandler(this.listBox1_SelectedIndexChanged);
			// 
			// label3
			// 
			this.label3.AutoSize = true;
			this.label3.Font = new System.Drawing.Font("Comic Sans MS", 10.875F, System.Drawing.FontStyle.Italic, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
			this.label3.Location = new System.Drawing.Point(358, 75);
			this.label3.Name = "label3";
			this.label3.Size = new System.Drawing.Size(182, 41);
			this.label3.TabIndex = 5;
			this.label3.Text = "Item Name:";
			// 
			// label4
			// 
			this.label4.AutoSize = true;
			this.label4.Font = new System.Drawing.Font("Comic Sans MS", 10.875F, System.Drawing.FontStyle.Italic, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
			this.label4.Location = new System.Drawing.Point(745, 75);
			this.label4.Name = "label4";
			this.label4.Size = new System.Drawing.Size(95, 41);
			this.label4.TabIndex = 6;
			this.label4.Text = "Price:";
			// 
			// label5
			// 
			this.label5.AutoSize = true;
			this.label5.Font = new System.Drawing.Font("Comic Sans MS", 10.875F, System.Drawing.FontStyle.Italic, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
			this.label5.Location = new System.Drawing.Point(358, 202);
			this.label5.Name = "label5";
			this.label5.Size = new System.Drawing.Size(148, 41);
			this.label5.TabIndex = 7;
			this.label5.Text = "Quantity:";
			// 
			// label6
			// 
			this.label6.AutoSize = true;
			this.label6.Font = new System.Drawing.Font("Comic Sans MS", 10.875F, System.Drawing.FontStyle.Italic, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
			this.label6.Location = new System.Drawing.Point(736, 202);
			this.label6.Name = "label6";
			this.label6.Size = new System.Drawing.Size(99, 41);
			this.label6.TabIndex = 8;
			this.label6.Text = "Total:";
			// 
			// txtItemName
			// 
			this.txtItemName.Font = new System.Drawing.Font("Comic Sans MS", 10.875F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
			this.txtItemName.Location = new System.Drawing.Point(364, 127);
			this.txtItemName.Name = "txtItemName";
			this.txtItemName.Size = new System.Drawing.Size(318, 48);
			this.txtItemName.TabIndex = 9;
			this.txtItemName.TextAlign = System.Windows.Forms.HorizontalAlignment.Center;
			// 
			// txtPrice
			// 
			this.txtPrice.Font = new System.Drawing.Font("Comic Sans MS", 10.875F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
			this.txtPrice.Location = new System.Drawing.Point(751, 127);
			this.txtPrice.Name = "txtPrice";
			this.txtPrice.Size = new System.Drawing.Size(328, 48);
			this.txtPrice.TabIndex = 11;
			this.txtPrice.TextAlign = System.Windows.Forms.HorizontalAlignment.Center;
			// 
			// txtTotal
			// 
			this.txtTotal.Font = new System.Drawing.Font("Comic Sans MS", 10.875F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
			this.txtTotal.Location = new System.Drawing.Point(751, 253);
			this.txtTotal.Name = "txtTotal";
			this.txtTotal.Size = new System.Drawing.Size(328, 48);
			this.txtTotal.TabIndex = 12;
			this.txtTotal.TextAlign = System.Windows.Forms.HorizontalAlignment.Center;
			// 
			// txtQuantityUpDown
			// 
			this.txtQuantityUpDown.Font = new System.Drawing.Font("Comic Sans MS", 10.875F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
			this.txtQuantityUpDown.Location = new System.Drawing.Point(364, 254);
			this.txtQuantityUpDown.Name = "txtQuantityUpDown";
			this.txtQuantityUpDown.Size = new System.Drawing.Size(318, 48);
			this.txtQuantityUpDown.TabIndex = 13;
			this.txtQuantityUpDown.TextAlign = System.Windows.Forms.HorizontalAlignment.Right;
			this.txtQuantityUpDown.ValueChanged += new System.EventHandler(this.txtQuantityUpDown_ValueChanged);
			// 
			// bthAddtoCart
			// 
			this.bthAddtoCart.BackColor = System.Drawing.Color.FromArgb(((int)(((byte)(0)))), ((int)(((byte)(118)))), ((int)(((byte)(225)))));
			this.bthAddtoCart.FlatStyle = System.Windows.Forms.FlatStyle.Flat;
			this.bthAddtoCart.Font = new System.Drawing.Font("Comic Sans MS", 9F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
			this.bthAddtoCart.ForeColor = System.Drawing.SystemColors.ControlLightLight;
			this.bthAddtoCart.Location = new System.Drawing.Point(893, 334);
			this.bthAddtoCart.Name = "bthAddtoCart";
			this.bthAddtoCart.Size = new System.Drawing.Size(186, 68);
			this.bthAddtoCart.TabIndex = 14;
			this.bthAddtoCart.Text = "Add to Cart";
			this.bthAddtoCart.UseVisualStyleBackColor = false;
			this.bthAddtoCart.Click += new System.EventHandler(this.bthAddtoCart_Click);
			// 
			// pictureBox1
			// 
			this.pictureBox1.BackColor = System.Drawing.Color.FromArgb(((int)(((byte)(0)))), ((int)(((byte)(118)))), ((int)(((byte)(225)))));
			this.pictureBox1.Location = new System.Drawing.Point(316, 51);
			this.pictureBox1.Name = "pictureBox1";
			this.pictureBox1.Size = new System.Drawing.Size(812, 371);
			this.pictureBox1.TabIndex = 15;
			this.pictureBox1.TabStop = false;
			// 
			// pictureBox2
			// 
			this.pictureBox2.BackColor = System.Drawing.Color.White;
			this.pictureBox2.Location = new System.Drawing.Point(323, 59);
			this.pictureBox2.Name = "pictureBox2";
			this.pictureBox2.Size = new System.Drawing.Size(797, 356);
			this.pictureBox2.TabIndex = 16;
			this.pictureBox2.TabStop = false;
			// 
			// dataGridView1
			// 
			dataGridViewCellStyle1.Alignment = System.Windows.Forms.DataGridViewContentAlignment.MiddleCenter;
			this.dataGridView1.AlternatingRowsDefaultCellStyle = dataGridViewCellStyle1;
			this.dataGridView1.BackgroundColor = System.Drawing.SystemColors.ControlLightLight;
			this.dataGridView1.BorderStyle = System.Windows.Forms.BorderStyle.Fixed3D;
			dataGridViewCellStyle2.Alignment = System.Windows.Forms.DataGridViewContentAlignment.MiddleCenter;
			dataGridViewCellStyle2.BackColor = System.Drawing.Color.Violet;
			dataGridViewCellStyle2.Font = new System.Drawing.Font("Comic Sans MS", 10.125F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
			dataGridViewCellStyle2.ForeColor = System.Drawing.SystemColors.InactiveBorder;
			dataGridViewCellStyle2.SelectionBackColor = System.Drawing.SystemColors.Highlight;
			dataGridViewCellStyle2.SelectionForeColor = System.Drawing.SystemColors.HighlightText;
			dataGridViewCellStyle2.WrapMode = System.Windows.Forms.DataGridViewTriState.True;
			this.dataGridView1.ColumnHeadersDefaultCellStyle = dataGridViewCellStyle2;
			this.dataGridView1.ColumnHeadersHeight = 50;
			this.dataGridView1.Columns.AddRange(new System.Windows.Forms.DataGridViewColumn[] {
            this.Column1,
            this.Column2,
            this.Column3,
            this.Column5,
            this.Column4});
			dataGridViewCellStyle3.Alignment = System.Windows.Forms.DataGridViewContentAlignment.MiddleCenter;
			dataGridViewCellStyle3.BackColor = System.Drawing.SystemColors.Window;
			dataGridViewCellStyle3.Font = new System.Drawing.Font("Comic Sans MS", 9F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
			dataGridViewCellStyle3.ForeColor = System.Drawing.SystemColors.ControlText;
			dataGridViewCellStyle3.SelectionBackColor = System.Drawing.SystemColors.Highlight;
			dataGridViewCellStyle3.SelectionForeColor = System.Drawing.SystemColors.HighlightText;
			dataGridViewCellStyle3.WrapMode = System.Windows.Forms.DataGridViewTriState.False;
			this.dataGridView1.DefaultCellStyle = dataGridViewCellStyle3;
			this.dataGridView1.EnableHeadersVisualStyles = false;
			this.dataGridView1.ImeMode = System.Windows.Forms.ImeMode.On;
			this.dataGridView1.Location = new System.Drawing.Point(316, 446);
			this.dataGridView1.Name = "dataGridView1";
			this.dataGridView1.RowHeadersBorderStyle = System.Windows.Forms.DataGridViewHeaderBorderStyle.Sunken;
			dataGridViewCellStyle4.Alignment = System.Windows.Forms.DataGridViewContentAlignment.MiddleCenter;
			dataGridViewCellStyle4.BackColor = System.Drawing.SystemColors.Control;
			dataGridViewCellStyle4.Font = new System.Drawing.Font("Comic Sans MS", 9F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
			dataGridViewCellStyle4.ForeColor = System.Drawing.SystemColors.WindowText;
			dataGridViewCellStyle4.SelectionBackColor = System.Drawing.Color.LemonChiffon;
			dataGridViewCellStyle4.SelectionForeColor = System.Drawing.SystemColors.ControlText;
			dataGridViewCellStyle4.WrapMode = System.Windows.Forms.DataGridViewTriState.True;
			this.dataGridView1.RowHeadersDefaultCellStyle = dataGridViewCellStyle4;
			this.dataGridView1.RowHeadersVisible = false;
			this.dataGridView1.RowHeadersWidth = 50;
			this.dataGridView1.RowHeadersWidthSizeMode = System.Windows.Forms.DataGridViewRowHeadersWidthSizeMode.DisableResizing;
			dataGridViewCellStyle5.Alignment = System.Windows.Forms.DataGridViewContentAlignment.MiddleCenter;
			dataGridViewCellStyle5.Font = new System.Drawing.Font("Comic Sans MS", 9F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
			dataGridViewCellStyle5.SelectionBackColor = System.Drawing.Color.FromArgb(((int)(((byte)(255)))), ((int)(((byte)(255)))), ((int)(((byte)(192)))));
			dataGridViewCellStyle5.SelectionForeColor = System.Drawing.Color.Black;
			this.dataGridView1.RowsDefaultCellStyle = dataGridViewCellStyle5;
			this.dataGridView1.RowTemplate.DefaultCellStyle.Alignment = System.Windows.Forms.DataGridViewContentAlignment.MiddleCenter;
			this.dataGridView1.RowTemplate.DefaultCellStyle.Font = new System.Drawing.Font("Comic Sans MS", 9F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
			this.dataGridView1.RowTemplate.DefaultCellStyle.SelectionBackColor = System.Drawing.Color.FromArgb(((int)(((byte)(255)))), ((int)(((byte)(255)))), ((int)(((byte)(192)))));
			this.dataGridView1.RowTemplate.DefaultCellStyle.SelectionForeColor = System.Drawing.Color.Black;
			this.dataGridView1.RowTemplate.Height = 50;
			this.dataGridView1.RowTemplate.ReadOnly = true;
			this.dataGridView1.ScrollBars = System.Windows.Forms.ScrollBars.Vertical;
			this.dataGridView1.Size = new System.Drawing.Size(804, 197);
			this.dataGridView1.TabIndex = 17;
			this.dataGridView1.CellClick += new System.Windows.Forms.DataGridViewCellEventHandler(this.dataGridView1_CellClick);
			// 
			// btnRemove
			// 
			this.btnRemove.BackColor = System.Drawing.Color.FromArgb(((int)(((byte)(0)))), ((int)(((byte)(118)))), ((int)(((byte)(225)))));
			this.btnRemove.FlatStyle = System.Windows.Forms.FlatStyle.Flat;
			this.btnRemove.Font = new System.Drawing.Font("Comic Sans MS", 10.875F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
			this.btnRemove.ForeColor = System.Drawing.SystemColors.ControlLightLight;
			this.btnRemove.Location = new System.Drawing.Point(323, 699);
			this.btnRemove.Name = "btnRemove";
			this.btnRemove.Size = new System.Drawing.Size(186, 68);
			this.btnRemove.TabIndex = 18;
			this.btnRemove.Text = "Remove";
			this.btnRemove.UseVisualStyleBackColor = false;
			this.btnRemove.Click += new System.EventHandler(this.btnRemove_Click);
			// 
			// btnPrint
			// 
			this.btnPrint.BackColor = System.Drawing.Color.FromArgb(((int)(((byte)(0)))), ((int)(((byte)(118)))), ((int)(((byte)(225)))));
			this.btnPrint.FlatStyle = System.Windows.Forms.FlatStyle.Flat;
			this.btnPrint.Font = new System.Drawing.Font("Comic Sans MS", 10.875F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
			this.btnPrint.ForeColor = System.Drawing.SystemColors.ControlLightLight;
			this.btnPrint.Location = new System.Drawing.Point(924, 699);
			this.btnPrint.Name = "btnPrint";
			this.btnPrint.Size = new System.Drawing.Size(186, 68);
			this.btnPrint.TabIndex = 19;
			this.btnPrint.Text = "Print";
			this.btnPrint.UseVisualStyleBackColor = false;
			this.btnPrint.Click += new System.EventHandler(this.btnPrint_Click);
			// 
			// txtTotalAmount
			// 
			this.txtTotalAmount.BackColor = System.Drawing.Color.Pink;
			this.txtTotalAmount.Font = new System.Drawing.Font("Comic Sans MS", 16.125F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
			this.txtTotalAmount.Location = new System.Drawing.Point(620, 693);
			this.txtTotalAmount.Multiline = true;
			this.txtTotalAmount.Name = "txtTotalAmount";
			this.txtTotalAmount.Size = new System.Drawing.Size(186, 74);
			this.txtTotalAmount.TabIndex = 20;
			this.txtTotalAmount.Text = "0.00B";
			this.txtTotalAmount.TextAlign = System.Windows.Forms.HorizontalAlignment.Center;
			// 
			// label7
			// 
			this.label7.AutoSize = true;
			this.label7.Font = new System.Drawing.Font("Comic Sans MS", 10.125F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
			this.label7.Location = new System.Drawing.Point(626, 652);
			this.label7.Name = "label7";
			this.label7.Size = new System.Drawing.Size(173, 38);
			this.label7.TabIndex = 21;
			this.label7.Text = "Grand Total";
			// 
			// contextMenuStrip1
			// 
			this.contextMenuStrip1.ImageScalingSize = new System.Drawing.Size(32, 32);
			this.contextMenuStrip1.Name = "contextMenuStrip1";
			this.contextMenuStrip1.Size = new System.Drawing.Size(61, 4);
			// 
			// label8
			// 
			this.label8.AutoSize = true;
			this.label8.Font = new System.Drawing.Font("Comic Sans MS", 10.875F, System.Drawing.FontStyle.Italic, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
			this.label8.Location = new System.Drawing.Point(358, 337);
			this.label8.Name = "label8";
			this.label8.Size = new System.Drawing.Size(199, 41);
			this.label8.TabIndex = 25;
			this.label8.Text = "Discount(%) :";
			// 
			// txtDisCount
			// 
			this.txtDisCount.Font = new System.Drawing.Font("Comic Sans MS", 10.875F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
			this.txtDisCount.Location = new System.Drawing.Point(559, 337);
			this.txtDisCount.Name = "txtDisCount";
			this.txtDisCount.Size = new System.Drawing.Size(222, 48);
			this.txtDisCount.TabIndex = 26;
			this.txtDisCount.TextAlign = System.Windows.Forms.HorizontalAlignment.Center;
			// 
			// Column1
			// 
			this.Column1.HeaderText = "Item Name";
			this.Column1.MinimumWidth = 10;
			this.Column1.Name = "Column1";
			this.Column1.Width = 80;
			// 
			// Column2
			// 
			this.Column2.HeaderText = "Price (/unit)";
			this.Column2.MinimumWidth = 10;
			this.Column2.Name = "Column2";
			this.Column2.Width = 80;
			// 
			// Column3
			// 
			this.Column3.HeaderText = "Quantity";
			this.Column3.MinimumWidth = 10;
			this.Column3.Name = "Column3";
			this.Column3.Width = 80;
			// 
			// Column5
			// 
			this.Column5.HeaderText = "Discount";
			this.Column5.MinimumWidth = 10;
			this.Column5.Name = "Column5";
			this.Column5.Width = 80;
			// 
			// Column4
			// 
			this.Column4.HeaderText = "Total (B)";
			this.Column4.MinimumWidth = 10;
			this.Column4.Name = "Column4";
			this.Column4.Width = 80;
			// 
			// UC_PlaceOrder
			// 
			this.AutoScaleDimensions = new System.Drawing.SizeF(12F, 25F);
			this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
			this.AutoSize = true;
			this.BackColor = System.Drawing.SystemColors.ControlLightLight;
			this.Controls.Add(this.txtDisCount);
			this.Controls.Add(this.label8);
			this.Controls.Add(this.label7);
			this.Controls.Add(this.txtTotalAmount);
			this.Controls.Add(this.btnPrint);
			this.Controls.Add(this.btnRemove);
			this.Controls.Add(this.dataGridView1);
			this.Controls.Add(this.bthAddtoCart);
			this.Controls.Add(this.txtQuantityUpDown);
			this.Controls.Add(this.txtTotal);
			this.Controls.Add(this.txtPrice);
			this.Controls.Add(this.txtItemName);
			this.Controls.Add(this.label6);
			this.Controls.Add(this.label5);
			this.Controls.Add(this.label4);
			this.Controls.Add(this.label3);
			this.Controls.Add(this.listBox1);
			this.Controls.Add(this.txtSearch);
			this.Controls.Add(this.comboCatagory);
			this.Controls.Add(this.label2);
			this.Controls.Add(this.label1);
			this.Controls.Add(this.pictureBox2);
			this.Controls.Add(this.pictureBox1);
			this.Name = "UC_PlaceOrder";
			this.Size = new System.Drawing.Size(1150, 789);
			((System.ComponentModel.ISupportInitialize)(this.txtQuantityUpDown)).EndInit();
			((System.ComponentModel.ISupportInitialize)(this.pictureBox1)).EndInit();
			((System.ComponentModel.ISupportInitialize)(this.pictureBox2)).EndInit();
			((System.ComponentModel.ISupportInitialize)(this.dataGridView1)).EndInit();
			this.ResumeLayout(false);
			this.PerformLayout();

		}

		#endregion

		private System.Windows.Forms.Label label1;
		private System.Windows.Forms.Label label2;
		private System.Windows.Forms.ComboBox comboCatagory;
		private System.Windows.Forms.TextBox txtSearch;
		private System.Windows.Forms.ListBox listBox1;
		private System.Windows.Forms.Label label3;
		private System.Windows.Forms.Label label4;
		private System.Windows.Forms.Label label5;
		private System.Windows.Forms.Label label6;
		private System.Windows.Forms.TextBox txtItemName;
		private System.Windows.Forms.TextBox txtPrice;
		private System.Windows.Forms.TextBox txtTotal;
		private System.Windows.Forms.NumericUpDown txtQuantityUpDown;
		private System.Windows.Forms.Button bthAddtoCart;
		private System.DirectoryServices.DirectoryEntry directoryEntry1;
		private System.Windows.Forms.PictureBox pictureBox1;
		private System.Windows.Forms.PictureBox pictureBox2;
		private System.Windows.Forms.DataGridView dataGridView1;
		private System.Windows.Forms.Button btnRemove;
		private System.Windows.Forms.Button btnPrint;
		private System.Windows.Forms.TextBox txtTotalAmount;
		private System.Windows.Forms.Label label7;
		private System.Windows.Forms.ContextMenuStrip contextMenuStrip1;
		private System.Windows.Forms.Label label8;
		private System.Windows.Forms.TextBox txtDisCount;
		private System.Windows.Forms.DataGridViewTextBoxColumn Column1;
		private System.Windows.Forms.DataGridViewTextBoxColumn Column2;
		private System.Windows.Forms.DataGridViewTextBoxColumn Column3;
		private System.Windows.Forms.DataGridViewTextBoxColumn Column5;
		private System.Windows.Forms.DataGridViewTextBoxColumn Column4;
	}
}
