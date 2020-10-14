package com.jyc.prescriptionhistory;

import com.jyc.prescriptionhistory.bean.*;
import com.jyc.prescriptionhistory.mapper.HistoryComponentsMapper;
import com.jyc.prescriptionhistory.mapper.PrescriptionHistoryMapper;
import com.jyc.prescriptionhistory.mapper.PrescriptionMapper;
import com.jyc.prescriptionhistory.mapper.UserMapper;
import com.jyc.prescriptionhistory.service.UploadService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import javax.sql.DataSource;
import javax.xml.crypto.Data;
import java.util.Collection;
import java.util.List;

@SpringBootTest
class PrescriptionHistoryApplicationTests {

    @Autowired
    DataSource dataSource;

    @Autowired
    PrescriptionHistoryMapper mapper;

    @Autowired
    UploadService uploadService;

    @Test
    void contextLoads() {
        mapper.getPrescriptionHistoryInfoByPresName("左金丸");
    }

//    @Test
//    void test2(){
//        List<PrescriptionHistory> prescriptionHistory = prescriptionHistoryMapper.getPrescriptionHistory();
//       for(PrescriptionHistory ph:prescriptionHistory){
//           for(HistoryComponents hc:ph.getHc()){
//               historyComponentsMapper.addHistoryComponent(hc.getPlantId(),ph.getHistoryId());
//           }
//       }
//
//    }

}
