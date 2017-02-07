package cn.edu.zzu.service.impl;

import java.util.Date;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.apache.commons.collections.CollectionUtils;
import org.apache.commons.lang.time.FastDateFormat;
import org.springframework.stereotype.Service;

import cn.edu.zzu.dao.INoticeDao;
import cn.edu.zzu.service.INoticeService;
/**
 * 公告service实现类
 * @author jiwan.xu
 *
 */
@Service
public class NoticeService extends BaseService implements INoticeService{
	@Resource
	private INoticeDao noticeDao;
	@Override
	public List<Map<String, Object>> getNotices(Map<String, Object> map) {
		List <Map<String,Object>> noticeList = noticeDao.getNotices(map);
		if(CollectionUtils.isNotEmpty(noticeList)){
			if (noticeList.get(0).get("COUNT") == null) {
			FastDateFormat dateFormat = FastDateFormat.getInstance("yyyy年MM月dd日");
			for (Map<String, Object> m : noticeList) {
				Date time = (Date)m.get("TIME");
				m.put("TIME",dateFormat.format(time));
			}
			}
		}
		return noticeList;
	}
	
}
