using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Reflection.Emit;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace Triangle
{
	public partial class Triangle_calculater : Form
	{
		public Triangle_calculater()
		{
			InitializeComponent();
		}

		private void label3_Click(object sender, EventArgs e) //ไม่ต้องยุ่งๆ
		{
			//MessageBox = "Hello";
		}

		double a, b, c, area, s;
		double acos_A, acos_B, acos_C;

		private void label6_Click(object sender, EventArgs e)
		{
			//ไม่ได้ใช้กดผิด T_T
		}

		private void label1_Click(object sender, EventArgs e)
		{
			//ไม่ได้ใช้กดผิด T_T
		}

		private void button2_Click(object sender, EventArgs e)
		{
			MessageBox.Show("Good Bye");
			Close();
		}

		private void Reset_button_Click(object sender, EventArgs e)
		{
			a_text.Text = "";
			b_text.Text = "";
			c_text.Text = "";
			area_result_text.Text = "";
			area_result_text.ForeColor = Color.Black;

		}

		private void calculated_button_Click(object sender, EventArgs e)
		{
			try
			{
				a = Convert.ToSingle(a_text.Text);
				b = Convert.ToSingle(b_text.Text);
				c = Convert.ToSingle(c_text.Text);

				if (a + b > c && a + c > b && b + c > a)
				{
					//AREA_OF_Triangle
					s = (a + b + c) / 2;
					area = Math.Pow(s * (s - a) * (s - b) * (s - c), 0.5);

					//Cosine_law_To_find_arccos_angle
					acos_A = Math.Acos((Math.Pow(a, 2) - Math.Pow(b, 2) - Math.Pow(c, 2)) / (2 * b * c)) * 57.3;
					acos_B = Math.Acos((Math.Pow(b, 2) - Math.Pow(a, 2) - Math.Pow(c, 2)) / (2 * a * c)) * 57.3;
					acos_C = Math.Acos((Math.Pow(c, 2) - Math.Pow(a, 2) - Math.Pow(b, 2)) / (2 * a * b)) * 57.3;

					//Output
					area_result_text.Text = "Area = " + area.ToString("#.####") + " unit^2" + "\r\n" + "acos_A = " + acos_A.ToString("#.##") + "\r\n" + "acos_B = " + acos_B.ToString("#.##") + "\r\n" + "acos_C = " + acos_C.ToString("#.##");
				}
				else
				{
					area_result_text.Text = "This is not triangle.";
					area_result_text.ForeColor = Color.Red;
				}
			}

			catch 
			{
				MessageBox.Show("Please fill out the box with number.");
			}
		}
	}
}
