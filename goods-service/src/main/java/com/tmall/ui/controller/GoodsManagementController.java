package com.tmall.ui.controller;

import com.sun.xml.internal.messaging.saaj.packaging.mime.internet.MimeUtility;
import com.tmall.application.assembler.DTOAssembler;
import com.tmall.application.assembler.ResultAssembler;
import com.tmall.application.convert.DTOConvert;
import com.tmall.application.service.CategoryService;
import com.tmall.application.service.GoodsService;
import com.tmall.domain.entity.Category;
import com.tmall.domain.entity.Goods;
import com.tmall.infrastructure.enums.ResultEnum;
import com.tmall.infrastructure.feign.MailService;
import com.tmall.infrastructure.filter.CrossDomainFilter;
import com.tmall.infrastructure.logging.SystemControllerLog;
import com.tmall.common.AppConstants;
import com.tmall.common.CommonLogic;
import com.tmall.common.utils.DateTimeUtils;
import com.tmall.common.utils.LogUtils;
import com.tmall.ui.dto.CategoryDTO;
import com.tmall.ui.dto.GoodsDTO;
import com.tmall.ui.dto.ResultBean;
import org.apache.commons.collections.MapUtils;
import org.apache.commons.csv.CSVFormat;
import org.apache.commons.csv.CSVPrinter;
import org.apache.commons.io.FileUtils;
import org.apache.commons.lang3.RandomStringUtils;
import org.apache.commons.lang3.SystemUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import javax.servlet.ServletContext;
import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.File;
import java.io.OutputStreamWriter;
import java.lang.reflect.InvocationTargetException;
import java.net.URLEncoder;
import java.nio.charset.Charset;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * All rights Reserved, Designed By technologyMall
 * @Description 处理商品管理的相关url
 * @author sun.h
 * @date   2019年5月18日
 * @version V1.0
 */
@RestController
@RequestMapping("admin/goods/management/*")
public class GoodsManagementController {

	private final static Logger logger = LoggerFactory.getLogger(CrossDomainFilter.class);


	@Autowired
	private HttpServletRequest request;

	@Autowired
	private HttpSession session;

	@Autowired
	private HttpServletResponse response;

	@Autowired
	private ServletContext sc;

	@Autowired
	private CategoryService categoryService;

	@Autowired
	private GoodsService goodsService;

	@Autowired
	@Qualifier("categoryDTOConvert")
	private DTOConvert categoryDTOConvert;

	@Autowired
	@Qualifier("goodsDTOConvert")
	private DTOConvert goodsDTOConvert;

	@Autowired
	private MailService mailService;

	/**
	 * 取得树数据
	 * @return
	 * @throws InterruptedException
	 */
	@GetMapping("test-mail")
	public ResultBean testMail() {

		String result = mailService.test("zhangsan");
		return ResultAssembler.getSuccess(result);
	}

	/**
	 * 取得树数据
	 * @return
	 * @throws InterruptedException
	 */
	@GetMapping("tree")
	public ResultBean showShopProductManagementTree() throws InterruptedException {

		int shopId = CommonLogic.getShopId(session);
		List<Category> categoryList = categoryService.getAllCategoryByShopId(shopId);
		Map<Integer,List<Goods>> categoryGoodsListMap = goodsService.getCategoryGoodsListMap(shopId);

		Map<String, Object> resultMap = categoryService.getGoodsManagementTreeData(categoryList,categoryGoodsListMap);
		return ResultAssembler.getSuccess(resultMap);
	}

	/**
	 * 添加新的商品类别
	 * @param categoryId
	 * @param categoryDTO
	 * @return
	 * @throws Exception
	 */
	@PostMapping("category/{id}")
	public ResultBean addGoodsCategory(@PathVariable("id") int categoryId, @Validated CategoryDTO categoryDTO) throws Exception {
		int shopId = CommonLogic.getShopId(session);
		if(categoryService.addGoodsCategory((Category) categoryDTOConvert.convertNewData(categoryDTO,shopId))){
			ResultAssembler.getSuccess();
		}

		return ResultAssembler.getError(ResultEnum.ADD_EXCEPTION.getCode(),ResultEnum.ADD_EXCEPTION.getMsg());
	}

