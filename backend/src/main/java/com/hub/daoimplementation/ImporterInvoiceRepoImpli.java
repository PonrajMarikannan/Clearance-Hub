//package com.hub.daoimplementation;
//
//import java.util.List;
//
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.stereotype.Repository;
//
//import com.hub.model.ImporterInvoice;
//
//import jakarta.persistence.EntityManager;
//import jakarta.persistence.Query;
//import jakarta.transaction.Transactional;
//
//@Repository
//@Transactional
//public class ImporterInvoiceDaoImpli implements ImporterInvoiceDao {
//
//	@Autowired
//	EntityManager eManager;
//
//	public void save(ImporterInvoice inv) {
//		eManager.persist(inv);
//	}
//
//	public List<ImporterInvoice> findAll() {
//		String hql = "from ImporterInvoice";
//		Query query = eManager.createQuery(hql);
//		return query.getResultList();
//	}
//	
//	public void update(ImporterInvoice inv) {
//		eManager.merge(inv);
//	}
//
//	@Override
//	public ImporterInvoice getInv(int id) {
//		return eManager.find(ImporterInvoice.class, id);	
//	}
//
//	@Override
//    public List<ImporterInvoice> getInvoicesByUserId(int userId) {
//        String hql = "SELECT e FROM ImporterInvoice e WHERE e.importerApplication.user.userId = :userId";
//		 Query query = eManager.createQuery(hql);
//        query.setParameter("userId", userId);
//        return query.getResultList();
//    }
//	
//
//}
//	
//
//
