using Guna.UI2.HtmlRenderer.Adapters.Entities;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Diagnostics;
using System.Drawing;
using System.Linq;
using System.Security.AccessControl;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;
using System.Xml.Linq;

namespace _APP_DEV_PROJECT__CAFE.AllUserControls
{
	public partial class UC_UpdateItems : UserControl
	{
		Function fn = new Function();
		String query;
		public UC_UpdateItems()
		{
			InitializeComponent();
		}
		private void UC_UpdateItems_Load(object sender, EventArgs e)
		{
			query = "select * from New_table_for_project";
			loadData(query);
		}

		private void loadData(string query) 
		{
			DataSet ds = fn.getData(query);
			dataGridView1.DataSource = ds.Tables[0];
		}

		private void txtSearchItem_TextChanged(object sender, EventArgs e)
		{
			query = "select * from New_table_for_project where names like '" 
				+ txtSearchItem.Text + "%'";
			loadData(query);
		}

		int id;
		private void dataGridView1_CellClick(object sender, DataGridViewCellEventArgs e)
		{
			try 
			{
				id = int.Parse(dataGridView1.Rows[e.RowIndex].Cells[0].Value.ToString());
				String category = dataGridView1.Rows[e.RowIndex].Cells[2].Value.ToString();
				String name = dataGridView1.Rows[e.RowIndex].Cells[1].Value.ToString();
				int price = int.Parse(dataGridView1.Rows[e.RowIndex].Cells[3].Value.ToString());

				txtCategory.ForeColor = Color.Black;
				txtCategory.Text = category;

				txtName.ForeColor = Color.Black;
				txtName.Text = name;

				txtPrice.ForeColor = Color.Black;
				txtPrice.Text = price.ToString(); 
			} 
			catch { }
		}

		private void btnUpdate_Click(object sender, EventArgs e)
		{
			query = "update New_table_for_project set names = '" + txtName.Text + "'" +
				",category= '" + txtCategory.Text + "'" +
				",price = " + txtPrice.Text + "" +
				" where iid = " + id + "";

			fn.setData(query);
			loadData("select * from New_table_for_project");

			txtCategory.Text = "   Category";
			txtCategory.ForeColor = Color.Silver;
			txtName.Text = "   Item Name";
			txtName.ForeColor = Color.Silver;
			txtPrice.Text = "   Price";
			txtPrice.ForeColor = Color.Silver;
		}

		private void btnRefresh_Click(object sender, EventArgs e)
		{
			loadData("select * from New_table_for_project");
		}
	}
}
