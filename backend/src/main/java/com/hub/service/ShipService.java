package com.hub.service;

import java.util.List;

import com.hub.model.Ship;

public interface ShipService {
	
	public void addShip(Ship ship);
    public List<Ship> getAllShips();
    public void deleteShip(int id);
    public String updateShip(int id, Ship ship);
    
    public Ship getShip(int id);  
}
