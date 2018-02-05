package test.teshudeduotai;

/**
 * 实现Document的第一个类
 * @author lisx
 * @2017年10月12日
 */
public class DocumentImpTwo implements Document{

	@Override
	public void methodOne() {
		System.out.println("第二个类methodOne");
	}

	@Override
	public void methodTwo() {
		System.out.println("第二个类methodTwo");
	}
	public void methodThree() {
		System.out.println("第二个类独有的methodThree");
	}
}
