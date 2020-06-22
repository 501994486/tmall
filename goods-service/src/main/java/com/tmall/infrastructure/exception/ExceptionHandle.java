package com.tmall.infrastructure.exception;

import com.tmall.application.assembler.ResultAssembler;
import com.tmall.infrastructure.enums.ResultEnum;
import com.tmall.common.AppConstants;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.ConversionNotSupportedException;
import org.springframework.beans.TypeMismatchException;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.http.converter.HttpMessageNotWritableException;
import org.springframework.validation.BindException;
import org.springframework.web.HttpMediaTypeNotAcceptableException;
import org.springframework.web.HttpMediaTypeNotSupportedException;
import org.springframework.web.HttpRequestMethodNotSupportedException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.MissingPathVariableException;
import org.springframework.web.bind.MissingServletRequestParameterException;
import org.springframework.web.bind.ServletRequestBindingException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.context.request.async.AsyncRequestTimeoutException;
import org.springframework.web.multipart.support.MissingServletRequestPartException;

import javax.servlet.http.HttpServletRequest;

/**
 * All rights Reserved, Designed By technologyMall
 * @Description 异常处理类
 * @author sun.h
 * @date   2019年7月11日
 * @version V1.0
 */
@ControllerAdvice
public class ExceptionHandle {

	//增加异常日志打印   
	private final static Logger logger = LoggerFactory.getLogger(ExceptionHandle.class);

	/**
	 * 用户查询内容异常(自定义异常)
	 * @param req
	 * @param e
	 * @return
	 * @throws Exception
	 */
	@ExceptionHandler(value = QueryException.class)
	@ResponseBody
	public Object QueryExceptionHandler(HttpServletRequest req, QueryException e) throws Exception {
		logger.error("【查询异常】={}",e);
		return ResultAssembler.getError(ResultEnum.QUERY_EXCEPTION.getCode(),ResultEnum.QUERY_EXCEPTION.getMsg());
	}

	/**
	 * 服务间调用异常(自定义异常)
	 * @param req
	 * @param e
	 * @return
	 * @throws Exception
	 */
	@ExceptionHandler(value = ServiceException.class)
	@ResponseBody
	public Object ServiceExceptionHandler(HttpServletRequest req, ServiceException e) throws Exception {
		logger.error("【服务异常】={}",e);
		return ResultAssembler.getError(ResultEnum.SERVICE_EXCEPTION.getCode(),ResultEnum.SERVICE_EXCEPTION.getMsg());
	}

	/**
	 * 数据库连接/查询等相关数据库异常(自定义异常)
	 * @param req
	 * @param e
	 * @return
	 * @throws Exception
	 */
	@ExceptionHandler(value = DBException.class)
	@ResponseBody
	public Object DBExceptionHandler(HttpServletRequest req, DBException e) throws Exception {
		logger.error("【数据库异常】={}",e);
		return ResultAssembler.getError(ResultEnum.DB_EXCEPTION.getCode(),ResultEnum.DB_EXCEPTION.getMsg());
	}

	/**
	 * 其它进入Controller前的异常
	 * HttpRequestMethodNotSupportedException：若匹配到了（匹配结果是一个列表，不同的是http方法不同，如：Get、Post等），则尝试将请求的http方法与列表的控制器做匹配，若没有对应http方法的控制器，则抛该异常；
	 * HttpMediaTypeNotSupportedException：然后再对请求头与控制器支持的做比较，比如content-type请求头，若控制器的参数签名包含注解@RequestBody，但是请求的content-type请求头的值没有包含application/json，那么会抛该异常（当然，不止这种情况会抛这个异常）；
	 * MissingPathVariableException：未检测到路径参数。比如url为：/licence/{licenceId}，参数签名包含@PathVariable("licenceId")，当请求的url为/licence，在没有明确定义url为/licence的情况下，会被判定为：缺少路径参数；
	 * MissingServletRequestParameterException：缺少请求参数。比如定义了参数@RequestParam("licenceId") String licenceId，但发起请求时，未携带该参数，则会抛该异常；
	 * TypeMismatchException: 参数类型匹配失败。比如：接收参数为Long型，但传入的值确是一个字符串，那么将会出现类型转换失败的情况，这时会抛该异常；
	 * HttpMessageNotReadableException：与上面的HttpMediaTypeNotSupportedException举的例子完全相反，即请求头携带了"content-type: application/json;charset=UTF-8"，但接收参数却没有添加注解@RequestBody，或者请求体携带的 json 串反序列化成 pojo 的过程中失败了，也会抛该异常；
	 * HttpMessageNotWritableException：返回的 pojo 在序列化成 json 过程失败了，那么抛该异常；
	 * @param req
	 * @param e
	 * @return
	 * @throws Exception
	 */
	@ExceptionHandler({HttpRequestMethodNotSupportedException.class,
			HttpMediaTypeNotSupportedException.class,
			MissingPathVariableException.class,
			MissingServletRequestParameterException.class,
			TypeMismatchException.class,
			HttpMessageNotReadableException.class,
			HttpMessageNotWritableException.class,
			HttpMediaTypeNotAcceptableException.class,
			ServletRequestBindingException.class,
			ConversionNotSupportedException.class,
			MissingServletRequestPartException.class,
			AsyncRequestTimeoutException.class})
	@ResponseBody
	public Object servletExceptionHandle(HttpServletRequest req, UnKnownException e) throws Exception {
		logger.error("【未知异常】={}",e);
		return ResultAssembler.getError(ResultEnum.UN_KNOWN_EXCEPTION.getCode(),ResultEnum.UN_KNOWN_EXCEPTION.getMsg());
	}

	/**
	 * 参数绑定异常(进入Controller前的异常)
	 * @param ex
	 * @param request
	 * @return
	 */
	@ExceptionHandler({MethodArgumentNotValidException.class, BindException.class})
	public String handleValidException(Exception ex, HttpServletRequest request) {
		String requestUri = request.getRequestURI();
		String contextPath = request.getContextPath();
		String contextPathArr[] = contextPath.split(AppConstants.SYMBOL_SLASH);
		String[] uri = requestUri.split(AppConstants.SYMBOL_SLASH);

		logger.warn("requestURI: " + request.getRequestURI());
		logger.warn("InputCheckError: " + ex.toString());

		String responseDataType = (String)request.getAttribute("response-data-type");

		if ("JSON".equals(responseDataType)) {
			return "forward:/common/error/valid-error-handler-for-json";
		}else{
			return "forward:/common/error/valid-error-handler";
		}

	}
}