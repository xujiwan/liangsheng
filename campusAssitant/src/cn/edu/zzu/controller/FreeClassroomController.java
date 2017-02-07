package cn.edu.zzu.controller;

import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import cn.edu.zzu.base.PageResult;
import cn.edu.zzu.entity.Page;
import cn.edu.zzu.service.IFreeClassroomService;
import cn.edu.zzu.util.ConvertUtils;

/**
 * 
 * 查询空闲教室
 * @author jiwan.xu
 *
 */
@RestController
@RequestMapping(path = "n/freeClassroom")
public class FreeClassroomController extends BaseController{
	@Resource
    private IFreeClassroomService freeClassroomService;
	@RequestMapping(value="getFreeClassroomList",method=RequestMethod.POST)
	public Map<String, Object> getFreeClassroomList(HttpServletRequest request){
		Map<String, Object> rtnMap = new HashMap<String, Object>();
		try {
			//处理相关参数
			Map<String, Object> pageParams = initParams(request);
			// 获取列表
			Page page = new Page(pageParams);
			Map<String,Object> newMap = new HashMap<String, Object>();
			//查询总数
			newMap.put("selectCount", true);
			//放置所有参数
			newMap.putAll(pageParams);
			//放置转化为map的分页参数
			newMap.putAll(ConvertUtils.PO2Map(page));
			//查询被过滤的数量
			List<Map<String, Object>> totalListFiltered = freeClassroomService.freeClassroom(newMap);
			newMap.remove("selectCount");
			newMap.put("page", true);
			//查询被过滤的数据
			List<Map<String,Object>> pageList = freeClassroomService.freeClassroom(newMap);
			//初始化分页返回数据
			PageResult pageResult  = new PageResult(pageParams,pageList,totalListFiltered,null);
			
			rtnMap.put("data", pageResult.getData());
			rtnMap.put("recordsFiltered", pageResult.getRecordsFiltered());
			rtnMap.put("error", pageResult.getError());
		} catch (Exception e) {
			rtnMap.put("error", e.getMessage());
			e.printStackTrace();
		}
		return rtnMap;
	}
	/**
	 * 课程表
	 * @param request
	 * @return
	 */
	@RequestMapping(value="shedule",method=RequestMethod.GET)
	public Map<String, Object> getShedule(HttpServletRequest request){
		return null;
	}
}
