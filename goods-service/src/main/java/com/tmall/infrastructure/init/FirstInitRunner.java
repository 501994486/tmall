package com.tmall.infrastructure.init;

import com.tmall.application.service.GoodsWebService;
import com.tmall.domain.repository.GoodsWebRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.core.Ordered;
import org.springframework.stereotype.Component;

/**
 * Spring Boot应用启动后就会执行其run方法
 * 优先级最高
 * 该类期望在springboot 启动后第一顺位执行
 **/
@Component
public class FirstInitRunner implements CommandLineRunner, Ordered {

	@Autowired
	private GoodsWebRepository goodsWebRepository;


	@Override
	public void run(String... args) throws Exception {
		goodsWebRepository.initGoodsSellTop();
	}

	@Override
	public int getOrder() {
		return Integer.MIN_VALUE+1;
	}
}
