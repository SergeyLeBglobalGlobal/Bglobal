import { Component, OnInit, Input, Inject, Injectable, ViewChild, ElementRef } from '@angular/core';
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

import { map, startWith } from 'rxjs/operators';

import { DateAdapter } from '@angular/material/core';

@Component({
	selector: 'app-fly-form',
	templateUrl: './fly-form.component.html',
	animations: [
		toggleHeight
	],
	styleUrls: ['./fly-form.component.scss'],
})

@Injectable()
export class FlyFormComponent implements OnInit {

	constructor( private http: HttpClient,
	 private adapter: DateAdapter<any>,
	 private picker: MatDatepickerModule) {}

	getCountriesUrl = 'https://getsimcard.com/api/api/Account/GetCountries';

	getConfig(): Observable<Сountries[]> {
	    return this.http.get<Сountries[]>(this.getCountriesUrl);
	}


	// add new date inputs
	CountryIdName = [
		{ nameSalect: "country"},
	];
	newInputs = [
		{ nameSalect: "country2"},
		{ nameSalect: "country3"},
	];
	index = -1;
	addCountryNameInputs() {
		if( this.index < 1 ){
			this.index = this.index + 1;
		    if ( this.newInputs ) {
		  		this.CountryIdName.push( this.newInputs[this.index] );
			}
		}
	}

	// remove last county list
	removeLastList() {
		if( this.index >= 0 ){
			this.CountryIdName.shift();
			this.index = this.index - 1;
		}
		
	}

	flyFormStor:any;
	public countries = [];
	ngOnInit() {
		this.adapter.setLocale('fr'); //date format
		
		// get countries
		this.getConfig().
		subscribe(data => this.countries = data );
		
		// parse storage data (form)
		this.flyFormStor = JSON.parse( localStorage.getItem( 'flyFormValue' ) );
		
		// if form is empty
		if ( this.flyFormStor == null ) {
			this.flyFormStor = "";
		}
		// save country2 and country3 data
		let flyFormStorObject = new Object();
		flyFormStorObject = this.flyFormStor;
		for (let key in flyFormStorObject ) {
			if( key == "country2" ){
				this.index = this.index + 1;
				this.CountryIdName.push( this.newInputs[this.index] );
			}
			if( key == "country3" ){
				this.index = this.index + 1;
				this.CountryIdName.push( this.newInputs[this.index] );
			}
		}
	}


	// animate show and hide
	isShow = 'hide';
	isHide = 'show';
	onSubmit(flyForm: NgForm) {
		localStorage.setItem( 'flyFormValue', JSON.stringify(flyForm.value) );
		this.isShow = 'show';
		this.isHide = 'hide';
	}

	// get arrey Names
	getNamesCountryArray() {
		return this.countries.map((country) => country.Name);
	}

	// get Id County by name
	getIdCountryByName(countryName: string) {
		let CurrentArray = this.countries.filter( countries => countries.Name === countryName );
		return CurrentArray[0]['Id'];
	}
	// get name County by ID
	getNameCountryById(Id: any) {
		let CurrentArray = this.countries.filter( countries => countries.Id == Id );
		return CurrentArray[0]['Name'];
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

	// scroll animate
	scrollAnimate(element) {
		element.scrollIntoView({ behavior: "smooth", block: "start" });
	}

}
