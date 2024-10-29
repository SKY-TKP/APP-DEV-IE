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
	public partial class UC_Additems : UserControl
	{
		Function fn = new Function();
		String query;
		public UC_Additems()
		{
			InitializeComponent();
		}

		//ปุ่ม Add Item
		private void button1_Click(object sender, EventArgs e)
		{
			query = "insert into New_table_for_project (names,category,price) " +
				"values ('" + txt_ItemName.Text + "','"+ txtCategory.Text + "'," + txt_Price.Text + ")";
			fn.setData(query);
			clearAll();
		}

		private void clearAll() 
		{
			txtCategory.SelectedIndex = -1; //Reset Category
			txt_ItemName.Clear();
			txt_Price.Clear();
		}
		private void UC_Additems_Leave(object sender, EventArgs e)
		{
			clearAll();
		}
		private void txt_Price_TextChanged(object sender, EventArgs e)
		{
			//pass
		}
	}
}
