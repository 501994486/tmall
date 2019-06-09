package com.tmall;

import com.alibaba.excel.annotation.ExcelProperty;
import com.alibaba.excel.metadata.BaseRowModel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder(toBuilder=true)
public class XmlTextModel extends BaseRowModel {
	@ExcelProperty(value = "姓名" ,index = 0)
	private String name;

	@ExcelProperty(value = "年龄",index = 1)
	private int age;

	@ExcelProperty(value = "邮箱",index = 2)
	private String email;
}
