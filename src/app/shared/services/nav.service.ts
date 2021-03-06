import { Injectable, OnDestroy } from '@angular/core';
import { Subject, BehaviorSubject, fromEvent } from 'rxjs';
import { takeUntil, debounceTime } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Roles } from '../Models/Roles';

// Menu
export interface Menu {
	headTitle1?: string,
	headTitle2?: string,
	path?: string;
	title?: string;
	icon?: string;
	type?: string;
	badgeType?: string;
	badgeValue?: string;
	active?: boolean;
	bookmark?: boolean;
	children?: Menu[];
}

@Injectable({
	providedIn: 'root'
})



export class NavService implements OnDestroy {

	private unsubscriber: Subject<any> = new Subject();
	public  screenWidth: BehaviorSubject<number> = new BehaviorSubject(window.innerWidth);
	
	// Search Box
	public search: boolean = false;

	// Language
	public language: boolean = false;
	
	// Mega Menu
	public megaMenu: boolean = false;
	public levelMenu: boolean = false;
	public megaMenuColapse: boolean = window.innerWidth < 1199 ? true : false;

	// For Horizontal Layout Mobile
	public horizontal: boolean = window.innerWidth < 991 ? false : true;

	// Collapse Sidebar
	public collapseSidebar: boolean = window.innerWidth < 991 ? true : false;

	// Full screen
	public fullScreen: boolean = false;

	 Role :string= localStorage.getItem("RiskRole");

	constructor(private router: Router) {
		// this.Role  = localStorage.getItem("RiskRole");
		this.setScreenWidth(window.innerWidth);
		fromEvent(window, 'resize').pipe(
			debounceTime(1000),
			takeUntil(this.unsubscriber)
		).subscribe((evt: any) => {
			this.setScreenWidth(evt.target.innerWidth);
			if (evt.target.innerWidth < 991) {
				this.collapseSidebar = true;
				this.megaMenu = false;
				this.levelMenu = false;
			}
			if(evt.target.innerWidth < 1199) {
				this.megaMenuColapse = true;
			}
		});
		if(window.innerWidth < 991) { // Detect Route change sidebar close
			this.router.events.subscribe(event => { 
				this.collapseSidebar = true;
				this.megaMenu = false;
				this.levelMenu = false;
			});
		}
	}

	ngOnDestroy() {
		this.unsubscriber.next();
		this.unsubscriber.complete();
	}

	private setScreenWidth(width: number): void {
		this.screenWidth.next(width);
	}



	MENUITEMS: Menu[] = [
		{
			headTitle1: 'لوحة التحكم ', headTitle2: 'إدارة المحتويات الموجودة',
		},
		{
			title: 'خدمة العملاء', icon: 'home', type: 'sub', badgeType: 'success', active: true, children: [
				{ path: 'agent/main', title: 'الشركات', type: 'link' },
				{ path: 'agent/stat', title: 'إحصائيات', type: 'link' },
				// { path: 'agent/Customer', title: 'تسجيل بيانات', type: 'link' },
			]
		}
	];

	MENUITEMS_Admin: Menu[] = [
		{
			headTitle1: 'لوحة التحكم ', headTitle2: 'إدارة المحتويات الموجودة',
		},
		{
			title: ' إدارة التصنيفات ', icon: 'home', type: 'sub', badgeType: 'success', active: true, children: [
				{ path: 'admin/InsertCategory', title: 'إضافة تصنيف', type: 'link' },
				{ path: 'admin/GetCategories', title: 'قائمة التصنيفات', type: 'link' },
			]
		},
		{
			title: 'إدارة الباقات', icon: 'home', type: 'sub', badgeType: 'success', active: true, children: [
				{ path: 'admin/insert-call-reason', title: 'اضافة باقة', type: 'link' },
				{ path: 'admin/Get-Call-Reason', title: 'قائمة الباقات', type: 'link' },
			]
		},
		{
			title: 'إدارة الخدمات', icon: 'home', type: 'sub', badgeType: 'success', active: true, children: [
				{ path: 'admin/InsertSourceMarket', title: 'اضافة خدمة', type: 'link' },
				{ path: 'admin/GetSourceMarket', title: 'قائمة الخدمات', type: 'link' },
			]
		},
		{
			title: 'إدارة المتطلبات ', icon: 'home', type: 'sub', badgeType: 'success', active: true, children: [
				{ path: 'admin/InsertClient', title: 'إضافة متطلب خدمة', type: 'link' },
				{ path: 'admin/GetClient', title: 'قائمة متطلبات الخدمة', type: 'link' },
			]
		},
		{
			title: 'إدارة المحافظات', icon: 'home', type: 'sub', badgeType: 'success', active: true, children: [
				{ path: 'admin/insert-governorate', title: 'إضافة محافظة', type: 'link' },
				{ path: 'admin/Get-governorate', title: 'قائمة المحافظات', type: 'link' },
			]
		},
		{
			title: 'إدارة المدن', icon: 'home', type: 'sub', badgeType: 'success', active: true, children: [
				{ path: 'admin/insert-city', title: 'إضافة مدينة', type: 'link' },
				{ path: 'admin/Get-cities', title: 'قائمة المدن', type: 'link' },
			]
		},
		
		{
			title: ' المجموعات', icon: 'home', type: 'sub', badgeType: 'success', active: true, children: [
				{ path: 'admin/InsertGroup', title: 'إضافة مجموعة', type: 'link' },
				{ path: 'admin/Groups', title: 'قائمة المجموعات', type: 'link' },
			]
		},
		{
			title: ' الأسباب', icon: 'home', type: 'sub', badgeType: 'success', active: true, children: [
				{ path: 'admin/InsertReason', title: 'إضافة سبب', type: 'link' },
				{ path: 'admin/Reasons', title: 'قائمة الأسباب', type: 'link' },
			]
		},
		{
			title: ' مقدمى الخدمة', icon: 'home', type: 'sub', badgeType: 'success', active: true, children: [
				{ path: 'admin/Insertserviceprovider', title: 'إضافة مقدم خدمة', type: 'link' },
				// { path: 'admin/Department', title: 'قائمة مقدمى الخدمة', type: 'link' },
			]
		}
		
		
	];

