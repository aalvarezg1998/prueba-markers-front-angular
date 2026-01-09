import { Component } from '@angular/core';
import { LoadingService } from '../domain/loading.service';

@Component({
  selector: 'app-spinner',
  template: `
    <div class="loading-overlay" *ngIf="loadingService.loadingSub | async">
      <div class="spinner-container">
        <div class="modern-spinner">
          <i class='bx bx-loader-alt bx-spin'></i>
        </div>
        <p class="loading-text">Cargando...</p>
      </div>
    </div>
  `,
  styles: [`
    .loading-overlay {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(17, 24, 39, 0.7);
      backdrop-filter: blur(4px);
      z-index: 9999;
      display: flex;
      justify-content: center;
      align-items: center;
      animation: fadeIn 0.2s ease-out;
    }

    .spinner-container {
      text-align: center;
    }

    .modern-spinner {
      font-size: 4rem;
      color: white;
      margin-bottom: 1rem;
      filter: drop-shadow(0 0 20px rgba(255, 255, 255, 0.5));
    }

    .loading-text {
      color: white;
      font-weight: 500;
      font-size: 1rem;
      margin: 0;
    }

    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }
  `]
})
export class SpinnerComponent {
  constructor(public loadingService: LoadingService) {}
}
