using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace Pi_Estimation_With_Monte_Carlo
{
	public partial class Form1 : Form
	{
		public Form1()
		{
			InitializeComponent();
		}

		int interval = 0;
		Random rnd = new Random();
		double p_x, p_y;
		//int p_x, p_y;
		double pi_estimated;
		double no_of_pi_in_quarter_circle = 0;
		//Bitmap map = new Bitmap(300, 300);

		private void Clear_Click_Click(object sender, EventArgs e)
		{
			interval = 0;
			Input_Text.Text = "";
			no_of_pi_in_quarter_circle = 0;
			pi_estimated = 0;
			Error_Result.Text = "xxxx";
			Pi_Result.Text = "xxxx";
		}

		private void Estimate_Click_Click(object sender, EventArgs e)
		{
			try
			{
				//คำนวณการประมาณค่า PI//
				interval = Convert.ToInt32(Input_Text.Text);
				for (int i = 0; i < interval; i++) 
				{
					p_x = rnd.Next(5001);
					p_y = rnd.Next(5001);
					double distance = Math.Sqrt((p_x * p_x) + (p_y * p_y));

					if (distance <= 5000.0)
					{
						//map.SetPixel(p_x, p_y, Color.Red);
						no_of_pi_in_quarter_circle += 1;
					}
					else 
					{
						//map.SetPixel(p_x, p_y, Color.Blue);
					}
				}

				pi_estimated = 4 * (no_of_pi_in_quarter_circle / interval);
				Pi_Result.Text = pi_estimated.ToString("#.##################");
				Error_Result.Text = (Math.Abs(100 - (pi_estimated / Math.PI) * 100)).ToString("#.##################") + "%";
				//pictureBox1.Image = map;

				no_of_pi_in_quarter_circle = 0;
			}
			catch 
			{
				MessageBox.Show("Error");
			}

		}
	}
}
