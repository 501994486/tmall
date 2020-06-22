package com.tmall.ui.openservice;

import com.tmall.application.service.GoodsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

/**
 * All rights Reserved, Designed By technologyMall
 * @Description 外部服务调用接口类
 * @author sun.h
 * @date   2019年5月18日
 * @version V1.0
 */
@Controller
@RequestMapping
public class GoodsOpenController {

	@Autowired
	private GoodsService goodsService;

	@RequestMapping("/hi")
	public String test(@RequestParam(value = "name", defaultValue = "zhangsan") String name) {
		return "hi " + name ;
	}
}
