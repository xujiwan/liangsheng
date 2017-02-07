/**
 * File Created at 2016年1月12日
 * Copyright 2016 zzuchina.com Limited.
 * All rights reserved.
 */
package cn.edu.zzu.base;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import cn.edu.zzu.result.MsgConstants;
import cn.edu.zzu.result.Result;

/**
 * 附件上传控制器
 * 
 * @author qunxing.du
 */
@RestController
@RequestMapping(value = "attach")
public class AttachController{
	
	@RequestMapping(value = "upload", method = RequestMethod.POST)
	public void upload(@RequestParam("file") MultipartFile file, @RequestParam("dirName") String dirName,
			HttpServletRequest request, HttpServletResponse response) {

			try {
				if (! file.isEmpty()) {
					long size = file.getSize();
					if (AttachUtil.isExceedSize(size)) {
						Result.outJson(Result.infoResult(MsgConstants.MSG_CODE_2080, MsgConstants.MSG_CONTENT_2080), response);
					}
					// 获取文件原名称
					String fileName = file.getOriginalFilename();
					
					if (! AttachUtil.isPermit(fileName.substring(fileName.lastIndexOf(".") + 1).toLowerCase(), dirName)) {
						Result.outJson(Result.infoResult(MsgConstants.MSG_CODE_2081, MsgConstants.MSG_CONTENT_2081), response);
					}
				String saveUrl  = AttachUtil.upload(fileName, file.getInputStream(), request);
				Map<String, Object> map = new HashMap<String, Object>();
				map.put("url", saveUrl);
				Result.outJson(Result.okResult(MsgConstants.MSG_CODE_SUCCESS, MsgConstants.MSG_CONTENT_SUCCESS,map), response);
				} else {
					Result.outJson(Result.infoResult(MsgConstants.MSG_CODE_2082, MsgConstants.MSG_CONTENT_2082), response);
				}
			} catch (IOException e) {
				e.printStackTrace();
				Result.outJson(Result.errorResult(MsgConstants.MSG_CODE_ERROR, MsgConstants.MSG_CONTENT_ERROR), response);
			}
	}
}
