package com.jyc.prescriptionhistory.service;

import com.jyc.prescriptionhistory.bean.Prescription;

import java.util.Collection;
import java.util.List;

public interface SearchService {

    public List<Prescription> getPrescription(String keywords);
}
