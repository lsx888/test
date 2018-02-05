package test.equals;

public class equal {
    public static void main(String[] args) {
        String st1=new String("str11111");
        String st2=new String("str11111");
        if (st1==st2) System.out.println("=号判定出来他们相等"); else System.out.println("=号判定出来他们不相等");
        if (st1.equals(st2)) System.out.println("equals号判定出来他们相等");
    }
}
