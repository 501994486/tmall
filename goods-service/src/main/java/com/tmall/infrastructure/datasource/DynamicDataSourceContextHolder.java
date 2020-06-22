package com.tmall.infrastructure.datasource;

import com.tmall.infrastructure.enums.DataSourceTypeEnum;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.concurrent.atomic.AtomicInteger;

/**
 * All rights Reserved, Designed By technologyMall
 * @Description 数据源上下文配置类，用于切换数据源
 * @author sun.h
 * @date   2019年9月17日
 * @version V1.0
 */
public class DynamicDataSourceContextHolder {

	private static final Logger logger = LoggerFactory.getLogger(DynamicDataSourceContextHolder.class);
	//通过ThreadLocal将数据源设置到每个线程上下文中
	private static final ThreadLocal<DataSourceTypeEnum> contextHolder = new ThreadLocal<>();

	private static final AtomicInteger counter = new AtomicInteger(-1);

	public static void set(DataSourceTypeEnum dbType) {
		contextHolder.set(dbType);
	}

	public static void master() {
		set(DataSourceTypeEnum.MASTER);
	}

	public static void slave() {
		//  轮询
		int datasourceKeyIndex  = counter.getAndIncrement() % 2;
		if (counter.get() > 9999) {
			counter.set(-1);
		}
		if (datasourceKeyIndex  == 0) {
			set(DataSourceTypeEnum.SLAVE1);
			logger.info("Switch To slave1");
		} else {
			set(DataSourceTypeEnum.SLAVE1);
			logger.info("Switch To slave1(2)");
		}
	}

	public static DataSourceTypeEnum getDataSourceKey() {
		return contextHolder.get();
	}

	public static void clearDataSourceKey() {
		contextHolder.remove();
	}
}
