package com.hub.daoimplementation;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.hub.dao.ExportRequestDao;
import com.hub.model.ExporterApplication;

import jakarta.persistence.EntityManager;
import jakarta.persistence.Query;
import jakarta.persistence.TypedQuery;
import jakarta.transaction.Transactional;

@Repository
@Transactional
public class ExportRequestDaoImpli implements ExportRequestDao {

	@Autowired
	EntityManager eManager;

	public void save(ExporterApplication exp) {
		eManager.persist(exp);
	}

	public List<ExporterApplication> getAllExportRequest() {
		String hql = "from ExporterApplication";
		Query query = eManager.createQuery(hql);
		return query.getResultList();
	}
	
	public void update(ExporterApplication exp) {
		eManager.merge(exp);
	}

	public ExporterApplication getApp(int id) {
		return eManager.find(ExporterApplication.class, id);	
	}

	public List<ExporterApplication> findShipStatus(int userId) {
		String jpql = "SELECT ea FROM ExporterApplication ea WHERE ea.user.userId = :userId";

        TypedQuery<ExporterApplication> query = eManager.createQuery(jpql, ExporterApplication.class);
        query.setParameter("userId", userId);

        return query.getResultList();
	}
}
	


