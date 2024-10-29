using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;
using System.IO;

namespace Print_Mail
{
    public partial class Default_Form : Form
    {
        int Totalpage = 0;
        string all_contact = "";
        List<string> contact_list = new List<string>();

        public Default_Form()
        {
            InitializeComponent();
        }

        private void OPEN_CSV(object sender, EventArgs e)
        {
            try
            {
                OpenFileDialog dialog = new OpenFileDialog();
                dialog.Title = "Open Csv File";
                dialog.Filter = "CSV files|*.csv";
                dialog.InitialDirectory = @"C:\";

                if (dialog.ShowDialog() == DialogResult.OK)
                {
                    string filename = dialog.FileName;

                    //CSVFILE
                    string[] lines = System.IO.File.ReadAllLines(filename);
                    string[][] data = new string[lines.Length][];

                    foreach (string line in lines) 
                    {
                        //Line = [ Reader , ReaderAd, Sender, SenderAd ]
                        if (line.Length > 0)
                        {
                            data[Totalpage] = line.Split(',');
                            contact_list.AddRange(data[Totalpage]);
                            Totalpage += 1;
                        }
                    }

                    var Data_list = data.ToList().ToList();

                    int i = 1;
                    
                    foreach (string[] member in Data_list) 
                    {
                        all_contact += "No." + i.ToString() + ": " + member[0] + " / " + 
                            member[1] + " / " + member[2] + " / " + member[3] + "\r\n";
                        i += 1;
                    }

                    Data_All.Text = all_contact;
                    No_of_File.Text = Totalpage.ToString();
                }
                
                else
                {
                    return;
                }
            }
            catch 
            {
                MessageBox.Show("Error");
            }
        }
		//contact_list = [r1,rt1,s1,st1, r2,rt2,s2,st2,....]
        //                0              4             8
		private void Save_File_PDF(object sender, EventArgs e)
        {
            if (choose_no.Text != "" && Totalpage > 0) 
            {
                if (choose_no.Text == "0")
                {
                    All_File form3 = new All_File();
                    form3.contact_list = contact_list;
                    form3.totalpage = Totalpage;
                    form3.ShowDialog();
                }
                else 
                {
					int num = 4 * (Convert.ToInt32(choose_no.Text) - 1);
					if (Convert.ToInt32(choose_no.Text) <= Totalpage && Convert.ToInt32(choose_no.Text) > 0)
					{
						Form2 form2 = new Form2();

						form2.Choose = choose_no.Text;
						form2.Reader = contact_list[num];
						form2.ReaderTel = contact_list[num + 1];
						form2.Writer = contact_list[num + 2];
						form2.WriterTel = contact_list[num + 3];
						form2.Totalpage = Totalpage;
						form2.ShowDialog();
					}
					else
					{
						MessageBox.Show("Pls input a correct number.  " + "( 0 to " + Totalpage.ToString() + " )");
					}
				}

			}
			else
			{
				MessageBox.Show("Error");
			}
		}

		private void Example_Click(object sender, EventArgs e)
		{
            Example f = new Example();
            f.ShowDialog();
		}
	}
}
