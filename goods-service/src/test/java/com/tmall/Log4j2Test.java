package com.tmall;



import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class Log4j2Test {

	// Logger和LoggerFactory导入的是org.slf4j包
	private final static Logger logger = LoggerFactory.getLogger(Log4j2Test.class);
	public static void main(String[] args) {
		long beginTime = System.currentTimeMillis();

		for(int i = 0; i < 10 ;i++) {
			logger.trace("trace level");
			logger.debug("debug level");
			logger.info("info level");
			logger.warn("warn level");
			logger.error("error level");
		}

		try {
			Thread.sleep(1000 * 61);
		} catch (InterruptedException e) {}


	}
}