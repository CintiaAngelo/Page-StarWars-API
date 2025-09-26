// src/app/shared/modal.component.ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-modal',
  standalone: true,
  template: `
    <div class="modal-backdrop" style="position:fixed; inset:0; background:rgba(0,0,0,.6); display:flex; align-items:center; justify-content:center; z-index:50">
      <div style="background:#fff; color:#000; border-radius:8px; padding:20px; max-width:900px; width:100%; max-height:80vh; overflow:auto">
        <ng-content></ng-content>
      </div>
    </div>
  `
})
export class ModalComponent {}
