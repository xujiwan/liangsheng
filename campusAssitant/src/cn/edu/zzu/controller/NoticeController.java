package cn.edu.zzu.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import cn.edu.zzu.base.PageResult;
import cn.edu.zzu.entity.Page;
import cn.edu.zzu.service.INoticeService;
import cn.edu.zzu.util.ConvertUtils;


/**
 * 公告控制器
 * url:/kw/mediaInfo/getNoticeList.json
 * @author jiwan.xu
 *
 */
@RestController
@RequestMapping("kw/mediaInfo")
public class NoticeController extends BaseController{

	@Resource private INoticeService noticeService;
	@RequestMapping(value="getNoticeList",method=RequestMethod.POST)
	public Map<String, Object> getNoticeList(HttpServletRequest request){
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
			List<Map<String, Object>> totalListFiltered = noticeService.getNotices(newMap);
			newMap.remove("selectCount");
			newMap.put("page", true);
			//查询被过滤的数据
			List<Map<String,Object>> pageList = noticeService.getNotices(newMap);
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
}