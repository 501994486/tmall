package com.tmall.infrastructure.datasource;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.jdbc.datasource.lookup.AbstractRoutingDataSource;

/**
 * All rights Reserved, Designed By technologyMall
 * @Description 获取数据源的key
 * @author sun.h
 * @date   2019年9月17日
 * @version V1.0
 */
public class DynamicRoutingDataSource extends AbstractRoutingDataSource {

	private final Logger logger = LoggerFactory.getLogger(getClass());

	/**
	 * 当为null时，表示使用的数据源是默认数据源(@Primary注释的数据源)
	 * @return
	 */
	@Override
	protected Object determineCurrentLookupKey() {
		logger.info("Current DataSource is [{}]",DynamicDataSourceContextHolder.getDataSourceKey());

		return DynamicDataSourceContextHolder.getDataSourceKey();
	}
}