package pri.lsx.test.qishui;

/**
 *
 * @author lisx
 * @2016年12月7日
 */
public class Main {

	   public static void main(String[] args)
	    {
	        System.out.println(test(0, 20, 20));
	    }
	 
	    public static int test(int sum, int pingzi, int gaizi){
	        if(pingzi < 3 && gaizi < 2){
	            return sum;
	        }
	        int newPingzi = pingzi/3;
	        int newGaizi = gaizi/2;
	        sum += newPingzi;
	        sum += newGaizi;
	        pingzi = newPingzi + pingzi%3+newGaizi;
	        gaizi = newGaizi + gaizi%2+newPingzi;
	        return test(sum, pingzi, gaizi);
	    }

}
