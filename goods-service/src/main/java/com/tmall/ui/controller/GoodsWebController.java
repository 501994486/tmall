package com.tmall.ui.controller;

import com.tmall.application.assembler.ResultAssembler;
import com.tmall.application.service.GoodsWebService;
import com.tmall.common.CommonLogic;
import com.tmall.domain.repository.GoodsEsVORepository;
import com.tmall.infrastructure.enums.ResultEnum;
import com.tmall.infrastructure.vo.GoodsEsVO;
import com.tmall.ui.dto.ResultBean;
import org.elasticsearch.index.query.QueryStringQueryBuilder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

@RestController
@RequestMapping("goods/*")
public class GoodsWebController {
	@Autowired
	private HttpServletRequest request;

	@Autowired
	private HttpSession session;

	@Autowired
	private GoodsEsVORepository goodsEsVORepository;

	@Autowired
	private GoodsWebService goodsWebService;

	@GetMapping("/select/{q}")
	public List<GoodsEsVO> testSearch(@PathVariable String q) {
		QueryStringQueryBuilder builder = new QueryStringQueryBuilder(q);
		Iterable<GoodsEsVO> searchResult = goodsEsVORepository.search(builder);
		Iterator<GoodsEsVO> iterator = searchResult.iterator();
		List<GoodsEsVO> list = new ArrayList<>();
		while (iterator.hasNext()) {
			list.add(iterator.next());
		}
		return list;
	}

	@PostMapping("/collect/{spuId}/{status}")
	public ResultBean updateCollectStatus(@PathVariable int spuId,@PathVariable int status) {
		int userId = CommonLogic.getUserId(session);

		if(goodsWebService.updateGoodsCollectStatus(userId,spuId,status)){
			ResultAssembler.getSuccess();
		}
		return ResultAssembler.getError(ResultEnum.UPDATE_EXCEPTION.getCode(),ResultEnum.UPDATE_EXCEPTION.getMsg());
	}
}
