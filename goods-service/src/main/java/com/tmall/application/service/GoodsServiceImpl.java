package com.tmall.application.service;

import com.tmall.domain.entity.Goods;
import com.tmall.domain.repository.GoodsRepository;
import com.tmall.domain.service.FileDomainService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Map;

@Service
public class GoodsServiceImpl implements GoodsService{

	@Autowired
	private GoodsRepository goodsRepository;


	@Autowired
	private FileDomainService fileDomainService;

	@Override
	public Map<String,Object> getGoodsBriefIntroduction(long[] idArr) {
		return goodsRepository.getGoodsBriefIntroductionByPk(idArr);
	}

	@Override
	public boolean addGoods(Goods goods) {
		return goodsRepository.addGoods(goods);
	}

	@Override
	public boolean trashGoods(String[] spuIdArr) {
		return goodsRepository.trashGoods(spuIdArr);
	}

	@Override
	public boolean deleteGoods(String[] spuIdArr) {
		return goodsRepository.deleteGoods(spuIdArr);
	}

	@Override
	public Map<Integer, List<Goods>> getCategoryGoodsListMap(int shopId) {
		return null;
	}

	@Override
	public String[] getGoodsCsvHeadList() {
		return fileDomainService.getGoodsCsvHeadList();
	}

	@Override
	public List<String[]> getExportGoodsCsvDataList(List<Goods> goodsList) {
		return fileDomainService.getExportCsvGoodsContentDataList(goodsList);
	}

	@Override
	public String convertListToString(List<String[]> goodsCsvDataList) {
		return fileDomainService.convertListToString(goodsCsvDataList);
	}

	@Override
	public Map<String,List<Goods>> getImportCsvGoodsList(int shopId, MultipartFile uploadFile,Map<String,Object> errorMap) {
		return fileDomainService.getImportCsvGoodsList(shopId,uploadFile,errorMap);
	}

	@Override
	public List<Goods> getGoodList(int shopId, int categoryId, String... goodsIdArr) {
		return null;
	}
}
