//package com.hub.serviceimplementation;
//
//import java.util.List;
//
//import org.springframework.stereotype.Service;
//
//import com.hub.dao.ImporterInvoiceDao;
//import com.hub.model.ImporterInvoice;
//import com.hub.service.ImporterInvoiceService;
//
//@Service
//public class ImporterInvoiceServiceImpl implements ImporterInvoiceService {
//
//   
//    ImporterInvoiceDao importerInvoiceDao;
//
//	public void addApplication(ImporterInvoice app) {
//		importerInvoiceDao.save(app);
//		
//	}
//
//	@Override
//	public ImporterInvoice getInv(int id) {
//		return importerInvoiceDao.getInv(id);
//	}
//
//	@Override
//	public List<ImporterInvoice> getAllInv() {
//		return importerInvoiceDao.findAll();
//	}
//
//	public List<ImporterInvoice> getInvoicesByUserId(int userId) {
//		return importerInvoiceDao.getInvoicesByUserId(userId);
//	}
//	
//
//}
