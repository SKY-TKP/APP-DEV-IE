using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Diagnostics.Contracts;
using System.Drawing;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace Print_Mail
{
	public partial class All_File : Form
	{
		public All_File()
		{
			InitializeComponent();
		}

		public int totalpage;
		public List<string> contact_list;

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

		void Detail(Graphics g, String Rd, String RdT, String Wt, String WtT)
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
			g.DrawString("[Details of Mail]", Font, Brushes.Black, 10, ymargin + yline * yspace);
			yline++;
			yline++;

			ymargin = 250;
			g.DrawString("GoodBye", Font, Brushes.Black, 10, ymargin + yline * yspace);
			yline++;
			g.DrawString("Form: " + Wt, Font, Brushes.Black, 10, ymargin + yline * yspace);
			yline++;
			g.DrawString("Address: " + WtT, Font, Brushes.Black, 10, ymargin + yline * yspace);
		}

		private void printDocument1_PrintPage(object sender, System.Drawing.Printing.PrintPageEventArgs e)
		{   
			//contact_list = [r1,rt1,s1,st1, r2,rt2,s2,st2,....]

			List<string> new_Reader = new List<string>();
			List<string> new_ReaderTel = new List<string>();
			List<string> new_Writer = new List<string>();
			List<string> new_WriterTel = new List<string>();

			int k = 0;
			for (int i = 0; i < totalpage; i++) 
			{
				string ReaderName = contact_list[k];
				string ReaderAddress = contact_list[k+1];
				string WriterName = contact_list[k+2];
				string WriterAddress = contact_list[k+3];

				new_Reader.Add(ReaderName);
				new_ReaderTel.Add(ReaderAddress);
				new_Writer.Add(WriterName);
				new_WriterTel.Add(WriterAddress);
				k = k + 4;

				//Detail(e.Graphics, ReaderName, ReaderAddress, WriterName, WriterAddress);
			}

			//new_Reader = [r1,r2,...]
			//new_ReaderTel = [rt1,rt2,...]
			//new_Writer = [w1,w2,....]
			//new_WriterTel = [wt1,wt2,...]

			Detail(e.Graphics, new_Reader.ElementAt(totalpage-1), new_ReaderTel.ElementAt(totalpage - 1),
				new_Writer.ElementAt(totalpage - 1), new_WriterTel.ElementAt(totalpage - 1));

			//Detail(e.Graphics, "TEST", "HI", "ABC", "EIEI");
			//Detail(e.Graphics, "EI", "HI", "ABC", "EIEI");
			//totalpage = 6 --> 5 --> 4 --> 3 --> 2 ---> 1 

			if (totalpage > 1)
			{
				Console.WriteLine(totalpage);
				e.HasMorePages = true;
				totalpage--;
			}
		}

		private void pictureBox1_Paint(object sender, PaintEventArgs e)
		{
			Detail(e.Graphics, "<<Rd>>", "<<RdT>>", "<<Wt>>","<<WtT>>");
		}
	}
}
