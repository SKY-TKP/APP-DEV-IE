using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Birthday_paradox
{
	internal class Program
	{
		static void Main(string[] args)
		{
			int round_loop; //จำนวนรอบการทำซ้ำ เพื่อหาค่าเฉลี่ย
			int number_of_stu; //จำนวนนักเรียน
			int expected_round; //จำนวนรอบการสุ่ม
			int event_count; //นับเหตุการณ์ที่สนใจ
			double result;
			double expected_value = 0;
			double Error;
			

			//INPUT-------------------------------------------------------------------//
			Console.Write("The number of student: ");
			string str1 = Console.ReadLine();
			number_of_stu = Convert.ToInt32(str1);

			Console.Write("Expected_round: ");
			string str2 = Console.ReadLine();
			expected_round = Convert.ToInt32(str2);

			Console.Write("No of Loop: ");
			string str3 = Console.ReadLine();
			round_loop = Convert.ToInt32(str3);

			Console.WriteLine(" ");
			//HEADLINE------------------------------------------------------------------//
			StreamWriter sw = new StreamWriter("(" + number_of_stu.ToString() + ", " + 
				round_loop.ToString() + ", " + expected_round.ToString() + ").csv");
			sw.WriteLine("no_of_stu,{0}", number_of_stu.ToString());
			sw.WriteLine("expected_round,{0}",expected_round.ToString());
			sw.WriteLine("no_of_loop,{0}",round_loop.ToString()+"\r\n");
			//CALCULATED-----------------------------------------------------------//
			for (int j = 1; j < round_loop + 1; j++) 
			{
				event_count = 0;
				for (int i = 0; i < expected_round - 1; i++)
				{
					Dictionary<int, int> birthday = Random_bithday(number_of_stu);
					//Birthday = {วันเกิด:จำนวนคน} = {1:50,20:32,....}
					foreach (var data in birthday)
					{
						if (data.Value > 1)
						{
							event_count += 1;
							break;
						}
					}
				}

				result = (Convert.ToDouble(event_count) / Convert.ToDouble(expected_round)) * 100;
				sw.WriteLine("{0},{1}",j.ToString(), result.ToString());

				expected_value += result;
				if(j < 10) { Console.WriteLine("Round " + j.ToString() + "  => " + result.ToString() + "%"); }
				else { Console.WriteLine("Round " + j.ToString() + " => " + result.ToString() + "%"); }
				
			}

			Error = (Math.Abs(expected_value / (Convert.ToDouble(round_loop) * Theory_Probability(number_of_stu)) - 1) * 100);
			//WRITED_TO_CSV-------------------------------------------------------------//
			sw.WriteLine("");
			sw.WriteLine("The Avg value,{0}", (expected_value / Convert.ToDouble(round_loop)).ToString());
			sw.WriteLine("Theory Value,{0}", Theory_Probability(number_of_stu).ToString());
			sw.WriteLine("%Error,{0}",Error.ToString());
			sw.Close();
			//CONSOLE_OUTPUT------------------------------------------------------------//
			Console.WriteLine("\r\nThe Average Value = "+ (expected_value/Convert.ToDouble(round_loop)).ToString("#.###########") + "%");
			Console.WriteLine("Theory Value = " + Theory_Probability(number_of_stu).ToString("#.###########")+"%");
			Console.ForegroundColor = ConsoleColor.Red;
			Console.WriteLine("%Error = " + Error.ToString("#.###########") +"%");
			Console.ReadKey();
		}

		static Dictionary<int,int> Random_bithday(int no_of_stu) 
		{
			Random rnd = new Random();
			Dictionary<int,int> outputbirthday = new Dictionary<int,int>();

			for (int i = 0; i < no_of_stu; i++) //รันคนที่ 1 - คนที่ no_of_stu
			{
				int Rd_Bithday = Convert.ToInt32(rnd.Next(365));
				if (outputbirthday.ContainsKey(Rd_Bithday))
				{
					outputbirthday[Rd_Bithday] += 1;
				}
				else 
				{
					outputbirthday.Add(Rd_Bithday, 1);
				}
			}
			return outputbirthday;
		}
		static double Theory_Probability(int no_of_stu) 
		{
			double no_event = 1;
			for (int i = (365 - no_of_stu + 1); i <= 365; i++) 
			{
				no_event = no_event * i;
			}
			double prob_theory_result = (1 - (no_event / Math.Pow(365, no_of_stu))) * 100;
			return prob_theory_result;
		}
	}
}
