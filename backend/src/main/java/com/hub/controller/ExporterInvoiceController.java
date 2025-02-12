//package com.hub.controller;
//
//import java.sql.Date;
//import java.util.List;
//
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.http.ResponseEntity;
//import org.springframework.web.bind.annotation.GetMapping;
//import org.springframework.web.bind.annotation.PathVariable;
//import org.springframework.web.bind.annotation.PostMapping;
//import org.springframework.web.bind.annotation.RequestMapping;
//import org.springframework.web.bind.annotation.RequestParam;
//import org.springframework.web.bind.annotation.RestController;
//
//import com.hub.model.ExporterApplication;
//import com.hub.model.ExporterInvoice;
//import com.hub.serviceimplementation.ExporterAppServiceImpl;
//import com.hub.serviceimplementation.ExporterInvoiceServiceImpl;
//
//
//@RestController
//@RequestMapping()
//public class ExporterInvoiceController {
//
//    @Autowired
//    private ExporterInvoiceServiceImpl serviceimpl;
//    
//    @Autowired
//    private ExporterAppServiceImpl appserviceimpl;
//    
//    @PostMapping
//    public ResponseEntity<String> submitInvoice(@RequestParam("amount") int amount,
//            @RequestParam("applicationId") Integer applicationId)
//    {
//    	ExporterInvoice exporterInvoice = new ExporterInvoice();
//    	
//    	ExporterApplication exp = appserviceimpl.getApp(applicationId);
//    	
//    	
//    	exporterInvoice.setExporterApplication(exp);
//    	exporterInvoice.setAmount(amount);
//    	
//    	if (exporterInvoice.getInvoiceDate() == null) {
//    		exporterInvoice.setInvoiceDate(new Date(System.currentTimeMillis()));
//	     }
//    	
//    	
//    	
//        serviceimpl.addApplication(exporterInvoice);
//        return ResponseEntity.ok("Invoice submitted successfully.");
//    }
//    
//    @GetMapping("/all")
//    public List<ExporterInvoice> viewAllInvoices() {
//        return serviceimpl.getAllInv();
//    }
//        
//    @GetMapping("{id}")
//	public ExporterInvoice getEmployeebyId(@PathVariable("id") int id) {
//		return serviceimpl.getInv(id);
//	}
//    
//    @GetMapping("/byUserId/{userId}")
//    public List<ExporterInvoice> getInvoicesByUserId(@PathVariable("userId") int userId) {
//        return serviceimpl.getInvoicesByUserId(userId);
//    }
// 
//}
//
