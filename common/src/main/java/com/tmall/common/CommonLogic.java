package com.tmall.common;


import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.apache.commons.collections.CollectionUtils;
import org.apache.commons.lang3.StringUtils;

import javax.servlet.http.HttpSession;
import java.util.*;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

/**
 * All rights Reserved, Designed By technologyMall
 * @Title:  CommonLogic
 * @Package com.tm.technologyMall
 * @Description 项目通用业务处理
 * @author sun.h
 * @date   2019年5月20日
 * @version V1.0
 */
public class CommonLogic {

	/**
	 * 取得userId.
	 * @param session
	 * @return
	 */
	public static Integer getShopId(HttpSession session) {
		Integer shopId =  (Integer) CommonLogic.getSession(session,AppConstants.SESSION_KEY_SHOP_ID);
		if(shopId == null){
			shopId = 1;
		}
		return shopId;
	}

	/**
	 * 取得userId.
	 * @param session
	 * @return
	 */
	public static Integer getUserId(HttpSession session) {
		Integer userId =  (Integer) CommonLogic.getSession(session,AppConstants.SESSION_KEY_USER_ID);
		if(userId == null){
			userId = 1;
		}
		return userId;
	}

	/**
	 * 取得session.
	 * @param session
	 * @param sessionKey
	 * @return
	 */
	public static Object getSession(HttpSession session,String sessionKey) {
		if (session != null) {
			Map<String, Object> loginInfoMap = (Map<String, Object>) session.getAttribute(AppConstants.SESSION_KEY_LOGIN_INFO_MAP);
			if (loginInfoMap != null) {
				return loginInfoMap.get(sessionKey);
			}
		}
		return null;
	}

	/**
	 * 从JSON格式的字符串里以Key取得VALUE.
	 * @param jsonString
	 * @param key
	 * @return
	 */
	public static String getJsonValue(String jsonString, String key) {
		if (StringUtils.isNotEmpty(jsonString)) {
			try{
				ObjectMapper mapper = new ObjectMapper();
				JsonNode node = mapper.readTree(jsonString);
				if (node.get(key) != null) {
					return node.get(key).toString();
				}
			}catch(Exception e){
				return StringUtils.EMPTY;
			}
		}
		return StringUtils.EMPTY;
	}

	/**
	 * 如果Obj为空，返回空字符串；非空时，Obj转成字符串返回.
	 * @param obj
	 */
	public static String defaultString(Object obj) {
		String result = StringUtils.EMPTY;
		if (obj != null) {
			result = StringUtils.trim(StringUtils.defaultString(String.valueOf(obj)));
		}
		return result;
	}

	/**
	 * 通过间隔符将list转换为字符串
	 * @param list
	 * @param interval
	 * @return
	 */
	public static String getListToStringByInterval(List<String> list,String interval) {
		StringBuilder result = new StringBuilder();
		for (String s : list) {
			result.append(s).append(interval);
		}
		return result.toString();
	}

	/**
	 * 比较两个List集合是否相等
	 * @param list1
	 * @param list2
	 * @return
	 */
	public static <E>boolean isListEqual(List<E> list1, List<E> list2) {
		// 两个list引用相同（包括两者都为空指针的情况）
		if (list1 == list2) {
			return true;
		}

		// 两个list都为空（包括空指针、元素个数为0）
		if ((list1 == null && list2 != null && list2.size() == 0)
				|| (list2 == null && list1 != null && list1.size() == 0)) {
			return true;
		}

		// 两个list元素个数不相同
		if (list1.size() != list2.size()) {
			return false;
		}

		// 两个list元素个数已经相同，再比较两者内容(确保list内对象实现了equals()方法)
		if (!list1.containsAll(list2)) {
			return false;
		}
		return true;
	}

	/**
	 * 去除文本中的换行符
	 * @param text
	 * @return
	 */
	public static String removeLineBreaks(String text){
		if (StringUtils.isNotBlank(text)) {
			Pattern p = Pattern.compile("\t|\r|\n");
			Matcher m = p.matcher(text);
			text = m.replaceAll("").replaceAll("\\<.+?>", "").replaceAll("&lt;","").replaceAll("&nbsp;","").replaceAll("&gt;","");
		}
		return text;
	}

	/**
	 * 字符串转换为 int,默认为0
	 * @param convertText
	 * @return
	 */
	public static int parseInt(String convertText){
		if(StringUtils.isNotEmpty(convertText)){
			return Integer.parseInt(convertText);
		}
		return 0;
	}

	/**
	 * 字符串转换为 double,默认为0
	 * @param convertText
	 * @return
	 */
	public static double parseDouble(String convertText){
		if(StringUtils.isNotEmpty(convertText)){
			return Double.parseDouble(convertText);
		}
		return 0.0d;
	}

	/**
	 * 二进制判断奇偶
	 * @param i
	 * @return
	 */
	public static boolean isOdd(int i) {
		return (i & 1) == 1;
	}

