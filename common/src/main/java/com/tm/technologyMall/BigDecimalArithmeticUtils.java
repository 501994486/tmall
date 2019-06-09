package com.tm.technologyMall;

import java.math.BigDecimal;

/**
 * All rights Reserved, Designed By technologyMall
 * @Title:  BigDecimalArithmeticUtils
 * @Package com.tm.technologyMall
 * @Description BigDecimal的数学运算工具类
 * @author sun.h
 * @date   2019年5月18日
 * @version V1.0
 */
public class BigDecimalArithmeticUtils {

	/**
	 * BigDecimal的加法运算
	 * @param b1
	 * @param bn
	 * @return
	 */
	public static BigDecimal add(BigDecimal b1, BigDecimal... bn) {
		if (null == b1) {
			b1 = BigDecimal.ZERO;
		}
		if (null != bn) {
			for (BigDecimal b : bn) {
				b1 = b1.add(null == b ? BigDecimal.ZERO : b);
			}
		}
		return b1;
	}

	/**
	 * 计算金额方法
	 * @param b1
	 * @param bn
	 * @return
	 */
	public static BigDecimal subtract(BigDecimal b1, BigDecimal... bn) {
		return subtract(true, b1, bn);
	}

	/**
	 * BigDecimal的减法运算
	 * @param isZero  减法结果为负数时是否返回0：true时返回0，false是返回负数结果
	 * @param b1	被减数
	 * @param bn    需要减的减数数组
	 * @return
	 */
	public static BigDecimal subtract(Boolean isZero, BigDecimal b1, BigDecimal... bn) {
		if (null == b1) {
			b1 = BigDecimal.ZERO;
		}
		BigDecimal r = b1;
		if (null != bn) {
			for (BigDecimal b : bn) {
				r = r.subtract((null == b ? BigDecimal.ZERO : b));
			}
		}
		return isZero ? (r.compareTo(BigDecimal.ZERO) == -1 ? BigDecimal.ZERO : r) : r;
	}

	/**
	 * BigDecimal的除法运算，返回2位小数,默认值为BigDecimal.ZERO
	 * @param b1
	 * @param b2
	 * @return
	 */
	public static <T extends Number> BigDecimal safeDivide(T b1, T b2){
		return safeDivide(b1, b2, BigDecimal.ZERO,2);
	}

	/**
	 * BigDecimal的除法运算封装，如果除数或者被除数为0，返回默认值
	 * @param b1
	 * @param b2
	 * @param defaultValue
	 * @return
	 */
	public static <T extends Number> BigDecimal safeDivide(T b1, T b2, BigDecimal defaultValue,int digit) {
		if (null == b1 || null == b2) {
			return defaultValue;
		}
		try {
			return BigDecimal.valueOf(b1.doubleValue()).divide(BigDecimal.valueOf(b2.doubleValue()), digit, BigDecimal.ROUND_HALF_UP);
		} catch (Exception e) {
			return defaultValue;
		}
	}

	/**
	 * BigDecimal的乘法运算封装 默认位置2
	 * @param b1
	 * @param b2
	 * @return
	 */
	public static <T extends Number> BigDecimal safeMultiply(T b1, T b2) {
		return multiply(b1,b2,2);
	}

	/**
	 * BigDecimal的乘法运算封装
	 * @param b1
	 * @param b2
	 * @return
	 */
	public static <T extends Number> BigDecimal multiply(T b1, T b2,int digit) {
		if (null == b1 || null == b2) {
			return BigDecimal.ZERO;
		}
		return BigDecimal.valueOf(b1.doubleValue()).multiply(BigDecimal.valueOf(b2.doubleValue())).setScale(digit, BigDecimal.ROUND_HALF_UP);
	}
}
