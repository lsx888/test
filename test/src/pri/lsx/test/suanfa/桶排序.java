package pri.lsx.test.suanfa;

import java.util.Scanner;

/**
 * 《啊哈！算法》21练习题,输入2行，第1行为一个正整数，第2行有n个用空格隔开的正整数
 * */
public class 桶排序 {
    public static void main(String[] args) {
        int n,i=1;
        int[] sort;
        Scanner scn = new Scanner(System.in);
        n=scn.nextInt();//输入数字的总个数
        sort=new int[n+1];
        //得到所有的数字，保存到sort数组中
        while (true){
            sort[i]=scn.nextInt();
            if (i == n){
                scn.close();
                break;
            }
            i++;
        }
        /* while (i>0){//循环输出刚刚输入的数
              System.out.print(sort[i]+"  "); i--;
          }*/

        //TODO 桶排序
        tongpaixu(n,sort);

        //TODO 冒泡排序
        maopaopaixu(n,sort);
    }

    private static void  tongpaixu(int n,int[] sort){
        int[] tong=new int[1001];
        for (int j=1;j<=1000;j++) tong[j]=0;//初始化
        for (int j=1; j<=n;j++){
            if (sort[j] !=0) tong[sort[j]]++;
        }
        System.out.print("桶排序结果：  ");
        for (int j=1;j<=1000;j++) if (tong[j] ==1) System.out.print(j+" ");//去重并打印出来
    }
    private static void  maopaopaixu(int n,int[] sort){
        int t;
        for (int j=1;j<=n;j++){
            for (int k=1;k<=n-j;k++){
                if (sort[k]>sort[k+1]) {
                    t=sort[k];
                    sort[k]=sort[k+1];
                    sort[k+1]=t;
                }
            }
        }
        System.out.print("冒泡排序结果：  ");
        for (int j=1;j<=n-1;j++) if (sort[j] ==1) System.out.print(j+" ");//去重并打印出来
    }
}
