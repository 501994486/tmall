package com.tmall.domain.service;

import com.tmall.domain.entity.Goods;
import com.tmall.common.AppConstants;
import org.apache.commons.csv.CSVFormat;
import org.apache.commons.csv.CSVParser;
import org.apache.commons.csv.CSVRecord;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Component
public class FileDomainServiceImpl implements FileDomainService{

	@Override
	public List<String[]> getExportCsvGoodsContentDataList(List<Goods> goodsList) {
		List<String[]> goodsCsvContentDataList = new ArrayList<>(goodsList.size()+1);

		return goodsCsvContentDataList;
	}

	@Override
	public String[] getGoodsCsvHeadList() {
		return new String[0];
	}

	public Map<String,List<Goods>> getImportCsvGoodsList(int shopId, MultipartFile uploadFile,Map<String,Object> errorMap){
		Map<String,List<Goods>> resultMap = new HashMap<>();
		List<Goods> addGoodsList = new ArrayList<>();
		List<Goods> updateGoodsList = new ArrayList<>();
		List<Goods> deleteGoodsList = new ArrayList<>();

		try {
			InputStream  inputStreamCell = uploadFile.getInputStream();
			BufferedReader reader = new BufferedReader(new InputStreamReader(inputStreamCell, AppConstants.FILE_ENCONDE_TYPE_UTF_8));
			CSVParser parser = new CSVParser(reader, CSVFormat.DEFAULT
					.withHeader(this.getGoodsCsvHeadList())
					.withIgnoreHeaderCase()
					.withTrim());

			for (CSVRecord csvRecord : parser) {
				System.out.println(csvRecord.getRecordNumber());
				String id = csvRecord.get("id");
				String name = csvRecord.get("name");
				String age = csvRecord.get("age");

			}

		} catch (IOException e) {
			e.printStackTrace();
		}

		return resultMap;
	}

	//将CSV的List数据转换为String
	public String convertListToString(List<String[]> csvContentList){
		StringBuilder csvDataTextString = new StringBuilder();
		for(String[] csvDataTestArray : csvContentList){
			StringBuilder csvDataTestRow = new StringBuilder();
			for(int i=0;i<csvDataTestArray.length;i++){

				if(i!=csvDataTestArray.length-1){
					csvDataTestRow.append("\""+csvDataTestArray[i]+"\""+",");

				}else{
					csvDataTestRow.append("\""+csvDataTestArray[i] + "\"");
				}

			}
			csvDataTextString.append(csvDataTestRow +"\n");
		}
		return csvDataTextString.toString();
	}
}
