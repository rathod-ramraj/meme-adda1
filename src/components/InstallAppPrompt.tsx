import { useEffect, useState } from "react";

type BeforeInstallPromptEvent = Event & {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
};

const DISMISS_KEY = "memeadda-pwa-dismiss";

function isIos(): boolean {
  return /iphone|ipad|ipod/i.test(navigator.userAgent);
}

function isStandalone(): boolean {
  return (
    window.matchMedia("(display-mode: standalone)").matches ||
    ("standalone" in navigator && (navigator as Navigator & { standalone?: boolean }).standalone === true)
  );
}

export default function InstallAppPrompt() {
  const [deferred, setDeferred] = useState<BeforeInstallPromptEvent | null>(null);
  const [visible, setVisible] = useState(false);
  const [iosHint, setIosHint] = useState(false);

  useEffect(() => {
    if (isStandalone() || sessionStorage.getItem(DISMISS_KEY)) return;

    const onInstall = (e: Event) => {
      e.preventDefault();
      setDeferred(e as BeforeInstallPromptEvent);
      setVisible(true);
    };

    window.addEventListener("beforeinstallprompt", onInstall);

    if (isIos() && !isStandalone()) {
      const t = window.setTimeout(() => setVisible(true), 2000);
      return () => {
        window.clearTimeout(t);
        window.removeEventListener("beforeinstallprompt", onInstall);
      };
    }

    return () => window.removeEventListener("beforeinstallprompt", onInstall);
  }, []);

  const dismiss = () => {
    sessionStorage.setItem(DISMISS_KEY, "1");
    setVisible(false);
    setDeferred(null);
  };

  const install = async () => {
    if (isIos()) {
      setIosHint(true);
      return;
    }
    if (!deferred) return;
    await deferred.prompt();
    await deferred.userChoice;
    dismiss();
  };

  if (!visible || isStandalone()) return null;

  return (
    <div
      className="fixed bottom-4 left-4 right-4 z-[60] mx-auto max-w-md rounded-2xl border border-border bg-white p-4 shadow-[0_12px_40px_rgba(0,0,0,0.15)] sm:left-auto sm:right-6"
      role="dialog"
      aria-labelledby="install-app-title"
    >
      <div className="flex items-start gap-3">
        <img src="/logo.png" alt="" width={48} height={48} className="h-12 w-12 shrink-0 rounded-xl object-contain" />
        <div className="min-w-0 flex-1">
          <p id="install-app-title" className="font-heading text-base font-semibold text-black">
            Install Meme Adda 098
          </p>
          <p className="mt-1 text-sm text-muted">
            {iosHint
              ? "Tap Share, then Add to Home Screen to install the app."
              : "Add to your home screen for quick access to viral memes."}
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => void install()}
              className="rounded-full bg-black px-4 py-2 text-sm font-medium text-white hover:opacity-90"
            >
              Install app
            </button>
            <button
              type="button"
              onClick={dismiss}
              className="rounded-full border border-border px-4 py-2 text-sm font-medium text-black hover:bg-gray-50"
            >
              Not now
            </button>
          </div>
        </div>
        <button
          type="button"
          onClick={dismiss}
          className="shrink-0 text-lg leading-none text-muted hover:text-black"
          aria-label="Close"
        >
          ×
        </button>
      </div>
    </div>
  );
}