	/**
	 * 更新商品类别
	 * @author sun.h
	 * @param categoryId
	 * @param categoryDTO
	 * @return
	 * @throws Exception
	 */
	@PutMapping("category/{id}")
	public ResultBean updateGoodsCategory(@PathVariable("id") int categoryId, @ModelAttribute CategoryDTO categoryDTO) throws Exception {
		int shopId = CommonLogic.getShopId(session);
		if(categoryService.updateGoodsCategory((Category) categoryDTOConvert.convertExistData(categoryDTO,shopId))){
			ResultAssembler.getSuccess();
		}

		return ResultAssembler.getError(ResultEnum.UPDATE_EXCEPTION.getCode(),ResultEnum.UPDATE_EXCEPTION.getMsg());
	}

	/**
	 * 删除商品类别
	 * @param categoryId
	 * @return
	 */
	@DeleteMapping("category/{id}")
	public ResultBean deleteGoodsCategory(@PathVariable("id") int categoryId){

		if(categoryService.deleteGoodsCategory(categoryId)){
			ResultAssembler.getSuccess();
		}
		return ResultAssembler.getError(ResultEnum.DELETE_EXCEPTION.getCode(),ResultEnum.DELETE_EXCEPTION.getMsg());
	}

	/**
	 * 显示善品类别
	 * @param categoryId
	 * @return
	 * @throws InvocationTargetException
	 * @throws IllegalAccessException
	 */
	@GetMapping("category/{id}")
	public ResultBean getGoodsCategory(@PathVariable("id") int categoryId) throws InvocationTargetException, IllegalAccessException {

		CategoryDTO categoryDTO = DTOAssembler.assemblerGoodsCategory(categoryService.getGoodsCategory(categoryId));
		return ResultAssembler.getSuccess(categoryDTO);
	}

	/**
	 * 新增商品
	 * @param goodsDTO
	 * @return
	 * @throws Exception
	 */
	@PostMapping("goods")
	public ResultBean addGoods(GoodsDTO goodsDTO) throws Exception {

		int shopId = CommonLogic.getShopId(session);
		Goods goods = (Goods) goodsDTOConvert.convertNewData(goodsDTO,shopId);

		if(goodsService.addGoods(goods)){
			ResultAssembler.getSuccess();
		}
		return ResultAssembler.getError(ResultEnum.ADD_EXCEPTION.getCode(),ResultEnum.ADD_EXCEPTION.getMsg());
	}

	/**
	 * 将商品放到垃圾箱
	 * @return
	 */
	@PatchMapping("goods")
	public ResultBean trashGoods() {
		String [] goodsIds = request.getParameterValues("ids");

		if(goodsService.trashGoods(goodsIds)){
			ResultAssembler.getSuccess();
		}
		return ResultAssembler.getError(ResultEnum.DELETE_EXCEPTION.getCode(),ResultEnum.DELETE_EXCEPTION.getMsg());
	}

	/**
	 * 清除垃圾箱
	 * @return
	 */
	@DeleteMapping( "goods")
	public ResultBean deleteGoods() {
		String [] goodsIds = request.getParameterValues("ids");
		if(goodsService.deleteGoods(goodsIds)){
			ResultAssembler.getSuccess();
		}
		return ResultAssembler.getError(ResultEnum.DELETE_EXCEPTION.getCode(),ResultEnum.DELETE_EXCEPTION.getMsg());
	}


	@PostMapping("actions/import/{categoryId}")
	@SystemControllerLog(description="商品上传")
	public ResultBean importProductFile(@PathVariable int categoryId) throws Exception{
		Map<String,Object> errorMap = new HashMap<>();
		int shopId = CommonLogic.getShopId(session);

		MultipartHttpServletRequest multipartRequest = (MultipartHttpServletRequest) request;
		MultipartFile uploadFile = multipartRequest.getFile("goods-import-file");

		//获取错误检查,获取商品情報,获取商品管理メモ信息
		Map<String, List<Goods>> goodsListDataMap = goodsService.getImportCsvGoodsList(shopId,uploadFile,errorMap);
		if(MapUtils.isEmpty(errorMap)){
			// 调用消息队列插入数据

			return ResultAssembler.getSuccess();
		}

		return ResultAssembler.getError(ResultEnum.DATA_EXCEPTION.getCode(),ResultEnum.DATA_EXCEPTION.getMsg());
	}

