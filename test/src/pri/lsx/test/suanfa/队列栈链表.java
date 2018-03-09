package pri.lsx.test.suanfa;

import java.util.LinkedList;
import java.util.Stack;

class 队列栈链表 {
    public static void main(String[] args) {
        query();//队列
        System.out.println("_______________________________________________________________________________________________________________");
        stack();//栈
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

    /**栈：只需要知道对栈存取数据基本操作就行了*/
    private static void stack(){
        Stack<String> stack = new Stack<String>();
        stack.push("aa");stack.push("bb");stack.push("cc");//添加元素
        System.out.println("判断该栈是否为空"+stack.empty());
        System.out.println("去除该栈的顶元素但是不移除该元素"+stack.peek());
        System.out.println("去除该栈的顶元素并移除该元素"+stack.pop());
        while(!stack.empty()){//遍历该栈中的数据
            System.out.printf(stack.pop());
        }
    }

}
