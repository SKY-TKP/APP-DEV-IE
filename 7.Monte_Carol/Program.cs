using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Monte_Carol
{
	internal class Program
	{
		public static void Main(string[] args)
		{
			int no_of_point; //จำนวนจุดที่ต้องการ รับผ่านแป้นพิมพ์
			int no_of_exp; //จำนวนครั้งการทดลองสุ่ม รับผ่านแป้นพิมพ์
			var result_list = new List<double>(); //List เก็บค่าทดสอบ
			double result_avg = 0;
			bool result_OK = false; 
			bool List_OK = false; //เช็คว่าในค่าทุกค่าใน result_list มีค่าเท่ากันมั้ย
			double Pi_estimated = 0;

			//INPUT--------------------------------------------------------------------//
			Console.Write("No of Point: ");
			string no1 = Console.ReadLine();
			no_of_point = Convert.ToInt32(no1);

			Console.Write("No of Exp: ");
			string no2 = Console.ReadLine();
			no_of_exp = Convert.ToInt32(no2);
			Console.WriteLine(" ");
			//-------------------------------------------------------------------------//
			StreamWriter Writer = new StreamWriter("("+no_of_point.ToString()+","+no_of_exp.ToString()+").csv");
			Writer.WriteLine("No Point,{0}", no1);
			Writer.WriteLine("No Exp,{0}",no2);
			Writer.WriteLine(" ");
			//-------------------------------------------------------------------------//
			while (!result_OK) 
			{
				for (int k = 0; k < no_of_exp; k++) 
				{
					Pi_estimated = Monte_Carol(no_of_point);
					result_avg += Pi_estimated;
					result_list.Add(Pi_estimated);
				}
				List_OK = result_list.TrueForAll(x => x.Equals(result_list.First()));
				if (List_OK) 
				{
					result_OK = true;
				}

				int K = 1; //ตัวรันเลข
				foreach (double member in result_list) 
				{
					string member_string = member.ToString();
					Writer.WriteLine("{0},{1}",K.ToString(),member_string);
					Console.WriteLine("Exp #"+K.ToString()+": "+member_string);
					K += 1;
				}

				double Error = Math.Abs(((result_avg / no_of_exp) - Math.PI) / Math.PI) * 100;
				//-------------------------------------------------------------------------//
				Writer.WriteLine(" ");
				Writer.WriteLine("Pi_avg,{0}",(result_avg / no_of_exp).ToString());
				Writer.WriteLine("%Error,{0}",Error.ToString());
				Writer.Close();
				//-------------------------------------------------------------------------//
				Console.WriteLine("\r\nPi_Estimation_average = " + (result_avg/no_of_exp).ToString("#.########"));
				Console.WriteLine("Pi_Real_Value         = " + Math.PI.ToString("#.########"));
				Console.WriteLine("\r\n%Error = " + Error.ToString("#.########") + "%");
				Console.ReadKey();
				//-------------------------------------------------------------------------//
				no_of_point += 1;
				result_list = new List<double>();
			}
		}

		public static double Monte_Carol(int no_of_point) //ฟังก์ชันคำนวณโอกาสจุดใน 1/4 วงกลม
		{
			var rnd = new Random();
			double no_of_point_in_quarter_circle = 0;

			for (int i = 0; i < no_of_point; i++) 
			{
				var x = rnd.NextDouble();
				var y = rnd.NextDouble();
				double distance = Math.Sqrt(x * x + y * y);

				if (distance <= 1.0) 
				{
					no_of_point_in_quarter_circle += 1;
				}
			}
			return 4.00 * (no_of_point_in_quarter_circle / no_of_point);
		}
	}
}
