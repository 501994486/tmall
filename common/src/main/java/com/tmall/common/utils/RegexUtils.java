package com.tmall.common.utils;

import java.util.ArrayList;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

/**
 * All rights Reserved, Designed By technologyMall
 * @Title:  RegexUtils
 * @Package com.tm.technologyMall
 * @Description 常用正则表达式工具类
 * @author sun.h
 * @date   2019年5月18日
 * @version V1.0
 */
public class RegexUtils {

	/**
	 * 正则：手机号（简单）
	 */
	public static final String REGEX_MOBILE_SIMPLE = "^[1]\\d{10}$";

	/**
	 * 正则：手机号（精确）
	 * <p>移动：134(0-8)、135、136、137、138、139、147、150、151、152、157、158、159、178、182、183、184、187、188</p>
	 * <p>联通：130、131、132、145、155、156、175、176、185、186</p>
	 * <p>电信：133、153、173、177、180、181、189</p>
	 * <p>全球星：1349</p>
	 * <p>虚拟运营商：170</p>
	 */
	public static final String REGEX_MOBILE_EXACT  = "^((13[0-9])|(14[5,7])|(15[0-3,5-9])|(17[0,3,5-8])|(18[0-9])|(147))\\d{8}$";

	/**
	 * 匹配固定电话
	 * 格式为: 0XXX-XXXXXX(10-13位首位必须为0) 或0XXX XXXXXXX(10-13位首位必须为0) 或
	 * (0XXX)XXXXXXXX(11-14位首位必须为0) 或 XXXXXXXX(6-8位首位不为0) 或
	 * XXXXXXXXXXX(11位首位不为0)
	 * 匹配 : 0371-123456 或 (0371)1234567 或 (0371)12345678 或 010-123456 或
	 * 010-12345678 或 12345678912
	 * 不匹配: 1111-134355 或 0123456789
	 *
	 */
	public static final String REGEX_FIX_TEL  = "^(?:0[0-9]{2,3}[-//s]{1}|//(0[0-9]{2,4}//))[0-9]{6,8}$|^[1-9]{1}[0-9]{5,7}$|^[1-9]{1}[0-9]{10}$";

	 /**
	 * 正则：身份证号码15位
	 */
	public static final String REGEX_ID_CARD15 = "^[1-9]\\d{7}((0\\d)|(1[0-2]))(([0|1|2]\\d)|3[0-1])\\d{3}$";

	/**
	 * 正则：身份证号码18位
	 */
	public static final String REGEX_ID_CARD18  = "^[1-9]\\d{5}[1-9]\\d{3}((0\\d)|(1[0-2]))(([0|1|2]\\d)|3[0-1])\\d{3}([0-9Xx])$";

	/**
	 * 匹配email地址
	 * 格式: XXX@XXX.XXX.XX
	 * 匹配 : foo@bar.com 或 foobar@foobar.com.au
	 * 不匹配: foo@bar 或 $$$@bar.com
	 */
	public static final String REGEX_EMAIL = "(?://w[-._//w]*//w@//w[-._//w]*//w//.//w{2,3}$)";

	/**
	 * 正则：汉字
	 */
	public static final String REGEX_ZH = "^[\\u4e00-\\u9fa5]+$";

	/**
	 * 正则：用户名，取值范围为a-z,A-Z,0-9,"_",汉字，不能以"_"结尾,用户名必须是6-20位
	 */
	public static final String REGEX_USERNAME = "^[\\w\\u4e00-\\u9fa5]{6,20}(?<!_)$";

	/**
	 * 正则：yyyy-MM-dd格式的日期校验，已考虑平闰年
	 */
	public static final String REGEX_DATE  = "^(?:(?!0000)[0-9]{4}-(?:(?:0[1-9]|1[0-2])-(?:0[1-9]|1[0-9]|2[0-8])|(?:0[13-9]|1[0-2])-(?:29|30)|(?:0[13578]|1[02])-31)|(?:[0-9]{2}(?:0[48]|[2468][048]|[13579][26])|(?:0[48]|[2468][048]|[13579][26])00)-02-29)$";

	/**
	 * 正则：IP地址
	 */
	public static final String REGEX_IP = "((2[0-4]\\d|25[0-5]|[01]?\\d\\d?)\\.){3}(2[0-4]\\d|25[0-5]|[01]?\\d\\d?)";

