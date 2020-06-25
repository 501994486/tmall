/**
 * 
 */
package com.tmall.security.core.social.qq.api;

/**
 * @author Administrator
 *
 */
public class QQUserInfo {
	//返回码
	private String ret;

	//如果ret<0，会有相应的错误信息提示，返回数据全部用UTF-8编码。
	private String msg;
	/**
	 * 
	 */
	private String openId;
	/**
	 * ��֪��ʲô�������ĵ���ûд������ʵ��api�������С�
	 */
	private String is_lost;
	/**
	 * ʡ(ֱϽ��)
	 */
	private String province;
	/**
	 * ��(ֱϽ����)
	 */
	private String city;
	/**
	 * ��������
	 */
	private String year;
	/**
	 * 	�û���QQ�ռ���ǳơ�
	 */
	private String nickname;
	/**
	 * 	��СΪ30��30���ص�QQ�ռ�ͷ��URL��
	 */
	private String figureurl;
	/**
	 * 	��СΪ50��50���ص�QQ�ռ�ͷ��URL��
	 */
	private String figureurl_1;
	/**
	 * 	��СΪ100��100���ص�QQ�ռ�ͷ��URL��
	 */
	private String figureurl_2;
	/**
	 * 	��СΪ40��40���ص�QQͷ��URL��
	 */
	private String figureurl_qq_1;
	/**
	 * 	��СΪ100��100���ص�QQͷ��URL����Ҫע�⣬�������е��û���ӵ��QQ��100��100��ͷ�񣬵�40��40��������һ�����С�
	 */
	private String figureurl_qq_2;
	/**
	 * 	�Ա� �����ȡ������Ĭ�Ϸ��ء��С�
	 */
	private String gender;
	/**
	 * 	��ʶ�û��Ƿ�Ϊ�����û���0�����ǣ�1���ǣ���
	 */
	private String is_yellow_vip;
	/**
	 * 	��ʶ�û��Ƿ�Ϊ�����û���0�����ǣ�1���ǣ�
	 */
	private String vip;
	/**
	 * 	����ȼ�
	 */
	private String yellow_vip_level;
	/**
	 * 	����ȼ�
	 */
	private String level;
	/**
	 * ��ʶ�Ƿ�Ϊ��ѻ����û���0�����ǣ� 1���ǣ�
	 */
	private String is_yellow_year_vip;
	/**
	 * @return the ret
	 */
	public String getRet() {
		return ret;
	}
	/**
	 * @param ret the ret to set
	 */
	public void setRet(String ret) {
		this.ret = ret;
	}
	/**
	 * @return the msg
	 */
	public String getMsg() {
		return msg;
	}
	/**
	 * @param msg the msg to set
	 */
	public void setMsg(String msg) {
		this.msg = msg;
	}
	/**
	 * @return the openId
	 */
	public String getOpenId() {
		return openId;
	}
	/**
	 * @param openId the openId to set
	 */
	public void setOpenId(String openId) {
		this.openId = openId;
	}
	/**
	 * @return the is_lost
	 */
	public String getIs_lost() {
		return is_lost;
	}
	/**
	 * @param is_lost the is_lost to set
	 */
	public void setIs_lost(String is_lost) {
		this.is_lost = is_lost;
	}
	/**
	 * @return the province
	 */
	public String getProvince() {
		return province;
	}
	/**
	 * @param province the province to set
	 */
	public void setProvince(String province) {
		this.province = province;
	}
	/**
	 * @return the city
	 */
	public String getCity() {
		return city;
	}
	/**
	 * @param city the city to set
	 */
	public void setCity(String city) {
		this.city = city;
	}
	/**
	 * @return the year
	 */
	public String getYear() {
		return year;
	}
	/**
	 * @param year the year to set
	 */
	public void setYear(String year) {
		this.year = year;
	}
	/**
	 * @return the nickname
	 */
	public String getNickname() {
		return nickname;
	}
	/**
	 * @param nickname the nickname to set
	 */
	public void setNickname(String nickname) {
		this.nickname = nickname;
	}
	/**
	 * @return the figureurl
	 */
	public String getFigureurl() {
		return figureurl;
	}
	/**
	 * @param figureurl the figureurl to set
	 */
	public void setFigureurl(String figureurl) {
		this.figureurl = figureurl;
	}
	/**
	 * @return the figureurl_1
	 */
	public String getFigureurl_1() {
		return figureurl_1;
	}
	/**
	 * @param figureurl_1 the figureurl_1 to set
	 */
	public void setFigureurl_1(String figureurl_1) {
		this.figureurl_1 = figureurl_1;
	}
	/**
	 * @return the figureurl_2
	 */
	public String getFigureurl_2() {
		return figureurl_2;
	}
	/**
	 * @param figureurl_2 the figureurl_2 to set
	 */
	public void setFigureurl_2(String figureurl_2) {
		this.figureurl_2 = figureurl_2;
	}
	/**
	 * @return the figureurl_qq_1
	 */
	public String getFigureurl_qq_1() {
		return figureurl_qq_1;
	}
	/**
	 * @param figureurl_qq_1 the figureurl_qq_1 to set
	 */
	public void setFigureurl_qq_1(String figureurl_qq_1) {
		this.figureurl_qq_1 = figureurl_qq_1;
	}
	/**
	 * @return the figureurl_qq_2
	 */
	public String getFigureurl_qq_2() {
		return figureurl_qq_2;
	}
	/**
	 * @param figureurl_qq_2 the figureurl_qq_2 to set
	 */
	public void setFigureurl_qq_2(String figureurl_qq_2) {
		this.figureurl_qq_2 = figureurl_qq_2;
	}
	/**
	 * @return the gender
	 */
	public String getGender() {
		return gender;
	}
	/**
	 * @param gender the gender to set
	 */
	public void setGender(String gender) {
		this.gender = gender;
	}
	/**
	 * @return the is_yellow_vip
	 */
	public String getIs_yellow_vip() {
		return is_yellow_vip;
	}
	/**
	 * @param is_yellow_vip the is_yellow_vip to set
	 */
	public void setIs_yellow_vip(String is_yellow_vip) {
		this.is_yellow_vip = is_yellow_vip;
	}
	/**
	 * @return the vip
	 */
	public String getVip() {
		return vip;
	}
	/**
	 * @param vip the vip to set
	 */
	public void setVip(String vip) {
		this.vip = vip;
	}
	/**
	 * @return the yellow_vip_level
	 */
	public String getYellow_vip_level() {
		return yellow_vip_level;
	}
	/**
	 * @param yellow_vip_level the yellow_vip_level to set
	 */
	public void setYellow_vip_level(String yellow_vip_level) {
		this.yellow_vip_level = yellow_vip_level;
	}
	/**
	 * @return the level
	 */
	public String getLevel() {
		return level;
	}
	/**
	 * @param level the level to set
	 */
	public void setLevel(String level) {
		this.level = level;
	}
	/**
	 * @return the is_yellow_year_vip
	 */
	public String getIs_yellow_year_vip() {
		return is_yellow_year_vip;
	}
	/**
	 * @param is_yellow_year_vip the is_yellow_year_vip to set
	 */
	public void setIs_yellow_year_vip(String is_yellow_year_vip) {
		this.is_yellow_year_vip = is_yellow_year_vip;
	}
	
}
