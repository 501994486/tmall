package com.tmall.common.snowflakeId;


import org.springframework.boot.context.properties.ConfigurationProperties;

@ConfigurationProperties("snowflakeid")
public class SnowflakeIdWorkerProperties {
	/** 工作机器ID(0~31) */
	private long worker;

	/** 数据中心ID(0~31) */
	private long datacenter;

	public long getWorker() {
		return worker;
	}

	public void setWorker(long worker) {
		this.worker = worker;
	}

	public long getDatacenter() {
		return datacenter;
	}

	public void setDatacenter(long datacenterId) {
		this.datacenter = datacenter;
	}

}