	/**
	 * 匹配并提取url
	 * 格式: XXXX://XXX.XXX.XXX.XX/XXX.XXX?XXX=XXX
	 * 匹配 : http://www.suncer.com 或news://www
	 * 不匹配: c:/window
	 */
	public static final String REGEX_URL = "(//w+)://([^/:]+)(://d*)?([^#//s]*)";

	/**
	 * 匹配并提取http
	 * 格式: http://XXX.XXX.XXX.XX/XXX.XXX?XXX=XXX 或 ftp://XXX.XXX.XXX 或
	 * https://XXX
	 * 匹配 : http://www.suncer.com:8080/index.html?login=true
	 * 不匹配: news://www
	 */
	public static final String REGEXP_HTTP = "(http|https|ftp)://([^/:]+)(://d*)?([^#//s]*)";


	/**
	 * 正则：双字节字符(包括汉字在内)
	 */
	public static final String REGEX_DOUBLE_BYTE_CHAR = "[^\\x00-\\xff]";

	/**
	 * 正则：空白行
	 */
	public static final String REGEX_BLANK_LINE = "\\n\\s*\\r";

	/**
	 * 正则：QQ号
	 */
	public static final String REGEX_TENCENT_NUM  = "[1-9][0-9]{4,}";

	/**
	 * 正则：中国邮政编码
	 */
	public static final String REGEX_ZIP_CODE = "[1-9]\\d{5}(?!\\d)";

	/**
	 * 正则：正整数
	 */
	public static final String REGEX_POSITIVE_INTEGER = "^[1-9]\\d*$";

	/**
	 * 正则：负整数
	 */
	public static final String REGEX_NEGATIVE_INTEGER = "^-[1-9]\\d*$";

	/**
	 * 正则：整数
	 */
	public static final String REGEX_INTEGER = "^-?[1-9]\\d*$";

	/**
	 * 正则：非负整数(正整数 + 0)
	 */
	public static final String REGEX_NOT_NEGATIVE_INTEGER = "^[1-9]\\d*|0$";

	/**
	 * 正则：非正整数（负整数 + 0）
	 */
	public static final String REGEX_NOT_POSITIVE_INTEGER = "^-[1-9]\\d*|0$";

	/**
	 * 正则：正浮点数
	 */
	public static final String REGEX_POSITIVE_FLOAT = "^[1-9]\\d*\\.\\d*|0\\.\\d*[1-9]\\d*$";

	/**
	 * 正则：负浮点数
	 */
	public static final String REGEX_NEGATIVE_FLOAT = "^-[1-9]\\d*\\.\\d*|-0\\.\\d*[1-9]\\d*$";

	/**
	 * 匹配图象
	 * 格式: /相对路径/文件名.后缀 (后缀为gif,dmp,png)
	 * 匹配 : /forum/head_icon/admini2005111_ff.gif 或 admini2005111.dmp
	 * 不匹配: c:/admins4512.gif
	 */
	public static final String REGEX_ICON_REGEXP = "^(/{0,1}//w){1,}//.(gif|dmp|png|jpg)$|^//w{1,}//.(gif|dmp|png|jpg)$";

	/**
	 * 验证手机号（简单）
	 *
	 * @param input 待验证文本
	 * @return {@code true}: 匹配<br>{@code false}: 不匹配
	 */
	public static boolean isMobileSimple(CharSequence input) {
		return isMatch(REGEX_MOBILE_SIMPLE, input);
	}

	/**
	 * 验证手机号（精确）
	 *
	 * @param input 待验证文本
	 * @return {@code true}: 匹配<br>{@code false}: 不匹配
	 */
	public static boolean isMobileExact(CharSequence input) {
		return isMatch(REGEX_MOBILE_EXACT, input);
	}

	/**
	 * 验证固定电话号码
	 *
	 * @param input 待验证文本
	 * @return {@code true}: 匹配<br>{@code false}: 不匹配
	 */
	public static boolean isTel(CharSequence input) {
		return isMatch(REGEX_FIX_TEL, input);
	}

	/**
	 * 验证身份证号码15位
	 *
	 * @param input 待验证文本
	 * @return {@code true}: 匹配<br>{@code false}: 不匹配
	 */
	public static boolean isIDCard15(CharSequence input) {
		return isMatch(REGEX_ID_CARD15, input);
	}

