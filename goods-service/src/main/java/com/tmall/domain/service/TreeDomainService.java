package com.tmall.domain.service;

import com.tmall.domain.entity.Category;
import com.tmall.domain.entity.Goods;

import java.util.List;
import java.util.Map;

public interface TreeDomainService {

	Map<String, Object> getGoodsManagementTreeData(List<Category> categoryList, Map<Integer,List<Goods>> categoryGoodsListMap);
}
