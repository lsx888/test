package pri.lsx.test.stati.var;

import java.util.HashMap;
import java.util.Map;

/**
 *测试一下能否使用其他类（InputVar）给此类（Var）的静态变量赋值
 * @author lisx
 * @2016年11月1日
 */
@SuppressWarnings({"unchecked", "rawtypes"})
public class Var {
    protected static Map<String, String> methods = new HashMap();
	public void outPut(){ 
		System.out.println(methods);
	}
}
