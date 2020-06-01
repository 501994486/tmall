package com.tmall.technologyMall.base;

import org.apache.commons.lang3.StringUtils;
import org.springframework.web.bind.WebDataBinder;
import org.springframework.web.bind.annotation.InitBinder;

import java.beans.PropertyEditorSupport;
import java.util.Date;

/**
 * 所有controller父类
 */
public class BaseCommonController {

	@InitBinder
	public void initBinder(WebDataBinder binder){
		binder.registerCustomEditor(Date.class,new PropertyEditorSupport(){
			public void setAsText(String converText){
				if(StringUtils.isNotEmpty(converText)){
					setValue(DateConvert.convert(converText));
				}
			}
		});
	}
}
