package com.jyc.prescriptionhistory.service;

import com.jyc.prescriptionhistory.bean.HistoryRecords;
import com.jyc.prescriptionhistory.bean.Prescription;
import com.jyc.prescriptionhistory.bean.PrescriptionHistory;

import java.util.List;

public interface DataVisibleService {

    public List<Object> dimensionHandler(List<PrescriptionHistory> phs);

    public List<List<Object>> dataHandler(List<PrescriptionHistory> phs);

    public List<PrescriptionHistory> getPrescriptionHistoryByName(String presName);

    public List<PrescriptionHistory> getPrescriptionHistoryInfo(String presName);

    public List<HistoryRecords> getPrescriptionHistoryRecord();

    public List<String> getIndications(String presName);

    public List<PrescriptionHistory> getHistoryRelationship(String presName);

    public List<String> getHistoryAge(String presName);

    public List<PrescriptionHistory> getHistoriesByName(String presName);
}