	MEGAMENUITEMS: Menu[] = [
		{
			title: 'Error Pages', type: 'sub', active: true, children: [
				{ path: 'javascript:void(0);', title: 'Error Page 400', type: 'extLink' },
				{ path: 'javascript:void(0);', title: 'Error Page 401', type: 'extLink' },
				{ path: 'javascript:void(0);', title: 'Error Page 403', type: 'extLink' },
				{ path: 'javascript:void(0);', title: 'Error Page 404', type: 'extLink' },
				{ path: 'javascript:void(0);', title: 'Error Page 500', type: 'extLink' },
				{ path: 'javascript:void(0);', title: 'Error Page 503', type: 'extLink' },
			]
		},
		{
			title: 'Authentication', type: 'sub', active: false, children: [
				{ path: 'javascript:void(0);', title: 'Login Simple', type: 'extLink' },
				{ path: 'javascript:void(0);', title: 'Login BG Image', type: 'extLink' },
				{ path: 'javascript:void(0);', title: 'Login BG Video', type: 'extLink' },
				{ path: 'javascript:void(0);', title: 'Simple Register', type: 'extLink' },
				{ path: 'javascript:void(0);', title: 'Register BG Image', type: 'extLink' },
				{ path: 'javascript:void(0);', title: 'Register BG Video', type: 'extLink' }
			]
		},
		{
			title: 'Usefull Pages', type: 'sub', active: false, children: [
				{ path: 'javascript:void(0);', title: 'Search Pages', type: 'extLink' },
				{ path: 'javascript:void(0);', title: 'Unlock User', type: 'extLink' },
				{ path: 'javascript:void(0);', title: 'Forgot Password', type: 'extLink' },
				{ path: 'javascript:void(0);', title: 'Reset Password', type: 'extLink' },
				{ path: 'javascript:void(0);', title: 'Maintenance', type: 'extLink' }
			]
		},
		{
			title: 'Email templates', type: 'sub', active: false, children: [
				{ path: 'http://admin.pixelstrap.com/cuba/theme/basic-template.html', title: 'Basic Email', type: 'extTabLink' },
				{ path: 'http://admin.pixelstrap.com/cuba/theme/email-header.html', title: 'Basic With Header', type: 'extTabLink' },
				{ path: 'http://admin.pixelstrap.com/cuba/theme/template-email.html', title: 'Ecomerce Template', type: 'extTabLink' },
				{ path: 'http://admin.pixelstrap.com/cuba/theme/template-email-2.html', title: 'Email Template 2', type: 'extTabLink' },
				{ path: 'http://admin.pixelstrap.com/cuba/theme/ecommerce-templates.html', title: 'Ecommerce Email', type: 'extTabLink' },
				{ path: 'http://admin.pixelstrap.com/cuba/theme/email-order-success.html', title: 'Order Success', type: 'extTabLink' }
			]
		},
		{
			title: 'Coming Soon', type: 'sub', active: false, children: [
				{ path: 'javascript:void(0);', title: 'Coming Simple', type: 'extLink' },
				{ path: 'javascript:void(0);', title: 'Coming BG Image', type: 'extLink' },
				{ path: 'javascript:void(0);', title: 'Coming BG Video', type: 'extLink' }
			]
		},
	];

	LEVELMENUITEMS: Menu[] = [
		{
			path: 'javascript:void(0);', title: 'File Manager', icon: 'git-pull-request', type: 'extLink'
		},
		{
			title: 'Users', icon: 'users', type: 'sub', active: false, children: [
				{ path: 'javascript:void(0);', title: 'All Users', icon: 'users', type: 'extLink' },
				{ path: 'javascript:void(0);', title: 'User Profile', icon: 'users', type: 'extLink' },
				{ path: 'javascript:void(0);', title: 'Edit Profile', icon: 'users', type: 'extLink' },
			]
		},
		{ path: 'javascript:void(0);', title: 'Bookmarks', icon: 'heart', type: 'extLink' },
		{ path: 'javascript:void(0);', title: 'Calender', icon: 'calendar', type: 'extLink' },
		{ path: 'javascript:void(0);', title: 'Social App', icon: 'zap', type: 'extLink' }
	];

	// Array
	items = new BehaviorSubject<Menu[]>(this.Role == Roles.Agent?this.MENUITEMS:this.MENUITEMS_Admin);
	megaItems = new BehaviorSubject<Menu[]>(this.MEGAMENUITEMS);
	levelmenuitems = new BehaviorSubject<Menu[]>(this.LEVELMENUITEMS);

}
