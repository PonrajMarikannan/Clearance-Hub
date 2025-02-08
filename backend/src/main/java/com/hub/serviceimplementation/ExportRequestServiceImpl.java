package com.hub.serviceimplementation;

import java.util.List;

import org.springframework.stereotype.Service;

import com.hub.dao.ExportRequestDao;
import com.hub.model.ExporterApplication;
import com.hub.service.ExportRequestService;

@Service
public class ExportRequestServiceImpl implements ExportRequestService {
  
    ExportRequestDao exportRequestDao;

	public ExportRequestServiceImpl(ExportRequestDao exportRequestDao) {
		super();
		this.exportRequestDao = exportRequestDao;
	}

	public void addApplication(ExporterApplication app) {
		exportRequestDao.save(app);
		
	}

	public List<ExporterApplication> getAllExportRequest() {
		return exportRequestDao.getAllExportRequest();
	}	
	
	public void updateApp(ExporterApplication exp) {
		exportRequestDao.update(exp);
	}

	@Override
	public ExporterApplication getApp(int id) {
		return exportRequestDao.getApp(id);
	}

	@Override
	public List<ExporterApplication> getAllApp(int userId) {
		return exportRequestDao.findShipStatus(userId);
	}
	

}
