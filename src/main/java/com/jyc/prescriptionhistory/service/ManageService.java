package com.jyc.prescriptionhistory.service;

import com.jyc.prescriptionhistory.bean.HistoryComponents;
import com.jyc.prescriptionhistory.bean.Prescription;
import com.jyc.prescriptionhistory.bean.PrescriptionHistory;
import com.sun.org.apache.xpath.internal.operations.Bool;

import java.util.Collection;
import java.util.List;

public interface ManageService {

    public List<PrescriptionHistory> getAllPrescriptionHistory();

    public List<PrescriptionHistory> getHistoryComponentsByName(String presName);

    public List<PrescriptionHistory> getPrescriptionHistoryByPresId(Integer presId);

    public Collection<Prescription> getAllPrescription();

    public Boolean addPrescription(Prescription prescription);

    public Boolean delPrescription(List<Prescription> prescription);

    public Boolean updatePrescription(Prescription prescription);

    public Boolean addPrescriptionHistory(PrescriptionHistory prescriptionHistory);

    public List<HistoryComponents> getHisComponentsByHid(Integer historyId);

    public Boolean updateHisComponents(Integer historyId,List<HistoryComponents> components);

    public Boolean delPresHistory(List<PrescriptionHistory> phs);

    public Boolean updatePresHistory(PrescriptionHistory ph);
}
