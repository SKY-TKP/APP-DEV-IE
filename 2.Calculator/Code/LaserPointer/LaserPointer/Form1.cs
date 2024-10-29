using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace LaserPointer
{
	public partial class Pointer : Form
	{
		public Pointer()
		{
			InitializeComponent();
		}

		Point pointer_location = new Point(0, 0);
		int pointer_size = 20;
		List<Point> pointer_list = new List<Point>();

		private void pictureBox1_MouseMove(object sender, MouseEventArgs e)
		{
			pointer_location = new Point(e.X, e.Y);
			Refresh();
		}

		private void pictureBox1_Paint(object sender, PaintEventArgs e)
		{
			Graphics g = e.Graphics;
			g.FillEllipse(Brushes.Red, pointer_location.X - (pointer_size / 2), pointer_location.Y - (pointer_size / 2), pointer_size, pointer_size);

			int num_index = 0;
			if (pointer_list.Count > 1)
			{
				for (int i = 1; i < pointer_list.Count; i++)
				{
					Point first_point = pointer_list[i - 1];
					Point second_point = pointer_list[i];
					Point postion = new Point((first_point.X + second_point.X) / 2, (first_point.Y + second_point.Y) / 2);

					double distance = Math.Sqrt(Math.Pow((first_point.X - second_point.X), 2) + Math.Pow((first_point.Y - second_point.Y), 2));

					g.DrawString(distance.ToString(), Font, Brushes.Black, postion);
					g.DrawLine(Pens.Green, first_point, second_point);
				}
			}

			foreach (Point point in pointer_list)
			{
				g.FillEllipse(Brushes.Blue, point.X - (pointer_size / 2), point.Y - (pointer_size / 2), pointer_size, pointer_size);
				num_index++;
				g.DrawString(num_index.ToString(), Font, Brushes.White, point.X, point.Y);
			}
		}
		private void pictureBox1_MouseClick(object sender, MouseEventArgs e)
		{
			pointer_list.Add(new Point(e.X, e.Y));
			Refresh();
		}
		private void clear_Click(object sender, EventArgs e)
		{
			pointer_list.Clear();
			Refresh();
		}
	}
}