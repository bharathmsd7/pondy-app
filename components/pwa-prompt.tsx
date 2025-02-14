'use client';

import { useEffect, useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export function PWAPrompt() {
  const [showPrompt, setShowPrompt] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);

  useEffect(() => {
    const shouldShowPrompt = () => {
      // Check if the app is already installed
      const isInstalled = window.matchMedia('(display-mode: standalone)').matches;
      if (isInstalled) return false;

      // Check if user has permanently dismissed the prompt
      const hasUserDismissed = localStorage.getItem('pwa-prompt-dismissed') === 'true';
      if (hasUserDismissed) return false;

      // Don't show if user has clicked "Not Now"
      const notNowClicked = localStorage.getItem('pwa-prompt-not-now');
      if (notNowClicked) return false;

      return true;
    };

    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      // Only show prompt if it meets our conditions
      if (shouldShowPrompt()) {
        setDeferredPrompt(e);
        setShowPrompt(true);
      }
    };

    // Check if we already have a deferred prompt and should show it
    if (deferredPrompt && shouldShowPrompt()) {
      setShowPrompt(true);
    }

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, [deferredPrompt]);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;

    // Show the browser install prompt
    deferredPrompt.prompt();
    
    // Wait for the user to respond to the prompt
    const { outcome } = await deferredPrompt.userChoice;
    
    // If user accepted, mark as permanently dismissed
    if (outcome === 'accepted') {
      localStorage.setItem('pwa-prompt-dismissed', 'true');
    }
    
    // Clear the deferredPrompt variable
    setDeferredPrompt(null);
    setShowPrompt(false);
  };

  const handleNotNow = () => {
    // Store timestamp of "Not Now" click
    localStorage.setItem('pwa-prompt-not-now', Date.now().toString());
    setShowPrompt(false);
  };

  return (
    <Dialog open={showPrompt} onOpenChange={setShowPrompt}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Install Visit Pondy App</DialogTitle>
          <DialogDescription>
            Install our app for a better experience! You can add it to your home screen for quick access.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button onClick={handleInstallClick}>
            Install
          </Button>
          <Button variant="outline" onClick={handleNotNow}>
            Not Now
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
