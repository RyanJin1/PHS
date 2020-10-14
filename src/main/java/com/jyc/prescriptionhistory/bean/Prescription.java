package com.jyc.prescriptionhistory.bean;

import java.util.List;

public class Prescription {
    private Integer presId;
    private String presName;
    private String pinYin;
    private String useWay;
    private String effects;
    private String description;
    private String indications;
    private List<PrescriptionHistory> phs;

    public Integer getPresId() {
        return presId;
    }

    public void setPresId(Integer presId) {
        this.presId = presId;
    }

    public String getPresName() {
        return presName;
    }

    public void setPresName(String presName) {
        this.presName = presName;
    }

    public String getPinYin() {
        return pinYin;
    }

    public void setPinYin(String pinYin) {
        this.pinYin = pinYin;
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

    public String getIndications() {
        return indications;
    }

    public void setIndications(String indications) {
        this.indications = indications;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public List<PrescriptionHistory> getPhs() {
        return phs;
    }

    public void setPhs(List<PrescriptionHistory> phs) {
        this.phs = phs;
    }

    @Override
    public String toString() {
        return "Prescription{" +
                "presId=" + presId +
                ", presName='" + presName + '\'' +
                ", pinYin='" + pinYin + '\'' +
                ", useWay='" + useWay + '\'' +
                ", effects='" + effects + '\'' +
                ", description='" + description + '\'' +
                ", indications='" + indications + '\'' +
                ", phs=" + phs +
                '}';
    }
}
