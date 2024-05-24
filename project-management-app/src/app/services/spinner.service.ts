import { ComponentPortal } from '@angular/cdk/portal';
import { Overlay, OverlayConfig, OverlayRef } from '@angular/cdk/overlay';
import { Injectable } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular';
import { SpinnerComponent } from '../components/spinner/spinner.component';

@Injectable({
  providedIn: 'root'
})
export class SpinnerService {

  private overlayRef: OverlayRef | null = null;

  constructor(
    private overlay: Overlay,
    private alertController: AlertController,
    private toastController: ToastController
    ) {}

  show() {
    if (!this.overlayRef) {
      const overlayConfig: OverlayConfig = {
        hasBackdrop: true,
        backdropClass: 'custom-backdrop',
        positionStrategy: this.overlay.position().global().centerHorizontally().centerVertically(),
        scrollStrategy: this.overlay.scrollStrategies.block()
      };

      this.overlayRef = this.overlay.create(overlayConfig);
      const loadingPortal = new ComponentPortal(SpinnerComponent);
      this.overlayRef.attach(loadingPortal);
    }
  }

  hide() {
    if (this.overlayRef) {
      this.overlayRef.detach();
      this.overlayRef = null;
    }
  }

  async presentAlert(title: string, message: string) {
    const alert = await this.alertController.create({
      header: title,
      message: message,
      buttons: ['OK']
    });
    await alert.present();
  }

  async presentToast(position: 'top' | 'middle' | 'bottom', message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 1500,
      position: position,
    });
    await toast.present();
  }

}
