package com.hub.daoimplementation;

import java.util.List;

import org.springframework.stereotype.Repository;

import com.hub.dao.AuthenticationDao;
import com.hub.model.Ship;
import com.hub.model.User;

import jakarta.persistence.EntityManager;
import jakarta.persistence.NoResultException;
import jakarta.persistence.Query;
import jakarta.persistence.TypedQuery;
import jakarta.transaction.Transactional;

@Repository
@Transactional
public class AuthenticationDaoImpli implements AuthenticationDao {

	EntityManager eManager;
	
	public AuthenticationDaoImpli(EntityManager eManager) {
		super();
		this.eManager = eManager;
	}

	public void createUser(User user) {
		eManager.persist(user);
	}
	
	@Override
    public User findByEmail(String email) {
        String hql = "FROM User WHERE email = :email";
        TypedQuery<User> query = eManager.createQuery(hql, User.class);
        query.setParameter("email", email);
        try {
            return query.getSingleResult();
        } catch (NoResultException e) {
            return null; 
        }
	}
	
	public User findById(int id) {
		return eManager.find(User.class, id);
	}

	@Override
	public void update(User user) {
		eManager.persist(user);
	}

	@Override
	public List<User> findAllUser() {
		String hql = "from User";
		Query query = eManager.createQuery(hql);
		return query.getResultList();
	}

}
	


