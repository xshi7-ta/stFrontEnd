package com.qhc.steigenberger.controller;

import java.util.List;

import javax.annotation.PostConstruct;
import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;

import com.qhc.steigenberger.domain.OrderOption;
import com.qhc.steigenberger.domain.Parameter;
import com.qhc.steigenberger.domain.Result;
import com.qhc.steigenberger.domain.Role;
import com.qhc.steigenberger.domain.User;
import com.qhc.steigenberger.domain.form.Order;
import com.qhc.steigenberger.service.OperationService;
import com.qhc.steigenberger.service.ParameterService;
import com.qhc.steigenberger.service.RoleService;
import com.qhc.steigenberger.service.UserOperationInfoService;
import com.qhc.steigenberger.service.UserService;

@RequestMapping("menu")
@Controller
public class MenuController extends BaseController {
	
	private final static String ORDER_OPTION = "order_option";
	private final static String ORDER_DETAIL = "orderDetail";
	
	private final static String ERROR_PAGE = "error.html";
	//
	private final static String PAGE_DEALER = "dealerOrder/newOrder";
	private final static String PAGE_DEALER_NON_STANDARD = "nonStandardDealerOrder/newNonStandardOrder";
	
	private final static String PAGE_DEALER_DIRECT_CUSTOMER = "directCustomerOrder/directCustomerOrder";
	//
	private final static String specialApplication="special/specialList";
	private final static String todo="todo/mytask";
	private final static String newOrder="dealerOrder/orderForm";
	private final static String orderManageList="orderManage/myOrder";
	private final static String contract="contract/myContract";
	private final static String purchaseAndSale="report/purchaseAndSale";
	private final static String biddingDetail="report/biddingDetail";
	private final static String userIndex="systemManage/userManage";
	private final static String permissionApply="permission/permissionApply";
	private final static String settingIndex="systemManage/parameterSetting";
	private final static String roleIndex="systemManage/roleManage";
	private final static String freight="systemManage/freight";

	private final static String stockUpOrder = "dealerOrder/stockUpOrder";

	@Autowired
	private UserService userService;
	
	@Autowired
	private ParameterService parameterService;
	
	@Autowired
	private RoleService roleService;
	
	@Autowired
	UserOperationInfoService userOperationInfoService;
	
	@PostConstruct
	public void init() {
	}
	
	@RequestMapping("/specialApplication")
	public String index() {
		return specialApplication;
	}
	
	@RequestMapping("/todo")
  	public String todo() {
  		return todo;
  	}
	
	@RequestMapping("/newOrder")
  	public String newOrder() {
  		return newOrder;
  	}
	
	@RequestMapping("/orderManageList")
  	public String orderManage() {
  		return orderManageList;
  	}
	
	@RequestMapping("/contract")
  	public String contract() {
  		return contract;
  	}
	
	@RequestMapping("/purchaseAndSale")
  	public String purchaseAndSale() {
  		return purchaseAndSale;
  	}
	
	@RequestMapping("/biddingDetail")
	public ModelAndView biddingDetail() {
		ModelAndView mv = new ModelAndView();
		//投标客户    TODO
		
//		List<SapSalesOffice> areaList = sapSalesOfficeService.getList();
//		mv.addObject("areaList", areaList);
		mv.setViewName(biddingDetail);
		return mv;
	}
	
	@RequestMapping("/userIndex")
	public String index(@RequestParam(defaultValue = "0", name = "page") Integer page,
			@RequestParam(defaultValue = "5", name = "pageSize") Integer pageSize,
			User entity, 
			Model model,
			HttpServletRequest request) {
		
		model.addAttribute("user1", entity);
		//result list
		model.addAttribute("datas", userService.selectAndPage(page, pageSize, entity));
		String userMail = entity.getUserMail()==null?"":entity.getUserMail();
		String userIdentity = entity.getUserIdentity()==null?"":entity.getUserIdentity();
		String pp = "/user/index?isActive="+entity.getIsActive()+"&userMail="+userMail+"&userIdentity="+userIdentity;
		model.addAttribute("currentPath", pp);
		
		return userIndex;
	}
	
	@RequestMapping("/permissionApply")
	public String permissionApply() {
		return permissionApply;
	}
	
	@RequestMapping("/settingIndex")
	public String index(Model model,HttpServletRequest request) {
		List<Parameter> parameters = parameterService.getList();
		model.addAttribute("parameters", parameters);
//		request.getSession().setAttribute("parameterSettings",parameters);
		return settingIndex;
	}
	
