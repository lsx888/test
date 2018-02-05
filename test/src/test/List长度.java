package test;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * List是初始长度是2，当元素数量超过LIst初始长度的时候是否会自动增加。
 * @author lisx
 * @2017年8月8日
 */
public class List长度 {

	public static void main(String[] args) {
		List list=new ArrayList(2);
		list.add("1");
		list.add("2");
		list.add("3");
		System.out.println(list.toString());
		
		Map map=new HashMap();
	}

}
