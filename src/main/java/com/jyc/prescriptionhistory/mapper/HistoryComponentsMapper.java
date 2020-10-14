package com.jyc.prescriptionhistory.mapper;

import com.jyc.prescriptionhistory.bean.HistoryComponents;
import com.jyc.prescriptionhistory.bean.PrescriptionComponents;
import com.jyc.prescriptionhistory.bean.PrescriptionHistory;
import org.apache.ibatis.annotations.Param;

import java.util.List;

public interface HistoryComponentsMapper {

    public int addInitHistoryComponent(@Param("ph") PrescriptionHistory ph, @Param("pc") PrescriptionComponents pc);

    public List<HistoryComponents> getHisComponentsByHid(Integer historyId);

    public int updateHisComponents(HistoryComponents historyComponent);

    public int addHistoryComponent(HistoryComponents historyComponents);

//    public int addHistoryComponentBatch(HistoryComponents historyComponents);

    public int addInitHistoryComponentBatch(@Param("plantId") Integer plantId,@Param("historyIds") List<Integer> historyIds);






}
