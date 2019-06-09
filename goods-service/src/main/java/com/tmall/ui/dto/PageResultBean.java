package com.tmall.ui.dto;

import com.github.pagehelper.PageInfo;
import lombok.Getter;

import java.io.Serializable;

@Getter
public class PageResultBean<T> extends ResultBean<T> implements Serializable {
     // 总记录数
     private long totalRecord;
     //总页数
     private int pageCount;
     //当前页码
     private int pageNo;
     //当前页的记录数量
     private int pageSize;
     public PageResultBean(PageInfo<T> pageInfo) {
         super.setData((T) pageInfo.getList());
         this.setPageNo(pageInfo.getPageNum())
                 .setPageSize(pageInfo.getPageSize())
                 .setPageCount(pageInfo.getPages())
                 .setTotalRecord(pageInfo.getTotal());
     }

    public PageResultBean setTotalRecord(long totalRecord) {
        this.totalRecord = totalRecord;
        return this;
     }

    public PageResultBean setPageCount(int pageCount) {
        this.pageCount = pageCount;
         return this;
     }

     public PageResultBean setPageNo(int pageNo) {
         this.pageNo = pageNo;
         return this;
     }

     public PageResultBean setPageSize(int pageSize) {
         this.pageSize = pageSize;
         return this;
     }

     @Override
     public String toString() {
         return "PageResultBean{" +
                 "totalRecord=" + totalRecord +
                 ", pageCount=" + pageCount +
                 ", pageNo=" + pageNo +
                 ", pageSize=" + pageSize +
                 '}';
     }

     @Override
     public PageResultBean setMsg(String msg) {
         super.setMsg(msg);
         return this;
     }
     @Override
     public PageResultBean setCode(int code) {
         super.setCode(code);
         return this;
    }

     @Override
     public PageResultBean setData(T data) {
         super.setData(data);
         return this;
     }
 }