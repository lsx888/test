package file.outputstram;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;

/**
 *
 * @author lisx
 * @2016年12月6日
 */
@SuppressWarnings("all")
public class Outputstram {

	public static void main(String[] args) throws IOException {
		
//输入流
	     File f = new File("E:/pdf/fin1.pdf");
	       InputStream in=new FileInputStream(f);
	        byte[] b=new byte[1024];
	          int len=in.read(b);
	          in.close();
	//输出流
//	    File f = new File("E:/pdf/d1.pdf");
//	    OutputStream out=new FileOutputStream(f);//如果文件不存在会自动创建
//	         out.write(b);//因为是字节流，所以要转化成字节数组进行输出
//	         out.close();
	}

}
