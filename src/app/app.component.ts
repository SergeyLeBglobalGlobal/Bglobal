import { Component } from "@angular/core";
import * as $ from "jquery";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent {

  title = "app";

  public ngOnInit() {
    //$(document).ready(function () {
    //  // console.log( 'test'
    //  //this.httpService.GetCountries();
    //});
  }

}
