package com.jyc.prescriptionhistory.bean;

import java.util.List;

public class PrescriptionHistory {
    private Integer historyId;
    private String bookName;
    private String useWay;
    private String effects;
    private String presName;
    private Integer presId;
    private String indication;
    private String components;
    private String age;
    private List<HistoryComponents> hc;

    public Integer getHistoryId() {
        return historyId;
    }

    public void setHistoryId(Integer historyId) {
        this.historyId = historyId;
    }

    public String getBookName() {
        return bookName;
    }

    public void setBookName(String bookName) {
        this.bookName = bookName;
    }

    public String getUseWay() {
        return useWay;
    }

    public void setUseWay(String useWay) {
        this.useWay = useWay;
    }

    public String getEffects() {
        return effects;
    }

    public void setEffects(String effects) {
        this.effects = effects;
    }

    public Integer getPresId() {
        return presId;
    }

    public void setPresId(Integer presId) {
        this.presId = presId;
    }

    public String getIndication() {
        return indication;
    }

    public void setIndication(String indication) {
        this.indication = indication;
    }

    public List<HistoryComponents> getHc() {
        return hc;
    }

    public void setHc(List<HistoryComponents> hc) {
        this.hc = hc;
    }

    public String getComponents() {
        return components;
    }

    public void setComponents(String components) {
        this.components = components;
    }

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

    @Override
    public String toString() {
        return "PrescriptionHistory{" +
                "historyId=" + historyId +
                ", bookName='" + bookName + '\'' +
                ", useWay='" + useWay + '\'' +
                ", effects='" + effects + '\'' +
                ", presName='" + presName + '\'' +
                ", presId=" + presId +
                ", indication='" + indication + '\'' +
                ", components='" + components + '\'' +
                ", age='" + age + '\'' +
                ", hc=" + hc +
                '}';
    }
}
