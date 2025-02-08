package com.hub.constants;

public class APIConstants {
		
	public static final String FRONT_END_URL = "http://localhost:3000";
	public static final String BASE_URL = "/ccts";
	
	public static final String CHECK_LOGIN_CREDENTIALS = "/login";
	public static final String CREATE_LOGIN_CREDENTIALS = "/register";
	public static final String GET_USER = "/getUser/{id}";
	public static final String GET_ALL_USER = "/getAllUser";
	
	//Ship Controller
	public static final String CREATE_SHIP = "/createShip";
	public static final String GET_ALL_SHIPS = "/getAllShip";
	public static final String DELETE_SHIP = "/deleteShip/{id}";
	public static final String UPDATE_SHIP = "/updateShip/{id}";
	
	// ExporterApp Controller
	public static final String CREATE_EXPORTER = "/createExportForm";
	public static final String GET_EXPORT_SHIP = "/getExportForm/{id}";
	public static final String GET_ALL_EXPORT_FORM = "/getAllExportForm";
	public static final String UPDATE_EXPORT_FORM = "/updateExportForm";

}
