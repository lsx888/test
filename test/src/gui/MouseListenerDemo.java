package gui;

import java.awt.*;
import javax.swing.*;

/**
 * 鼠标监听事件
 * @author lisx
 * @2017年5月10日
 */
@SuppressWarnings("all")
public class MouseListenerDemo {

	public static void main(String[] args) {
		String [] listStr={"列表一","列表二"};
//		new GuiClass("简单的布局", "一个按钮", "WebRoot/webapp/image/cqe.jpg").getImageJfame();
//		new GuiClass("panel分割布局","一个按钮", "WebRoot/webapp/image/bg.jpg").usePanelJframe();
		new GuiClass("split分割布局","一个按钮", "WebRoot/webapp/image/cqe.jpg").userJSplitPaneJFrame(listStr);
	}
	
}

/** 图形化界面基本函数 */ 
class GuiClass extends JFrame{
	String title=null;
	String text=null;
	String titleUrl=null;
	//初始化值
	GuiClass(String title,String text,String titleUrl){
		this.title=title;
		this.text=text;
		this.titleUrl=titleUrl;
		this.setTitle(title);
		this.setIconImage(new ImageIcon(titleUrl).getImage());
		this.setSize(500, 500);
		this.setVisible(true);
		this.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
	}
	
	/**得到带图片的布局*/
    void getImageJfame(){
    	JButton jb=new JButton();
		jb.setText(text);
		this.add(jb);
	}
    
    /**使用panel分割布局*/
    void usePanelJframe(){
    	JPanel jp1=new JPanel();
    	JPanel jp2=new JPanel();
    	jp1.setLayout(new FlowLayout(FlowLayout.CENTER)); //北边是流式布局
    	jp2.setLayout(new GridLayout(1,4));//南边是网格布局
    	
    	this.setLayout(new BorderLayout());
    	
    	JButton jb1=new JButton(text+"1");
    	JButton jb2=new JButton(text+"2");
    	JButton jb3=new JButton(text+"3");
    	JButton jb4=new JButton(text+"4");
    	JButton jb5=new JButton(text+"5");
    	
    	jp1.add(jb1); jp1.add(jb2);
    	jp2.add(jb4); jp2.add(jb5);
    	
    	this.add(jb3,BorderLayout.CENTER);
    	this.add(jp1,BorderLayout.NORTH);
    	this.add(jp2,BorderLayout.SOUTH);
    }
    
    /**使用JSplitPane分割布局*/
    void userJSplitPaneJFrame(String [] listStr){
    	JList jl=new JList(listStr);
    	JLabel jb=new JLabel(new ImageIcon("WebRoot/webapp/image/bg2.png"));
    	JSplitPane jsp=new JSplitPane(JSplitPane.HORIZONTAL_SPLIT,jb,jl);
    	jsp.setOneTouchExpandable(true);
    	this.add(jsp);
    }
}
