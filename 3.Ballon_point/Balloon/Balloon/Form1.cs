using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;


namespace Balloon
{
	public partial class Form1 : Form
	{
		public Form1()
		{
			InitializeComponent();
		}

		#region Variable
		//double time = 0.0;
		int time = 0;
		Point ball = new Point(20, 20);
		Point v = new Point(3, 0); //Vx = 3 , Vy = 0
		Point a = new Point(0, 1);
		#endregion

		private void start_click(object sender, EventArgs e)
		{
			timer1.Start();
		}
		private void stop_click(object sender, EventArgs e)
		{
			timer1.Stop();
		}
		private void pictureBox1_Paint(object sender, PaintEventArgs e)
		{
			Graphics g = e.Graphics;
			g.FillEllipse(Brushes.Red, ball.X - 10, ball.Y - 10, 20, 20);
		}

		private void timer1_Tick(object sender, EventArgs e)
		{
			//time += 0.1;
			time += 1;
			clock.Text = ((double)time / 10.0).ToString();

			//timer1.Stop();
			//MessageBox.Show("");
			//timer1.Start();


			ball.X += v.X;
			ball.Y += v.Y;

			if (ball.Y > pictureBox1.Height)
			{
				v.Y = -v.Y;
				ball.Y = pictureBox1.Height - (ball.Y - pictureBox1.Height);

			}

			v.X += a.X;
			v.Y += a.Y;

			if (ball.X > pictureBox1.Width)
			{
				v.X = -v.X;
				ball.X = pictureBox1.Width - (ball.X - pictureBox1.Width);

			}

			if (ball.X < 0)
			{
				v.X = -v.X;
				ball.X = 0;
			}

			if (ball.X > pictureBox1.Width)
			{
				v.X = -v.X;
				ball.X = (ball.X - pictureBox1.Width) - pictureBox1.Width;

			}

			v.X += a.X;
			v.Y += a.Y;

			Refresh();
		}

		#region Balloon_Speed
		private void up_Vx_click(object sender, EventArgs e)
		{
			v.X += 1;
		}

		private void down_Vx_click(object sender, EventArgs e)
		{
			v.X -= 1;
		}

		private void up_Vy_click(object sender, EventArgs e)
		{
			v.Y += 1;
		}

		private void down_Vy_click(object sender, EventArgs e)
		{
			v.Y -= 1;
		}
		#endregion
	}
}
