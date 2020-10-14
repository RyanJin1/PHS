package com.jyc.prescriptionhistory.mapper;

import com.jyc.prescriptionhistory.bean.Prescription;
import org.apache.ibatis.annotations.Param;

import java.util.Collection;
import java.util.List;

public interface PrescriptionMapper {

    public List<Prescription> getPrescriptions(String keywords);

    public Collection<Prescription> getAllPrescription();

    public int addPrescription(Prescription prescription);

    public int delPrescription(Prescription prescription);

    public int updatePrescription(Prescription prescription);

    public int addPrescriptionBatch(@Param("prescriptions")List<Prescription> prescriptions);

}
