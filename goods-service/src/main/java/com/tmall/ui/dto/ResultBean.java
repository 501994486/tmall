package com.tmall.ui.dto;

import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Data
@NoArgsConstructor
public class ResultBean<T> implements Serializable {
    private static final long serialVersionUID = 1L;

	private String msg;
	private int code;
	private T data;

	public ResultBean(T data) {
	     super();
         this.data = data;
     }

	public ResultBean setMsg(String msg) {
        this.msg = msg;
        return this;
     }

    public ResultBean setCode(int code) {
        this.code = code;
        return this;
     }

	public ResultBean setData(T data) {
        this.data = data;
        return this;
    }
}