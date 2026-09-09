import type { Locale } from '../i18n/translations'

type Study = {
  name: string
  description: string
}

type CollectionPiece = {
  name: string
  detail: string
  action: string
}

export type ChromaticBlackCopy = {
  heroEyebrow: string
  heroLineOne: string
  heroLineTwo: string
  heroSupport: string
  heroPrimary: string
  heroSecondary: string
  heroAlt: string
  heroFooterOne: string
  heroFooterTwo: string
  codeLabel: string
  codeTitle: string
  codeParagraphOne: string
  codeParagraphTwo: string
  studiesLabel: string
  studiesTitle: string
  studiesIntro: string
  studies: Study[]
  detailLabel: string
  detailTitle: string
  detailCopy: string
  detailAlt: string
  detailCodes: string[]
  collectionLabel: string
  collectionTitle: string
  collectionIntro: string
  pieces: CollectionPiece[]
  collectionAlt: string[]
  campaignLabel: string
  campaignTitle: string
  campaignAlt: string
  campaignAction: string
}

const sharedPhrase = {
  heroLineOne: 'FROM A DISTANCE, BLACK.',
  heroLineTwo: 'UP CLOSE, VHOX.',
}

export const chromaticBlackCopy: Record<Locale, ChromaticBlackCopy> = {
  en: {
    ...sharedPhrase,
    heroEyebrow: 'DROP 001 / SIGNAL',
    heroSupport: "Premium streetwear. Near-black tones, oversized silhouettes. Movimiento Exclusivo.",
    heroPrimary: 'Explore SIGNAL',
    heroSecondary: 'Discover Chromatic Black',
    heroAlt: 'VHOX model wearing an oversized near-black streetwear silhouette inside brutalist architecture',
    heroFooterOne: 'Quiet presence / controlled detail',
    heroFooterTwo: "Release details pending",
    codeLabel: 'THE VHOX COLOR CODE',
    codeTitle: 'Black is only the first impression.',
    codeParagraphOne: "Chromatic Black is our visual direction: black from a distance, a dark undertone revealed by light, angle and movement.",
    codeParagraphTwo: "These campaign studies express the intention. Physical samples and final textile properties remain to be validated.",
    studiesLabel: 'CHROMATIC STUDIES / 001—003',
    studiesTitle: 'Darkness, developed in color.',
    studiesIntro: "Campaign color studies. Final product colors remain unconfirmed.",
    studies: [
      { name: 'BLACK CHERRY', description: 'A deep oxblood that reads black until it catches light.' },
      { name: 'BURNT EARTH', description: 'A smoked brown grounded in near-black pigment.' },
      { name: 'MIDNIGHT VIOLET', description: 'A restrained violet revealed through depth and movement.' },
    ],
    detailLabel: 'A QUIET SIGNATURE',
    detailTitle: 'Recognized by those who look closer.',
    detailCopy: 'A restrained bat mark, developed through tone and texture. The identity is present without competing with the person wearing it.',
    detailAlt: 'Macro view of dark VHOX fabric and violet tonal bat embroidery',
    detailCodes: ["Surface study","Oversized silhouette direction","Tonal identity study"],
    collectionLabel: "DROP 001 / SIGNAL",
    collectionTitle: 'Built to enter your rotation.',
    collectionIntro: "SIGNAL CORE TEE, NIGHT BLOOM TEE and CRYSTAL SIGNAL TEE are the planned pieces of DROP 001: SIGNAL. Campaign previews explore the direction; product imagery, specifications, price and release remain pending.",
    pieces: [
      { name: 'SIGNAL CORE TEE', detail: 'Release preview / final details pending', action: 'Explore piece' },
      { name: 'NIGHT BLOOM TEE', detail: 'Release preview / final details pending', action: 'Explore piece' },
      { name: 'CRYSTAL SIGNAL TEE', detail: 'Release preview / final details pending', action: 'Explore piece' },
    ],
    collectionAlt: [
      'Editorial VHOX t-shirt study; final association with SIGNAL CORE TEE remains pending',
      'Editorial VHOX t-shirt study; final association with NIGHT BLOOM TEE remains pending',
      'Editorial VHOX t-shirt study; final association with CRYSTAL SIGNAL TEE remains pending',
    ],
    campaignLabel: 'VHOX / CHROMATIC BLACK',
    campaignTitle: 'One shade is never the whole story.',
    campaignAlt: 'VHOX near-black streetwear family in a midnight-violet color study',
    campaignAction: "Release information",
  },
  es: {
    ...sharedPhrase,
    heroEyebrow: 'DROP 001 / SIGNAL',
    heroSupport: "Streetwear premium. Tonos casi negros, siluetas oversized. Movimiento Exclusivo.",
    heroPrimary: 'Explorar SIGNAL',
    heroSecondary: 'Descubrir Chromatic Black',
    heroAlt: 'Modelo VHOX con una silueta streetwear oversized casi negra dentro de arquitectura brutalista',
    heroFooterOne: 'Presencia silenciosa / detalle controlado',
    heroFooterTwo: "Detalles del lanzamiento pendientes",
    codeLabel: 'EL CÓDIGO DE COLOR VHOX',
    codeTitle: 'El negro es solo la primera impresión.',
    codeParagraphOne: "Chromatic Black es nuestra dirección visual: negro a distancia, un subtono oscuro revelado por la luz, el ángulo y el movimiento.",
    codeParagraphTwo: "Estos estudios de campaña expresan la intención. Las muestras físicas y propiedades textiles finales siguen por validar.",
    studiesLabel: 'ESTUDIOS CROMÁTICOS / 001—003',
    studiesTitle: 'Oscuridad, desarrollada en color.',
    studiesIntro: "Estudios de color de campaña. Los colores finales de producto siguen sin confirmar.",
    studies: [
      { name: 'BLACK CHERRY', description: 'Un tono sangre profundo que parece negro hasta recibir luz.' },
      { name: 'BURNT EARTH', description: 'Un marrón ahumado arraigado en pigmento casi negro.' },
      { name: 'MIDNIGHT VIOLET', description: 'Un violeta contenido revelado por profundidad y movimiento.' },
    ],
    detailLabel: 'UNA FIRMA SILENCIOSA',
    detailTitle: 'Reconocida por quienes miran de cerca.',
    detailCopy: 'Un murciélago discreto desarrollado mediante tono y textura. La identidad está presente sin competir con quien lleva la prenda.',
    detailAlt: 'Vista macro de tejido oscuro VHOX y bordado tonal violeta de murciélago',
    detailCodes: ["Estudio de superficie","Dirección de silueta oversized","Estudio de identidad tonal"],
    collectionLabel: "DROP 001 / SIGNAL",
    collectionTitle: 'Construido para entrar en tu rotación.',
    collectionIntro: "SIGNAL CORE TEE, NIGHT BLOOM TEE y CRYSTAL SIGNAL TEE son las piezas planeadas de DROP 001: SIGNAL. La campaña explora la dirección; las fotos de producto, especificaciones, precio y lanzamiento siguen pendientes.",
    pieces: [
      { name: 'SIGNAL CORE TEE', detail: 'Vista previa / detalles finales pendientes', action: 'Explorar pieza' },
      { name: 'NIGHT BLOOM TEE', detail: 'Vista previa / detalles finales pendientes', action: 'Explorar pieza' },
      { name: 'CRYSTAL SIGNAL TEE', detail: 'Vista previa / detalles finales pendientes', action: 'Explorar pieza' },
    ],
    collectionAlt: [
      'Estudio editorial de playera VHOX; la asociación final con SIGNAL CORE TEE está pendiente',
      'Estudio editorial de playera VHOX; la asociación final con NIGHT BLOOM TEE está pendiente',
      'Estudio editorial de playera VHOX; la asociación final con CRYSTAL SIGNAL TEE está pendiente',
    ],
    campaignLabel: 'VHOX / CHROMATIC BLACK',
    campaignTitle: 'Un solo tono nunca cuenta toda la historia.',
    campaignAlt: 'Familia streetwear VHOX casi negra en un estudio de color violeta nocturno',
    campaignAction: "Información del lanzamiento",
  },
  pt: {
    ...sharedPhrase,
    heroEyebrow: 'DROP 001 / SIGNAL',
    heroSupport: "Streetwear premium. Tons quase pretos, silhuetas oversized. Movimiento Exclusivo.",
    heroPrimary: 'Explorar SIGNAL',
    heroSecondary: 'Descobrir Chromatic Black',
    heroAlt: 'Modelo VHOX usando uma silhueta streetwear oversized quase preta em arquitetura brutalista',
    heroFooterOne: 'Presença silenciosa / detalhe controlado',
    heroFooterTwo: "Detalhes do lançamento pendentes",
    codeLabel: 'O CÓDIGO DE COR VHOX',
    codeTitle: 'O preto é apenas a primeira impressão.',
    codeParagraphOne: "Chromatic Black é nossa direção visual: preto à distância, um subtom escuro revelado pela luz, pelo ângulo e pelo movimento.",
    codeParagraphTwo: "Estes estudos de campanha expressam a intenção. Amostras físicas e propriedades têxteis finais ainda precisam de validação.",
    studiesLabel: 'ESTUDOS CROMÁTICOS / 001—003',
    studiesTitle: 'Escuridão, desenvolvida em cor.',
    studiesIntro: "Estudos de cor da campanha. As cores finais de produto seguem sem confirmação.",
    studies: [
      { name: 'BLACK CHERRY', description: 'Um oxblood profundo que parece preto até encontrar a luz.' },
      { name: 'BURNT EARTH', description: 'Um marrom defumado ancorado em pigmento quase preto.' },
      { name: 'MIDNIGHT VIOLET', description: 'Um violeta contido revelado pela profundidade e pelo movimento.' },
    ],
    detailLabel: 'UMA ASSINATURA SILENCIOSA',
    detailTitle: 'Reconhecida por quem olha de perto.',
    detailCopy: 'Uma marca de morcego discreta, desenvolvida por tom e textura. A identidade está presente sem competir com quem veste a peça.',
    detailAlt: 'Vista macro de tecido VHOX escuro e bordado tonal violeta de morcego',
    detailCodes: ["Estudo de superfície","Direção de silhueta oversized","Estudo de identidade tonal"],
    collectionLabel: "DROP 001 / SIGNAL",
    collectionTitle: 'Feito para entrar na sua rotação.',
    collectionIntro: "SIGNAL CORE TEE, NIGHT BLOOM TEE e CRYSTAL SIGNAL TEE são as peças planejadas do DROP 001: SIGNAL. A campanha explora a direção; fotos de produto, especificações, preço e lançamento seguem pendentes.",
    pieces: [
      { name: 'SIGNAL CORE TEE', detail: 'Prévia do lançamento / detalhes finais pendentes', action: 'Explorar peça' },
      { name: 'NIGHT BLOOM TEE', detail: 'Prévia do lançamento / detalhes finais pendentes', action: 'Explorar peça' },
      { name: 'CRYSTAL SIGNAL TEE', detail: 'Prévia do lançamento / detalhes finais pendentes', action: 'Explorar peça' },
    ],
    collectionAlt: [
      'Estudo editorial de camiseta VHOX; a associação final com SIGNAL CORE TEE está pendente',
      'Estudo editorial de camiseta VHOX; a associação final com NIGHT BLOOM TEE está pendente',
      'Estudo editorial de camiseta VHOX; a associação final com CRYSTAL SIGNAL TEE está pendente',
    ],
    campaignLabel: 'VHOX / CHROMATIC BLACK',
    campaignTitle: 'Um único tom nunca conta toda a história.',
    campaignAlt: 'Família streetwear VHOX quase preta em um estudo de cor violeta noturno',
    campaignAction: "Informações do lançamento",
  },
  fr: {
    ...sharedPhrase,
    heroEyebrow: 'DROP 001 / SIGNAL',
    heroSupport: "Streetwear premium. Tons presque noirs, silhouettes oversized. Movimiento Exclusivo.",
    heroPrimary: 'Explorer SIGNAL',
    heroSecondary: 'Découvrir Chromatic Black',
    heroAlt: 'Mannequin VHOX portant une silhouette streetwear oversized presque noire dans une architecture brutaliste',
    heroFooterOne: 'Présence silencieuse / détail contrôlé',
    heroFooterTwo: "Détails de sortie à confirmer",
    codeLabel: 'LE CODE COULEUR VHOX',
    codeTitle: 'Le noir n’est que la première impression.',
    codeParagraphOne: "Chromatic Black est notre direction visuelle : noir de loin, un sous-ton sombre révélé par la lumière, l’angle et le mouvement.",
    codeParagraphTwo: "Ces études de campagne expriment une intention. Les échantillons physiques et propriétés textiles finales restent à valider.",
    studiesLabel: 'ÉTUDES CHROMATIQUES / 001—003',
    studiesTitle: 'L’obscurité, développée en couleur.',
    studiesIntro: "Études de couleur de campagne. Les couleurs finales des produits restent à confirmer.",
    studies: [
      { name: 'BLACK CHERRY', description: 'Un oxblood profond qui paraît noir avant de rencontrer la lumière.' },
      { name: 'BURNT EARTH', description: 'Un brun fumé ancré dans un pigment presque noir.' },
      { name: 'MIDNIGHT VIOLET', description: 'Un violet retenu révélé par la profondeur et le mouvement.' },
    ],
    detailLabel: 'UNE SIGNATURE SILENCIEUSE',
    detailTitle: 'Reconnue par ceux qui regardent de plus près.',
    detailCopy: 'Une marque chauve-souris discrète, développée par le ton et la texture. L’identité reste présente sans rivaliser avec la personne qui porte la pièce.',
    detailAlt: 'Vue macro d’un tissu VHOX sombre et d’une broderie tonale violette en forme de chauve-souris',
    detailCodes: ["Étude de surface","Direction de silhouette oversized","Étude d’identité tonale"],
    collectionLabel: "DROP 001 / SIGNAL",
    collectionTitle: 'Conçu pour entrer dans votre rotation.',
    collectionIntro: "SIGNAL CORE TEE, NIGHT BLOOM TEE et CRYSTAL SIGNAL TEE sont les pièces prévues du DROP 001 : SIGNAL. La campagne explore la direction ; photos produit, spécifications, prix et sortie restent à confirmer.",
    pieces: [
      { name: 'SIGNAL CORE TEE', detail: 'Aperçu de sortie / détails finaux en attente', action: 'Explorer la pièce' },
      { name: 'NIGHT BLOOM TEE', detail: 'Aperçu de sortie / détails finaux en attente', action: 'Explorer la pièce' },
      { name: 'CRYSTAL SIGNAL TEE', detail: 'Aperçu de sortie / détails finaux en attente', action: 'Explorer la pièce' },
    ],
    collectionAlt: [
      'Étude éditoriale de t-shirt VHOX ; l’association finale avec SIGNAL CORE TEE reste en attente',
      'Étude éditoriale de t-shirt VHOX ; l’association finale avec NIGHT BLOOM TEE reste en attente',
      'Étude éditoriale de t-shirt VHOX ; l’association finale avec CRYSTAL SIGNAL TEE reste en attente',
    ],
    campaignLabel: 'VHOX / CHROMATIC BLACK',
    campaignTitle: 'Une seule teinte ne raconte jamais toute l’histoire.',
    campaignAlt: 'Famille streetwear VHOX presque noire dans une étude violet nocturne',
    campaignAction: "Informations de sortie",
  },
}
