package com.tmall.order.infrastructure.alipay;

import org.springframework.boot.context.event.ApplicationStartedEvent;
import org.springframework.context.ApplicationListener;
import org.springframework.stereotype.Component;

/**
 * 配置文件监听器，用来加载自定义配置文件
 */
@Component
public class PropertiesListener implements ApplicationListener<ApplicationStartedEvent> {

	@Override
	public void onApplicationEvent(ApplicationStartedEvent event) {
		AlipayProperties.loadProperties();
	}
}
