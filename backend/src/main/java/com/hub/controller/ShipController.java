package com.hub.controller;


import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.hub.constants.APIConstants;
import com.hub.model.Ship;
import com.hub.service.ShipService;


@RestController
@RequestMapping(APIConstants.BASE_URL)
public class ShipController {
	
	 private ShipService shipService;
	 
	 public ShipController(ShipService shipService) {
		super();
		this.shipService = shipService;
	}

	@PostMapping(APIConstants.CREATE_SHIP)
	 public ResponseEntity<String> createShip(@RequestBody Ship ship) {
		 
	     try {
	    	 shipService.addShip(ship);
	         return ResponseEntity.status(HttpStatus.CREATED).body("Ship Created");
	     } catch (Exception e) {
	         return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Ship Not Created");
	     }
	 }

	 @GetMapping(APIConstants.GET_ALL_SHIPS)
	    public List<Ship> viewAllShips() {
	        return shipService.getAllShips();
	    }
	 
	 
	 @PutMapping(APIConstants.UPDATE_SHIP)
		public String updateShip(@PathVariable("id") int id, @RequestBody Ship ship) {
			try {
				String response = shipService.updateShip(id, ship);
				return response; 
			}
			catch(Exception e) {
				System.out.println(e.getMessage());
			}
			return "Failure"; 
		}

	 @DeleteMapping(APIConstants.DELETE_SHIP)
	    public ResponseEntity<String> deleteShip(@PathVariable("id") int id) {
	        try {
	        	shipService.deleteShip(id);
	            return ResponseEntity.ok("Ship deleted successfully");
	        } catch (Exception e) {
	            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error deleting ship");
	        }
	 }
}
