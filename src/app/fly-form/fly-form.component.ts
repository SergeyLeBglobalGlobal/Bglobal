import { Component, OnInit, Input,  Injectable } from '@angular/core';

import { NgForm, FormControl } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatButtonModule } from '@angular/material/button';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Observable } from 'rxjs';

import { PromotionComponent } from '../promotion/promotion.component';
import { OffersComponent } from '../offers/offers.component';
import { toggleHeight } from '../animation';
import { Сountries } from './countries';


import {map, startWith} from 'rxjs/operators';


@Component({
	selector: 'app-fly-form',
	templateUrl: './fly-form.component.html',
	animations: [
		toggleHeight
	],
	styleUrls: ['./fly-form.component.scss']
})

@Injectable()

export class FlyFormComponent implements OnInit {

	constructor( private http: HttpClient ) {}

	getCountriesUrl = 'https://getsimcard.com/api/api/Account/GetCountries';

	getConfig(): Observable<Сountries[]> {
	    return this.http.get<Сountries[]>(this.getCountriesUrl);
	}

	public countries = [];
 	optionss = [
	    'One',
	    'Two',
	    'Three'
	];
	ngOnInit() {
		this.getConfig().
		subscribe(data => this.countries = data );
	}

	// get arrey Names
	getNamesCountryArray() {
		return this.countries.map((country) => country.Name);
	}


	// min date validation
	minDate = new Date(); //today
	daydiff(first, second) {
	    return Math.round((second-first)/(1000*60*60*24));
	}

	// geyObject
	getObjectValue(formObject:object, valueObject:string){
		return formObject[valueObject];
	}

	// add new date inputs
	DateId = [
		{ nameSalect: "country", nameDate1: "dateLanding", nameDate2: "dateAppearance"},
	];

	index = -1;
	addDateInputs(newInputs) {
		if( this.index < 1 ){
			newInputs = [
				{ nameSalect: "country2", nameDate1: "dateLanding2", nameDate2: "dateAppearance2"},
				{ nameSalect: "country3", nameDate1: "dateLanding3", nameDate2: "dateAppearance3"},
			];
			this.index = this.index + 1;
		    if ( newInputs ) {
		  		this.DateId.push( newInputs[this.index] );
			}
		}
	}

	// scroll animate
	scrollAnimate(element) {
		element.scrollIntoView({ behavior: "smooth", block: "start" });
	}


	// animate show and hide
	isShow = 'hide';
	isHide = 'show';
	onSubmit(flyForm: NgForm) {
		this.isShow = 'show';
		this.isHide = 'hide';
	}

	


}
