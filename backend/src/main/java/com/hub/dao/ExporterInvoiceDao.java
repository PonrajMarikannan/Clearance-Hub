package com.hub.dao;

import java.util.List;

import com.hub.model.ExporterInvoice;

public interface ExporterInvoiceDao {

	void save(ExporterInvoice app);
	List<ExporterInvoice> findAll();
	public ExporterInvoice getInv(int id);
	List<ExporterInvoice> getInvoicesByUserId(int id);
}

