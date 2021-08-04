import { Injectable } from '@angular/core';
import { Tooltip } from "bootstrap";

@Injectable({
  providedIn: 'root'
})
export class BootstrapService {

  constructor() { }

  static initTooltip() {
    setTimeout(() => {
      const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
      const tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new Tooltip(tooltipTriggerEl)
      });
    });
  }
}
