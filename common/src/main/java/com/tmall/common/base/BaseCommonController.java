package com.tmall.common.base;

import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.WebDataBinder;
import org.springframework.web.bind.annotation.InitBinder;

import java.beans.PropertyEditorSupport;
import java.util.Date;

/**
 * 所有controller父类
 */
public class BaseCommonController {

	@Autowired
	private CompositeValidator compositeValidator;

	@InitBinder
	public void initBinder(WebDataBinder binder){
		if(binder.getTarget()!=null && compositeValidator.supports(binder.getTarget().getClass())){
			binder.addValidators(compositeValidator);
		}

		binder.registerCustomEditor(Date.class,new PropertyEditorSupport(){
			public void setAsText(String converText){
				if(StringUtils.isNotEmpty(converText)){
					setValue(DateConvert.convert(converText));
				}
			}
		});
	}
}
