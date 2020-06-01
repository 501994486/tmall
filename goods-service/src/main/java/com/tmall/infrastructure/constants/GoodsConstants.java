package com.tmall.infrastructure.constants;

/**
 * All rights Reserved, Designed By technologyMall
 * @Description 商品常量类
 * @author sun.h
 * @date   2019年7月11日
 * @version V1.0
 */public class GoodsConstants {

	/**商品属性类型(0:输入框 1:多选项 2:下拉框)*/
	public static final int ATTR_TYPE_TEXT = 0;
	public static final int ATTR_TYPE_CHECKBOX = 1;
	public static final int ATTR_TYPE_SELECT = 2;

	/**商品库存表示方式(1:库存数,2:库存状况)*/
	public static final int STOCK_SHOW_WAY_NUM = 1;
	public static final int STOCK_SHOW_WAY_SITUATION = 2;

	/**类别状态(0:未审核完成,1:审核完成 2:临时类别)*/
	public static final byte CATEGORY_STATUS_UNFINISHED = 0;
	public static final byte CATEGORY_STATUS_FINISHED = 1;
	public static final byte CATEGORY_STATUS_TEMPORY = 2;

	/**类别根目录ID*/
	public static final int CATEGORY_ROOT_ID = 0;

	/**商品状态(0:违规 1:未审核 2:已审核)*/
	public static final byte GOODS_STATUS_VIOLATION = 0;
	public static final byte GOODS_STATUS_UNREVIEWED = 1;
	public static final byte GOODS_STATUS_REVIEWED = 2;

}
