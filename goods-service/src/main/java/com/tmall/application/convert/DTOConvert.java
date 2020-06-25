package com.tmall.application.convert;

/**
 * All rights Reserved, Designed By technologyMall
 * @Description DTO转换器，用于将dto转换为实体
 * @author sun.h
 * @date   2020年5月18日
 * @version V1.0
 */
public interface DTOConvert<S,T> {

	/**
	 * 转换新增数据
	 * @param s
	 * @param shopId
	 * @return
	 * @throws Exception
	 */
	T convertNewData(S s,int shopId)throws Exception;

	/**
	 * 转换存在的数据
	 * @param s
	 * @param shopId
	 * @return
	 * @throws Exception
	 */
	T convertExistData(S s,int shopId)throws Exception;
}
