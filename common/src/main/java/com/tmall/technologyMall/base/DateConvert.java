package com.tmall.technologyMall.base;


import com.tmall.technologyMall.utils.DateTimeUtils;
import com.tmall.technologyMall.utils.LogUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.regex.Pattern;

public class DateConvert {

	private final static Logger logger = LoggerFactory.getLogger(DateConvert.class);

	public static Date convert(String source) {
		SimpleDateFormat sdf = getDateFormat(source);
		try{
			return sdf.parse(source);
		} catch(ParseException e){
			LogUtils.writeExceptionLog(logger,DateConvert.class,"convert",e);
		}
		return null;
	}

	private static SimpleDateFormat getDateFormat(String source) {
		SimpleDateFormat sdf = new SimpleDateFormat();
		if(Pattern.matches("^\\d{4}-\\d{2}-\\d{2}$",source)){
			sdf = new SimpleDateFormat(DateTimeUtils.DATE_TIME_FORMAT_LINE_yyyyMMdd);
		}
		else if(Pattern.matches("^\\d{4}/\\d{2}/\\d{2}$",source)){
			sdf = new SimpleDateFormat(DateTimeUtils.DATE_TIME_FORMAT_SLASH_yyyyMMdd);
		}
		else if(Pattern.matches("^\\d{4}\\d{2}\\d{2}$",source)){
			sdf = new SimpleDateFormat(DateTimeUtils.DATE_TIME_FORMAT_yyyyMMdd);
		}
		return sdf;
	}
}
