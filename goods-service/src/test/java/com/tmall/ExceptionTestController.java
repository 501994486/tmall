package com.tmall;

import com.tmall.infrastructure.exception.QueryException;
import com.tmall.infrastructure.logging.SystemControllerLog;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class ExceptionTestController {
	@RequestMapping("/exception")
	@SystemControllerLog(description="test")
	public String index(Model model) {
		if (1==1) {
			throw new QueryException("查询出错");
		}
		return "test";
	}

	@RequestMapping("/index2")
	public String index2(Model model) {
		model.addAttribute("name","FreeMarker 模版引擎 ");
		return "test";
	}
}
