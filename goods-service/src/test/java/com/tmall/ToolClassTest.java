package com.tmall;


import com.alibaba.excel.EasyExcelFactory;
import com.alibaba.excel.ExcelWriter;
import com.alibaba.excel.metadata.Font;
import com.alibaba.excel.metadata.Sheet;
import com.alibaba.excel.metadata.Table;
import com.alibaba.excel.metadata.TableStyle;
import com.alibaba.excel.support.ExcelTypeEnum;
import com.itextpdf.text.Document;
import com.itextpdf.text.DocumentException;
import com.itextpdf.text.Paragraph;
import com.itextpdf.text.pdf.PdfWriter;
import org.apache.poi.ss.usermodel.IndexedColors;
import org.junit.Test;

import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.OutputStream;
import java.util.ArrayList;
import java.util.List;

public class ToolClassTest {
	@Test
	public void test1() throws FileNotFoundException {

		//文件输出位置
		OutputStream out = new FileOutputStream("D:/xmltext.xlsx");
		try {
			ExcelWriter writer = new ExcelWriter(out, ExcelTypeEnum.XLSX);
			//写仅有一个sheet的Excel文件
			Sheet sheet1 = new Sheet(1, 0,XmlTextModel.class);
			//设置第一个sheet的名
			sheet1.setSheetName("第一个sheet");

			//写数据到Writer上下文中
			//参数1：创建需要写入的模型数据
			//参数2：要写入的目标sheet
			writer.write(getData(), sheet1);
			writer.finish();
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			try {
				out.close();
			} catch (IOException e) {
				e.printStackTrace();
			}
		}
	}

	private List<XmlTextModel> getData(){
		List<XmlTextModel> writeModels = new ArrayList<>();
		for (int i = 0; i <100 ; i++) {
			XmlTextModel writeModel = XmlTextModel.builder()
					.age(i)
					.name("zhangsan"+i)
					.email(i+"zxcvb@163.com")
					.build();
			writeModels.add(writeModel);
		}
		return writeModels;
	}

	@Test
	public void test2() throws FileNotFoundException {

		//文件输出位置
		OutputStream out = new FileOutputStream("D:/xmltext.xlsx");
		try {
			ExcelWriter writer = new ExcelWriter(out, ExcelTypeEnum.XLSX);
			//写仅有一个sheet的Excel文件
			Sheet sheet1 = new Sheet(1, 0,XmlTextModel.class);
			//设置第一个sheet的名
			sheet1.setSheetName("第一个sheet");

			//创建一个表格，用于sheet使用
			Table table1 = new Table(1);
			//动态添加表头
			table1.setHead(createTestListStringHead());

			//写数据到Writer上下文中
			writer.write1(getDynamicData(), sheet1,table1);
			writer.finish();
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			try {
				out.close();
			} catch (IOException e) {
				e.printStackTrace();
			}
		}
	}

	public List<List<String>> createTestListStringHead(){
		//模型上无注解，表头数据动态传入
		List<List<String>> head = new ArrayList<>();
		List<String> headColumn1 = new ArrayList<>();
		List<String> headColumn2 = new ArrayList<>();
		List<String> headColumn3 = new ArrayList<>();
		List<String> headColumn4 = new ArrayList<>();
		List<String> headColumn5 = new ArrayList<>();

		headColumn1.add("第一列：列行合并");headColumn1.add("第一列：列行合并");headColumn1.add("第一列：列行合并");
		headColumn2.add("第一列：列行合并");headColumn2.add("第一列：列行合并");headColumn2.add("第一列：列行合并");

		headColumn3.add("第二列：行合并");headColumn3.add("第二列：行合并");headColumn3.add("第二列：行合并");
		headColumn4.add("第三列");headColumn4.add("第三列2");headColumn4.add("第三列2");
		headColumn5.add("第三列");headColumn5.add("第三列2");headColumn5.add("第三列2");
		head.add(headColumn1);
		head.add(headColumn2);
		head.add(headColumn3);
		head.add(headColumn4);
		head.add(headColumn5);
		return head;

	}

	private List<List<Object> >getDynamicData(){
		List<List<Object>> writeModels = new ArrayList<>();
		for (int i = 0; i <100 ; i++) {
			List<Object >row = new ArrayList<>();
			row.add("第一列数据"+i);
			row.add("第二列数据"+i);
			row.add("第三列数据"+i);
			row.add("第四列数据"+i);
			row.add("第五列数据"+i);
			writeModels.add(row);
		}
		return writeModels;
	}

	@Test
	public void test3() throws FileNotFoundException {

		//文件输出位置
		OutputStream out = new FileOutputStream("D:/xmltext.xlsx");
		try {
			ExcelWriter writer = new ExcelWriter(out, ExcelTypeEnum.XLSX);
			//写仅有一个sheet的Excel文件
			Sheet sheet1 = new Sheet(1, 0,XmlTextModel.class);
			sheet1.setSheetName("第一个sheet");
			Table table1 = new Table(1);
			table1.setTableStyle(creaeTableStyle());
			table1.setHead(createTestListStringHead());
			writer.write1(getDynamicData(), sheet1,table1);

			//合并第六行到第七行，第一列到第四列
			writer.merge(5,6,0,3);
			writer.finish();
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			try {
				out.close();
			} catch (IOException e) {
				e.printStackTrace();
			}
		}
	}

	public TableStyle creaeTableStyle(){
		TableStyle tableStyle = new TableStyle();
		//设置表头样式
		Font headFont = new Font();
		//字体是否加粗
		headFont.setBold(true);
		headFont.setFontHeightInPoints((short)12);
		headFont.setFontName("楷体");
		tableStyle.setTableHeadFont(headFont);
		//背景色
		tableStyle.setTableHeadBackGroundColor(IndexedColors.BLUE);

		//设置表格主题样式
		Font contentFont = new Font();
		headFont.setBold(false);
		headFont.setFontHeightInPoints((short)11);
		headFont.setFontName("黑体");
		tableStyle.setTableHeadFont(headFont);
		tableStyle.setTableContentBackGroundColor(IndexedColors.YELLOW);
		return tableStyle;
	}

	@Test
	public void test4() throws FileNotFoundException, DocumentException {
		Document document = new Document();
		PdfWriter writer = PdfWriter.getInstance(document, new FileOutputStream("D:/pdftext.pdf"));
		document.open();
		document.add(new Paragraph("hello world"));
		document.close();
		writer.close();

	}
}
