using DGVPrinterHelper;
using Microsoft.VisualBasic.ApplicationServices;
using Microsoft.VisualBasic.Logging;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.IO;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;
using System.Xml.Schema;

namespace _APP_DEV_PROJECT__CAFE.AllUserControls
{
	public partial class UC_PlaceOrder : UserControl
	{
		Function fn = new Function();
		String query;
		public UC_PlaceOrder()
		{
			InitializeComponent();
		}
		//show ชื่อรายการอาหารทั้งหมดในหมวดหมู่
		private void showItemList(String query) 
		{
			listBox1.Items.Clear();
			DataSet ds = fn.getData(query);

			for (int i = 0; i < ds.Tables[0].Rows.Count; i++)
			{
				listBox1.Items.Add(ds.Tables[0].Rows[i][0].ToString());
			}
		}
		//เลือกหมวดหมู่อาหาร แล้วใช้ showItemList ดึงชื่อทั้งหมดออกมา
		private void comboCatagory_SelectedIndexChanged(object sender, EventArgs e)
		{
			
			String category_ = comboCatagory.Text;
			query = "select names from New_table_for_project where category ='" + 
				category_ + "'";
			showItemList(query);
		}

		//ค้นหาชื่อ
		private void txtSearch_TextChanged(object sender, EventArgs e)
		{
			String category_ = comboCatagory.Text;
			query = "select names from New_table_for_project where category ='" + 
				category_ + "' and names like '"+txtSearch.Text+"%'";
			showItemList(query);
		}

		//เลือกรายการอาหาร
		private void listBox1_SelectedIndexChanged(object sender, EventArgs e)
		{
			txtQuantityUpDown.ResetText();
			txtTotal.Clear();

			String text = listBox1.GetItemText(listBox1.SelectedItem);
			txtItemName.Text = text;
			query = "select price from New_table_for_project where names = '" + text + "'";
			DataSet ds = fn.getData(query);
			txtQuantityUpDown.Text = "0";
			txtTotal.Text = "0.00";
			txtDisCount.Text = "0";

			try
			{
				txtPrice.Text = ds.Tables[0].Rows[0][0].ToString();
			}
			catch {}
		}

		//เลือกจำนวน
		private void txtQuantityUpDown_ValueChanged(object sender, EventArgs e)
		{
			try 
			{
				Int64 quan = Int64.Parse(txtQuantityUpDown.Value.ToString());
				Int64 price = Int64.Parse(txtPrice.Text);
				txtTotal.Text = (quan * price).ToString("#.##");
			}
			catch { }
		}

		//กดเพิ่มข้อมูลลงตาราง
		protected int n, total = 0;
		private void bthAddtoCart_Click(object sender, EventArgs e)
		{
			/*DataGrid
			  Name     Unit     Quantity    Discount    Total/Price
			   A        50         5           10           250 - 10% = 225
			*/

			if (Int64.Parse(txtDisCount.Text) <= 100 && Int64.Parse(txtDisCount.Text) >= 0)
			{
				if (txtTotal.Text != "0" && txtTotal.Text != "" && txtQuantityUpDown.Text != "0")
				{
					int New_total = (int)Math.Ceiling(Int64.Parse(txtTotal.Text) * (1 - 0.01 * Int64.Parse(txtDisCount.Text)));
					int Original_total = int.Parse(txtTotal.Text);

					n = dataGridView1.Rows.Add();
					dataGridView1.Rows[n].Cells[0].Value = txtItemName.Text;
					dataGridView1.Rows[n].Cells[1].Value = txtPrice.Text;
					dataGridView1.Rows[n].Cells[2].Value = txtQuantityUpDown.Value;

					if (txtDisCount.Text == "0")
					{
						dataGridView1.Rows[n].Cells[3].Value = "-";
					}
					else
					{
						dataGridView1.Rows[n].Cells[3].Value = (Original_total - New_total).ToString()+" (-"+txtDisCount.Text+"%)";
					}

					dataGridView1.Rows[n].Cells[4].Value = New_total.ToString();

					total = total + New_total;
					txtTotalAmount.Text = total.ToString("#.##") + ".00 B";
				}
				else
				{
					MessageBox.Show("Minimum Quantity need to be 1", "Information",
						MessageBoxButtons.OK, MessageBoxIcon.Information);
				}
			}
			else 
			{
				MessageBox.Show("Plz input discount in range (0,100)", "Warning",
					MessageBoxButtons.OK,MessageBoxIcon.Warning);
				txtDisCount.Clear();
			}

			
		}

		//เตรียมจะลบข้อมูล
		int amount;
		private void dataGridView1_CellClick(object sender, DataGridViewCellEventArgs e)
		{
			if (dataGridView1.Rows[dataGridView1.CurrentCell.RowIndex] != null) 
			{
				try
				{
					amount = int.Parse(dataGridView1.Rows[e.RowIndex].Cells[4].Value.ToString());
				}
				catch { }
			}
		}
		//ลบข้อมูล
		private void btnRemove_Click(object sender, EventArgs e)
		{
			try 
			{
				int rowIndex = dataGridView1.CurrentCell.RowIndex;
				dataGridView1.Rows.RemoveAt(rowIndex);
			}
			catch { }
			total -= amount;
			txtTotalAmount.Text = total.ToString("#.##") + ".00 B";
		}

		//ไปยืม source code คนอื่น//
		private void btnPrint_Click(object sender, EventArgs e)
		{
			DGVPrinter printer = new DGVPrinter();
			//Text//
			printer.Title = "Customer Bill";
			printer.SubTitle = "I Want to Sleep Plzz 'Cafe \n\r" 
				+ "Chula Soi 999, Bangjungah BKK 10500" + "\n\r"
				+ string.Format("Date: {0}", DateTime.Now) + "\n\r";
			printer.SubTitleFormatFlags = StringFormatFlags.LineLimit | StringFormatFlags.NoClip;
			printer.PageNumbers = true;
			printer.PageNumberInHeader = false;
			printer.PorportionalColumns = true;
			printer.HeaderCellAlignment = StringAlignment.Near;
			printer.Footer = "Total Payable Amount : " + txtTotalAmount.Text
				+ "\n\r Thank you, Good bye ^_^";
			printer.FooterSpacing = 45;
			printer.PrintDataGridView(dataGridView1);

			total = 0;
			dataGridView1.Rows.Clear();
			txtTotalAmount.Text = "0.00B";
		}
	}
}
