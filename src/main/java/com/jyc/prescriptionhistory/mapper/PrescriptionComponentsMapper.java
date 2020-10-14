package com.jyc.prescriptionhistory.mapper;

import com.jyc.prescriptionhistory.bean.PrescriptionComponents;
import com.jyc.prescriptionhistory.bean.PrescriptionHistory;
import org.apache.ibatis.annotations.Param;

import java.util.List;

public interface PrescriptionComponentsMapper {

    public List<PrescriptionComponents> getComponentsByPresId(PrescriptionHistory prescriptionHistory);

    public int addComponents(PrescriptionComponents prescriptionComponents);

    public int addComponentsBatch(@Param("components")List<PrescriptionComponents> components);
}
