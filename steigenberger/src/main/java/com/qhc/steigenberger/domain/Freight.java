package com.qhc.steigenberger.domain;

import java.io.Serializable;

import com.qhc.steigenberger.util.Page;

public class Freight extends Page  implements Serializable{
	
	public String pname;
	
	public String cname;
	
	public String name;
	
	public Double price;
	
	public Double price1;
	
	public Double price2;
	
	public Double price3;
	
	public Double price4;
	
	public Double price5;
	
	public Double price6;
	
	public Double price7;
	
	public Double price8;
	
	public Double price9;
	
	public Double price10;
	
	public Double price11;

	public String getPname() {
		return pname;
	}

	public void setPname(String pname) {
		this.pname = pname;
	}

	public String getCname() {
		return cname;
	}

	public void setCname(String cname) {
		this.cname = cname;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public Double getPrice() {
		return price;
	}

	public void setPrice(Double price) {
		this.price = price;
	}

	public Double getPrice1() {
		return price1;
	}

	public void setPrice1(Double price1) {
		this.price1 = price1;
	}

	public Double getPrice2() {
		return price2;
	}

	public void setPrice2(Double price2) {
		this.price2 = price2;
	}

	public Double getPrice3() {
		return price3;
	}

	public void setPrice3(Double price3) {
		this.price3 = price3;
	}

	public Double getPrice4() {
		return price4;
	}

	public void setPrice4(Double price4) {
		this.price4 = price4;
	}

	public Double getPrice5() {
		return price5;
	}

	public void setPrice5(Double price5) {
		this.price5 = price5;
	}

	public Double getPrice6() {
		return price6;
	}

	public void setPrice6(Double price6) {
		this.price6 = price6;
	}

	public Double getPrice7() {
		return price7;
	}

	public void setPrice7(Double price7) {
		this.price7 = price7;
	}

	public Double getPrice8() {
		return price8;
	}

	public void setPrice8(Double price8) {
		this.price8 = price8;
	}

	public Double getPrice9() {
		return price9;
	}

	public void setPrice9(Double price9) {
		this.price9 = price9;
	}

	public Double getPrice10() {
		return price10;
	}

	public void setPrice10(Double price10) {
		this.price10 = price10;
	}

	public Double getPrice11() {
		return price11;
	}

	public void setPrice11(Double price11) {
		this.price11 = price11;
	}

	public Freight(String pname, String cname, String name, Double price, Double price1, Double price2, Double price3,
			Double price4, Double price5, Double price6, Double price7, Double price8, Double price9, Double price10,
			Double price11) {
		super();
		this.pname = pname;
		this.cname = cname;
		this.name = name;
		this.price = price;
		this.price1 = price1;
		this.price2 = price2;
		this.price3 = price3;
		this.price4 = price4;
		this.price5 = price5;
		this.price6 = price6;
		this.price7 = price7;
		this.price8 = price8;
		this.price9 = price9;
		this.price10 = price10;
		this.price11 = price11;
	}

	public Freight() {
		super();
		// TODO Auto-generated constructor stub
	}

}
