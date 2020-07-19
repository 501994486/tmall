package com.tmall.order.infrastructure.redis;

import com.tmall.common.utils.LogUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.Cursor;
import org.springframework.data.redis.core.RedisCallback;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.ScanOptions;
import org.springframework.stereotype.Component;

import java.util.Collection;
import java.util.Date;
import java.util.HashSet;
import java.util.Set;
import java.util.concurrent.TimeUnit;
import java.util.stream.Collectors;
import java.util.stream.Stream;

import org.springframework.data.redis.core.RedisTemplate;

/**
 * All rights Reserved, Designed By technologyMall
 * @Description redis工具服务
 * @author sun.h
 * @date   2020年5月18日
 * @version V1.0
 */
@Component
public class RedisService {

	private final static Logger logger = LoggerFactory.getLogger(RedisService.class);

	@Autowired
	private RedisTemplate<String, String> redisTemplate;

	/**
	 * 默认过期时长，单位：秒
	 */
	public static final long DEFAULT_EXPIRE = 60 * 60 * 24;

	/**
	 * 不设置过期时长
	 */
	public static final long NOT_EXPIRE = -1;

	/**
	 * scan 实现
	 * @param pattern       表达式，如：abc*，找出所有以abc开始的键
	 */
	public Set<String> scan(String pattern) {
		return redisTemplate.execute((RedisCallback<Set<String>>) connection -> {
			Set<String> keysTmp = new HashSet<>();
			try (Cursor<byte[]> cursor = connection.scan(new ScanOptions.ScanOptionsBuilder()
					.match(pattern)
					.count(10000).build())) {

				while (cursor.hasNext()) {
					keysTmp.add(new String(cursor.next(), "Utf-8"));
				}
			} catch (Exception e) {
				LogUtils.writeExceptionLog(logger,RedisService.class,"scan",e);
				throw new RuntimeException(e);
			}
			return keysTmp;
		});
	}

	public boolean existsKey(String key) {
		return redisTemplate.hasKey(key);
	}

	/**
	 * 重名名key，如果newKey已经存在，则newKey的原值被覆盖
	 *
	 * @param oldKey
	 * @param newKey
	 */
	public void renameKey(String oldKey, String newKey) {
		redisTemplate.rename(oldKey, newKey);
	}

	/**
	 * newKey不存在时才重命名
	 *
	 * @param oldKey
	 * @param newKey
	 * @return 修改成功返回true
	 */
	public boolean renameKeyNotExist(String oldKey, String newKey) {
		return redisTemplate.renameIfAbsent(oldKey, newKey);
	}

	/**
	 * 删除key
	 *
	 * @param key
	 */
	public void deleteKey(String key) {
		redisTemplate.delete(key);
	}

	/**
	 * 删除多个key
	 *
	 * @param keys
	 */
	public void deleteKey(String... keys) {
		Set<String> kSet = Stream.of(keys).map(k -> k).collect(Collectors.toSet());
		redisTemplate.delete(kSet);
	}

	/**
	 * 删除Key的集合
	 *
	 * @param keys
	 */
	public void deleteKey(Collection<String> keys) {
		Set<String> kSet = keys.stream().map(k -> k).collect(Collectors.toSet());
		redisTemplate.delete(kSet);
	}

	/**
	 * 设置key的生命周期
	 *
	 * @param key
	 * @param time
	 * @param timeUnit
	 */
	public void expireKey(String key, long time, TimeUnit timeUnit) {
		redisTemplate.expire(key, time, timeUnit);
	}

	/**
	 * 指定key在指定的日期过期
	 *
	 * @param key
	 * @param date
	 */
	public void expireKeyAt(String key, Date date) {
		redisTemplate.expireAt(key, date);
	}

	/**
	 * 查询key的生命周期
	 *
	 * @param key
	 * @param timeUnit
	 * @return
	 */
	public long getKeyExpire(String key, TimeUnit timeUnit) {
		return redisTemplate.getExpire(key, timeUnit);
	}

	/**
	 * 将key设置为永久有效
	 *
	 * @param key
	 */
	public void persistKey(String key) {
		redisTemplate.persist(key);
	}
}
