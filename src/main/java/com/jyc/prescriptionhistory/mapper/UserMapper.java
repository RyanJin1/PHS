package com.jyc.prescriptionhistory.mapper;

import com.jyc.prescriptionhistory.bean.User;

public interface UserMapper {
    public User getUser(String uName, String uPwd);
}
