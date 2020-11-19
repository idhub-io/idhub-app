import { AlertController } from '@ionic/angular';
import { SwUpdate } from '@angular/service-worker';
import { Injectable } from '@angular/core';
import debug from 'debug';

const log = debug('PWAService');

export const PWATrackCategory = 'PWA';

interface BeforeInstallPromptEvent extends Event {
  readonly platforms: Array<string>;

  readonly userChoice: Promise<{
    outcome: 'accepted' | 'dismissed';
    platform: string;
  }>;
  prompt(): Promise<void>;
}

@Injectable({ providedIn: 'root' })
export class PWAService {
  constructor(
    private updates: SwUpdate,
    private alertController: AlertController,
  ) {}

  init() {
    log('isEnabled', this.updates.isEnabled);
    if (!this.updates.isEnabled) return;

    this.checkForUpdate();
    this.trackInstallPrompt();
    this.trackAppInstalled();
    this.trackOpeningMode();
  }

  checkForUpdate() {
    log('checkForUpdate');
    this.updates.checkForUpdate();
    this.updates.available.subscribe(async (event) => {
      log('current version is', event.current);
      log('available version is', event.available);
      const alert = await this.alertController.create({
        header: 'New version',
        message: 'A new version is available!',
        backdropDismiss: false,
        buttons: [
          {
            text: 'Refresh',
            handler: () => {
              this.updates
                .activateUpdate()
                .then(() => document.location.reload());
            },
          },
        ],
      });

      await alert.present();
    });
    this.updates.activated.subscribe((event) => {
      log('old version was', event.previous);
      log('new version is', event.current);
    });
  }

  trackInstallPrompt() {
    if ('onappinstalled' in window) {
      window.addEventListener('appinstalled', (evt) => {
        log('onappinstalled', 'PWA install', 'installed');
      });
    }
  }

  trackAppInstalled() {
    if ('beforeinstallprompt' in window) {
      window.addEventListener(
        'beforeinstallprompt',
        (a: BeforeInstallPromptEvent) => {
          a.userChoice.then((a) => {
            log('beforeinstallprompt', 'PWA install', a.outcome);
          });
        },
      );
    }
  }

  trackOpeningMode() {
    window.addEventListener('DOMContentLoaded', () => {
      let displayMode = 'browser tab';
      if (navigator['standalone']) {
        displayMode = 'standalone-ios';
      }
      if (window.matchMedia('(display-mode: standalone)').matches) {
        displayMode = 'standalone';
      }
      // Log launch display mode to analytics
      log('launch', displayMode);
    });
  }
}
