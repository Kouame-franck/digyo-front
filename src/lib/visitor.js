const VISITOR_ID_KEY = "digyo-visitor-id";

// Identifiant anonyme stable par navigateur, utilisé uniquement pour savoir si CE visiteur a
// déjà aimé un article (voir back/src/routes/publicPortal.js > BlogLike.visitorId côté
// console) -- pas un compte, pas une preuve d'identité, juste ce qu'il faut pour permettre de
// "dé-liker" et éviter qu'un rechargement de page compte deux fois le même like.
export function getVisitorId() {
  try {
    let id = localStorage.getItem(VISITOR_ID_KEY);
    if (!id) {
      id = crypto.randomUUID();
      localStorage.setItem(VISITOR_ID_KEY, id);
    }
    return id;
  } catch {
    // stockage indisponible (mode privé) -- un id ré-généré à chaque visite, le like ne
    // "collera" pas d'une session à l'autre mais reste fonctionnel pour la session en cours.
    return crypto.randomUUID();
  }
}
