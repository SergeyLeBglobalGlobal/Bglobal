import { Component, OnInit } from '@angular/core';
import { CdkTableModule } from '@angular/cdk/table';

@Component({
  selector: 'app-usage-log',
  templateUrl: './usage-log.component.html',
  styleUrls: ['./usage-log.component.scss']
})
export class UsageLogComponent implements OnInit {

	usageLog = [
		{
			'mb':       '200MB',
			'country':  'אנגליה	 ',
			'date':     '12.04.2018',
		},
		{
			'mb':       '200MB',
			'country':  'אנגליה	 ',
			'date':     '12.04.2018',
		},
		{
			'mb':       '200MB',
			'country':  'אנגליה	 ',
			'date':     '12.04.2018',
		},
		{
			'mb':       '200MB',
			'country':  'אנגליה	 ',
			'date':     '12.04.2018',
		},
		{
			'mb':       '200MB',
			'country':  'אנגליה	 ',
			'date':     '12.04.2018',
		}
	]

	constructor() { }

	ngOnInit() {
	}

}
