// Couleur d'accent par pilier, partagée entre les cartes (Home) et la page Services : c'est ce
// qui permet de reconnaître un service à sa couleur avant même d'avoir lu le titre. Les 5 teintes
// reprennent la palette catégorielle de s-school (--chart-1 à --chart-5, voir index.css) --
// cohérent avec l'identité s-school, et surtout vraiment distinct d'un pilier à l'autre (avant,
// 3 des 5 piliers partageaient la même teinte "lagune").
export const ACCENTS = {
  transformation: {
    fond: "bg-transformation/10",
    trait: "text-transformation-dark",
    // Le badge est sombre en thème clair mais s'éclaircit en thème sombre (voir index.css) :
    // text-transformation-on suit l'inverse (clair puis sombre) pour rester lisible.
    badge: "bg-transformation text-transformation-on",
    survol: "group-hover:bg-transformation group-hover:text-transformation-on",
    rotation: "-rotate-2 group-hover:rotate-0",
    puce: "bg-transformation/10 text-transformation-dark ring-1 ring-inset ring-transformation/25 hover:bg-transformation hover:text-transformation-on hover:ring-transformation",
  },
  creation: {
    fond: "bg-creation/10",
    trait: "text-creation-dark",
    badge: "bg-creation text-panel",
    survol: "group-hover:bg-creation group-hover:text-panel",
    rotation: "rotate-2 group-hover:rotate-0",
    puce: "bg-creation/12 text-creation-dark ring-1 ring-inset ring-creation/30 hover:bg-creation hover:text-panel hover:ring-creation",
  },
  saas: {
    fond: "bg-saas/10",
    trait: "text-saas-dark",
    // Même bascule que "transformation" : sombre en clair, clair en sombre.
    badge: "bg-saas text-saas-on",
    survol: "group-hover:bg-saas group-hover:text-saas-on",
    rotation: "rotate-3 group-hover:rotate-0",
    puce: "bg-saas/10 text-saas-dark ring-1 ring-inset ring-saas/25 hover:bg-saas hover:text-saas-on hover:ring-saas",
  },
  materiel: {
    fond: "bg-materiel/10",
    trait: "text-materiel-dark",
    badge: "bg-materiel text-panel",
    survol: "group-hover:bg-materiel group-hover:text-panel",
    rotation: "rotate-1 group-hover:rotate-0",
    puce: "bg-materiel/12 text-materiel-dark ring-1 ring-inset ring-materiel/30 hover:bg-materiel hover:text-panel hover:ring-materiel",
  },
  formation: {
    fond: "bg-formation/10",
    trait: "text-formation-dark",
    badge: "bg-formation text-panel",
    survol: "group-hover:bg-formation group-hover:text-panel",
    rotation: "-rotate-1 group-hover:rotate-0",
    puce: "bg-formation/12 text-formation-dark ring-1 ring-inset ring-formation/30 hover:bg-formation hover:text-panel hover:ring-formation",
  },
};

export const ACCENT_DEFAUT = ACCENTS.transformation;