	@RequestMapping("/roleIndex")
	public String index(@RequestParam(defaultValue = "0", name = "page") Integer page,
			@RequestParam(defaultValue = "5", name = "pageSize") Integer pageSize,
			Role entity, 
			Model model,
			HttpServletRequest request) {
		model.addAttribute("role1", entity);
		model.addAttribute("datas", roleService.getPageableList(page, pageSize, entity));
		model.addAttribute("currentPath", "/role/index?isActive="+entity.getIsActive());
//		model.addAttribute("operationList", this.getPermissions());
		
		return roleIndex;
	}
	
	@RequestMapping("/freight")
  	public String freight() {
  		return freight;
  	}
	
	@RequestMapping("standardDiscount")
	public ModelAndView goDealerOrder() {
		ModelAndView mv = new ModelAndView();
		Result result = this.getOrderOption();
		if(result.getStatus()!="ok") {
			mv.setViewName(ERROR_PAGE);
			mv.addObject("msg", result.getMsg());
			return mv;
		}
		mv.setViewName(PAGE_DEALER);
		OrderOption oo = (OrderOption)result.getData();
		Order orderDetail = new Order();
		orderDetail.setCustomerClazz(Order.ORDER_CUSTOMER_DEALER_CODE);
		orderDetail.setOrderType(Order.ORDER_TYPE_DEALER);
		orderDetail.setStOrderType("1");
		mv.addObject(ORDER_OPTION,oo);
		mv.addObject(ORDER_DETAIL, orderDetail);
		return mv;
	}
	
	@RequestMapping("nonStandardDiscount")
	public ModelAndView goNonStandardDealerOrder() {
		ModelAndView mv = new ModelAndView();
		Result result = this.getOrderOption();
		if(result.getStatus()!="ok") {
			mv.setViewName(ERROR_PAGE);
			mv.addObject("msg", result.getMsg());
			return mv;
		}
		mv.setViewName(PAGE_DEALER_NON_STANDARD);
		OrderOption oo = (OrderOption)result.getData();
		Order orderDetail = new Order();
		orderDetail.setCustomerClazz(Order.ORDER_CUSTOMER_DEALER_CODE);
		orderDetail.setOrderType(Order.ORDER_TYPE_DEALER);
		orderDetail.setStOrderType("2");
		mv.addObject(ORDER_OPTION,oo);	
		mv.addObject(ORDER_DETAIL, orderDetail);
		return mv;
	}
	
	@RequestMapping("directCustomerOrder")
	public ModelAndView goDirectCustomerOrder() {
		ModelAndView mv = new ModelAndView();
		Result result = this.getOrderOption();
		if(result.getStatus()!="ok") {
			mv.setViewName(ERROR_PAGE);
			mv.addObject("msg", result.getMsg());
			return mv;
		}
		mv.setViewName(PAGE_DEALER_DIRECT_CUSTOMER);
		OrderOption oo = (OrderOption)result.getData();
		Order orderDetail = new Order();
		orderDetail.setCustomerClazz(Order.ORDER_CUSTOMER_KEY_ACCOUNT_CODE);
		orderDetail.setOrderType(Order.ORDER_TYPE_KEYACCOUNT);
		orderDetail.setStOrderType("3");
		mv.addObject(ORDER_OPTION,oo);	
		mv.addObject(ORDER_DETAIL, orderDetail);
		return mv;
	}
	
	@RequestMapping("/stockUpOrder")
	public ModelAndView goStockUpOrder() {
		ModelAndView mv = new ModelAndView();
		Result result = this.getOrderOption();
		if(result.getStatus()!="ok") {
			mv.setViewName(ERROR_PAGE);
			mv.addObject("msg", result.getMsg());
			return mv;
		}
		mv.setViewName(stockUpOrder);
		OrderOption oo = (OrderOption)result.getData();
		Order orderDetail = new Order();
		orderDetail.setOrderType(Order.ORDER_TYPE_BULK);
		orderDetail.setStOrderType("5");
		mv.addObject(ORDER_OPTION,oo);
		mv.addObject(ORDER_DETAIL, orderDetail);
		return mv;
	}
	
	
	@RequestMapping("/nologin")
  	public String nologin() {
  		return "noLogin";
  	}
}
