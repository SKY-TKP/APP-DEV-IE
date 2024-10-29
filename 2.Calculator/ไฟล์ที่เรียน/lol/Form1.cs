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

namespace lol
{
    public partial class Form1 : Form
    {
        public Form1()
        {
            InitializeComponent();
        }
        Bitmap bmp_original; 

        private void button1_Click(object sender, EventArgs e)
        {
            //openFileDialog1.ShowDialog(); 
            if (openFileDialog1.ShowDialog() == DialogResult.OK)
            {
                StreamReader sr = new StreamReader(openFileDialog1.FileName);
                textBox1.Text = sr.ReadToEnd();
                sr.Close();
            }
        }
        private void button2_Click(object sender, EventArgs e)
        {
            //saveFileDialog1.ShowDialog();

            if (saveFileDialog1.ShowDialog() == DialogResult.OK)
            { 
                StreamWriter sw = new StreamWriter(saveFileDialog1.FileName);
                sw.Write(textBox1.Text);
                sw.Close();
            }
        }

        private void button3_Click(object sender, EventArgs e)
        {
            openFileDialog2.ShowDialog();
            Bitmap bmp = new Bitmap(openFileDialog2.FileName);
            Bitmap bmp2 = new Bitmap(bmp,pictureBox1.Size);
            bmp_original = bmp; //บันทึกไซส์ขนาดภาพดั้งเดิม

            pictureBox1.Image = bmp2;
            
        }

        //โชว์สี เเละเลขโค้ด RGB
        private void pictureBox1_MouseMove(object sender, MouseEventArgs e)
        {
            Bitmap bmp = (Bitmap)pictureBox1.Image;
            if (bmp == null) return;

            Color c = bmp.GetPixel(e.X, e.Y);
            box_all.BackColor = c;

            R.BackColor = Color.FromArgb(c.R, 0, 0);
            G.BackColor = Color.FromArgb(0, c.G, 0);
            B.BackColor = Color.FromArgb(0, 0, c.B);

            label1.Text = c.R.ToString();
            label2.Text = c.G.ToString();
            label3.Text = c.B.ToString();
        }

        //สร้างปุ่มที่ทำให้ภาพเป็นสีขาวดำ
        private void button4_Click(object sender, EventArgs e) 
        {
            //Bitmap bmp = (Bitmap)pictureBox1.Image;
            //if (bmp == null) return;

            Bitmap bmp = new Bitmap(bmp_original);
            Bitmap target = new Bitmap(bmp); 

            for (int x = 0; x < bmp.Width; x++)
                for (int y = 0; y < bmp.Height; y++)

                {
                    //สูตรหาสีเทา
                    Color c = bmp.GetPixel(x, y);
                    int grey = (c.R + c.G + c.B) / 3;
                    Color new_c = Color.FromArgb(grey, grey, grey);

                    target.SetPixel(x,y, new_c);
                }

            //pictureBox1.Image = target;
            bmp_original = target;
            pictureBox1.Image = new Bitmap(bmp_original, pictureBox1.Size);
            Refresh();
        }

        //Save ภาพ
        private void button5_Click(object sender, EventArgs e)
        {
            //Bitmap bmp = (Bitmap)pictureBox1.Image;
            //if (bmp == null) return;

            Bitmap bmp = bmp_original;

            saveFileDialog2.ShowDialog();
            bmp.Save(saveFileDialog2.FileName);
        }
    }
}
