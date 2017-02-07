
/**
 * 
 */
	
package cn.edu.zzu.entity;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.commons.lang3.StringUtils;


/**
 * <p>
 * 这是写类描述，如果有换行则用<br>
 * </p>
 */

public class Page implements Serializable{
	
	/**
	 * @fields serialVersionUID
	 */
		
	private static final long serialVersionUID = 1L;
	/**
	 * 开始行
	 */
	private Integer start;
	/**
	 * 结束行
	 */
	private Integer end;
	/**
	 * 页容量
	 */
	private Integer length;
	/**
	 * 条件搜索值
	 */
	private String searchValue;
	/**
	 * 排序列表
	 */
	private List<Map<String, String>> orders = new ArrayList<Map<String,String>>();
	
	private Map<String, Object> params = new HashMap<String, Object>();
	
	public Page(){};
	
	public Page(Map<String, Object> map){
		this.params = map;
		init();
	}

	public void init(){
		if(params == null || params.size() == 0){
			return;
		}
		//取开始行和页容量，计算出结束行
		String startStr = StringUtils.defaultIfEmpty((String)params.get("start"), "0");
		String lengthStr = StringUtils.defaultIfEmpty((String)params.get("length"), "5");
		this.start = Integer.parseInt(startStr)+1;
		this.length = Integer.parseInt(lengthStr);
		this.end = this.start  + this.length - 1;
		
		//搜索条件
		Map<String, Object> searchMap = new HashMap<String, Object>(2);
		searchMap = (Map<String, Object>)params.get("search");
		if(searchMap != null){
			this.searchValue =  (String) searchMap.get("value");
		}
		
		//排序
		List<Map<String, Object>> orderList =  (List<Map<String,Object>>)params.get("order");
		if(orderList != null){
			for (Map<String, Object> orderMap : orderList) {
				//取排序的类型
				String orderType = StringUtils.defaultIfEmpty((String)orderMap.get("dir"), "asc");
				//取排序的列索引
				String columnIndexStr = StringUtils.defaultIfEmpty((String)orderMap.get("column"), "0");
				int columnIndex = Integer.parseInt(columnIndexStr);
				//取出所有字段集合
				List<Map<String, Object>> colums = (List<Map<String,Object>>)params.get("columns");
				Map<String, Object> columnMap = new HashMap<String, Object>();
				columnMap = (Map<String, Object>) colums.get(columnIndex);
				String orderColumm  = StringUtils.isNotEmpty((String)columnMap.get("name")) ? (String)columnMap.get("name") 
						: (String)columnMap.get("data") ;
				boolean orderable = (Boolean.valueOf((String)columnMap.get("orderable")));
				boolean searchable = (Boolean.valueOf((String)columnMap.get("searchable")));
				if(orderable){
					Map<String, String> orderObj = new HashMap<String, String>(2);
					orderObj.put("orderColumm", orderColumm);
					orderObj.put("orderType", orderType);
					orders.add(orderObj);
				}
			}
		}
		
	}
	
	public Integer getStart() {
		return start;
	}

	public void setStart(Integer start) {
		this.start = start;
	}

	public Integer getEnd() {
		return end;
	}

	public void setEnd(Integer end) {
		this.end = end;
	}


	public String getSearchValue() {
		return searchValue;
	}

	public void setSearchValue(String searchValue) {
		this.searchValue = searchValue;
	}

	public Integer getLength() {
		return length;
	}

	public void setLength(Integer length) {
		this.length = length;
	}

	public List<Map<String, String>> getOrders() {
		return orders;
	}

	public void setOrders(List<Map<String, String>> orders) {
		this.orders = orders;
	}

	public Map<String, Object> getParams() {
		return params;
	}

	public void setParams(Map<String, Object> params) {
		this.params = params;
	}

}
