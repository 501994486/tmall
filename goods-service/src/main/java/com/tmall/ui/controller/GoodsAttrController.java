package com.tmall.ui.controller;

import com.tmall.application.assembler.ResultAssembler;
import com.tmall.common.CommonLogic;
import com.tmall.common.base.BaseCommonController;
import com.tmall.ui.dto.ResultBean;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.lang.reflect.InvocationTargetException;
import java.util.HashMap;
import java.util.Map;

/**
 * All rights Reserved, Designed By technologyMall
 * @Description 用于处理商品属性的相关url
 * @author sun.h
 * @date   2019年5月18日
 * @version V1.0
 */
@RestController
@RequestMapping("admin/goods/attr/*")
public class GoodsAttrController extends BaseCommonController {

	@Autowired
	private HttpServletRequest request;

	@Autowired
	private HttpSession session;
	/**
	 * 获取扩展属性情报
	 * @author sun.h
	 * @return
	 */
	@GetMapping( "{id}")
	public ResultBean getGoodsAttr(@PathVariable int id) throws InvocationTargetException, IllegalAccessException {
		Map<String,Object> resultMap = new HashMap();
		int shopId = CommonLogic.getShopId(session);

		return ResultAssembler.getSuccess();
	}


}