	/**
	 * 商品导出
	 * @param categoryId
	 * @throws Exception
	 */
	@PostMapping("actions/export/{categoryId}")
	@SystemControllerLog(description="商品下载")
	public void exportGoods(@PathVariable int categoryId) throws Exception {
		String[] goodsIdArr = request.getParameterValues("goodsId");
		int shopId = CommonLogic.getShopId(session);
		String currentTime = DateTimeUtils.dateTimeFormat_yyyyMMddHHmmss(DateTimeUtils.getCurrentTimestamp());
		String fileEncondeType = AppConstants.FILE_ENCONDE_TYPE_UTF_8;
		String filename = "product_" + shopId + AppConstants.SYMBOL_UNDERSCORE + currentTime + AppConstants.FILE_NAME_SUFFIX_CSV;
		String userAgent = request.getHeader("user-agent");
		filename = userAgent.contains("MSIE") || userAgent.contains("Trident") ? URLEncoder.encode(filename, fileEncondeType)
				: MimeUtility.encodeWord(filename);

		response.setHeader("Content-Disposition", "attachment;filename=\"" + filename + "\"");
		ServletOutputStream outputStream = response.getOutputStream();
		OutputStreamWriter fwriter = new OutputStreamWriter(outputStream, fileEncondeType);

		List<Goods> goodsList = goodsService.getGoodList(shopId,categoryId,goodsIdArr);
		String[] headArr= goodsService.getGoodsCsvHeadList();
		List<String[]> dataList= goodsService.getExportGoodsCsvDataList(goodsList);

		CSVPrinter csvPrinter = new CSVPrinter(fwriter, CSVFormat.DEFAULT.withHeader(headArr));
		for(String[] csvData: dataList){
			csvPrinter.printRecords(csvData);
		}
		csvPrinter.flush();
	}

	/**
	 * 以7z压缩包形式导出文件
	 * @param categoryId
	 * @throws Exception
	 */
	@PostMapping("actions/export7z/{categoryId}")
	@SystemControllerLog(description="商品下载")
	public void download7zFile(@PathVariable int categoryId) throws Exception{
		int shopId = CommonLogic.getShopId(session);
		Map<String,String> filenameAndPasswordMap = new HashMap<String,String>();

		List<Goods> goodsList = goodsService.getGoodList(shopId,categoryId);
		String[] headArr= goodsService.getGoodsCsvHeadList();
		List<String[]> goodsCsvDataList= goodsService.getExportGoodsCsvDataList(goodsList);
		goodsCsvDataList.set(0,headArr);
		String csvContent = goodsService.convertListToString(goodsCsvDataList);

		String password = RandomStringUtils.randomAlphanumeric(10);
		String currentTime = DateTimeUtils.dateTimeFormat_yyyyMMddHHmmss(DateTimeUtils.getCurrentTimestamp());
		String fileName = shopId + "_" + currentTime;
		filenameAndPasswordMap.put("fileName", fileName+".7z");
		filenameAndPasswordMap.put("password", password);

		String classFolder = sc.getAttribute("javax.servlet.context.tempdir").toString();
		String tmpFileFolderStr = classFolder + File.separator + "tmpfile";
		String tmpFaxFolderStr = tmpFileFolderStr + File.separator + "csv" + File.separator;
		String csvFilePath = tmpFaxFolderStr + fileName + ".csv";
		String sevenZFilePath = tmpFaxFolderStr + fileName + ".7z";
		byte[] infile = csvContent.getBytes(Charset.forName("Shift_JIS"));

		response.setHeader("Content-Disposition", "attachment;filename=\"" + fileName + ".7z" + "\"");
		response.setContentType("application/x-7z-compressed");

		try {
			FileUtils.writeByteArrayToFile(new File(csvFilePath), infile);

			Process p = null;
			String[] cmd = null;
			if (SystemUtils.IS_OS_LINUX) {
				cmd = new String[] { "sh", "-c", "7z a -p" + password + " " + sevenZFilePath + " " + csvFilePath };
			}
			else if (SystemUtils.IS_OS_WINDOWS) {
				cmd = new String[] { "cmd.exe", "/C", "C:\\Program Files\\7-Zip\\7z.exe", "a", "-p" + password , sevenZFilePath, csvFilePath};
			}
			p = Runtime.getRuntime().exec(cmd);
			p.waitFor();
			response.getOutputStream().write(Files.readAllBytes(Paths.get(sevenZFilePath)));

			FileUtils.deleteQuietly(new File(csvFilePath));
			FileUtils.deleteQuietly(new File(sevenZFilePath));
		}
		catch (Exception e) {
			LogUtils.writeExceptionLog(logger,GoodsManagementController.class,"down7z",e);
		}

	}
}
