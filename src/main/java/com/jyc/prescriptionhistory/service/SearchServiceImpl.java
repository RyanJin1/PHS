package com.jyc.prescriptionhistory.service;

import com.jyc.prescriptionhistory.bean.Prescription;
import com.jyc.prescriptionhistory.mapper.PrescriptionMapper;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.Collection;
import java.util.List;

@Service
public class SearchServiceImpl implements SearchService {

    @Resource
    PrescriptionMapper prescriptionMapper;


    @Override
    public List<Prescription> getPrescription(String keywords) {
        List<Prescription> prescriptions=prescriptionMapper.getPrescriptions(keywords);
        return prescriptions;
    }
}
