export const site = {
  name: "Alameda Juruá Residencial",
  url: "https://alamedajurua.com.br",
  whatsapp: "5527992732873",
  phoneDisplay: "(27) 99273-2873",
  waMessage: "Olá! Vi a página do Alameda Juruá e quero saber mais sobre as casas.",
  leadEndpoint: process.env.NEXT_PUBLIC_LEAD_ENDPOINT ?? "",
  plantasPdf: "/alameda-jurua-plantas.pdf",
  instagram: "perinlimaconstrucao",
  address: "Rua das Perdizes, Lote 22, Quadra 11, Morada de Laranjeiras, Serra/ES",
  mapsQuery: "Rua das Perdizes, Morada de Laranjeiras, Serra - ES",
  office:
    "Work Center, 300, R. José Alexandre Buaiz, Enseada do Suá, Vitória/ES, CEP 29050-545",
};

export const waLink = (msg: string = site.waMessage) =>
  `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(msg)}`;

export const mapsLink = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(site.mapsQuery)}`;
export const wazeLink = `https://waze.com/ul?q=${encodeURIComponent(site.mapsQuery)}&navigate=yes`;

export const highlights = [
  { icon: "levels", label: "3 casas triplex" },
  { icon: "bed", label: "3 suítes" },
  { icon: "grill", label: "Rooftop privativo com churrasqueira e preparação SPA" },
  { icon: "area", label: "Até 210 m²" },
] as const;

export const reels = [
  {
    img: "fachada",
    title: "Fachada",
    text: "Três casas independentes, com garagem e área verde permeável.",
  },
  {
    img: "estar",
    title: "Estar e jantar",
    text: "Social integrado no térreo, com varanda e acesso à área descoberta e lavabo.",
  },
  {
    img: "cozinha",
    title: "Cozinha americana",
    text: "Americana, aberta para o estar, com bancada em granito.",
  },
  {
    img: "suite-master",
    title: "Suíte master",
    text: "3 suítes no 2º pavimento, incluindo suíte master.",
  },
  {
    img: "suite-02",
    title: "Suíte 02",
    text: "Conforto e privacidade para toda a família no 2º pavimento.",
  },
  {
    img: "rooftop",
    title: "Rooftop",
    text: "Espaço gourmet, churrasqueira, solarium e preparação para pergolado, deck e spa*.",
  },
] as const;

export const diferenciais = [
  { icon: "layers", text: "Piso porcelanato Portobello em todos os ambientes" },
  { icon: "sink", text: "Cozinha com bancada em granito, cuba e metais de alta qualidade" },
  { icon: "vanity", text: "Banheiros com bancadas em granito, louças e metais de qualidade superior" },
  { icon: "grill", text: "Espaço gourmet com bancada em granito e churrasqueira instalada" },
  { icon: "spa", text: "Preparação para SPA com deck protegido e aquecido*" },
  { icon: "ev", text: "Vaga de garagem com preparação para abastecimento elétrico" },
  { icon: "ac", text: "Preparação para ar-condicionado split em todas as suítes e salas" },
  { icon: "lock", text: "Fechadura eletrônica na porta de entrada da sala" },
  { icon: "window", text: "Esquadrias em alumínio anodizado na cor preta" },
  { icon: "glass", text: "Guarda-corpo do rooftop em alumínio com vidro temperado" },
  { icon: "drop", text: "Torneiras com arejador e bacias com duplo acionamento" },
] as const;

export const floors = [
  {
    id: "terreo",
    label: "Térreo",
    intro:
      "Acesso principal, varanda, estar, jantar, cozinha americana, lavabo, roupeiro, área de serviço, área descoberta permeável e garagem.",
    legend: [
      "Acesso principal",
      "Varanda",
      "Estar",
      "Jantar",
      "Cozinha americana",
      "Roupeiro",
      "Lavabo",
      "Escada",
      "Área de serviço",
      "Área descoberta permeável",
      "Garagem",
    ],
  },
  {
    id: "superior",
    label: "2º pavimento",
    intro: "Suíte master, suíte 02 e suíte 03, conectadas por circulação.",
    legend: ["Circulação", "Suíte master", "Suíte 02", "Suíte 03"],
  },
  {
    id: "rooftop",
    label: "Rooftop",
    intro:
      "Espaço gourmet, churrasqueira, lavabo, solarium e área preparada para pergolado, deck e spa*.",
    legend: [
      "Circulação",
      "Lavabo",
      "Espaço gourmet",
      "Churrasqueira",
      "Solarium",
      "Pergolado*",
      "Deck*",
      "SPA*",
    ],
  },
] as const;

export type FloorId = (typeof floors)[number]["id"];

export const casas = [
  {
    n: 1,
    total: "205,46",
    areas: { terreo: "75,89", superior: "63,17", rooftop: "19,19 + 47,21" },
    permeavel: "82,74",
  },
  {
    n: 2,
    total: "210,09",
    areas: { terreo: "77,36", superior: "64,64", rooftop: "19,19 + 48,90" },
    permeavel: "39,05",
  },
  {
    n: 3,
    total: "210,77",
    areas: { terreo: "77,48", superior: "64,92", rooftop: "19,35 + 49,02" },
    permeavel: "68,72",
  },
] as const;

export const destinos = [
  { nome: "Shopping Montserrat", min: 5, tipo: "shop" },
  { nome: "Supermercados Extrabom, BH e Carone", min: 8, tipo: "cart" },
  { nome: "Parque da Cidade", min: 10, tipo: "tree" },
  { nome: "Avenida Norte Sul", min: 10, tipo: "road" },
  { nome: "Praia de Manguinhos", min: 10, tipo: "wave" },
  { nome: "Shopping Mestre Álvaro", min: 12, tipo: "shop" },
  { nome: "Praia de Bicanga", min: 13, tipo: "wave" },
  { nome: "Praia de Jacaraípe", min: 15, tipo: "wave" },
  { nome: "Aeroporto de Vitória", min: 15, tipo: "plane" },
] as const;
