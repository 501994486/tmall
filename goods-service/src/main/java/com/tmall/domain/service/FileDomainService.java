package com.tmall.domain.service;

import com.tmall.domain.entity.Goods;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Map;

public interface FileDomainService {

	/**
	 * 获取导出的csv数据
	 * @param goodsList
	 * @return
	 */
	List<String[]> getExportCsvGoodsContentDataList(List<Goods> goodsList);

	/**
	 * list转换为string
	 * @param csvContentList
	 * @return
	 */
	String convertListToString(List<String[]> csvContentList);

	/**
	 * 获取导出的csv标题
	 * @return
	 */
	String[] getGoodsCsvHeadList();


	Map<String,List<Goods>> getImportCsvGoodsList(int shopId, MultipartFile uploadFile,Map<String,Object> errorMap);
}
