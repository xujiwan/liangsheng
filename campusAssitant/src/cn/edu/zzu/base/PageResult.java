package cn.edu.zzu.base;

import java.io.Serializable;
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.commons.lang3.StringUtils;

import cn.edu.zzu.util.ConvertUtils;

public class PageResult implements Serializable{
	
	/**
	 * @fields serialVersionUID
	 */
		
	private static final long serialVersionUID = 1L;

	/**
	 * 要获取的字段集合
	 */
	private List<String> names = new ArrayList<String>();
	
	/**
	 * 返回数据
	 */
	private List<Map<String, Object>> data;
	/**
	 * 过滤前总数据量
	 */
	private BigDecimal recordsTotal;
	/**
	 * 过滤后数据量
	 */
	private BigDecimal recordsFiltered;
	/**
	 * 请求次数
	 */
	private Integer draw;
	/**
	 * 错误描述
	 */
	private String error;
	/**
	 * 提交的参数
	 */
	private Map<String, Object> map;
	
	public PageResult(){}
	
	public PageResult(Map<String, Object> map,List<Map<String,Object>> data,List<Map<String,Object>> recordsFiltered){
		this(map, data, recordsFiltered, null);
	}
	public PageResult(Map<String, Object> map,List<Map<String,Object>> data, List<Map<String,Object>> recordsFiltered,
				List<Map<String,Object>> recordsTotal){
		this.map = map;
		this.data = data;
		//返回请求次数
		this.draw = Integer.parseInt(StringUtils.defaultString((String)map.get("draw"), "0"));
		//取总记录数
		if(recordsFiltered != null && recordsFiltered.get(0) != null){
			long lo = (long) recordsFiltered.get(0).get("COUNT");
			this.recordsFiltered = BigDecimal.valueOf(lo);
		}
		//取查询的记录数
		if(recordsTotal != null && recordsTotal.get(0) != null){
			this.recordsTotal = BigDecimal.valueOf((long)recordsTotal.get(0).get("COUNT"));
		}
		
		//取出所有字段集合
		List<Map<String, Object>> colums = (List<Map<String,Object>>)map.get("columns");
		for (Map<String, Object> columnMap : colums) {
			String column = StringUtils.isNotEmpty((String)columnMap.get("data")) ? (String)columnMap.get("data") : (String)columnMap.get("name");
			names.add(column);
		}
	}

	public List<String> getNames() {
		//取出所有字段集合
		List<Map<String, Object>> colums = (List<Map<String,Object>>)map.get("columns");
		for (Map<String, Object> columnMap : colums) {
			String column = StringUtils.isNotEmpty((String)columnMap.get("data")) ? (String)columnMap.get("data") : (String)columnMap.get("name");
			names.add(column);
		}
		return names;
	}

	public void setNames(List<String> names) {
		this.names = names;
	}

	public List<Map<String, Object>> getData() {
		List<Map<String, Object>> list = new ArrayList<Map<String,Object>>();
		for (Map<String, Object> row : this.data) {
			Map<String, Object> map = new HashMap<String, Object>();
			for (String key : names) {
				if(key == null || key.isEmpty()){
					continue;
				}
				Object value = row.get(key);
				try {
					map.put(key, ConvertUtils.toString(value));
				} catch (Exception e) {
					e.printStackTrace();
				}
			}
			list.add(map);
		}
		return list;
	}

	public void setData(List<Map<String, Object>> data) {
		this.data = data;
	}

	public BigDecimal getRecordsTotal() {
		return recordsTotal;
	}

	public void setRecordsTotal(BigDecimal recordsTotal) {
		this.recordsTotal = recordsTotal;
	}

	public BigDecimal getRecordsFiltered() {
		return recordsFiltered;
	}

	public void setRecordsFiltered(BigDecimal recordsFiltered) {
		this.recordsFiltered = recordsFiltered;
	}

	public Integer getDraw() {
		return draw;
	}

	public void setDraw(Integer draw) {
		this.draw = draw;
	}

	public String getError() {
		return error;
	}

	public void setError(String error) {
		this.error = error;
	}

	public void setMap(Map<String, Object> map) {
		this.map = map;
	}
	public Map<String, Object> getMap() {
		return map;
	}
	
}
