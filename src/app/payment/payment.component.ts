import { Component, OnInit, Input } from '@angular/core';

import { NgForm } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Router } from '@angular/router';

import { HttpService } from '../services/http.service';
import { BuyPackageData, CreditCardDetails, CreditCardDetailsResponse } from "../entity/Payment";
import { DeliveryRequest } from "../entity/Delivery";
 
import { DialogMessageData } from "../entity/Dialog";
import { HeaderComponent } from "../header/header.component";
import { TotalComponent } from "../total/total.component";

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})

export class PaymentComponent implements OnInit {
	tooltipCVVcontent = "CVV is an anti-fraud security feature to help verify that you are in possession of your credit card. On most credit cards (including Visa and Mastercard), the three-digit CVV number is printed on the signature panel on the back of the card immediately after the card's account number. On American Express credit cards, the four-digit CVV number is printed on the front of the card above the card’s account number.";

	constructor(
		private router: Router,
		private httpService: HttpService,
		private headerComponent: HeaderComponent,
		private totalComponent: TotalComponent,
	){}

	@Input() totalPrice:number;
	@Input() couponeCode:string;

	// Payment Data
    buyPackageData:BuyPackageData = new BuyPackageData();
    creditCardDetails:CreditCardDetails = new CreditCardDetails();
    creditCardDetailsResponse;
	@Input() deliveryRequest:DeliveryRequest; // DeliveryRequest
	// get localStorage
    getSlidePackgeData = JSON.parse(localStorage.getItem('packageData'));
    getflyFormValue = JSON.parse(localStorage.getItem('flyFormValue'));

    // Submit payment
	dialogMessageData:DialogMessageData = new DialogMessageData();

	onSubmit(PaymentForm: NgForm) {
		// message Dialog
		this.dialogMessageData.title = '';
		this.dialogMessageData.message = 'message';

		// CreditCardDetails
		this.creditCardDetails.ExpiredMonth = PaymentForm.value.month;
		this.creditCardDetails.ExpiredYear = PaymentForm.value.year;
		this.creditCardDetails.Holder = 'UserName';
		this.creditCardDetails.Number = PaymentForm.value.numberCard;
		this.creditCardDetails.CVV = PaymentForm.value.cvv;

		// BuyPackageData
		this.buyPackageData.PackageId = this.getSlidePackgeData.Id; //PackageId
		this.buyPackageData.SimCardRequired = PaymentForm.value.checked; //SimCardRequired
		this.buyPackageData.FlyDate = this.getflyFormValue.dateLanding; //FlyDate
		this.buyPackageData.ReturnDate = this.getflyFormValue.dateAppearance; //ReturnDate
		this.buyPackageData.CreditCard = this.creditCardDetails; //CreditCard 'object'
		this.buyPackageData.Coupone = this.couponeCode; //Coupone
		this.buyPackageData.Delivery = this.deliveryRequest; //Delivery 'object'
		// this.buyPackageData.Currency = 'Currency'; //Currency
		// console.log( this.buyPackageData );
		// console.log( this.couponeCode );

		this.httpService.postDataBuyPackage(this.buyPackageData).subscribe(
	        data => {
	        	this.creditCardDetailsResponse = data;
	        	this.dialogMessageData.title = 'החיוב עבר בהצלחה  ';
	        	this.dialogMessageData.message = this.creditCardDetailsResponse.InvoceId + 'אמספר אישור ';
				this.headerComponent.openDialogMessage(this.dialogMessageData);
	        },
	        error => {
	            console.log(error);
	            this.dialogMessageData.title = 'החיוב לא עבר. ';
				this.dialogMessageData.message = error.error.Message +
				'\n אנא בדוק את פרטי האשראי או צור קשר עם מוקד התמיכה בטלפון 03-3723030';
				this.headerComponent.openDialogMessage(this.dialogMessageData);
	        },
	    );
		// this.router.navigate( ['thank-you'] );
	}

	number_keyPress(event: any) {
	    const pattern = /[0-9]/;
	    let inputChar = String.fromCharCode(event.charCode);
	    if (!pattern.test(inputChar)) {
	      // invalid character, prevent input
	      event.preventDefault();
	    }
	}

	// month and year card
	months = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
	currentYear = (new Date()).getFullYear();
	year = [];
	ngOnInit() {
		for (var i = 0; i <= 10; i++) {
			this.year[i] = this.currentYear++;
		}
	}

	showTotal(){
		this.totalComponent.isShowCurrent = 'show';
		this.totalComponent.isShow = 'hide'
	}
}
