package pri.lsx.test.tooltest;

import pri.lsx.test.tool.BaseUtils;

/**
 *将数字转化为大写汉子
 * @author lisx
 * @2016年11月2日
 */
public class 将数字转化为大写汉子{

	static String mny="3333333333";
	public static void main(String[] args) {
		
		BaseUtils.toMoneyUpper(mny);
		System.out.println(mny);
	}

}
