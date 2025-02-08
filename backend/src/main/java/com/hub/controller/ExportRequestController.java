package com.hub.controller;

import java.io.IOException;
import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.hub.constants.APIConstants;
import com.hub.model.ExporterApplication;
import com.hub.model.Ship;
import com.hub.model.User;
import com.hub.service.AuthenticationService;
import com.hub.service.ExportRequestService;
import com.hub.service.ShipService;

@RestController
@RequestMapping(APIConstants.BASE_URL)
public class ExportRequestController {

	private ExportRequestService exportRequestService;
	private AuthenticationService authenticationService;
	private ShipService shipService;

	public ExportRequestController(ExportRequestService exportRequestService, AuthenticationService authenticationService,
			ShipService shipService) {
		
		this.exportRequestService = exportRequestService;
		this.authenticationService = authenticationService;
		this.shipService = shipService;
	}

	@PostMapping(APIConstants.CREATE_EXPORTER)
	public ResponseEntity<String> submitApplication(@RequestParam("userId") Integer userId,
			@RequestParam("shipId") Integer shipId, @RequestParam("importerName") String importerName,
			@RequestParam("importerEmail") String importerEmail, @RequestParam("impPhnum") String impPhnum,
			@RequestParam("exporterName") String exporterName, @RequestParam("exporterEmail") String exporterEmail,
			@RequestParam("expPhnum") String expPhnum, @RequestParam("productName") String productName,
			@RequestParam("productDescription") String productDescription, @RequestParam("weight") Double weight,
			@RequestParam("destinationCountry") String destinationCountry, @RequestParam("file") MultipartFile file)
			throws IOException {

		byte[] fileBytes = null;
		if (file != null && !file.isEmpty()) {
			fileBytes = file.getBytes();
		}

		User user = authenticationService.getUser(userId);
		Ship ship = shipService.getShip(shipId);

		ExporterApplication application = new ExporterApplication();

		application.setUser(user);
		application.setShip(ship);
		application.setImporterName(importerName);
		application.setImporterEmail(importerEmail);
		application.setImpPhnum(impPhnum);
		application.setExporterName(exporterName);
		application.setExporterEmail(exporterEmail);
		application.setExpPhnum(expPhnum);
		application.setProductName(productName);
		application.setProductDescription(productDescription);
		application.setWeight(weight);
		application.setDestinationCountry(destinationCountry);
		application.setSubmissionDate(new java.sql.Date(System.currentTimeMillis()));
		application.setStatus(ExporterApplication.Status.PENDING);
		application.setDocumentFile(fileBytes);

		exportRequestService.addApplication(application);

		return ResponseEntity.ok("Application submitted successfully.");
	}

	@GetMapping(APIConstants.GET_ALL_EXPORT_FORM)
	public List<ExporterApplication> viewAllExportRequest() {
		return exportRequestService.getAllExportRequest();
	}

	@PutMapping(APIConstants.UPDATE_EXPORT_FORM)
	public ResponseEntity<String> updateStatus(@RequestParam("id") Integer id, @RequestParam("status") String status) {

		try {
			ExporterApplication.Status newStatus = ExporterApplication.Status.valueOf(status);
			ExporterApplication application = exportRequestService.getApp(id);
			
			if (application != null) {
				application.setStatus(newStatus);
				exportRequestService.updateApp(application);
				return ResponseEntity.ok("Status updated successfully.");
			} else {
				return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Application not found.");
			}
		} catch (IllegalArgumentException e) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid status value.");
		}
	}
//
//	@GetMapping(APIConstants.GET_EXPORT_SHIP)
//	public List<ExporterApplication> getShipDetailsById(@PathVariable("id") int id) {
//		return exporterAppService.getAllApp(id);
//	}

}
