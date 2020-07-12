package com.tmall.infrastructure.job;

import org.quartz.*;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

/**
 * 定时任务的配置文件
 * @author sun.h
 */
@Configuration
public class QuartzConfig {

	private static final String COLLECT_TASK_IDENTITY = "CollectTaskQuartz";

	@Bean
	public JobDetail quartzDetail(){
		return JobBuilder.newJob(GoodsCollectTask.class).withIdentity(COLLECT_TASK_IDENTITY).storeDurably().build();
	}

	@Bean
	public Trigger quartzTrigger(){
		SimpleScheduleBuilder scheduleBuilder = SimpleScheduleBuilder.simpleSchedule()
//                .withIntervalInSeconds(10)  //设置时间周期单位秒
				.withIntervalInHours(2)  //两个小时执行一次
				.repeatForever();
		return TriggerBuilder.newTrigger().forJob(quartzDetail())
				.withIdentity(COLLECT_TASK_IDENTITY)
				.withSchedule(scheduleBuilder)
				.build();
	}
}