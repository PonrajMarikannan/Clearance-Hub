package com.hub.dao;

import java.util.List;

import com.hub.model.ImporterApplication;

public interface ImporterAppDao {

	void save(ImporterApplication app);
	List<ImporterApplication> findAll();
	public void update(ImporterApplication imp);
	public ImporterApplication getApp(int id);
}

