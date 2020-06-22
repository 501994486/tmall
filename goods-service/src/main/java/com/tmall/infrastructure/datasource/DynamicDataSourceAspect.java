package com.tmall.infrastructure.datasource;

import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.After;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.aspectj.lang.annotation.Pointcut;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

/**
 * All rights Reserved, Designed By technologyMall
 * @Description 动态数据源切换的切面
 * @author sun.h
 * @date   2019年9月17日
 * @version V1.0
 */
@Aspect
@Component
public class DynamicDataSourceAspect {

	private static final Logger logger = LoggerFactory.getLogger(DynamicDataSourceAspect.class);

	private final String[] QUERY_PREFIX = {"select"};

	@Pointcut("execution( * com.tmall.infrastructure.dao.*.*(..))")
	public void daoAspect() { }

	@Before("daoAspect()")
	public void switchDataSource(JoinPoint point) {
		Boolean isQueryMethod = isQueryMethod(point.getSignature().getName());
		if (isQueryMethod) {
			com.tmall.infrastructure.datasource.DynamicDataSourceContextHolder.slave();
			logger.info("Switch DataSource to [{}] in Method [{}]", com.tmall.infrastructure.datasource.DynamicDataSourceContextHolder.getDataSourceKey(), point.getSignature());
		}
	}

	@After("daoAspect()")
	public void restoreDataSource(JoinPoint point) {
		com.tmall.infrastructure.datasource.DynamicDataSourceContextHolder.clearDataSourceKey();
		logger.info("Restore DataSource to [{}] in Method [{}]", com.tmall.infrastructure.datasource.DynamicDataSourceContextHolder.getDataSourceKey(), point.getSignature());
	}

	private Boolean isQueryMethod(String methodName) {
		for (String prefix : QUERY_PREFIX) {
			if (methodName.startsWith(prefix)) {
				return true;
			}
		}
		return false;
	}
}
