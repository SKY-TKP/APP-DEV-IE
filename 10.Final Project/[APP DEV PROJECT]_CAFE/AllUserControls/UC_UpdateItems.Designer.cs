namespace _APP_DEV_PROJECT__CAFE.AllUserControls
{
	partial class UC_UpdateItems
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
			System.Windows.Forms.DataGridViewCellStyle dataGridViewCellStyle7 = new System.Windows.Forms.DataGridViewCellStyle();
			System.Windows.Forms.DataGridViewCellStyle dataGridViewCellStyle8 = new System.Windows.Forms.DataGridViewCellStyle();
			this.label1 = new System.Windows.Forms.Label();
			this.txtCategory = new System.Windows.Forms.TextBox();
			this.txtPrice = new System.Windows.Forms.TextBox();
			this.txtSearchItem = new System.Windows.Forms.TextBox();
			this.label6 = new System.Windows.Forms.Label();
			this.label4 = new System.Windows.Forms.Label();
			this.label3 = new System.Windows.Forms.Label();
			this.dataGridView1 = new System.Windows.Forms.DataGridView();
			this.txtName = new System.Windows.Forms.TextBox();
			this.label2 = new System.Windows.Forms.Label();
			this.pictureBox2 = new System.Windows.Forms.PictureBox();
			this.pictureBox1 = new System.Windows.Forms.PictureBox();
			this.btnUpdate = new System.Windows.Forms.Button();
			this.button2 = new System.Windows.Forms.Button();
			this.btnRefresh = new System.Windows.Forms.Button();
			((System.ComponentModel.ISupportInitialize)(this.dataGridView1)).BeginInit();
			((System.ComponentModel.ISupportInitialize)(this.pictureBox2)).BeginInit();
			((System.ComponentModel.ISupportInitialize)(this.pictureBox1)).BeginInit();
			this.SuspendLayout();
			// 
			// label1
			// 
			this.label1.AutoSize = true;
			this.label1.Font = new System.Drawing.Font("Comic Sans MS", 16.125F, System.Drawing.FontStyle.Italic, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
			this.label1.ForeColor = System.Drawing.Color.FromArgb(((int)(((byte)(0)))), ((int)(((byte)(118)))), ((int)(((byte)(225)))));
			this.label1.Location = new System.Drawing.Point(45, 43);
			this.label1.Name = "label1";
			this.label1.Size = new System.Drawing.Size(287, 61);
			this.label1.TabIndex = 1;
			this.label1.Text = "Update Item";
			// 
			// txtCategory
			// 
			this.txtCategory.Font = new System.Drawing.Font("Comic Sans MS", 10.875F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
			this.txtCategory.ForeColor = System.Drawing.SystemColors.InactiveCaption;
			this.txtCategory.Location = new System.Drawing.Point(156, 583);
			this.txtCategory.Name = "txtCategory";
			this.txtCategory.Size = new System.Drawing.Size(328, 48);
			this.txtCategory.TabIndex = 18;
			this.txtCategory.Text = "   Category";
			// 
			// txtPrice
			// 
			this.txtPrice.Font = new System.Drawing.Font("Comic Sans MS", 10.875F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
			this.txtPrice.ForeColor = System.Drawing.SystemColors.InactiveCaption;
			this.txtPrice.Location = new System.Drawing.Point(611, 583);
			this.txtPrice.Name = "txtPrice";
			this.txtPrice.Size = new System.Drawing.Size(328, 48);
			this.txtPrice.TabIndex = 17;
			this.txtPrice.Text = "   Price";
			// 
			// txtSearchItem
			// 
			this.txtSearchItem.Font = new System.Drawing.Font("Comic Sans MS", 10.875F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
			this.txtSearchItem.Location = new System.Drawing.Point(763, 173);
			this.txtSearchItem.Name = "txtSearchItem";
			this.txtSearchItem.Size = new System.Drawing.Size(318, 48);
			this.txtSearchItem.TabIndex = 16;
			this.txtSearchItem.Tag = "Search Item";
			this.txtSearchItem.TextAlign = System.Windows.Forms.HorizontalAlignment.Center;
			this.txtSearchItem.TextChanged += new System.EventHandler(this.txtSearchItem_TextChanged);
			// 
			// label6
			// 
			this.label6.AutoSize = true;
			this.label6.Font = new System.Drawing.Font("Comic Sans MS", 10.875F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
			this.label6.Location = new System.Drawing.Point(141, 543);
			this.label6.Name = "label6";
			this.label6.Size = new System.Drawing.Size(147, 40);
			this.label6.TabIndex = 15;
			this.label6.Text = "Category:";
			// 
			// label4
			// 
			this.label4.AutoSize = true;
			this.label4.Font = new System.Drawing.Font("Comic Sans MS", 10.875F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
			this.label4.Location = new System.Drawing.Point(605, 542);
			this.label4.Name = "label4";
			this.label4.Size = new System.Drawing.Size(94, 40);
			this.label4.TabIndex = 14;
			this.label4.Text = "Price:";
			// 
			// label3
			// 
			this.label3.AutoSize = true;
			this.label3.Font = new System.Drawing.Font("Comic Sans MS", 10.875F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
			this.label3.Location = new System.Drawing.Point(757, 121);
			this.label3.Name = "label3";
			this.label3.Size = new System.Drawing.Size(181, 40);
			this.label3.TabIndex = 13;
			this.label3.Text = "Item Name:";
			// 
			// dataGridView1
			// 
			this.dataGridView1.BackgroundColor = System.Drawing.SystemColors.ControlLightLight;
			dataGridViewCellStyle7.Alignment = System.Windows.Forms.DataGridViewContentAlignment.MiddleCenter;
			dataGridViewCellStyle7.BackColor = System.Drawing.Color.FromArgb(((int)(((byte)(255)))), ((int)(((byte)(192)))), ((int)(((byte)(255)))));
			dataGridViewCellStyle7.Font = new System.Drawing.Font("Comic Sans MS", 9F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
			dataGridViewCellStyle7.ForeColor = System.Drawing.SystemColors.WindowText;
			dataGridViewCellStyle7.SelectionBackColor = System.Drawing.SystemColors.Highlight;
			dataGridViewCellStyle7.SelectionForeColor = System.Drawing.SystemColors.HighlightText;
			dataGridViewCellStyle7.WrapMode = System.Windows.Forms.DataGridViewTriState.True;
			this.dataGridView1.ColumnHeadersDefaultCellStyle = dataGridViewCellStyle7;
			this.dataGridView1.ColumnHeadersHeightSizeMode = System.Windows.Forms.DataGridViewColumnHeadersHeightSizeMode.AutoSize;
			dataGridViewCellStyle8.Alignment = System.Windows.Forms.DataGridViewContentAlignment.MiddleCenter;
			dataGridViewCellStyle8.BackColor = System.Drawing.SystemColors.Window;
			dataGridViewCellStyle8.Font = new System.Drawing.Font("Comic Sans MS", 7.875F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
			dataGridViewCellStyle8.ForeColor = System.Drawing.SystemColors.ControlText;
			dataGridViewCellStyle8.SelectionBackColor = System.Drawing.SystemColors.Highlight;
			dataGridViewCellStyle8.SelectionForeColor = System.Drawing.SystemColors.HighlightText;
			dataGridViewCellStyle8.WrapMode = System.Windows.Forms.DataGridViewTriState.False;
			this.dataGridView1.DefaultCellStyle = dataGridViewCellStyle8;
			this.dataGridView1.EditMode = System.Windows.Forms.DataGridViewEditMode.EditProgrammatically;
			this.dataGridView1.Location = new System.Drawing.Point(56, 235);
			this.dataGridView1.Name = "dataGridView1";
			this.dataGridView1.RowHeadersWidth = 82;
			this.dataGridView1.RowTemplate.Height = 30;
			this.dataGridView1.RowTemplate.ReadOnly = true;
			this.dataGridView1.Size = new System.Drawing.Size(1025, 290);
			this.dataGridView1.TabIndex = 21;
			this.dataGridView1.CellClick += new System.Windows.Forms.DataGridViewCellEventHandler(this.dataGridView1_CellClick);
			// 
			// txtName
			// 
			this.txtName.Font = new System.Drawing.Font("Comic Sans MS", 10.875F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
			this.txtName.ForeColor = System.Drawing.SystemColors.InactiveCaption;
			this.txtName.Location = new System.Drawing.Point(156, 685);
			this.txtName.Name = "txtName";
			this.txtName.Size = new System.Drawing.Size(328, 48);
			this.txtName.TabIndex = 23;
			this.txtName.Text = "   Item Name";
			// 
			// label2
			// 
			this.label2.AutoSize = true;
			this.label2.Font = new System.Drawing.Font("Comic Sans MS", 10.875F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
			this.label2.Location = new System.Drawing.Point(141, 645);
			this.label2.Name = "label2";
			this.label2.Size = new System.Drawing.Size(181, 40);
			this.label2.TabIndex = 22;
			this.label2.Text = "Item Name:";
			// 
			// pictureBox2
			// 
			this.pictureBox2.BackColor = System.Drawing.SystemColors.ControlLightLight;
			this.pictureBox2.BorderStyle = System.Windows.Forms.BorderStyle.Fixed3D;
			this.pictureBox2.Location = new System.Drawing.Point(33, 30);
			this.pictureBox2.Name = "pictureBox2";
			this.pictureBox2.Size = new System.Drawing.Size(1080, 721);
			this.pictureBox2.TabIndex = 25;
			this.pictureBox2.TabStop = false;
			// 
			// pictureBox1
			// 
			this.pictureBox1.BackColor = System.Drawing.Color.LightPink;
			this.pictureBox1.Location = new System.Drawing.Point(22, 16);
			this.pictureBox1.Name = "pictureBox1";
			this.pictureBox1.Size = new System.Drawing.Size(1106, 756);
			this.pictureBox1.TabIndex = 24;
			this.pictureBox1.TabStop = false;
			// 
			// btnUpdate
			// 
			this.btnUpdate.BackColor = System.Drawing.Color.FromArgb(((int)(((byte)(0)))), ((int)(((byte)(118)))), ((int)(((byte)(225)))));
			this.btnUpdate.FlatStyle = System.Windows.Forms.FlatStyle.Flat;
			this.btnUpdate.Font = new System.Drawing.Font("Comic Sans MS", 10.875F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
			this.btnUpdate.ForeColor = System.Drawing.SystemColors.ControlLightLight;
			this.btnUpdate.Location = new System.Drawing.Point(612, 676);
			this.btnUpdate.Name = "btnUpdate";
			this.btnUpdate.Size = new System.Drawing.Size(186, 57);
			this.btnUpdate.TabIndex = 26;
			this.btnUpdate.Text = "Update";
			this.btnUpdate.UseVisualStyleBackColor = false;
			this.btnUpdate.Click += new System.EventHandler(this.btnUpdate_Click);
			// 
			// button2
			// 
			this.button2.Location = new System.Drawing.Point(1010, 662);
			this.button2.Name = "button2";
			this.button2.Size = new System.Drawing.Size(8, 8);
			this.button2.TabIndex = 28;
			this.button2.Text = "button2";
			this.button2.UseVisualStyleBackColor = true;
			// 
			// btnRefresh
			// 
			this.btnRefresh.BackColor = System.Drawing.Color.FromArgb(((int)(((byte)(0)))), ((int)(((byte)(118)))), ((int)(((byte)(225)))));
			this.btnRefresh.FlatStyle = System.Windows.Forms.FlatStyle.Flat;
			this.btnRefresh.Font = new System.Drawing.Font("Comic Sans MS", 10.875F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
			this.btnRefresh.ForeColor = System.Drawing.SystemColors.ControlLightLight;
			this.btnRefresh.Location = new System.Drawing.Point(832, 676);
			this.btnRefresh.Name = "btnRefresh";
			this.btnRefresh.Size = new System.Drawing.Size(186, 57);
			this.btnRefresh.TabIndex = 26;
			this.btnRefresh.Text = "Refresh";
			this.btnRefresh.UseVisualStyleBackColor = false;
			this.btnRefresh.Click += new System.EventHandler(this.btnRefresh_Click);
			// 
			// UC_UpdateItems
			// 
			this.AutoScaleDimensions = new System.Drawing.SizeF(12F, 25F);
			this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
			this.BackColor = System.Drawing.SystemColors.ControlLightLight;
			this.Controls.Add(this.button2);
			this.Controls.Add(this.btnRefresh);
			this.Controls.Add(this.btnUpdate);
			this.Controls.Add(this.txtName);
			this.Controls.Add(this.label2);
			this.Controls.Add(this.dataGridView1);
			this.Controls.Add(this.txtCategory);
			this.Controls.Add(this.txtPrice);
			this.Controls.Add(this.txtSearchItem);
			this.Controls.Add(this.label6);
			this.Controls.Add(this.label4);
			this.Controls.Add(this.label3);
			this.Controls.Add(this.label1);
			this.Controls.Add(this.pictureBox2);
			this.Controls.Add(this.pictureBox1);
			this.Name = "UC_UpdateItems";
			this.Size = new System.Drawing.Size(1150, 789);
			this.Load += new System.EventHandler(this.UC_UpdateItems_Load);
			((System.ComponentModel.ISupportInitialize)(this.dataGridView1)).EndInit();
			((System.ComponentModel.ISupportInitialize)(this.pictureBox2)).EndInit();
			((System.ComponentModel.ISupportInitialize)(this.pictureBox1)).EndInit();
			this.ResumeLayout(false);
			this.PerformLayout();

		}

		#endregion

		private System.Windows.Forms.Label label1;
		private System.Windows.Forms.TextBox txtCategory;
		private System.Windows.Forms.TextBox txtPrice;
		private System.Windows.Forms.TextBox txtSearchItem;
		private System.Windows.Forms.Label label6;
		private System.Windows.Forms.Label label4;
		private System.Windows.Forms.Label label3;
		private System.Windows.Forms.DataGridView dataGridView1;
		private System.Windows.Forms.TextBox txtName;
		private System.Windows.Forms.Label label2;
		private System.Windows.Forms.PictureBox pictureBox2;
		private System.Windows.Forms.PictureBox pictureBox1;
		private System.Windows.Forms.Button btnUpdate;
		private System.Windows.Forms.Button button2;
		private System.Windows.Forms.Button btnRefresh;
	}
}
