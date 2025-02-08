package com.hub.dao;

import java.util.List;
import com.hub.model.ExporterApplication;

public interface ExportRequestDao {

	void save(ExporterApplication app);
	List<ExporterApplication> getAllExportRequest();
	
	public void update(ExporterApplication ship);
	public ExporterApplication getApp(int id);
	List<ExporterApplication> findShipStatus(int userId);
}

