namespace _APP_DEV_PROJECT__CAFE.AllUserControls
{
	partial class UC_RemoveItems
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
			this.label1 = new System.Windows.Forms.Label();
			this.pictureBox2 = new System.Windows.Forms.PictureBox();
			this.pictureBox1 = new System.Windows.Forms.PictureBox();
			this.label3 = new System.Windows.Forms.Label();
			this.txt_ItemName = new System.Windows.Forms.TextBox();
			this.dataGridView1 = new System.Windows.Forms.DataGridView();
			this.DelLabel = new System.Windows.Forms.Label();
			this.btnRefresh = new System.Windows.Forms.Button();
			((System.ComponentModel.ISupportInitialize)(this.pictureBox2)).BeginInit();
			((System.ComponentModel.ISupportInitialize)(this.pictureBox1)).BeginInit();
			((System.ComponentModel.ISupportInitialize)(this.dataGridView1)).BeginInit();
			this.SuspendLayout();
			// 
			// label1
			// 
			this.label1.AutoSize = true;
			this.label1.Font = new System.Drawing.Font("Comic Sans MS", 16.125F, System.Drawing.FontStyle.Italic, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
			this.label1.ForeColor = System.Drawing.Color.FromArgb(((int)(((byte)(0)))), ((int)(((byte)(118)))), ((int)(((byte)(225)))));
			this.label1.Location = new System.Drawing.Point(47, 45);
			this.label1.Name = "label1";
			this.label1.Size = new System.Drawing.Size(276, 61);
			this.label1.TabIndex = 26;
			this.label1.Text = "Delete Item";
			// 
			// pictureBox2
			// 
			this.pictureBox2.BackColor = System.Drawing.SystemColors.ControlLightLight;
			this.pictureBox2.BorderStyle = System.Windows.Forms.BorderStyle.Fixed3D;
			this.pictureBox2.Location = new System.Drawing.Point(33, 30);
			this.pictureBox2.Name = "pictureBox2";
			this.pictureBox2.Size = new System.Drawing.Size(1080, 721);
			this.pictureBox2.TabIndex = 28;
			this.pictureBox2.TabStop = false;
			// 
			// pictureBox1
			// 
			this.pictureBox1.BackColor = System.Drawing.Color.FromArgb(((int)(((byte)(0)))), ((int)(((byte)(118)))), ((int)(((byte)(225)))));
			this.pictureBox1.Location = new System.Drawing.Point(22, 16);
			this.pictureBox1.Name = "pictureBox1";
			this.pictureBox1.Size = new System.Drawing.Size(1106, 756);
			this.pictureBox1.TabIndex = 27;
			this.pictureBox1.TabStop = false;
			// 
			// label3
			// 
			this.label3.AutoSize = true;
			this.label3.Font = new System.Drawing.Font("Comic Sans MS", 12F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
			this.label3.Location = new System.Drawing.Point(284, 166);
			this.label3.Name = "label3";
			this.label3.Size = new System.Drawing.Size(216, 45);
			this.label3.TabIndex = 30;
			this.label3.Text = "Delete Item:";
			// 
			// txt_ItemName
			// 
			this.txt_ItemName.Font = new System.Drawing.Font("Comic Sans MS", 12F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
			this.txt_ItemName.ForeColor = System.Drawing.SystemColors.ScrollBar;
			this.txt_ItemName.Location = new System.Drawing.Point(292, 228);
			this.txt_ItemName.Name = "txt_ItemName";
			this.txt_ItemName.Size = new System.Drawing.Size(588, 52);
			this.txt_ItemName.TabIndex = 29;
			this.txt_ItemName.Text = "Start Typing....";
			this.txt_ItemName.TextChanged += new System.EventHandler(this.txt_ItemName_TextChanged);
			// 
			// dataGridView1
			// 
			this.dataGridView1.BackgroundColor = System.Drawing.SystemColors.ControlLightLight;
			this.dataGridView1.ColumnHeadersHeightSizeMode = System.Windows.Forms.DataGridViewColumnHeadersHeightSizeMode.AutoSize;
			this.dataGridView1.EditMode = System.Windows.Forms.DataGridViewEditMode.EditProgrammatically;
			this.dataGridView1.Location = new System.Drawing.Point(91, 317);
			this.dataGridView1.Name = "dataGridView1";
			this.dataGridView1.RowHeadersWidth = 82;
			this.dataGridView1.RowTemplate.Height = 33;
			this.dataGridView1.Size = new System.Drawing.Size(972, 364);
			this.dataGridView1.TabIndex = 31;
			this.dataGridView1.CellClick += new System.Windows.Forms.DataGridViewCellEventHandler(this.dataGridView1_CellClick);
			// 
			// DelLabel
			// 
			this.DelLabel.AutoSize = true;
			this.DelLabel.Font = new System.Drawing.Font("Comic Sans MS", 12F, System.Drawing.FontStyle.Italic, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
			this.DelLabel.Location = new System.Drawing.Point(786, 694);
			this.DelLabel.Name = "DelLabel";
			this.DelLabel.Size = new System.Drawing.Size(273, 45);
			this.DelLabel.TabIndex = 32;
			this.DelLabel.Text = "How to Deleted?";
			this.DelLabel.TextAlign = System.Drawing.ContentAlignment.TopRight;
			this.DelLabel.Click += new System.EventHandler(this.DelLabel_Click);
			// 
			// btnRefresh
			// 
			this.btnRefresh.BackColor = System.Drawing.Color.FromArgb(((int)(((byte)(0)))), ((int)(((byte)(118)))), ((int)(((byte)(225)))));
			this.btnRefresh.FlatStyle = System.Windows.Forms.FlatStyle.Flat;
			this.btnRefresh.Font = new System.Drawing.Font("Comic Sans MS", 10.875F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
			this.btnRefresh.ForeColor = System.Drawing.SystemColors.ControlLightLight;
			this.btnRefresh.Location = new System.Drawing.Point(91, 687);
			this.btnRefresh.Name = "btnRefresh";
			this.btnRefresh.Size = new System.Drawing.Size(186, 57);
			this.btnRefresh.TabIndex = 33;
			this.btnRefresh.Text = "Refresh";
			this.btnRefresh.UseVisualStyleBackColor = false;
			this.btnRefresh.Click += new System.EventHandler(this.btnRefresh_Click);
			// 
			// UC_RemoveItems
			// 
			this.AutoScaleDimensions = new System.Drawing.SizeF(12F, 25F);
			this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
			this.BackColor = System.Drawing.SystemColors.ControlLightLight;
			this.Controls.Add(this.btnRefresh);
			this.Controls.Add(this.DelLabel);
			this.Controls.Add(this.dataGridView1);
			this.Controls.Add(this.label3);
			this.Controls.Add(this.txt_ItemName);
			this.Controls.Add(this.label1);
			this.Controls.Add(this.pictureBox2);
			this.Controls.Add(this.pictureBox1);
			this.Name = "UC_RemoveItems";
			this.Size = new System.Drawing.Size(1150, 789);
			this.Load += new System.EventHandler(this.UC_RemoveItems_Load);
			this.Enter += new System.EventHandler(this.UC_RemoveItems_Enter);
			((System.ComponentModel.ISupportInitialize)(this.pictureBox2)).EndInit();
			((System.ComponentModel.ISupportInitialize)(this.pictureBox1)).EndInit();
			((System.ComponentModel.ISupportInitialize)(this.dataGridView1)).EndInit();
			this.ResumeLayout(false);
			this.PerformLayout();

		}

		#endregion

		private System.Windows.Forms.Label label1;
		private System.Windows.Forms.PictureBox pictureBox2;
		private System.Windows.Forms.PictureBox pictureBox1;
		private System.Windows.Forms.Label label3;
		private System.Windows.Forms.TextBox txt_ItemName;
		private System.Windows.Forms.DataGridView dataGridView1;
		private System.Windows.Forms.Label DelLabel;
		private System.Windows.Forms.Button btnRefresh;
	}
}
