package com.hub.service;

import java.util.List;

import com.hub.model.ExporterApplication;

public interface ExportRequestService {
	
    void addApplication(ExporterApplication app);
    public List<ExporterApplication> getAllExportRequest();
    public void updateApp(ExporterApplication exportRequest);
    
    public ExporterApplication getApp(int id); 
    
    public List<ExporterApplication> getAllApp(int userId);
    
     
}
