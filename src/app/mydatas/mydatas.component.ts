import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import io from "socket.io-client";

@Component({
  selector: 'app-mydatas',
  templateUrl: './mydatas.component.html',
  styleUrls: ['./mydatas.component.css']
})
export class MydatasComponent implements OnInit {

  jsonFile1 = 'dealer_log_2.json';
  jsonFile2 = 'dealer_ranking_2.json';
  jsonData:any[] = [];
  displayedColumns:string[] = [];

  private url = 'http://localhost:3002';
  private socket;
  constructor() { }

  ngOnInit() {
    this.socket = io.connect(this.url);
    this.socket.on('jsonData', (data) => {
      this.jsonData = data;
      Object.keys(this.jsonData[0]).map((key) => {
        this.displayedColumns.push(key);
      })
    });
  }

  /**
   * click the item of dropdown menu, send file name to server by socket
   * @param <string>fileName 
   */
  showTable(fileName) {
    this.socket.emit('openFile', {file: fileName});
  }

}
