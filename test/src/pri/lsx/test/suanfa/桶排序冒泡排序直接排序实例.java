package pri.lsx.test.suanfa;

import java.util.Scanner;

/**
 * 《啊哈！算法》21练习题,输入2行，第1行为一个正整数，第2行有n个用空格隔开的正整数
 * */
public class 桶排序冒泡排序直接排序实例 {
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

        //TODO 快速排序
        kuaisupaixu(n,sort);
    }

    private static void  tongpaixu(int n,int[] sort){
        int[] tong=new int[1001];
        for (int j=1;j<=1000;j++) tong[j]=0;//初始化
        for (int j=1; j<=n;j++){
            if (sort[j] !=0) tong[sort[j]]++;
        }
        System.out.print("桶排序结果：  ");
        for (int j=1;j<=1000;j++) if (tong[j] !=0) System.out.print(j+" ");//去重并打印出来
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
        for (int j=1;j<=n;j++) if (sort[j]!=sort[j-1])  System.out.print(sort[j]+" ");//去重并打印出来
    }

    private static void kuaisupaixu(int n,int[] sort){
        int left=1,right=n,flag=sort[left];
        快速排序核心代码(left,right,flag,sort);
        System.out.print("快速排序结果：  ");
        for (int j=1;j<=n;j++) if (sort[j]!=sort[j-1])  System.out.print(sort[j]+" ");//去重并打印出来
    }

    private static void 快速排序核心代码(int left,int right,int flag,int[] sort){
        int i=left,j=right,t;
        if (left>=right) return;//结束递归排序
        while (true){
            while (true){
                if(sort[j]<flag && j>=i) j--;//向左移动的小兵
                else break;
            }
            while (true){
                if(sort[i]>flag && i<=j) i++;//向右移动的小兵
                else break;
            }
            //普通交换
            if(i<j){
                t=sort[i];
                sort[i]=sort[j];
                sort[j]=t;
            }
//        最终交换
            if (i==j){
                t=sort[j];
                sort[j]=sort[left];
                sort[left]=t;
                break;
            }
        }
        快速排序核心代码(left,i-1,sort[left],sort);//递归左边的代码
        快速排序核心代码(j+1,right,sort[left],sort);//递归右边的代码
    }

}
