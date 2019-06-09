package com.tmall.infrastructure.util;

import com.tm.technologyMall.AppConstants;
import com.tmall.infrastructure.constants.LogConstants;
import org.slf4j.Logger;

import javax.servlet.http.HttpServletRequest;
import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.util.LinkedHashMap;
import java.util.Map;

public class LogUtils {

	//增加日志连接符
	private static void addLogItem(StringBuilder sb, String key, String value) {
		sb.append(key);
		sb.append("=");
		sb.append("\"");
		sb.append(value);
		sb.append("\"");
		sb.append(" ");
	}

	//用于组装日志信息
	private static String getBatchLogMessage(String logLevel, String className, String methodName,String resultString) {

		StringBuilder sb = new StringBuilder();  //用于存放一条日志信息
		Map<String, String> logItemMap = new LinkedHashMap<String, String>(); //用于存一条日志信息key-value的映射
		logItemMap.put("time",""+new Timestamp(System.currentTimeMillis()));

		logItemMap.put("priority", logLevel);
		logItemMap.put("class", className);
		logItemMap.put("method", methodName);
		logItemMap.put("result_string", resultString);



		for (String key : logItemMap.keySet()) {
			LogUtils.addLogItem(sb, key, logItemMap.get(key));
		}
		return sb.toString();
	}

	//用于组装输出日志的信息
	public static void writeLog(Logger logger, String logLevel, String log) {
		if (LogConstants.LEVEL_INFO.equals(logLevel)) {
			logger.info(log);
		}
		else if (LogConstants.LEVEL_ERROR.equals(logLevel)) {
			logger.error(log);
		}
		else if (LogConstants.LEVEL_WARN.equals(logLevel)) {
			logger.warn(log);
		}
		else if (LogConstants.LEVEL_DEBUG.equals(logLevel)) {
			logger.debug(log);
		}
	}


	public static void writeExceptionLog(Logger logger, Class clazz, String methodName, Exception e) {
		String log = getBatchLogMessage(LogConstants.LEVEL_DEBUG, clazz.getName(), methodName,e.getMessage());
		writeLog(logger, LogConstants.LEVEL_DEBUG,log);
	}

	public static void writeInfoLog(Logger logger, Class clazz, String methodName, String infoMessage) {
		String log = getBatchLogMessage(LogConstants.LEVEL_INFO, clazz.getName(), methodName, infoMessage);
		writeLog(logger, LogConstants.LEVEL_INFO, log);
	}

	public static void writeDebugLog(Logger logger, Class clazz, String methodName, String infoMessage) {
		String log = getBatchLogMessage(LogConstants.LEVEL_DEBUG, clazz.getName(), methodName, infoMessage);
		writeLog(logger, LogConstants.LEVEL_DEBUG, log);
	}

	public static void writeWarnLog(Logger logger, Class clazz, String methodName, String warnMessage) {
		String log = getBatchLogMessage(LogConstants.LEVEL_WARN, clazz.getName(), methodName, warnMessage);
		writeLog(logger, LogConstants.LEVEL_WARN, log);
	}

	public static void writeErrorLog(Logger logger, Class clazz, String methodName, String errorMessage) {
		String log = getBatchLogMessage(LogConstants.LEVEL_ERROR, clazz.getName(), methodName, errorMessage);
		writeLog(logger, LogConstants.LEVEL_ERROR, log);
	}


	public static String getLogMessage(byte logType, String logLevel, String operCode, String resultCode, String resultString,
									   Long elapsedTime, Map<String, String> userLogItems,
									   String classMethodName, HttpServletRequest request) {
		StringBuilder sb = new StringBuilder();
		String[] names = classMethodName.split(AppConstants.SYMBOL_SHARP);
		String className = null;
		String methodName = null;
		if (names != null && names.length == 2) {
			className = names[0];
			methodName = names[1];
		}
		Map<String, String> logItemMap = new LinkedHashMap<String, String>();

		logItemMap.put(LogConstants.SESSION_ID, request.getSession().getId());
		logItemMap.put(LogConstants.THREAD_ID, String.valueOf(Thread.currentThread().getId()));
		logItemMap.put(LogConstants.TIME, LocalDateTime.now().toString());

		logItemMap.put(LogConstants.PRIORITY, logLevel);
		logItemMap.put(LogConstants.HTTP_REQUEST_ID, request.getHeader(LogConstants.HTTP_REQUEST_ID));
		logItemMap.put(LogConstants.CLASS_NAME, className);
		logItemMap.put(LogConstants.METHOD_NAME, methodName);

		for (String key : logItemMap.keySet()) {
			LogUtils.addLogItem(sb, key, logItemMap.get(key));
		}

		// When using logSerivce.writeLog()
		if (userLogItems != null) {
			for (String userLogItem : userLogItems.keySet()) {
				LogUtils.addLogItem(sb, userLogItem, userLogItems.get(userLogItem));
			}
		}

		return sb.toString().trim();
	}

}