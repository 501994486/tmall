package com.tmall.infrastructure.logging;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

/**
 * All rights Reserved, Designed By technologyMall
 * @Description 自定义注解 拦截Controller
 * @author sun.h
 * @date   2020年5月18日
 * @version V1.0
 */
@Retention(RetentionPolicy.RUNTIME)
@Target({ElementType.METHOD})
public @interface SystemControllerLog {

	String description() default "";

	boolean async() default false;

}
