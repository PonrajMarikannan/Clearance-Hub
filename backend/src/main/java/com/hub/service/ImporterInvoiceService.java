package com.hub.service;

import java.util.List;

import com.hub.model.ImporterInvoice;

public interface ImporterInvoiceService {
	
    void addApplication(ImporterInvoice inv);
    public List<ImporterInvoice> getAllInv();
    public ImporterInvoice getInv(int id);  
    public List<ImporterInvoice> getInvoicesByUserId(int id);
     
}
