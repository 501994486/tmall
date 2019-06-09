package com.tmall.infrastructure.logging;

import java.lang.annotation.*;


import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

/**
 *自定义注解 拦截Controller
 */
@Retention(RetentionPolicy.RUNTIME)
@Target({ElementType.METHOD})
public @interface SystemControllerLog {

	String description() default "";

	boolean async() default false;

}
