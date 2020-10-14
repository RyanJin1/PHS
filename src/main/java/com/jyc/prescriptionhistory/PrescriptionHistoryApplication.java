package com.jyc.prescriptionhistory;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.transaction.annotation.EnableTransactionManagement;

@EnableTransactionManagement
@SpringBootApplication
@MapperScan(basePackages = {"com.jyc.prescriptionhistory.mapper"})
public class PrescriptionHistoryApplication {

    public static void main(String[] args) {
        SpringApplication.run(PrescriptionHistoryApplication.class, args);
    }

}
