package com.jyc.prescriptionhistory.bean;

import java.util.Objects;

public class HistoryComponents {
    private Integer id;
    private Integer plantId;
    private String plantName;
    private Float content;
    private String process;
    private Integer historyId;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Integer getPlantId() {
        return plantId;
    }

    public void setPlantId(Integer plantId) {
        this.plantId = plantId;
    }

    public Float getContent() {
        return content;
    }

    public void setContent(Float content) {
        this.content = content;
    }

    public String getProcess() {
        return process;
    }

    public void setProcess(String process) {
        this.process = process;
    }

    public Integer getHistoryId() {
        return historyId;
    }

    public void setHistoryId(Integer historyId) {
        this.historyId = historyId;
    }

    public String getPlantName() {
        return plantName;
    }

    public void setPlantName(String plantName) {
        this.plantName = plantName;
    }

    @Override
    public String toString() {
        return "HistoryComponents{" +
                "id=" + id +
                ", plantId=" + plantId +
                ", plantName='" + plantName + '\'' +
                ", number=" + content +
                ", process='" + process + '\'' +
                ", historyId='" + historyId + '\'' +
                '}';
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        HistoryComponents components = (HistoryComponents) o;
        return Objects.equals(plantName, components.plantName);

    }
}
