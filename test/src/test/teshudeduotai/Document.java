package test.teshudeduotai;

/**
 * 创建一个接口用于测试特殊的多态这 功能，我不知道这个方式算不算多态，所以自己取名为特殊的多态。
 * 经过查询真的有这种多态（及就是“java接口实现多态”），最简单的多态是父类与单一子类的关系，现在测试的是接口与多个类的关系多个可参考http://blog.csdn.net/oguro/article/details/53086720
 * @author lisx
 * @2017年10月12日
 */
public interface Document {
	public void methodOne();
	public void methodTwo();
}
