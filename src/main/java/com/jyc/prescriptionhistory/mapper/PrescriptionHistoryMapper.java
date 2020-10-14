package com.jyc.prescriptionhistory.mapper;

import com.jyc.prescriptionhistory.bean.HistoryComponents;
import com.jyc.prescriptionhistory.bean.HistoryRecords;
import com.jyc.prescriptionhistory.bean.Prescription;
import com.jyc.prescriptionhistory.bean.PrescriptionHistory;
import org.apache.ibatis.annotations.Param;

import java.util.List;
import java.util.Set;

public interface PrescriptionHistoryMapper {

    public List<PrescriptionHistory> getPrescriptionHistory();

    public List<PrescriptionHistory> getPrescriptionHistoryByName(String presName);

    public List<PrescriptionHistory> getPrescriptionHistoryByPresId(Integer presId);

    public List<PrescriptionHistory> getPrescriptionHistoryInfo(String presName);

    public List<PrescriptionHistory> getAllPrescriptionHistoryInfo();

    public int addPrescriptionHistory(PrescriptionHistory prescriptionHistory);

    public Integer getPrescriptionId(Integer historyId);

    public Integer delPrescriptionHistory(PrescriptionHistory prescriptionHistory);

    public Integer updatePrescriptionHistory(PrescriptionHistory prescriptionHistory);

    public Integer updateHistoryCompsDescription(Integer historyId,String description);

    public int addHistoryBatch(@Param("histories")List<PrescriptionHistory> histories);

    public List<Integer> getHistoryIdByPresId(Integer presId);

    public List<PrescriptionHistory> getAllHistoryHaveAge();

    public List<HistoryRecords> getHistoryNumByAgeAndPresName();

    public List<String> getBooksByAgeAndPresName(HistoryRecords records);

    public List<PrescriptionHistory> getPrescriptionHistoryInfoByPresName(String presName);

    public List<String> getHistoryAgeByPresName(String presName);

    public List<PrescriptionHistory> getHistoriesByName(String presName);

}
