package com.tmall.ui.controller;

import com.tmall.application.assembler.DTOAssembler;
import com.tmall.application.assembler.ResultAssembler;
import com.tmall.application.convert.DTOConvert;
import com.tmall.application.service.GoodsBasicSetupService;
import com.tmall.domain.entity.valueobject.GoodsBasicSetup;
import com.tmall.infrastructure.enums.ResultEnum;
import com.tmall.common.base.BaseCommonController;
import com.tmall.common.CommonLogic;
import com.tmall.ui.dto.GoodsBasicSetupDTO;
import com.tmall.ui.dto.ResultBean;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.lang.reflect.InvocationTargetException;
import java.util.HashMap;
import java.util.Map;

/**
 * All rights Reserved, Designed By www.tmall.com
 * @Description   处理商品基本设定信息的url
 * @author sun.h
 * @version V1.0
 */
@RestController
@RequestMapping("admin/goods/basic-setup/*")
public class GoodsBasicSetUpController extends BaseCommonController {

	@Autowired
	private GoodsBasicSetupService goodsBasicSetupService;

	@Autowired
	@Qualifier("goodsBasicSetupDTOConvert")
	private DTOConvert dTOConvert;

	@Autowired
	private HttpServletRequest request;

	@Autowired
	private HttpSession session;

	/**
	 * 获取商品基本情报信息
	 * @author sun.h
	 * @return
	 */
	@GetMapping("")
	public ResultBean getGoodsSetup() throws InvocationTargetException, IllegalAccessException {
		Map<String,Object> resultMap = new HashMap();
		int shopId = CommonLogic.getShopId(session);
		GoodsBasicSetupDTO goodsBasicSetupDTO= DTOAssembler.assemblerGoodsBasicSetupDTO(goodsBasicSetupService.getGoodsBasicSetup(shopId));
		return ResultAssembler.getSuccess(goodsBasicSetupDTO);
	}

	/**
	 * 更新商品基本情报信息
	 * @author sun.h
	 * @return
	 */
	@RequestMapping(value = "", method = RequestMethod.PUT,consumes="application/json",produces="application/json")
	public ResultBean updateGoodsSetup(@ModelAttribute GoodsBasicSetupDTO goodsBasicSetupDTO) throws Exception {
		int shopId = CommonLogic.getShopId(session);
		if(goodsBasicSetupService.updateGoodsBasicSetup((GoodsBasicSetup) dTOConvert.convertExistData(goodsBasicSetupDTO,shopId))){
			ResultAssembler.getSuccess();
		}

		return ResultAssembler.getError(ResultEnum.UPDATE_EXCEPTION.getCode(),ResultEnum.UPDATE_EXCEPTION.getMsg());
	}
}
