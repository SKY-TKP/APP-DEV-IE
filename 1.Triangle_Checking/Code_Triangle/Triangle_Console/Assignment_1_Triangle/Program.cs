using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Assignment_1_Triangle
{
	internal class Program
	{
		static void Main(string[] args)
		{
			string data_row;
			string[] arr;

			StreamReader Reader = new StreamReader("triangle.csv");
			StreamWriter Writer = new StreamWriter("solution.csv");

			while ((data_row = Reader.ReadLine()) != null)
			{
				arr = data_row.Split(',');

				int a, b, c;
				a = Convert.ToInt32(arr[0]);
				b = Convert.ToInt32(arr[1]);
				c = Convert.ToInt32(arr[2]);

				if (triangle_inequality(a, b, c))
				{
					Writer.WriteLine("{0},{1},{2},Yes,{3}", a, b, c, area_of_triangle(a, b, c));
				}
				else 
				{
					Writer.WriteLine("{0},{1},{2},No", a, b, c);
				}
				
			}
			Reader.Close();
			Writer.Close();
		}
		static bool triangle_inequality(int a, int b, int c)
		{
			return (a + b > c) && a + c > b && (b + c > a);
		}
		static double area_of_triangle(float a, float b, float c)
		{
			double area, s;
			s = (a + b + c) / 2;
			area = Math.Pow(s * (s - a) * (s - b) * (s - c), 0.5);
			return area;
		}
		


	}
}
