package test.teshudeduotai;

/**
 * 实现Document的第一个类
 * @author lisx
 * @2017年10月12日
 */
public class DocumentImpOne implements Document{

	@Override
	public void methodOne() {
		System.out.println("第一个类methodOne");
	}

	@Override
	public void methodTwo() {
		System.out.println("第一个类methodTwo");
	}
	public void methodThree() {
		System.out.println("第一个类独有的methodThree");
	}
}
