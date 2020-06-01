package com.tmall.technologyMall.utils;

import org.apache.commons.lang3.StringUtils;
import org.joda.time.DateTime;
import org.joda.time.format.DateTimeFormat;
import org.joda.time.format.DateTimeFormatter;

import java.sql.Timestamp;
import java.util.Date;

/**
 * All rights Reserved, Designed By technologyMall
 * @Title:  DateTimeUtils
 * @Package com.tm.technologyMall
 * @Description 日期获取格式化工具类
 * @author sun.h
 * @date   2019年5月20日
 * @version V1.0
 */
public class DateTimeUtils {

	public static final String DATE_TIME_FORMAT_SLASH_yyyyMMdd_HHmmss = "yyyy/MM/dd HH:mm:ss";
	public static final String DATE_TIME_FORMAT_SLASH_yyyyMMdd_HHmm = "yyyy/MM/dd HH:mm";
	public static final String DATE_TIME_FORMAT_SLASH_yyyyMMdd_HH = "yyyy/MM/dd HH";
	public static final String DATE_TIME_FORMAT_SLASH_yyyyMMdd = "yyyy/MM/dd";
	public static final String DATE_TIME_FORMAT_SLASH_yyyyMM = "yyyy/MM";
	
	public static final String DATE_TIME_FORMAT_LINE_yyyyMMdd_HHmmss = "yyyy-MM-dd HH:mm:ss";
	public static final String DATE_TIME_FORMAT_LINE_yyyyMMdd_HHmm = "yyyy-MM-dd HH:mm";
	public static final String DATE_TIME_FORMAT_LINE_yyyyMMdd_HH = "yyyy-MM-dd HH";
	public static final String DATE_TIME_FORMAT_LINE_yyyyMMdd = "yyyy-MM-dd";
	public static final String DATE_TIME_FORMAT_LINE_yyyyMM= "yyyy-MM";
	
	public static final String DATE_TIME_FORMAT_yyyyMMddHHmmss = "yyyyMMddHHmmss";
	public static final String DATE_TIME_FORMAT_yyyyMMdd = "yyyyMMdd";
	public static final String DATE_TIME_FORMAT_yyyyMM = "yyyyMM";
	public static final String DATE_TIME_FORMAT_yyyy = "yyyy";
	public static final String DATE_TIME_FORMAT_MM = "MM";
	public static final String DATE_TIME_FORMAT_dd = "dd";
	public static final String DATE_TIME_FORMAT_HHmmss = "HH:mm:ss";
	public static final String DATE_TIME_FORMAT_HHmm = "HH:mm";
	public static final String DATE_TIME_FORMAT_HH = "HH";
	public static final String DATE_TIME_FORMAT_mm = "mm";
	
	public static final String DATE_TIME_FORMAT_yyyyM = "yyyy年M月";
	
	/**
	 * 取得当前时间.
	 * <p>详细说明：　取得当前时间，返回 Timestamp 类型。
	 * @return
	 */
	public static Timestamp getCurrentTimestamp() {
		return new Timestamp(System.currentTimeMillis());
	}

	/**
	 * 取得当前的Epoch time(in milliseconds).
	 * @return
	 */
	public static long getCurrentEpochTimeMillis() {
		return System.currentTimeMillis();
	}

	/**
	 * 根据EpochTime取得Timestamp.
	 * <p>详细说明：　取得当前时间，返回 Timestamp 类型。
	 * @return
	 */
	public static Timestamp getTimestampByEpochTime(long time) {
		return new Timestamp(time);
	}

	/**
	 * 按照指定格式解析字符串成Date
	 * @param dateTimeStr 需要格式化的字符串
	 * @param formatStr 格式化的格式
	 * @return
	 */
    public static Date strToDate(String dateTimeStr,String formatStr){
        DateTimeFormatter dateTimeFormatter = DateTimeFormat.forPattern(formatStr);
        DateTime dateTime = dateTimeFormatter.parseDateTime(dateTimeStr);
        return dateTime.toDate();
    }

