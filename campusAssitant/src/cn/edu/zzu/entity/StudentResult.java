package cn.edu.zzu.entity;

import java.io.Serializable;
public class StudentResult implements Serializable{

		/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
		private int status;//成功
		private String msg;//信息
		private Object data;//数据
		public int getStatus() {
			return status;
		}
		public void setStatus(int status) {
			this.status = status;
		}
		public String getMsg() {
			return msg;
		}
		public void setMsg(String msg) {
			this.msg = msg;
		}
		public Object getData() {
			return data;
		}
		public void setData(Object data) {
			this.data = data;
		}
		
}
