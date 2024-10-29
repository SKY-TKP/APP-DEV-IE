using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace Capchaa
{
	public partial class Form1 : Form
	{
		public Form1()
		{
			InitializeComponent();
		}

		Bitmap bmp_og;
		Bitmap bmp_analyze;
		private void load_Click(object sender, EventArgs e)
		{
			openFileDialog1.ShowDialog();
			bmp_og = new Bitmap(openFileDialog1.FileName);

			pictureBox1.Image = convert_bitmap(bmp_og);
		}
		private void save_Click(object sender, EventArgs e)
		{
			if (bmp_analyze == null) return;

			if (saveFileDialog1.ShowDialog() == DialogResult.OK)
			{
				bmp_analyze.Save(saveFileDialog1.FileName);
			}
		}
		private Bitmap convert_bitmap(Bitmap bmp)
		{
			return new Bitmap(bmp, pictureBox1.Size);
		}

		private void analyze_Click(object sender, EventArgs e)
		{
			if (bmp_og == null) { return; }

			IDictionary<Color, int> pixelcount = new Dictionary<Color, int>();

			bmp_analyze = new Bitmap(bmp_og);

			for (int x = 0; x < bmp_og.Width; x++)
			{
				for (int y = 0; y < bmp_og.Height; y++)
				{
					Color c = bmp_og.GetPixel(x, y);

					if (pixelcount.ContainsKey(c))
					{
						pixelcount[c]++;
					}
					else
					{
						pixelcount.Add(c, 1);
					}
				}
			}

			List<Color> sort_color = new List<Color>();

			foreach (KeyValuePair<Color, int> colorcount in pixelcount.OrderBy(key => key.Value))
			{
				sort_color.Add(colorcount.Key);
			}

			sort_color.Reverse();

			Color text_color = sort_color[1];

			for (int x = 0; x < bmp_og.Width; x++)
			{
				for (int y = 0; y < bmp_og.Height; y++)
				{
					Color c = bmp_og.GetPixel(x, y);

					if (c == text_color)
					{
						bmp_analyze.SetPixel(x, y, Color.Black);
					}
					else
					{
						bmp_analyze.SetPixel(x, y, Color.White);
					}
				}
			}

			pictureBox2.Image = convert_bitmap(bmp_analyze);


		}
	}
}