    /**
     * Date格式化成字符串。
     * @param timestamp 需要格式化的时间
     * @param formatStr 格式化的格式
     * @return
     */
    public static String formatDateToString(Date timestamp, String formatStr) {
        if(timestamp == null){
            return StringUtils.EMPTY;
        }
        
        DateTime dateTime = new DateTime(timestamp);
        return dateTime.toString(formatStr);
    }
        
	/**
	 * 日期格式化处理(yyyy/MM/dd HH:mm:ss).
	 * @return
	 */
	public static String dateTimeFormat_SLASH_yyyyMMdd_HHmmss_COLON(Date timestamp) {
		return formatDateToString(timestamp, DATE_TIME_FORMAT_SLASH_yyyyMMdd_HHmmss);
	}

	/**
	 * 日期格式化处理(yyyy-MM-dd HH:mm:ss).
	 * @return
	 */
	public static String dateTimeFormat_HYPHEN_yyyyMMdd_HHmmss_COLON(Date timestamp) {
		return formatDateToString(timestamp, DATE_TIME_FORMAT_LINE_yyyyMMdd_HHmmss);
	}

	/**
	 * 日期格式化处理(yyyy/MM/dd HH:mm).
	 * @return
	 */
	public static String dateTimeFormat_SLASH_yyyyMMdd_HHmmCOLON(Date timestamp) {
		return formatDateToString(timestamp, DATE_TIME_FORMAT_SLASH_yyyyMMdd_HHmm);
	}
	
	/**
	 * 日期格式化处理(yyyy-MM-dd HH:mm).
	 * @return
	 */
	public static String dateTimeFormat_yyyyMMdd_HYPHEN_HHmmCOLON(Date timestamp) {
		return formatDateToString(timestamp,DATE_TIME_FORMAT_LINE_yyyyMMdd_HHmm);
	}

	/**
	 * 日期格式化处理(yyyyMMddHHmmss).
	 * @return
	 */
	public static String dateTimeFormat_yyyyMMddHHmmss(Date timestamp) {
		return formatDateToString(timestamp, DATE_TIME_FORMAT_yyyyMMddHHmmss);
	}

	/**
	 * 日期格式化处理(yyyy/MM/dd).
	 * @return
	 */
	public static String dateTimeFormat_SLASH_yyyyMMdd(Date timestamp) {
		return formatDateToString(timestamp, DATE_TIME_FORMAT_SLASH_yyyyMMdd);
	}

	/**
	 * 日期格式化处理(yyyy-MM-dd).
	 * @return
	 */
	public static String dateTimeFormat_HYPHEN_yyyyMMdd(Date timestamp) {
		return formatDateToString(timestamp, DATE_TIME_FORMAT_LINE_yyyyMMdd);
	}

	/**
	 * 日期格式化处理(yyyyMMdd).
	 * @return
	 */
	public static String dateTimeFormat_yyyyMMdd(Date timestamp) {
		return formatDateToString(timestamp, DATE_TIME_FORMAT_yyyyMMdd);
	}

	
	/**
	 * 日期格式化处理(yyyy/MM).
	 * @return
	 */
	public static String dateTimeFormat_yyyyMM_SLASH(Date timestamp) {
		return formatDateToString(timestamp, DATE_TIME_FORMAT_SLASH_yyyyMM);
	}
	
	/**
	 * 日期格式化处理(yyyy-MM).
	 * @return
	 */
	public static String dateTimeFormat_HYPHEN_yyyyMM(Date timestamp) {
		return formatDateToString(timestamp, DATE_TIME_FORMAT_LINE_yyyyMM);
	}


	/**
	 * 日期格式化处理(yyyyMM).
	 * @return
	 */
	public static String dateTimeFormat_yyyyMM(Date timestamp) {
		return formatDateToString(timestamp, DATE_TIME_FORMAT_yyyyMM);
	}

	/**
	 * 日期格式化处理(HH:mm:ss).
	 * @return
	 */
	public static String dateTimeFormat_HHmmss_COLON(Date timestamp) {
		return formatDateToString(timestamp, DATE_TIME_FORMAT_HHmmss);
	}


	/**
	 * 日期格式化处理(yyyy年M月).
	 * @return
	 */
	public static String dateTimeFormat_yyyyM(Date timestamp) {
		return formatDateToString(timestamp, DATE_TIME_FORMAT_yyyyM);
	}
}
