package com.tmall.user.application.convert;

public interface DTOConvert<S,T> {

	T convert(S s)throws Exception;

}
