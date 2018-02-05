package pri.lsx.test.qishui;

/**
 *
 * @author lisx
 * @2016年12月8日
 */
public class Water {

	private static int number = 0;
	private static int money = 20;
	private static int cap = 0;
	private static int bottle = 0;

	public static void main(String[] args) {
	// TODO Auto-generated method stub
	Water.purchase();
	System.out.println(number);
	}

	public static void purchase() {
	++number;
	++cap;
	++bottle;
	if (money > 0) {
	--money;
	purchase();
	}
	if (cap >= 3) {
	cap -= 3;
	purchase();
	}
	if (bottle >= 2) {
	bottle -= 2;
	purchase();
	}
	}

}
