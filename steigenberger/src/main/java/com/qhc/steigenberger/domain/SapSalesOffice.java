package com.qhc.steigenberger.domain;

import java.io.Serializable;

import com.qhc.steigenberger.util.Page;


/**
 * 
 * @author lizuoshan
 *
 */
public class SapSalesOffice implements Serializable {
	
    /**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	private String code;
	
    private String name;
	

	public String getCode() {
		return code;
	}

	public void setCode(String code) {
		this.code = code;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}
	
	
	



}
