package com.hub.service;

import java.util.List;

import com.hub.model.ImporterApplication;

public interface ImporterAppService {
	
    void addApplication(ImporterApplication app);
    public List<ImporterApplication> getAllApp();
    public void updateApp(ImporterApplication exp);
    public ImporterApplication getApp(int id);  
     
}
