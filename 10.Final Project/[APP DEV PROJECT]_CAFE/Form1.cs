using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Net.Sockets;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace _APP_DEV_PROJECT__CAFE
{
	public partial class Form1 : Form
	{
		public Form1()
		{
			InitializeComponent();

		}

		//USERNAME & PASSWORD
		IDictionary<string, string> Username = new Dictionary<string, string>()
		{
			{"Gun","123456"},
			{"A","000" },
			{"B","1234" }
		};

		//LOGIN WITH GUEST
		private void LinkLabel_LinkClicked(object sender, LinkLabelLinkClickedEventArgs e)
		{
			MessageBox.Show("Welcome ^_^", "Information", MessageBoxButtons.OK, MessageBoxIcon.Information);
			Dashboard ds = new Dashboard("Guest");
			ds.Show();
		}

		//LOGIN WITH USERNAME
		private void Login_Button_Click(object sender, EventArgs e)
		{
			if(username_textbox.Text.Length > 0 &&  Username.ContainsKey(username_textbox.Text)) 
			{
				if (password_textbox.Text == Username[username_textbox.Text])
				{
					MessageBox.Show("Welcome ^_^", "Information", MessageBoxButtons.OK, MessageBoxIcon.Information);
					Dashboard ds = new Dashboard("Admin");
					ds.Show();
					this.Hide();
				}
				else 
				{
					MessageBox.Show("Wrong Password T_T","Retry",MessageBoxButtons.OK, MessageBoxIcon.Information);
					password_textbox.Clear();
				}
			}
			else 
			{
				MessageBox.Show("Error Pls Retry! _ _*", "Warning", MessageBoxButtons.OK, MessageBoxIcon.Error);
				username_textbox.Clear();
				password_textbox.Clear();
			}
		}
	}
}
