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
	public partial class UC_Welcome : UserControl
	{
		public UC_Welcome()
		{
			InitializeComponent();
		}

		int num = 0;
		private void timer1_Tick(object sender, EventArgs e)
		{
			
			/*if (num == 0) 
			{
				label_banner.Location = new Point(44, 600);
				label_banner.ForeColor = Color.Green;
				num++;
			}
			else if (num == 1) 
			{
				label_banner.Location = new Point(74, 600);
				label_banner.ForeColor = Color.Orange;
				num++;
			}
			else if (num == 2) 
			{
				label_banner.Location = new Point(104, 600);
				label_banner.ForeColor = Color.RoyalBlue;
				num = 0;
			}*/

		}

		private void UC_Welcome_Load(object sender, EventArgs e)
		{
			timer1.Start();
		}
	}
}
