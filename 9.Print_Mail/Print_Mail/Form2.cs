using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Diagnostics.Contracts;
using System.Drawing;
using System.Drawing.Printing;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace Print_Mail
{
	public partial class Form2 : Form
	{
		public Form2()
		{
			InitializeComponent();
		}

		public int Totalpage;
		public string Choose,Reader, ReaderTel, Writer, WriterTel;
		private void printDocument1_PrintPage(object sender, PrintPageEventArgs e)
		{
			Detail(e.Graphics, Reader, ReaderTel, Writer, WriterTel);
		}

		private void Print_Click(object sender, EventArgs e)
		{
			PrintDialog dlg = new PrintDialog();
			dlg.Document = printDocument1;

			DialogResult result = dlg.ShowDialog();

			if (result == DialogResult.OK) 
			{
				printDocument1.Print();
			}
		}

		private void pictureBox1_Paint(object sender, PaintEventArgs e)
		{
			label4.Text = Choose;
			label5.Text = Reader;
			label6.Text = Writer;
			Detail(e.Graphics, Reader, ReaderTel, Writer, WriterTel);
		}

		void Detail(Graphics g, String Rd, String RdT,String Wt,String WtT) 
		{
			int yline = 0;
			int yspace = 15;

			int ymargin;

			g.FillRectangle(Brushes.Red, 10, 10, 50, 50);
			g.DrawString("CK", Font, Brushes.White, 25, 30);

			ymargin = 120;
			g.DrawString("Dear: " + Rd, Font, Brushes.Black, 10, ymargin + yline * yspace);
			yline++;
			yline++;
			g.DrawString("Address: " + RdT, Font, Brushes.Black, 10, ymargin + yline * yspace);
			yline++;

			ymargin = 200;
			yline = 0;
			yspace = 22;
			g.DrawString("[Details of Mail]", Font,Brushes.Black, 10, ymargin + yline * yspace);
			yline++;
			yline++;

			ymargin = 250;
			g.DrawString("GoodBye", Font, Brushes.Black, 10, ymargin + yline * yspace);
			yline++;
			g.DrawString("Form: " + Wt, Font, Brushes.Black, 10, ymargin + yline * yspace);
			yline++;
			g.DrawString("Address: " + WtT, Font, Brushes.Black, 10, ymargin + yline * yspace);
		}
	}
}
