package com.tmall.order.infrastructure.snowflake;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.condition.ConditionalOnClass;
import org.springframework.boot.autoconfigure.condition.ConditionalOnMissingBean;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
@ConditionalOnClass(SnowflakeIdWorker.class)
@EnableConfigurationProperties(SnowflakeIdWorkerProperties.class)
public class SnowflakeIdWorkerAutoConfigure {
	@Autowired
	private SnowflakeIdWorkerProperties snowflakeIdWorkerProperties;

	@Bean
	@ConditionalOnMissingBean
	SnowflakeIdWorker snowflakeIdWorker() {
		return new SnowflakeIdWorker(snowflakeIdWorkerProperties.getWorkerId(),
				snowflakeIdWorkerProperties.getDatacenterId());
	}
}