	/**
	 * 验证身份证号码18位
	 *
	 * @param input 待验证文本
	 * @return {@code true}: 匹配<br>{@code false}: 不匹配
	 */
	public static boolean isIDCard18(CharSequence input) {
		return isMatch(REGEX_ID_CARD18, input);
	}

	/**
	 * 验证邮箱
	 *
	 * @param input 待验证文本
	 * @return {@code true}: 匹配<br>{@code false}: 不匹配
	 */
	public static boolean isEmail(CharSequence input) {
		return isMatch(REGEX_EMAIL, input);
	}

	/**
	 * 验证汉字
	 *
	 * @param input 待验证文本
	 * @return {@code true}: 匹配<br>{@code false}: 不匹配
	 */
	public static boolean isZh(CharSequence input) {
		return isMatch(REGEX_ZH, input);
	}

	/**
	 * 验证用户名
	 * <p>取值范围为a-z,A-Z,0-9,"_",汉字，不能以"_"结尾,用户名必须是6-20位</p>
	 *
	 * @param input 待验证文本
	 * @return {@code true}: 匹配<br>{@code false}: 不匹配
	 */
	public static boolean isUsername(CharSequence input) {
		return isMatch(REGEX_USERNAME, input);
	}

	/**
	 * 验证yyyy-MM-dd格式的日期校验，已考虑平闰年
	 *
	 * @param input 待验证文本
	 * @return {@code true}: 匹配<br>{@code false}: 不匹配
	 */
	public static boolean isDate(CharSequence input) {
		return isMatch(REGEX_DATE, input);
	}

	/**
	 * 验证IP地址
	 *
	 * @param input 待验证文本
	 * @return {@code true}: 匹配<br>{@code false}: 不匹配
	 */
	public static boolean isIP(CharSequence input) {
		return isMatch(REGEX_IP, input);
	}

	/**
	 * 验证URL
	 *
	 * @param input 待验证文本
	 * @return {@code true}: 匹配<br>{@code false}: 不匹配
	 */
	public static boolean isURL(CharSequence input) {
		return isMatch(REGEX_URL, input);
	}

	/**
	 * http
	 *
	 * @param input 待验证文本
	 * @return {@code true}: 匹配<br>{@code false}: 不匹配
	 */
	public static boolean isHTTP(CharSequence input) {
		return isMatch(REGEXP_HTTP, input);
	}

	/**
	 * 判断是否匹配正则
	 *
	 * @param regex 正则表达式
	 * @param input 要匹配的字符串
	 * @return {@code true}: 匹配<br>{@code false}: 不匹配
	 */
	public static boolean isMatch(String regex, CharSequence input) {
		return input != null && input.length() > 0 && Pattern.matches(regex, input);
	}

	/**
	 * 获取正则匹配的部分
	 *
	 * @param regex 正则表达式
	 * @param input 要匹配的字符串
	 * @return 正则匹配的部分
	 */
	public static List<String> getMatches(String regex, CharSequence input) {
		if (input == null) {
			return null;
		}
		List<String> matches = new ArrayList<>();
		Pattern pattern = Pattern.compile(regex);
		Matcher matcher = pattern.matcher(input);
		while (matcher.find()) {
			matches.add(matcher.group());
		}
		return matches;
	}

	/**
	 * 获取正则匹配分组
	 *
	 * @param input 要分组的字符串
	 * @param regex 正则表达式
	 * @return 正则匹配分组
	 */
	public static String[] getSplits(String input, String regex) {
		if (input == null) {
			return null;
		}
		return input.split(regex);
	}

	/**
	 * 替换正则匹配的第一部分
	 *
	 * @param input       要替换的字符串
	 * @param regex       正则表达式
	 * @param replacement 代替者
	 * @return 替换正则匹配的第一部分
	 */
	public static String getReplaceFirst(String input, String regex, String replacement) {
		if (input == null) {
			return null;
		}
		return Pattern.compile(regex).matcher(input).replaceFirst(replacement);
	}

	/**
	 * 替换所有正则匹配的部分
	 *
	 * @param input       要替换的字符串
	 * @param regex       正则表达式
	 * @param replacement 代替者
	 * @return 替换所有正则匹配的部分
	 */
	public static String getReplaceAll(String input, String regex, String replacement) {
		if (input == null) {
			return null;
		}
		return Pattern.compile(regex).matcher(input).replaceAll(replacement);
	}
}

