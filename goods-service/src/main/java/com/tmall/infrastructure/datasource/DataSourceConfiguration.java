package com.tmall.infrastructure.datasource;


import com.tmall.infrastructure.enums.DataSourceTypeEnum;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.boot.jdbc.DataSourceBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;

import javax.sql.DataSource;
import java.util.HashMap;
import java.util.Map;

/**
 * All rights Reserved, Designed By technologyMall
 * @Description 数据源配置类，在该类中生成多个数据源实例并将其注入到 ApplicationContext中
 * @author sun.h
 * @date   2019年9月17日
 * @version V1.0
 */
@Configuration
public class DataSourceConfiguration {

	@Bean
	@Primary
	@ConfigurationProperties("spring.datasource.master")
	public DataSource masterDataSource() {
		return DataSourceBuilder.create().build();
	}

	@Bean
	@ConfigurationProperties("spring.datasource.slave1")
	public DataSource slave1DataSource() {
		return DataSourceBuilder.create().build();
	}

	@Bean
	public DataSource dynamicDataSource(@Qualifier("masterDataSource") DataSource masterDataSource,
										  @Qualifier("slave1DataSource") DataSource slave1DataSource) {
		Map<Object, Object> targetDataSources = new HashMap<>();
		targetDataSources.put(DataSourceTypeEnum.MASTER, masterDataSource);
		targetDataSources.put(DataSourceTypeEnum.SLAVE1, slave1DataSource);

		DynamicRoutingDataSource dynamicRoutingDataSource = new DynamicRoutingDataSource();
		dynamicRoutingDataSource.setDefaultTargetDataSource(masterDataSource);
		dynamicRoutingDataSource.setTargetDataSources(targetDataSources);
		return dynamicRoutingDataSource;
	}
}