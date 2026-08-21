// Charge le SDK KadevPay une seule fois, quel que soit le nombre de composants qui l'utilisent —
// un agrégateur en mode "redirect" (Money Fusion, simulation) ne charge jamais ce script, seul
// le mode "widget" renvoyé par POST .../initier (voir projects-admin/back/src/lib/paiement/
// kadevpay.js) en a besoin.
const SDK_URL = "https://pay.kadev.ci/js/v1/kadev-pay.js";

let chargement = null;

function chargerKadevPay() {
  if (window.KadevPay) return Promise.resolve(window.KadevPay);
  if (chargement) return chargement;

  chargement = new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = SDK_URL;
    script.async = true;
    script.onload = () =>
      window.KadevPay
        ? resolve(window.KadevPay)
        : reject(new Error("KadevPay indisponible après chargement du script."));
    script.onerror = () => {
      chargement = null;
      reject(new Error("Impossible de charger le module de paiement électronique."));
    };
    document.head.appendChild(script);
  });

  return chargement;
}

// `widget` vient tel quel de la réponse de la console (`widget.publicKey`, `.amount`, `.email`,
// `.method`, `.name`, `.phone`, `.metadata`) — ce fichier ne fait que traduire ses clés vers le
// vocabulaire attendu par KadevPay.checkout(), propre au SDK.
export async function ouvrirWidgetKadevPay(widget, { onSuccess, onClose }) {
  const KadevPay = await chargerKadevPay();
  KadevPay.checkout({
    public_key: widget.publicKey,
    amount: widget.amount,
    email: widget.email,
    method: widget.method,
    name: widget.name,
    phone: widget.phone,
    metadata: widget.metadata,
    onSuccess,
    onClose,
  });
}
