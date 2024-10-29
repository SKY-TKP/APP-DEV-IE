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

namespace Forest
{
	public partial class Form1 : Form
	{
		public Form1()
		{
			InitializeComponent();
		}

		double result = 0;
		Bitmap bmp_original_size;
		private void Load_Picture(object sender, EventArgs e)
		{
			if (openFileDialog1.ShowDialog() == DialogResult.OK)
			{
				Bitmap bmp = new Bitmap(openFileDialog1.FileName);
				Bitmap bmp2 = new Bitmap(bmp, Center_Picture.Size);

				Center_Picture.Image = bmp2;
				bmp_original_size = bmp;
				result = 0;
				label1.Text = "0.00%";
			}
		}
		private void Save_Click(object sender, EventArgs e)
		{
			Bitmap bmp2 = bmp_original_size;
			saveFileDialog1.ShowDialog();
			bmp2.Save(saveFileDialog1.FileName); 
		
		}
		private void picture_mousemove(object sender, MouseEventArgs e)
		{
			Bitmap bmp = (Bitmap)Center_Picture.Image;
			if (bmp == null) return;

			Color c = bmp.GetPixel(e.X, e.Y);

			Box_All.BackColor = c;
			Box_R.BackColor = Color.FromArgb(c.R, 0, 0);
			Box_G.BackColor = Color.FromArgb(0, c.G, 0);
			Box_B.BackColor = Color.FromArgb(0, 0, c.B);
			///////////////////////////////////////
			label_R.ForeColor = Color.Black;
			label_G.ForeColor = Color.Black;
			label_B.ForeColor = Color.Black;
			///////////////////////////////////////
			label_R.Text = c.R.ToString();
			label_G.Text = c.G.ToString();
			label_B.Text = c.B.ToString();
		}

		private void calculate_Green_Area(object sender, EventArgs e)
		{
			
			Bitmap bmp = new Bitmap(bmp_original_size) ;
			Bitmap target = new Bitmap(bmp.Width, bmp.Height);

			if (bmp == null) return;
			for (int i = 0; i < bmp.Height; i++)
			{
				for (int j = 0; j < bmp.Width; j++)
				{
					Color c = bmp.GetPixel(j, i);
					if ((1 < c.R) && (1 < c.G) && (1 < c.B) && (60 > c.R) && (90 > c.G) && (70 > c.B))
					{
						result++;
						Color color_g = Color.FromArgb(0, 0, 0);
						target.SetPixel(j, i, Color.Yellow);
					}
					else
					{
						target.SetPixel(j, i, c);
					}
				}
			}

			bmp_original_size = target;
			Center_Picture.Image = new Bitmap(target, Center_Picture.Size);
			Refresh();
			double size;
			size = bmp.Height * bmp.Width;
			label1.Text = (result * 100 / size).ToString("0.00") + "%";

		}
	}
}
