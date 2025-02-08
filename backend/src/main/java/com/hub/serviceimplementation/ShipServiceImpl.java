package com.hub.serviceimplementation;

import java.util.List;

import org.springframework.stereotype.Service;

import com.hub.dao.ShipDao;
import com.hub.model.Ship;
import com.hub.service.ShipService;

@Service
public class ShipServiceImpl implements ShipService {

    
    ShipDao shipDao;
    
    public ShipServiceImpl(ShipDao shipDao) {
		super();
		this.shipDao = shipDao;
	}

	public void addShip(Ship ship) {
		shipDao.save(ship);	
    }
    
    public List<Ship> getAllShips() {
		return shipDao.findAll();
	}

	public void deleteShip(int id) {
		shipDao.delete(id);
	}

	public String updateShip(int id, Ship ship) {
		Ship ship1 = shipDao.getShip(id);
		if(ship1!=null) {
			ship.setShipId(ship1.getShipId());
			shipDao.update(ship);
			return "Ship Updated";
		} else {
			return "Ship Not Found";
		}
	}

	@Override
	public Ship getShip(int id) {
		return shipDao.getShip(id);
	}
	
  }