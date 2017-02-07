package cn.edu.zzu.service.impl;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import cn.edu.zzu.base.BaseLog;
import cn.edu.zzu.dao.IBaseDao;
import cn.edu.zzu.service.IBaseService;

@Service
public class BaseService extends BaseLog implements IBaseService{
    @Resource
    private IBaseDao baseDao;
    

}
