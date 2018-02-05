package test.teshudeduotai;

/**
 * 如果两个同时都实现了该接口，那么多态时执行的是哪一个类的方法呢。类似的情况出现在/netfacems/javacode/common/com/yinhai/wt/common/tools/XmlUtils.java 31 line
 * @author lisx
 * @2017年10月12日
 */
public class DocumentTest {

	public static void main(String[] args) {
		Document docOne=new DocumentImpOne();
		Document docTwo=new DocumentImpTwo();
		docOne.methodOne();//输出“第一个类methodOne”，无法使用methodThree这个方法
		docTwo.methodTwo();//输出“第二个类methodTwo”，无法使用methodThree这个方法
	}

}
