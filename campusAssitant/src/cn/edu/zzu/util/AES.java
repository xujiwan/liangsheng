package cn.edu.zzu.util;

import java.security.InvalidKeyException;
import java.security.Key;
import java.security.NoSuchAlgorithmException;

import javax.crypto.BadPaddingException;
import javax.crypto.Cipher;
import javax.crypto.IllegalBlockSizeException;
import javax.crypto.KeyGenerator;
import javax.crypto.NoSuchPaddingException;
import javax.crypto.spec.SecretKeySpec;

import cn.edu.zzu.base.BaseLog;


public class AES extends BaseLog{
	public static byte[] AES_PWD = "1234321099992222".getBytes();
	static final String algorithmStr = "AES/ECB/PKCS5Padding";
	static private KeyGenerator keyGen;
	static private Cipher cipher;
	static boolean isInited = false;

	// 初始化
	static private void init() {
		// 初始化keyGen
		try {
			keyGen = KeyGenerator.getInstance("AES");
		} catch (NoSuchAlgorithmException e) {
			swarn(e.getMessage());
		}
		keyGen.init(128);

		// 初始化cipher
		try {
			cipher = Cipher.getInstance(algorithmStr);
		} catch (NoSuchAlgorithmException e) {
			serror(e.getMessage());
		} catch (NoSuchPaddingException e) {
			serror(e.getMessage());
		}

		isInited = true;
	}

	public static byte[] encrypt(byte[] content, byte[] keyBytes)
			throws InvalidKeyException, IllegalBlockSizeException, BadPaddingException {
		byte[] encryptedText = null;

		if (! isInited) {
			init();
		}

		Key key = new SecretKeySpec(keyBytes, "AES");

		try {
			cipher.init(Cipher.ENCRYPT_MODE, key);
		} catch (InvalidKeyException e) {
			throw e;
		}

		try {
			encryptedText = cipher.doFinal(content);
		} catch (IllegalBlockSizeException e) {
			throw e;
		} catch (BadPaddingException e) {
			throw e;
		}

		return encryptedText;
	}

	// 解密为byte[]
	public static byte[] decrypt(byte[] content, byte[] keyBytes)
			throws IllegalBlockSizeException, InvalidKeyException, BadPaddingException {
		byte[] originBytes = null;
		if (! isInited) {
			init();
		}

		Key key = new SecretKeySpec(keyBytes, "AES");

		try {
			cipher.init(Cipher.DECRYPT_MODE, key);
		} catch (InvalidKeyException e) {
			throw e;
		}

		// 解密
		try {
			originBytes = cipher.doFinal(content);
		} catch (IllegalBlockSizeException e) {
			throw e;
		} catch (BadPaddingException e) {
			throw e;
		}

		return originBytes;
	}

	public static String encrypt(String str) throws Exception {
		byte[] content = str.getBytes("utf-8");
		byte[] enRes = encrypt(content, AES_PWD);
		return Base64.encode(enRes);
	}

	public static String decrypt(String str) throws Exception {
		byte[] content = Base64.decode(str);
		byte[] deRes = decrypt(content, AES_PWD);
		return new String(deRes, "utf-8");
	}
}
