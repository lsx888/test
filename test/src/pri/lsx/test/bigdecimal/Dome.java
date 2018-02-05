package pri.lsx.test.bigdecimal;

import java.math.BigDecimal;

/**
 *直接加是不行的参考http://www.cnblogs.com/chenssy/archive/2012/09/09/2677279.html
 * @author lisx
 * @2017年5月27日
 */
public class Dome {

	public static void main(String[] args) {
		int a=1;int b=4;int c=a+b;
		double a2=1.0;double b2=4.0;double c2=a2+b2;
		double a3=1.000;double b3=4.000;double c3=a3+b3;
		double a4=1.1;double b4=4.1;double c4=a4+b4;
		 //纯整数相加的运行结果也是对的
		 System.out.println(c);
		 //小数点后面是一个零运行的结果也是对的
		 System.out.println(c2);
		 //两个小数后面都有三个零运行的结果就有规定了
		 System.out.println(c3);//等于5.0而不是5.000
		 //只有小数点后面是非零的小数，这样运行的结果才是错的
		 System.out.println(c4);
		 System.out.println(0.06+0.01);
		 System.out.println(1.0-0.42);
		 System.out.println(4.015*100);
		 System.out.println(303.1/1000);

//		 下面使用bigDecimal方式试试
		 double a5=1.1; double b5=4.1;
//		 对两个只有一位小数的double型数字进行精确的四则运算,这种计算方法无效
		 BigDecimal a51=new BigDecimal(a5); BigDecimal b51=new BigDecimal(b5);
		 System.out.println(a51.add(b51).doubleValue());//加法
		 System.out.println(a51.add(b51).doubleValue());
//		 换一种方式对a5和b5两个数值进行计算,这种方式才是对的我日
		 BigDecimal a52=new BigDecimal(Double.toString(a5)); BigDecimal b52=new BigDecimal(Double.toString(b5));
		 System.out.println(a52.add(b52).doubleValue());
 //		 两个字符串相加也是可以的
		 String str1=new String("1.1"); String stz1=new String("4.1");
		 BigDecimal str2=new BigDecimal(str1); BigDecimal stz2=new BigDecimal(stz1);
		 System.out.println(str2.add(stz2).doubleValue());
//		 若精度超过了double的精度，还能精确计算吗？
		 double a6=1.111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111;
		 double b6=4.111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111;
		 System.out.println(a6+b6);//直接相加会出问题
		 //下面试下BigDecimal方法
		 BigDecimal a61=new BigDecimal(Double.toString(a6)); BigDecimal b62=new BigDecimal(Double.toString(b6));
		 System.out.println(a61.add(b62));


	}

}
