using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace _APP_DEV_PROJECT__CAFE.AllUserControls
{
	public partial class UC_RemoveItems : UserControl
	{
		Function fn = new Function();
		String query;
		public UC_RemoveItems()
		{
			InitializeComponent();
		}

		private void UC_RemoveItems_Load(object sender, EventArgs e)
		{
			DelLabel.Text = "How to Deleted?";
			DelLabel.ForeColor = Color.Blue;

			loadData("select * from New_table_for_project");

		}
		private void loadData(string query)
		{
			DataSet ds = fn.getData(query);
			dataGridView1.DataSource = ds.Tables[0];
		}

		private void txt_ItemName_TextChanged(object sender, EventArgs e)
		{
			if (txt_ItemName.Text != "Start Typing....") 
			{
				txt_ItemName.ForeColor = Color.Black;
				query = "select * from New_table_for_project where names like '" + 
					txt_ItemName.Text + "%'";
				loadData(query);
			}
		}

		private void dataGridView1_CellClick(object sender, DataGridViewCellEventArgs e)
		{
			if(MessageBox.Show("Delete items?","Important Message",MessageBoxButtons.OKCancel,
				MessageBoxIcon.Warning) == DialogResult.OK) 
			{
				int id = int.Parse(dataGridView1.Rows[e.RowIndex].Cells[0].Value.ToString());

				query = "delete from New_table_for_project where iid = " + id + "";
				fn.setData(query);
				loadData("select * from New_table_for_project");
			}
		}

		private void DelLabel_Click(object sender, EventArgs e)
		{
			DelLabel.ForeColor= Color.Red;
			DelLabel.Text = "*Click on Row to Delete the Item.";
			DelLabel.Location = new Point(786 - 300, 694);
		}

		private void UC_RemoveItems_Enter(object sender, EventArgs e)
		{
			loadData("select * from New_table_for_project");
		}

		private void btnRefresh_Click(object sender, EventArgs e)
		{
			loadData("select * from New_table_for_project");
		}
	}
}
