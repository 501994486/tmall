package com.tmall.infrastructure.logging;


import java.lang.annotation.*;

/**
 * All rights Reserved, Designed By technologyMall
 * @Description 自定义注解 拦截service
 * @author sun.h
 * @date   2020年5月18日
 * @version V1.0
 */
@Retention(RetentionPolicy.RUNTIME)
@Target({ElementType.METHOD})
public @interface SystemServiceLog {

	String description() default "";

	boolean async() default false;

}
