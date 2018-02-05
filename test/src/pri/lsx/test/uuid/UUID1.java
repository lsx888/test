package pri.lsx.test.uuid;

import java.util.UUID;


/**
 *UUID实际上就是随机生成一定格式的数
 * @author lisx
 * @2016年11月4日
 */
public class UUID1 {

	public static void main(String[] args) {
		System.out.println(UUID.randomUUID());
		System.out.println(UUID.randomUUID().toString());
		int i=1;
		while(  i<100){
			System.out.println(UUID.randomUUID().toString().replace("-", "").substring(6, 26));
			i++;
		}
		
	}

}