	/**
	 * 生成树的数据.
	 * 说明： nodeList必须是用show_order排序抽出的数据.
	 * String[] node = { nodeName, nodeId, parentNodeId, defaultFlag, nomenuFlag, liType, folderType, showOrder, customData1, customData2, customData3};
	 * @param nodeList
	 * @return
	 */
	public static Map<String, Object> getTreeMap(List<String[]> nodeList) {
		Map<String, Object> treeMap = new LinkedHashMap<String, Object>();
		Map<String, Object> parentTreeMap = new HashMap<String, Object>();
		for (int i = 0; i < nodeList.size(); i++) {
			// 根目录先单独添加
			treeMap.put("data", nodeList.get(0)[0]);
			Map<String, String> attrMap = new HashMap<String, String>();
			attrMap.put("id", nodeList.get(0)[1]);
			// i = 0 : 根节点数据
			if (i == 0) {
				attrMap.put("rel", "drive");
				if (nodeList.get(0).length >= 4) {
					attrMap.put("displayFlag", nodeList.get(0)[3]);
				}
				treeMap.put("attr", attrMap);
				parentTreeMap.put(nodeList.get(0)[1], treeMap);
				continue;
			}

			String nodeType = "BRANCH";
			if (nodeList.get(i).length > 6 && "default".equals(nodeList.get(i)[6])) {
				nodeType = "LEAF";
			}

			if (nodeList.get(i).length == 9) {
				addNode(nodeType, parentTreeMap, nodeList.get(i)[0], nodeList.get(i)[1], nodeList.get(i)[2], nodeList.get(i)[3],
						nodeList.get(i)[4], nodeList.get(i)[5], nodeList.get(i)[6], nodeList.get(i)[7], nodeList.get(i)[8]);
			}
			else if (nodeList.get(i).length == 8) {
				addNode(nodeType, parentTreeMap, nodeList.get(i)[0], nodeList.get(i)[1], nodeList.get(i)[2], nodeList.get(i)[3],
						nodeList.get(i)[4], nodeList.get(i)[5], nodeList.get(i)[6], nodeList.get(i)[7], null);
			}
			else if (nodeList.get(i).length == 7) {
				addNode(nodeType, parentTreeMap, nodeList.get(i)[0], nodeList.get(i)[1], nodeList.get(i)[2], nodeList.get(i)[3],
						nodeList.get(i)[4], nodeList.get(i)[5], nodeList.get(i)[6], null, null);
			}
			else if (nodeList.get(i).length == 6) {
				addNode(nodeType, parentTreeMap, nodeList.get(i)[0], nodeList.get(i)[1], nodeList.get(i)[2], nodeList.get(i)[3],
						nodeList.get(i)[4], nodeList.get(i)[5], null, null, null);
			}
			else if (nodeList.get(i).length == 5) {
				addNode(nodeType, parentTreeMap, nodeList.get(i)[0], nodeList.get(i)[1], nodeList.get(i)[2], nodeList.get(i)[3],
						nodeList.get(i)[4], null, null, null, null);
			}
			else {
				addNode(nodeType, parentTreeMap, nodeList.get(i)[0], nodeList.get(i)[1], nodeList.get(i)[2], null, null,
						null, null, null, null);
			}
		}
		return treeMap;
	}

	/**
	 * 在树上加上一个结点
	 * @param nodeType
	 * @param parentTreeMap
	 * @param data
	 * @param id
	 * @param parentId
	 * @param defaultFlag
	 * @param menuFlag
	 * @param displayFlag
	 * @param folderType
	 * @param showOrder
	 * @param extraData
	 */
	public static void addNode(String nodeType, Map<String, Object> parentTreeMap, String data, String id,
							   String parentId, String defaultFlag, String menuFlag, String displayFlag, String folderType, String showOrder, String extraData) {
		Map<String, Object> newNodeMap = new HashMap<String, Object>();
		newNodeMap.put("data", data);
		Map<String, String> attrMap = new HashMap<String, String>();
		attrMap.put("id", id);
		attrMap.put("rel", "default");
		if ("BRANCH".equals(nodeType)) {
			if (folderType != null) {
				attrMap.put("rel", folderType);
			}
			else {
				attrMap.put("rel", "folder");
			}

		} else if (folderType == "mailingList") {
			attrMap.put("rel", folderType);
		}
		if (defaultFlag != null) {
			attrMap.put("default", defaultFlag);
		}
		if (menuFlag != null) {
			attrMap.put("nomenu", menuFlag);
		}
		if (displayFlag != null) {
			attrMap.put("litype", displayFlag);
		}
		if (showOrder != null) {
			attrMap.put("order", showOrder);
		}
		if (StringUtils.isNotEmpty(extraData)) {
			attrMap.put("extraData", extraData);
		}
		newNodeMap.put("attr", attrMap);

		Map<String, Object> parentNode = (Map<String, Object>) parentTreeMap.get(parentId);
		if (parentNode != null) {
			List<Map<String, Object>> currentChildList = (List<Map<String, Object>>) parentNode.get("children");
			if (currentChildList == null) {
				currentChildList = new ArrayList<Map<String, Object>>();
			}
			currentChildList.add(newNodeMap);
			parentNode.put("children", currentChildList);
		}

		parentTreeMap.put(id, newNodeMap);
	}

}
