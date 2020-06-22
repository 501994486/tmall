package com.tmall.domain.service;

import com.tmall.domain.entity.Category;
import com.tmall.domain.entity.Goods;
import com.tmall.common.CommonLogic;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

/**
 * All rights Reserved, Designed By technologyMall
 * @Description 获取树结构
 * @author sun.h
 * @date   2020年5月18日
 * @version V1.0
 */
@Component
public class TreeDomainServiceImpl implements TreeDomainService{

	/**
	 * 生成树结构
	 * @param categoryList
	 * @param categoryGoodsListMap
	 * @return
	 */
	@Override
	public Map<String, Object> getGoodsManagementTreeData(List<Category> categoryList, Map<Integer,List<Goods>> categoryGoodsListMap) {
		List<String[]> nodeList = new ArrayList<String[]>();

		String parentId = "0";
		String nodeName = "";
		String folderType = "drive";
		String categoryNodeId = "0";
		String goodsSpuNodeId= "";
		for (Category category : categoryList) {
			categoryNodeId = category.getCategoryId().toString();

			if (!"0".equals(categoryNodeId)) {
				parentId = String.valueOf(category.getParentCategoryId());
				folderType = "folder";
			}

			nodeName = category.getCategoryName();
			String menuFlag = "0";
			String defaultFlag = "0";

			String displayFlag = "display";
			if (category.getShowFlag() == 0) {
				displayFlag = "noDisplay";
			}

			String[] branchNode = { nodeName, categoryNodeId, parentId, defaultFlag, menuFlag,
					displayFlag, folderType, String.valueOf(category.getSortOrder())};
			nodeList.add(branchNode);

			// 商品节点 从map中获取当前category下的商品list
			List<Goods> goodsList = categoryGoodsListMap.get(category.getCategoryId());

			folderType = "file";
			for(Goods goods : goodsList){
				nodeName= goods.getGoodsName();
				goodsSpuNodeId = goods.getSpuId().toString();
				String[] leafNode = {nodeName, goodsSpuNodeId, categoryNodeId,
						defaultFlag, menuFlag, displayFlag, folderType, String.valueOf(goods.getSortOrder()) };
				nodeList.add(leafNode);
			}
		}

		return CommonLogic.getTreeMap(nodeList);
	}
}
