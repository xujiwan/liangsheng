package cn.edu.zzu.util;

import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.text.DateFormat;
import java.text.ParseException;
import java.util.Date;
import java.util.UUID;

import org.apache.commons.codec.binary.Base64;

public class StudentUtil {
	
	/**
	 * ���һ���������
	 * @return
	 */
	public static String createToken(){
		UUID uuid = UUID.randomUUID();
		return uuid.toString().replaceAll("-", "");
	}
	
	/**
	 * ��ɱ�����ID
	 * @return
	 */
	public static String createId(){
		UUID uuid = UUID.randomUUID();
		return uuid.toString();
	}
	
	
	/**
	 * ����Ϣ����md5�㷨����
	 * @param msg ����
	 * @return ���ܺ����Ϣ
	 */
	public static String md5(String msg){
		try {
			//���������md5�㷨����
			MessageDigest md = 
				MessageDigest.getInstance("MD5");
			byte[] output = md.digest(msg.getBytes());
//			System.out.println(output.length);
			//����Base64�㷨�����ܺ���ֽ���Ϣת���ַ�
			return Base64.encodeBase64String(output);
		} catch (NoSuchAlgorithmException e) {
			return null;
		}
	}
	
	public static Long DateStringToLong(String dateStr){
		if(dateStr == null || "".equals(dateStr)){
			return null;
		}
		//��beginת��long���
		DateFormat df = DateFormat.getDateInstance();
		Date beginTime;
		try {
			beginTime = df.parse(dateStr);
			return beginTime.getTime();
		} catch (ParseException e) {
			e.printStackTrace();
			return null;
		}
	}
	
	public static void main(String[] args){
//		System.out.println(md5("123456"));
//		System.out.println(md5("abcsssssssssssxxxxx"));
		System.out.println(createToken());
	}
	
}
