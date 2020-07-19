package com.tmall.order.infrastructure.snowflake;

import org.springframework.boot.context.properties.ConfigurationProperties;

@ConfigurationProperties("snowflakeid")
public class SnowflakeIdWorkerProperties {
	/** 工作机器ID(0~31) */
	private long worker;

	/** 数据中心ID(0~31) */
	private long datacenter;

	public long getWorkerId() {
		return worker;
	}

	public void setWorkerId(long workerId) {
		this.worker = workerId;
	}

	public long getDatacenterId() {
		return datacenter;
	}

	public void setDatacenterId(long datacenterId) {
		this.datacenter = datacenterId;
	}

}

