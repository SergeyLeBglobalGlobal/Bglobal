import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.scss']
})

export class BannerComponent implements OnInit {

	constructor( public route: ActivatedRoute, private router: Router ) {}

	routeData = [
		{
		  route: "distributors",
		  bannerText: `סים אחד 
		  לכל החיים  `,
		  headlineTitle: 'בחירת כרטיס סים  ',
		  urlImage: './assets/img/page-banner.jpg'
		},
		{
		  route: "user/sim",
		  bannerText: `סים אחד 
		  לכל החיים  `,
		  headlineTitle: 'כרטיסי סים שלי  ',
		  urlImage: './assets/img/page-banner.jpg'
		},
		{
		  route: "sim-order/package-USA",
		  bannerText: 'ססים, גלישה  ושיחות בארה״ב  ',
		  headlineTitle: 'פרטי החבילה שבחרת  ',
		  urlImage: './assets/img/package-USA.jpg'
		},
		{
		  route: "sim-order/:package",
		  bannerText: `סים אחד 
		  לכל החיים  `,
		  headlineTitle: 'פרטי החבילה שבחרת  ',
		  urlImage: './assets/img/page-banner.jpg'
		},
		{
		  route: "about-us",
		  bannerText: `סים אחד 
		  לכל החיים  `,
		  headlineTitle: 'עמוד תוכן  ',
		  urlImage: './assets/img/page-banner.jpg'
		},
		{
		  route: "faq",
		  bannerText: `סים אחד 
		  לכל החיים  `,
		  headlineTitle: 'שאלות ותשובות  ',
		  urlImage: './assets/img/page-banner.jpg'
		},
		{
		  route: "contact-us",
		  bannerText: `דברו איתנו
		  מכל מקום בעולם  `,
		  headlineTitle: 'שצור קשר   ',
		  urlImage: './assets/img/contact-us.jpg'
		},
		{
		  route: "thank-you",
		  bannerText: `תודה על רכישתך  `,
		  color: 'white',
		  headlineTitle: '  BGLOBAL  ברוכים הבאים למשפחת   ',
		  urlImage: './assets/img/thank-you.jpg',
		  rightImgae: 'right-image',
		},
		{
		  route: "available-countries",
		  bannerText: `סים אחד 
		  לכל החיים  `,
		  headlineTitle: 'בחירת כרטיס סים  ',
		  urlImage: './assets/img/page-banner.jpg'
		},
		{
		  route: "user/info",
		  bannerText: `סים אחד 
		  לכל החיים  `,
		  headlineTitle: ' פרטים אישיים  ',
		  urlImage: './assets/img/page-banner.jpg'
		},
		{
		  route: "user",
		  bannerText: `סים אחד 
		  לכל החיים  `,
		  headlineTitle: 'ניצול חבילת גלישה  ',
		  urlImage: './assets/img/page-banner.jpg'
		},
	]

	// get current route path (sim-order/:package)
	routeCurrent = this.route.pathFromRoot[1].snapshot.routeConfig.path;
	// get current route path (sim-order/package-USA)
	routeCurrentParams = this.router.routerState.snapshot.url.substr(1);

	getCurrentData(){
		for (var i = this.routeData.length - 1; i >= 0; i--) {
			if(this.routeData[i].route == this.routeCurrentParams ){
				return this.routeData[i];
			}
		}
		for (var i = this.routeData.length - 1; i >= 0; i--) {
			if(this.routeData[i].route == this.routeCurrent ){
				return this.routeData[i];
			}
		}
	}

	ngOnInit() {
	}

}
