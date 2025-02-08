package com.hub.dao;

import java.util.List;

import com.hub.model.ImporterInvoice;

public interface ImporterInvoiceDao {

	void save(ImporterInvoice app);
	List<ImporterInvoice> findAll();
	public ImporterInvoice getInv(int id);
	List<ImporterInvoice> getInvoicesByUserId(int id);
}

