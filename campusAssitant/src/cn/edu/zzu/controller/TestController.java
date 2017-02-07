package cn.edu.zzu.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import cn.edu.zzu.service.IUserService;

@Controller
@RequestMapping(value="/test")
public class TestController {

	@Autowired
	private IUserService service;
	
	public TestController() {
		System.out.println("test co..................................................................n");
	}
	
	@ResponseBody
	@RequestMapping(value="/a")
	public String a(){
		return "test";
	}
}
