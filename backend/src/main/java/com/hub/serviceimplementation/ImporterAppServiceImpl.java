//package com.hub.serviceimplementation;
//
//import java.util.List;
//
//import org.springframework.stereotype.Service;
//
//import com.hub.dao.ImporterAppDao;
//import com.hub.model.ImporterApplication;
//import com.hub.service.ImporterAppService;
//
//
//@Service
//public class ImporterAppServiceImpl implements ImporterAppService {
//   
//    ImporterAppDao importerAppDao;
//
//	public ImporterAppServiceImpl(ImporterAppDao importerAppDao) {
//		super();
//		this.importerAppDao = importerAppDao;
//	}
//
//	public void addApplication(ImporterApplication app) {
//		importerAppDao.save(app);		
//	}
//
//	public List<ImporterApplication> getAllApp() {
//		return importerAppDao.findAll();
//	}	
//	
//	public void updateApp(ImporterApplication imp) {
//		importerAppDao.update(imp);
//	}
//
//	@Override
//	public ImporterApplication getApp(int id) {
//		return importerAppDao.getApp(id);
//	}
//	
//}
