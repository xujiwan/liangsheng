/**
 * File Created at 2016年3月18日
 *
 * Copyright 2016 zzuchina.com Limited.
 * All rights reserved.
 */
package cn.edu.zzu.util;

import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.nio.charset.Charset;
import java.nio.file.Files;
import java.nio.file.LinkOption;
import java.nio.file.Path;
import java.nio.file.StandardOpenOption;

/**
 * 字符集转码
 * @author qunxing.du
 *
 */
public class ConvertEncodeUtil {

	public static void gB18030ToUTF8ByNIO(String src ,String srcChartSet,String dest,String destChartSet){
		BufferedReader br = null;
		BufferedWriter bw = null;
		try {
			File srcFile = new File(src);
			File destFile = new File(dest);
			Path srcPath = srcFile.toPath();
			Path destPath = destFile.toPath();
			if(!Files.exists(destPath,LinkOption.NOFOLLOW_LINKS)){
				if(destFile.isFile()){
					destFile.createNewFile();
				}
			}
			br = Files.newBufferedReader(srcPath, Charset.forName(srcChartSet));
			bw = Files.newBufferedWriter(destPath, Charset.forName(destChartSet), StandardOpenOption.TRUNCATE_EXISTING);
			String s = null;
			while((s = br.readLine()) != null){
				bw.write(s);
			}
			bw.flush();
		} catch (IOException e) {
			e.printStackTrace();
		}finally{
				try {
					if(br != null){
					br.close();
					}
					if(bw != null){
						bw.close();
					}
				} catch (IOException e) {
					e.printStackTrace();
				}
		}
	}
	public static void gB18030ToUTF8(String src ,String dest){

		InputStream is = null;
		OutputStream os = null;
		try {
			File srcFile = new File(src);
			File destFile = new File(dest);
			if(!destFile.exists()){
				if(destFile.isFile()){
					destFile.createNewFile();
				}
			}
			is = new FileInputStream(srcFile);
			os = new FileOutputStream(destFile);
			int len = -1;
			byte[] b = new byte[1024];
			while((len = is.read()) != -1){
				is.read(b, 0, len);
				os.write(b,0,len);
			}
			os.flush();
		} catch (IOException e) {
			e.printStackTrace();
		}finally{
			try {
				if(is != null){
					is.close();
				}
				if(os != null){
					os.close();
				}
			} catch (IOException e) {
				e.printStackTrace();
			}
		}
	}
}
