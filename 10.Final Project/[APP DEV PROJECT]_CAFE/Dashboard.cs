using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace _APP_DEV_PROJECT__CAFE
{
	public partial class Dashboard : Form
	{
		public Dashboard()
		{
			InitializeComponent();
		}

		public Dashboard(string name)
		{

			InitializeComponent();

			if (name == "Guest")
			{
				additems.Hide();
				updateitems.Hide();
				removeitems.Hide();
			}

			else if (name == "Admin")
			{
				additems.Show();
				updateitems.Show();
				removeitems.Show();
			}
		}

		private void logout_linklabel_LinkClicked(object sender, LinkLabelLinkClickedEventArgs e)
		{
			Form1 fm = new Form1();
			this.Hide();
			fm.Show();
		}
		//ใช้เปลี่ยนสีปุ่ม เมื่อคลิก
		private void change_color_when_click(Button button)
		{
			//additems / placeorder / removeitems / updateitems
			//สีพื้นหลัง: #0076E1

			if (button == additems) 
			{
				additems.BackColor = Color.White;
				additems.ForeColor = Color.Black;

				placeorder.BackColor = ColorTranslator.FromHtml("#0076E1");
				placeorder.ForeColor = Color.White;
				removeitems.BackColor = ColorTranslator.FromHtml("#0076E1");
				removeitems.ForeColor = Color.White;
				updateitems.BackColor = ColorTranslator.FromHtml("#0076E1");
				updateitems.ForeColor = Color.White;
			}
			if(button == removeitems) 
			{ 
				removeitems.BackColor = Color.White;
				removeitems.ForeColor = Color.Black;

				placeorder.BackColor = ColorTranslator.FromHtml("#0076E1");
				placeorder.ForeColor = Color.White;
				additems.BackColor = ColorTranslator.FromHtml("#0076E1");
				additems.ForeColor = Color.White;
				updateitems.BackColor = ColorTranslator.FromHtml("#0076E1");
				updateitems.ForeColor = Color.White;
			}

			if(button == updateitems) 
			{
				updateitems.BackColor = Color.White;
				updateitems.ForeColor = Color.Black;

				placeorder.BackColor = ColorTranslator.FromHtml("#0076E1");
				placeorder.ForeColor = Color.White;
				removeitems.BackColor = ColorTranslator.FromHtml("#0076E1");
				removeitems.ForeColor = Color.White;
				additems.BackColor = ColorTranslator.FromHtml("#0076E1");
				additems.ForeColor = Color.White;
			}

			if (button == placeorder)
			{
				placeorder.BackColor = Color.White;
				placeorder.ForeColor = Color.Black;

				additems.BackColor = ColorTranslator.FromHtml("#0076E1");
				additems.ForeColor = Color.White;
				removeitems.BackColor = ColorTranslator.FromHtml("#0076E1");
				removeitems.ForeColor = Color.White;
				updateitems.BackColor = ColorTranslator.FromHtml("#0076E1");
				updateitems.ForeColor = Color.White;
			}
		}
		//โดยปกติตอนเปิด 
		private void Dashboard_Load(object sender, EventArgs e)
		{
			uC_Additems1.Visible = false;
			uC_PlaceOrder2.Visible = false;
			uC_UpdateItems1.Visible = false;
			uC_RemoveItems1.Visible = false;
		}
		private void additems_Click(object sender, EventArgs e)
		{
			change_color_when_click(additems);
			uC_Additems1.Visible = true;
			uC_Additems1.BringToFront();
		}

		private void placeorder_Click(object sender, EventArgs e)
		{
			change_color_when_click(placeorder);
			uC_Welcome1.SendToBack();
			uC_PlaceOrder2.Visible = true;
			uC_PlaceOrder2.BringToFront();
		}

		private void removeitems_Click(object sender, EventArgs e)
		{	
			change_color_when_click(removeitems);
			uC_RemoveItems1.Visible = true;
			uC_RemoveItems1.BringToFront();
			
		}

		private void updateitems_Click(object sender, EventArgs e)
		{
			change_color_when_click(updateitems);
			uC_UpdateItems1.Visible = true;
			uC_UpdateItems1.BringToFront();
		}

		private void exit_button_Click_1(object sender, EventArgs e)
		{
			Application.Exit();
		}
	}
}
