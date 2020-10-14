package com.jyc.prescriptionhistory.service;


import com.jyc.prescriptionhistory.bean.User;
import com.jyc.prescriptionhistory.mapper.UserMapper;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;

@Slf4j
@Service
public class LoginServiceImpl implements LoginService {

    @Resource
    UserMapper userMapper;

    //用户登录
    @Override
    public boolean userLogin(String uName, String uPwd) {

        User user = userMapper.getUser(uName, uPwd);
        if(user!=null)
            return true;
        return false;
    }
}
