package cn.edu.zzu.controller;

import java.lang.reflect.Field;
import java.util.Enumeration;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import cn.edu.zzu.base.PageResult;
import cn.edu.zzu.entity.Page;
import cn.edu.zzu.service.IPageService;
import cn.edu.zzu.util.ConvertUtils;
@RestController
public class PageController extends BaseController{
	
	@RequestMapping(value="pagelist",method=RequestMethod.POST)
	public Model retrieveByPage(Model model,HttpServletRequest request,HttpServletResponse response) {
		try {
			//初始化参数
			Map<String, Object> pageParams = initPageParams(request);
			//初始化分页参数
			Page page = new Page(pageParams);
			//通过反射获取service实体类
			IPageService pageService = getPageService();
			Map<String,Object> map = new HashMap<String, Object>();
			//查询总数
			map.put("selectCount", true);
			List<Map<String, Object>> totalList =  pageService.retrieveByPage(map);
			//放置所有参数
			map.putAll(pageParams);
			//放置转化为map的分页参数
			map.putAll(ConvertUtils.PO2Map(page));
			//查询被过滤的数量
			List<Map<String, Object>> totalListFiltered =  pageService.retrieveByPage(map);
			map.remove("selectCount");
			map.put("page", true);
			//查询被过滤的数据
			List<Map<String,Object>> pageList = pageService.retrieveByPage(map);
			//初始化分页返回数据
			PageResult pageResult  = new PageResult(pageParams,pageList,totalListFiltered,totalList);
			model.addAttribute("data", pageResult.getData());
			model.addAttribute("recordsTotal", pageResult.getRecordsTotal());
			model.addAttribute("recordsFiltered", pageResult.getRecordsFiltered());
			model.addAttribute("error", pageResult.getError());
		} catch (Exception e) {
			model.addAttribute("error", e.getMessage());
			error(e.getMessage());
		}
		return model;
	}

	private IPageService getPageService() throws Exception{
		// 获取service
		String serviceClassName = "I" + getClass().getSimpleName().replace("Controller", "") + "Service";
		Object service = null;
		for (Field f : getClass().getDeclaredFields()) {
			if (f.getType().getSimpleName().equals(serviceClassName)) {
				f.setAccessible(true);
				service = f.get(this);
				f.setAccessible(false);
				break;
			}
		}
		return (IPageService)service;
	}
	
	protected Map<String, Object> initPageParams(HttpServletRequest request){
		
		Map<String, Object> params = new HashMap<String, Object>();
		Enumeration<String> enumeration = request.getParameterNames();
		while (enumeration.hasMoreElements()) {
			String name = (String) enumeration.nextElement();
			if("pageData".equals(name)){
				try {
					String value = request.getParameter(name);
					params.putAll(ConvertUtils.json2Map(value));
				} catch (Exception e) {
					e.printStackTrace();
				}
			}else{
				String[] values = request.getParameterValues(name);
	            if( values.length == 0){
	            	params.put(name,null);
	            }else if(values.length == 1){
	            	params.put(name,values[0]);
	            }else {
	            	params.put(name,values);
	            }
			}
		}
		log.debug("前端提交参数："+ConvertUtils.map2Json(params));
		return params;
	}
}
