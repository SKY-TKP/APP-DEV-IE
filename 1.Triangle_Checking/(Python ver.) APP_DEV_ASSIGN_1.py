import pandas as pd

df = pd.read_csv("triangle.csv",header = None)
ncol4 = [] ; ncol5 = []
#----------------------------------------------------------------------
def area_triangle(a,b,c) :
    s = (a+b+c)/2
    area = (s*(s-a)*(s-b)*(s-c))**0.5
    return round(area,3)

def triangle_inequality(a,b,c):
    return (a+b > c) and (a+c > b) and (b+c > a) 
#----------------------------------------------------------------------
for row in range (len(df)) :
    a = float(df[0][row]) 
    b = float(df[1][row]) 
    c = float(df[2][row])
    
    if(triangle_inequality(a,b,c)) :
        ncol4.append("Yes")
        ncol5.append(area_triangle(a,b,c))
    else :
        ncol4.append("No")
        ncol5.append(" ")
    
#     if(triangle_inequality(a,b,c)) :
#         print(str(a)+" "+str(b)+" "+str(c)+" "+str("YES")+" "+str(area_triangle(a,b,c)))
#     else :
#         print(str(a)+" "+str(b)+" "+str(c)+" "+str("NO"))

#----------------------------------------------------------------------
# เอาคอลัมม์ที่บอกว่าเป็นสามเหลี่ยม กับหาพื้นที่ไปต่อกับข้อมูลเดิม #
ndf4 = pd.DataFrame({"Triangle ?" : ncol4})
ndf5 = pd.DataFrame({"Area" : ncol5})

ndf = df.merge(ndf4,left_index = True,right_index = True).\
      merge(ndf5,left_index = True,right_index = True)

#สร้าง file คำตอบ
ndf.to_excel("data.xlsx", sheet_name = "Solution", index=False, header=False)


    