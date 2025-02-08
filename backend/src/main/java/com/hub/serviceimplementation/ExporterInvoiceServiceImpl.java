//package com.hub.serviceimplementation;
//
//import java.util.List;
//
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.stereotype.Service;
//
//import com.hub.dao.ExporterInvoiceDao;
//import com.hub.model.ExporterInvoice;
//import com.hub.service.ExporterInvoiceService;
//
//@Service
//public class ExporterInvoiceServiceImpl implements ExporterInvoiceService {
//    
//	@Autowired
//    ExporterInvoiceDao exporterInvoiceDao;
//
////	public ExporterInvoiceServiceImpl(ExporterInvoiceDao exporterInvoiceDao) {
////		this.exporterInvoiceDao = exporterInvoiceDao;
////	}
//
//	public void addApplication(ExporterInvoice app) {
//		exporterInvoiceDao.save(app);	
//	}
//	
//	@Override
//	public ExporterInvoice getInv(int id) {
//		return exporterInvoiceDao.getInv(id);
//	}
//
//	@Override
//	public List<ExporterInvoice> getAllInv() {
//		return exporterInvoiceDao.findAll();
//	}
//
//	public List<ExporterInvoice> getInvoicesByUserId(int userId) {
//		return exporterInvoiceDao.getInvoicesByUserId(userId);
//	}
//	
//}
