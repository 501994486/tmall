package com.tmall.infrastructure.job;


import com.tmall.common.utils.LogUtils;
import com.tmall.domain.repository.GoodsWebRepository;
import com.tmall.infrastructure.filter.CrossDomainFilter;
import com.tmall.infrastructure.redis.RedisService;
import lombok.extern.slf4j.Slf4j;
import org.quartz.JobExecutionContext;
import org.quartz.JobExecutionException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.quartz.QuartzJobBean;
import org.springframework.stereotype.Component;

import java.text.SimpleDateFormat;

/**
 * 商品收藏定时任务
 * @author sunhao
 */
@Component
public class GoodsCollectTask extends QuartzJobBean {

	private final static Logger logger = LoggerFactory.getLogger(CrossDomainFilter.class);

	@Autowired
	private GoodsWebRepository goodsWebRepository;

	private SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");

	@Override
	protected void executeInternal(JobExecutionContext jobExecutionContext) throws JobExecutionException {

		//将 Redis 里的点赞信息同步到数据库里
		goodsWebRepository.transGoodsCollectDataFromRedis();

		LogUtils.writeInfoLog(logger,GoodsCollectTask.class,"executeInternal","redis to mysql goods collect success");
	}
}
