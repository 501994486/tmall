package com.tmall.infrastructure.redis;

/**
 * All rights Reserved, Designed By technologyMall
 * @Description 关于key的redis工具类
 * @author sun.h
 * @date   2020年5月18日
 * @version V1.0
 */
public class RedisKeyUtil {

	public final static String MAP_KEY_GOODS_COLLECT = "tm:goods:collect";

	public final static String ZSET_KEY_GOODS_SALES_RANDING = "tm:goods:randing";

	/**
	 * redis的key
	 * 形式为：
	 * 表名:主键名:主键值:列名
	 *
	 * @param tableName 表名
	 * @param majorKey 主键名
	 * @param majorKeyValue 主键值
	 * @param column 列名
	 * @return
	 */
	public static String getKeyWithColumn(String tableName,String majorKey,String majorKeyValue,String column){
		StringBuffer buffer = new StringBuffer();
		buffer.append(tableName).append(":");
		buffer.append(majorKey).append(":");
		buffer.append(majorKeyValue).append(":");
		buffer.append(column);
		return buffer.toString();
	}
	/**
	 * redis的key
	 * 形式为：
	 * 表名:主键名:主键值
	 *
	 * @param tableName 表名
	 * @param majorKey 主键名
	 * @param majorKeyValue 主键值
	 * @return
	 */
	public static String getKey(String tableName,String majorKey,String majorKeyValue){
		StringBuffer buffer = new StringBuffer();
		buffer.append(tableName).append(":");
		buffer.append(majorKey).append(":");
		buffer.append(majorKeyValue).append(":");
		return buffer.toString();
	}
}