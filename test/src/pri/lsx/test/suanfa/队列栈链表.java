package pri.lsx.test.suanfa;

import java.util.LinkedList;

class 队列栈链表 {
    public static void main(String[] args) {
        query();//队列

    }

    /**
     队列它只允许在表的前端进行删除操作，而在表的后端进行插入操作。所以这里只介绍删除和新增的方法
    * */
    private static void query(){
        LinkedList<String> query=new LinkedList<String>();
        query.offer("aa");query.offer("bb");query.offer("cc");//这里增加三个参数
        for (String str:query) System.out.println("打印出此时的队列数"+str);//打印出此时的队列数
        System.out.println("返回第一个元素并在队列中删除"+query.poll());//返回第一个元素并在队列中删除
        for (String str:query) System.out.println("打印出此时的队列数"+str);//打印出此时的队列数
        System.out.println("仅返回第一个元素但是不删除该元素"+query.element());//仅返回第一个元素但是不删除该元素
        for (String str:query) System.out.println("打印出此时的队列数"+str);//打印出此时的队列数
        System.out.println("仅返回第一个元素但是不删除该元素"+query.peek());//仅返回第一个元素但是不删除该元素
        for (String str:query) System.out.println("打印出此时的队列数"+str);//打印出此时的队列数
    }
}
