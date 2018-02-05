package pri.lsx.test.qishui;

import java.util.HashMap;
import java.util.Map;

/**
 *有20块钱买汽水，1块一瓶，三盖子换一瓶，两空瓶换一瓶子，共能买多少汽水？
 * @author lisx
 * @2016年12月7日
 */
@SuppressWarnings("all")
public class 买汽水 {
	
	//sum用于保存所求的最终值
	private static int sum=0;
	
	public static void main(String[] args) {
		//开始只有20块钱，零个空瓶，零个盖子
		int cash=20;
		int bottle=0;
		int cap=0;
		while(true){
			//得到对换后的所有参数,保存在map中
			Map<String,Integer> map=getMap(cash, bottle, cap);
			int botSum=map.get("botSum");
			sum+=botSum;
			cash=0;
			//空瓶总数量
			bottle=map.get("bottle")+botSum;
			//盖子总数量
			cap=map.get("cap")+botSum;
			//现金为零并且空瓶数量小于2且盖子数量小于3时不能对换
			if(cash<1 && bottle<2 && cap<3){
				break;
			}
		}
		System.out.println("共能买"+sum+"瓶汽水");	
	}
	
	/**
	 *@param cash
	 *			对换之前带的现金
	 *@param bottle
	 *			对换之前带的空瓶数量
	 *@param cap
	 *			对换之前带的盖子数量
	 *@param botSum
	 *			对换后得到的瓶子总数
	 */
	private static Map<String,Integer> getMap(int cash,int bottle,int cap){
		Map map=new HashMap();
		//的到对换后剩余的瓶子数量
		map.put("bottle", bottle%2);
		//的到对换后剩余的盖子数量
		map.put("cap", cap%3);
		//的到对换后的汽水数量
		map.put("botSum", cash+bottle/2+cap/3);
		System.out.println("对换的汽水瓶数"+(cash+bottle/2+cap/3)+"=  (空瓶对换)"+bottle/2+"(盖子对换)"+cap/3+"-------"+"剩余空瓶"+bottle%2+"剩余盖子"+cap%3);
		return map;
	}
}
