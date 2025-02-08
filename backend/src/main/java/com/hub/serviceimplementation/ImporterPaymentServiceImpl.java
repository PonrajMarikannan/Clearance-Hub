//package com.hub.serviceimplementation;
//
//
//import org.springframework.stereotype.Service;
//
//import com.hub.dao.ImporterPaymentDao;
//import com.hub.model.ImporterPayment;
//import com.hub.service.ImporterPaymentService;
//
//
//@Service
//public class ImporterPaymentServiceImpl implements ImporterPaymentService {
//
//    ImporterPaymentDao importerPaymentDao;
//
//	public ImporterPaymentServiceImpl(ImporterPaymentDao importerPaymentDao) {
//		super();
//		this.importerPaymentDao = importerPaymentDao;
//	}
//
//
//	public void addApplication(ImporterPayment pay) {
//		importerPaymentDao.save(pay);
//	}
//}
