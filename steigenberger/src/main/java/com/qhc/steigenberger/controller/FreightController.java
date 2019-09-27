package com.qhc.steigenberger.controller;

import java.io.File;
import java.util.ArrayList;
import java.util.List;


import javax.servlet.http.HttpServletRequest;

import org.apache.tomcat.util.http.fileupload.FileUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.util.ResourceUtils;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartRequest;

import com.qhc.steigenberger.domain.BArea;
import com.qhc.steigenberger.domain.BCity;
import com.qhc.steigenberger.domain.BProvince;
import com.qhc.steigenberger.domain.Freight;
import com.qhc.steigenberger.domain.JsonResult;
import com.qhc.steigenberger.domain.KOrderInfo;
import com.qhc.steigenberger.domain.User;
import com.qhc.steigenberger.domain.UserOperationInfo;
import com.qhc.steigenberger.service.BAreaService;
import com.qhc.steigenberger.service.BCityService;
import com.qhc.steigenberger.service.BProvinceService;
import com.qhc.steigenberger.util.ExcelUtil;
import com.qhc.steigenberger.util.FileHandleUtil;
import com.qhc.steigenberger.util.ObjectConvertUtils;
import com.qhc.steigenberger.util.PageHelper;



@Controller
@RequestMapping("/freight")
public class FreightController {
	
	@Autowired
	BProvinceService bProvinceService;
	
	@Autowired
	BCityService bCityService;
	
	@Autowired
	BAreaService bAreaService;
	
	
	@RequestMapping("/index")
  	public String todo() {
  		return "systemManage/freight";
  	}
	
	 @RequestMapping(value = "/upload")
	 @ResponseBody
	 private JsonResult importExcel(@RequestParam(value = "excelFile", required = false) MultipartFile file,HttpServletRequest request) {
	     try {
	         MultipartRequest multipartRequest=(MultipartRequest) request;
	         MultipartFile excelFile=multipartRequest.getFile("excelFile");
	         if(excelFile!=null){
	        	 BProvince bProvince = new BProvince();
	        	 BCity bCity = new BCity();
	        	 BArea bArea = new BArea();
	        	 //2007版本以下的excel用这个
//	             List<List<String>> datas = ExcelUtil.readXls(excelFile.getInputStream());
	        	 List<List<String>> datas = ExcelUtil.readXlsx(excelFile.getInputStream());
	        	 for (int i = 0; i < datas.size(); i++) {
	        		 List<String> data = datas.get(i);
	        		 for(int j = 0; j < data.size(); j++) {
	        			 bProvince.setName(data.get(0));
	        			 bProvince.setCode(data.get(1));
	        			 bProvinceService.add(bProvince);
	        			 
	        			 bCity.setbProvinceCode(data.get(1));
	        			 bCity.setName(data.get(2));
	        			 bCity.setCode(data.get(3));
	        			 bCityService.add(bCity);
	        			 
	        			 bArea.setbCityCode(data.get(3));
	        			 bArea.setName(data.get(4));
	        			 bArea.setCode(data.get(5));
	        			 bArea.setPrice(Double.valueOf(data.get(6)));
	        			 bArea.setPrice1(Double.valueOf(data.get(7)));
	        			 bArea.setPrice2(Double.valueOf(data.get(8)));
	        			 bArea.setPrice3(Double.valueOf(data.get(9)));
	        			 bArea.setPrice4(Double.valueOf(data.get(10)));
	        			 bArea.setPrice5(Double.valueOf(data.get(11)));
	        			 bArea.setPrice6(Double.valueOf(data.get(12)));
	        			 bArea.setPrice7(Double.valueOf(data.get(13)));
	        			 bArea.setPrice8(Double.valueOf(data.get(14)));
	        			 bArea.setPrice9(Double.valueOf(data.get(15)));
	        			 bArea.setPrice10(Double.valueOf(data.get(16)));
	        			 bArea.setPrice11(Double.valueOf(data.get(17)));
	        			 bAreaService.add(bArea);
	        			
	        		 }
				}
	     
	             // .............
	        	 //将文件上传到某个路径
	        	 /*String fileName = excelFile.getOriginalFilename();
	        	 String filePath = "D:\\";
	             File dest = new File(filePath + fileName);
	        	 excelFile.transferTo(dest);*/
	        	 
	             if(datas!=null && datas.size()>0){
	                 return JsonResult.build(200,"success",1);
	             }
	         }else{
	             return new JsonResult(false);
	         }
	     } catch (Exception e) {
	         return new JsonResult(false);
	     }
	     return new JsonResult(false);
	 }
	 
	 @RequestMapping("/List")
	@ResponseBody
	public PageHelper<Freight> getUserListPage(Freight freight,HttpServletRequest request) {
		PageHelper<Freight> pageHelper = new PageHelper<Freight>();
		
		try {
			List<List<Object>> list = bAreaService.getList(freight.getPage()-1, freight.getLimit(),freight).getRows();
			List<Object[]> list1 = new ArrayList<Object[]>();
			for (int i = 0; i < list.size(); i++) {
				Object[] a= list.get(i).toArray();
				list1.add(a);
			}
			List<Freight> testViews = ObjectConvertUtils.objectToBean(list1, Freight.class);
			pageHelper.setRows(testViews);
			pageHelper.setTotal(bAreaService.getList(freight.getPage()-1, freight.getLimit(),freight).getTotal());
			
		} catch (Exception e) {
			e.printStackTrace();
		}
		return pageHelper;
	}
	 
	 

}
