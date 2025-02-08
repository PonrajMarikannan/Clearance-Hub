package com.hub.dao;

import java.util.List;

import com.hub.model.Ship;

public interface ShipDao {
	
    public void save(Ship ship);
    public List<Ship> findAll();
	public void delete(int id);
	public void update(Ship ship);
	public Ship getShip(Integer shipId);
}

