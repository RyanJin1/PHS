package com.jyc.prescriptionhistory.bean;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

public class HistoryRecords {
    private String presName;
    private String age;
    private Integer count;
    private Set<String> bookNames;

    public String getPresName() {
        return presName;
    }

    public void setPresName(String presName) {
        this.presName = presName;
    }

    public String getAge() {
        return age;
    }

    public void setAge(String age) {
        this.age = age;
    }

    public Integer getCount() {
        return count;
    }

    public void setCount(Integer count) {
        this.count = count;
    }

    public Set<String> getBookNames() {
        return bookNames;
    }

    public void setBookNames(List<String> bookNames) {
        this.bookNames = new HashSet<>(bookNames);
    }

    @Override
    public String toString() {
        return "HistoryRecords{" +
                "presName='" + presName + '\'' +
                ", age='" + age + '\'' +
                ", count=" + count +
                ", bookNames=" + bookNames +
                '}';
    }
}
