package com.jyc.prescriptionhistory.service;

import com.jyc.prescriptionhistory.bean.HistoryComponents;
import com.jyc.prescriptionhistory.bean.Prescription;
import com.jyc.prescriptionhistory.bean.PrescriptionComponents;
import com.jyc.prescriptionhistory.bean.PrescriptionHistory;
import com.jyc.prescriptionhistory.mapper.HistoryComponentsMapper;
import com.jyc.prescriptionhistory.mapper.PrescriptionComponentsMapper;
import com.jyc.prescriptionhistory.mapper.PrescriptionHistoryMapper;
import com.jyc.prescriptionhistory.mapper.PrescriptionMapper;
import com.jyc.prescriptionhistory.utils.DescriptionUtils;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Isolation;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.Resource;
import java.util.Collection;
import java.util.List;

@Service
public class ManageServiceImpl implements ManageService {

    @Resource
    PrescriptionHistoryMapper prescriptionHistoryMapper;

    @Resource
    PrescriptionMapper prescriptionMapper;

    @Resource
    PrescriptionComponentsMapper presComponentsMapper;

    @Resource
    HistoryComponentsMapper hisComponentsMapper;

    @Override
    @Transactional(isolation = Isolation.READ_COMMITTED)
    public List<PrescriptionHistory> getAllPrescriptionHistory() {
        List<PrescriptionHistory> info = prescriptionHistoryMapper.getAllPrescriptionHistoryInfo();
        return info;
    }

    @Override
    @Transactional(isolation = Isolation.READ_COMMITTED)
    public List<PrescriptionHistory> getHistoryComponentsByName(String presName) {
        List<PrescriptionHistory> ph = prescriptionHistoryMapper.getPrescriptionHistoryByName(presName);
        return ph;
    }

    @Override
    public List<PrescriptionHistory> getPrescriptionHistoryByPresId(Integer presId) {
        List<PrescriptionHistory> ph = prescriptionHistoryMapper.getPrescriptionHistoryByPresId(presId);
        return ph;
    }

    @Override
    @Transactional(isolation = Isolation.READ_COMMITTED)
    public Collection<Prescription> getAllPrescription() {
        Collection<Prescription> prescription = prescriptionMapper.getAllPrescription();
        return prescription;
    }

    @Override
    public Boolean addPrescription(Prescription prescription) {
        int i = prescriptionMapper.addPrescription(prescription);
        if(i>0)
            return true;
        return false;
    }

    @Override
    public Boolean delPrescription(List<Prescription> prescription) {
        int i=0;
        for(Prescription p:prescription){
            int x = prescriptionMapper.delPrescription(p);
            i+=x;
        }
        if(i>0)
            return true;
        return false;
    }

    @Override
    public Boolean updatePrescription(Prescription prescription) {
        int i = prescriptionMapper.updatePrescription(prescription);
        if(i>0)
            return true;
        return false;
    }

    @Override
    public Boolean addPrescriptionHistory(PrescriptionHistory prescriptionHistory) {
        prescriptionHistoryMapper.addPrescriptionHistory(prescriptionHistory);
        List<PrescriptionComponents> components = presComponentsMapper.getComponentsByPresId(prescriptionHistory);
        int i=0;
        for(PrescriptionComponents component:components){
            i+=hisComponentsMapper.addInitHistoryComponent(prescriptionHistory, component);
        }
        if(i==components.size())
            return true;
        return false;
    }

    @Override
    @Transactional(isolation = Isolation.READ_COMMITTED)
    public List<HistoryComponents> getHisComponentsByHid(Integer historyId) {
        List<HistoryComponents> hcs = hisComponentsMapper.getHisComponentsByHid(historyId);
        return hcs;
    }

    @Override
    public Boolean updateHisComponents(Integer historyId,List<HistoryComponents> components) {
        List<HistoryComponents> preComponents = hisComponentsMapper.getHisComponentsByHid(historyId);
        Integer presId = prescriptionHistoryMapper.getPrescriptionId(historyId);
        int i=0;
        int j=0;
        int m=0;
        for(HistoryComponents c:components){
            if(preComponents.contains(c)){
                i+= hisComponentsMapper.updateHisComponents(c);
            }
            else {
                PrescriptionComponents pc=new PrescriptionComponents();
                pc.setPlantName(c.getPlantName());
                pc.setPresId(presId);
                presComponentsMapper.addComponents(pc);
                c.setPlantId(pc.getPlantId());
                List<Integer> historyIds = prescriptionHistoryMapper.getHistoryIdByPresId(presId);
                j = hisComponentsMapper.addInitHistoryComponentBatch(pc.getPlantId(), historyIds);
                m = hisComponentsMapper.updateHisComponents(c);
            }
        }
        String description=DescriptionUtils.createCompDescription(components);
        prescriptionHistoryMapper.updateHistoryCompsDescription(historyId,description);
        if(i+j+m>0)
            return true;
        else
            return false;
    }

    @Override
    public Boolean delPresHistory(List<PrescriptionHistory> phs) {
        int i=0;
        for(PrescriptionHistory ph:phs){
            int x = prescriptionHistoryMapper.delPrescriptionHistory(ph);
            i+=x;
        }
        if(i>0)
            return true;
        return false;
    }

    @Override
    public Boolean updatePresHistory(PrescriptionHistory ph) {
        int i = prescriptionHistoryMapper.updatePrescriptionHistory(ph);
        if(i>0)
            return true;
        return false;
    }
}
