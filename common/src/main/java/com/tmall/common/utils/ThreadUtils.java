package com.tmall.common.utils;

import java.util.UUID;

public class ThreadUtils {

	private static final ThreadLocal<String> threadLocal = new ThreadLocal<>();

	public static String getThreadId() {
		String threadId = threadLocal.get();
		if (null == threadId) {
			threadId = UUID.randomUUID().toString();
			threadLocal.set(threadId);
		}
		return threadId;
	}

}
