package com.tmall.technologyMall;

/**
 * All rights Reserved, Designed By technologyMall
 * @Title:  AppConstants
 * @Package com.tm.technologyMall
 * @Description 项目通用常量定义
 * @author sun.h
 * @date   2019年5月18日
 * @version V1.0
 */
public class AppConstants {

	/** THE KEY OF SESSION SHOP ID */
	public static final String SESSION_KEY_SHOP_ID = "_shop";

	/** SESSION KEY: SERVICE LOGIN INFO MAP*/
	public static final String SESSION_KEY_LOGIN_INFO_MAP = "_loginInfoMap";

	/** 符号标记*/
	public static final String SYMBOL_QUOTE = "\"";

	public static final String SYMBOL_SLASHSLASH = "//";

	public static final String SYMBOL_BACKSLASH = "\\";

	public static final String SYMBOL_SLASH = "/";

	public static final String SYMBOL_SHARP = "#";

	public static final String SYMBOL_COMMA = ",";

	public static final String SYMBOL_EQUALS = "=";

	public static final String SYMBOL_SPACE = " ";

	public static final String SYMBOL_AT = "@";

	public static final String SYMBOL_TAB = "\t";

	public static final String SYMBOL_YEN = "￥";

	public static final String SYMBOL_QUESTION_MARK = "?";

	public static final String SYMBOL_PERCENT_SIGN = "%";

	public static final String SYMBOL_AND = "&";

	public static final String SYMBOL_OR = "|";

	public static final String SYMBOL_HYPHEN = "-";

	public static final String SYMBOL_UNDERSCORE = "_";

	public static final String SYMBOL_HTML_TAG_BR = "<br />";

	public static final String SYMBOL_NEWLINE = "\n";

	public static final String YES = "Y";

	public static final String NO = "N";

	/** 项目类型 [text] */
	public static final String HTML_INPUT_TEXT = "text";

	/** 项目类型 [textarea] */
	public static final String HTML_INPUT_TEXTAERA = "textarea";

	/** 项目类型[checkbox] */
	public static final String HTML_INPUT_CHECKBOX = "checkbox";

	/** 项目类型[radio] */
	public static final String HTML_INPUT_RADIO = "radio";

	/** 项目类型[select] */
	public static final String HTML_INPUT_SELECT = "select";

	/** 项目类型[webeditor] */
	public static final String HTML_INPUT_WEBEDITOR = "webeditor";

	/** 项目类型[文件] */
	public static final String HTML_INPUT_FILE = "file";

	/** DB is_XXX型字段"否"存储的值 */
	public static final byte DB_FIELD_VALUE_NO = 0;

	/** DB is_XXX型字段"是"存储的值 */
	public static final byte DB_FIELD_VALUE_YES = 1;

	public static final int ZERO = 0;

	/** 字节单位换算 1024易读写法 */
	public static final int BYTE_CONVERSION_NUM = 1_024;

	/** 是否删除 0:删除 1：有效*/
	public static final byte DELETE_FLAG_YES = 0;
	public static final byte DELETE_FLAG_NO = 1;

	/** 是否显示 0:隐藏 1：显示*/
	public static final byte SHOW_FLAG_NO = 0;
	public static final byte SHOW_FLAG_YES = 1;
}
