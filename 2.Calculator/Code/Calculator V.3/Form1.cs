using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace Calculator_V._3
{
	public partial class Form1 : Form
	{
		public Form1()
		{
			InitializeComponent();
		}

		private void button16_Click(object sender, EventArgs e)
		{
			//
		}

		#region Variable
		string _operator;
		bool operationClick = false;
		double result = 0;
		double prevnum = 0;
		#endregion

		private void Num_Click(object sender, EventArgs e) //กดปุ่มตัวเลขเเล้วขึ้น
		{
			Button bth = (Button)sender;

			if (txtDisplay.Text != "" && operationClick == true) 
			{
				txtDisplay.Text = "";
				operationClick = false;
			}
			txtDisplay.Text += bth.Text;
			AdjustCursor(); //สร้าง method Adjust ไว้ช่วยร่นการเขียนยาว ๆ แล้ว โดย AdjustCursor ทำหน้าที่ปรับข้อความให้ไม่เกิน Textbox
		}
		private void Dot_Click(object sender, EventArgs e)
		{
			if (!txtDisplay.Text.Contains("."))  //Check ว่ามีจุดยัง ถ้ามีแล้วกด . จะไม่ได้ผลอีก
			{
				Button bth = (Button)sender;
				txtDisplay.Text += bth.Text;
				AdjustCursor();
			}
		}

		private void Del_Click(object sender, EventArgs e)
		{
			if (txtDisplay.Text != "") 
			{
				txtDisplay.Text = txtDisplay.Text.Remove(txtDisplay.Text.Length - 1, 1);
				AdjustCursor();
			}
		}

		#region Method
		private void AdjustCursor() //ตัวแสดงไม่ให้ข้อความเกิน TextBox
		{
			txtDisplay.SelectionStart = txtDisplay.Text.Length;
		}
		private void Clear()
		{
			_operator = "";
			operationClick = false;
			result = 0;
			prevnum = 0;
		}
		#endregion
		private void Clear_Click(object sender, EventArgs e)
		{
			txtDisplay.Text = "";
			tod.Text = "";
			Clear();
		}

		private void NegPos_Click(object sender, EventArgs e) //+- ทำหน้าที่กลับเครื่องหมาย +-
		{
			if (txtDisplay.Text[0] == '-')
			{
				txtDisplay.Text = txtDisplay.Text.TrimStart('-');
			}
			else 
			{
				txtDisplay.Text = '-' + txtDisplay.Text; 
			}
		}

		private void Arithmethic_Click(object sender, EventArgs e)
		{
			Button btn = (Button)sender;
			if (prevnum != 0)
			{
				btnEqual.PerformClick();
				_operator = btn.Text;
			}
			else 
			{
				_operator = btn.Text;
			}

			tod.Text = txtDisplay.Text + _operator;
			operationClick = true;
			prevnum = Convert.ToDouble(txtDisplay.Text);
		}
		//////////////////////////////////////////
		private void Equal_Click(object sender, EventArgs e)
		{
			switch (_operator) 
			{
				case "÷":
					result = prevnum / Convert.ToDouble(txtDisplay.Text);
					break;

				case "-":
					result = prevnum - Convert.ToDouble(txtDisplay.Text);
					break;

				case "+":
					result = prevnum + Convert.ToDouble(txtDisplay.Text);
					break;

				case "x":
					result = prevnum * Convert.ToDouble(txtDisplay.Text);
					break;
			}
			txtDisplay.Text = result.ToString();
			tod.Text = txtDisplay.Text + _operator;
			_operator = "";
		}
	}
}
