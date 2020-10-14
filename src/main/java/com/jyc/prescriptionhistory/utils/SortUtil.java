package com.jyc.prescriptionhistory.utils;

import com.jyc.prescriptionhistory.bean.Prescription;
import com.jyc.prescriptionhistory.bean.PrescriptionHistory;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;

public class SortUtil {
    public static List<PrescriptionHistory> DynastySort(List<PrescriptionHistory> phs){
        List<PrescriptionHistory> resList=new ArrayList();
        List<String> dynasty= Arrays.asList("汉","唐","金","宋","元","明","清","现代","朝鲜");
        HashMap<String,List<PrescriptionHistory>> map=new HashMap<>();
        for (int i = 0; i < dynasty.size(); i++) {
            map.put(dynasty.get(i),new ArrayList<>());
        }
        for (int i = 0; i < phs.size(); i++) {
            String age=phs.get(i).getAge();
            List<PrescriptionHistory> list=map.get(age);
            list.add(phs.get(i));
            map.put(age,list);
        }
        for (int i = 0; i < dynasty.size(); i++) {
            List<PrescriptionHistory> l=map.get(dynasty.get(i));
            if(l.size()==0)
                continue;
            for (int j = 0; j < l.size(); j++) {
                resList.add(l.get(j));
            }
        }
        return resList;
    }
}
