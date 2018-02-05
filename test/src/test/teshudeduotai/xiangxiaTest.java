package test.teshudeduotai;

/**
 * 两个子类都继承了父类，向上转型后执行哪段代码呢
 * @author lisx
 * @2017年10月12日
 */
public class xiangxiaTest {

	public static void main(String[] args) {
		//错误
		xiangxiaSonOne sonOne= (xiangxiaSonOne)new xiangxiaFathcer();//会报错,为什么错误请参考
		sonOne.methodOne();
		
		//正确
		xiangxiaFathcer FatOne= new xiangxiaSonOne();//先向上转型
		 if(FatOne instanceof xiangxiaSonOne){
			 xiangxiaSonOne FatOne1= (xiangxiaSonOne)FatOne;//然后在向下转型
			 FatOne1.methodOne();
		 }
	}

}
