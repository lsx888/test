package pri.lsx.test.stati.var;
import java.util.HashMap;
import java.util.Map;
/**
 *给var静态变量赋值，并调用该类
 * @author lisx
 * @2016年11月1日
 */
public class InputVar extends Var{
	public static void main(String[] args) {
		Var var=new Var();
		var.methods.put("key", "hello worlsd!");
		var.outPut();
	}
}
