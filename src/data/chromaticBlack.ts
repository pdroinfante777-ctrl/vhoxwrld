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
    heroEyebrow: 'VHOX / INDEPENDENT STREETWEAR HOUSE',
    heroSupport: 'Near-black color developed through weight, proportion and restraint.',
    heroPrimary: 'Discover Chromatic Black',
    heroSecondary: 'View collection',
    heroAlt: 'VHOX model wearing an oversized near-black streetwear silhouette inside brutalist architecture',
    heroFooterOne: 'Quiet presence / controlled detail',
    heroFooterTwo: 'Private release / details pending',
    codeLabel: 'THE VHOX COLOR CODE',
    codeTitle: 'Black is only the first impression.',
    codeParagraphOne: 'VHOX garments live between black and color. In shadow they appear almost absolute; in daylight, motion and proximity reveal the undertone.',
    codeParagraphTwo: 'The color belongs to the fabric—not the interface. Every tone is developed to feel dark, wearable and unmistakably its own.',
    studiesLabel: 'CHROMATIC STUDIES / 001—003',
    studiesTitle: 'Darkness, developed in color.',
    studiesIntro: 'Near-black tones made for daily rotation. Restrained in shade. Distinct in light.',
    studies: [
      { name: 'BLACK CHERRY', description: 'A deep oxblood that reads black until it catches light.' },
      { name: 'BURNT EARTH', description: 'A smoked brown grounded in near-black pigment.' },
      { name: 'MIDNIGHT VIOLET', description: 'A restrained violet revealed through depth and movement.' },
    ],
    detailLabel: 'A QUIET SIGNATURE',
    detailTitle: 'Recognized by those who look closer.',
    detailCopy: 'A restrained bat mark, developed through tone and texture. The identity is present without competing with the person wearing it.',
    detailAlt: 'Macro view of dark VHOX fabric and violet tonal bat embroidery',
    detailCodes: ['Heavyweight structure', 'Oversized proportion', 'Tonal embroidery'],
    collectionLabel: 'THE UNIFORM / PRIVATE RELEASE',
    collectionTitle: 'Built to enter your rotation.',
    collectionIntro: 'Familiar streetwear forms refined through proportion, surface and controlled branding. Final specifications and availability remain subject to confirmation.',
    pieces: [
      { name: 'TEXTURED TEE', detail: 'Heavyweight study / washed black', action: 'View collection' },
      { name: 'NYLON SHELL', detail: 'Matte surface / restrained mark', action: 'View collection' },
      { name: 'UTILITY CARGO', detail: 'Structured form / adjustable hem', action: 'View collection' },
    ],
    collectionAlt: [
      'Black VHOX heavyweight oversized t-shirt laid on dark concrete',
      'Black VHOX nylon shell jacket with a restrained chest mark',
      'Black VHOX utility cargo trousers with structured pockets',
    ],
    campaignLabel: 'VHOX / CHROMATIC BLACK',
    campaignTitle: 'One shade is never the whole story.',
    campaignAlt: 'VHOX near-black streetwear family in a midnight-violet color study',
    campaignAction: 'Request private access',
  },
  es: {
    ...sharedPhrase,
    heroEyebrow: 'VHOX / CASA INDEPENDIENTE DE STREETWEAR',
    heroSupport: 'Color casi negro desarrollado mediante peso, proporción y contención.',
    heroPrimary: 'Descubrir Chromatic Black',
    heroSecondary: 'Ver colección',
    heroAlt: 'Modelo VHOX con una silueta streetwear oversized casi negra dentro de arquitectura brutalista',
    heroFooterOne: 'Presencia silenciosa / detalle controlado',
    heroFooterTwo: 'Lanzamiento privado / detalles pendientes',
    codeLabel: 'EL CÓDIGO DE COLOR VHOX',
    codeTitle: 'El negro es solo la primera impresión.',
    codeParagraphOne: 'Las prendas VHOX viven entre el negro y el color. En sombra parecen casi absolutas; con luz, movimiento y cercanía revelan su subtono.',
    codeParagraphTwo: 'El color pertenece al tejido, no a la interfaz. Cada tono se desarrolla para sentirse oscuro, usable e inequívocamente propio.',
    studiesLabel: 'ESTUDIOS CROMÁTICOS / 001—003',
    studiesTitle: 'Oscuridad, desarrollada en color.',
    studiesIntro: 'Tonos casi negros creados para la rotación diaria. Contenidos en sombra. Distintos bajo la luz.',
    studies: [
      { name: 'BLACK CHERRY', description: 'Un tono sangre profundo que parece negro hasta recibir luz.' },
      { name: 'BURNT EARTH', description: 'Un marrón ahumado arraigado en pigmento casi negro.' },
      { name: 'MIDNIGHT VIOLET', description: 'Un violeta contenido revelado por profundidad y movimiento.' },
    ],
    detailLabel: 'UNA FIRMA SILENCIOSA',
    detailTitle: 'Reconocida por quienes miran de cerca.',
    detailCopy: 'Un murciélago discreto desarrollado mediante tono y textura. La identidad está presente sin competir con quien lleva la prenda.',
    detailAlt: 'Vista macro de tejido oscuro VHOX y bordado tonal violeta de murciélago',
    detailCodes: ['Estructura de alto gramaje', 'Proporción oversized', 'Bordado tonal'],
    collectionLabel: 'EL UNIFORME / LANZAMIENTO PRIVADO',
    collectionTitle: 'Construido para entrar en tu rotación.',
    collectionIntro: 'Formas streetwear familiares refinadas mediante proporción, superficie y branding controlado. Las especificaciones y disponibilidad finales están pendientes de confirmación.',
    pieces: [
      { name: 'TEXTURED TEE', detail: 'Estudio de alto gramaje / negro lavado', action: 'Ver colección' },
      { name: 'NYLON SHELL', detail: 'Superficie mate / marca contenida', action: 'Ver colección' },
      { name: 'UTILITY CARGO', detail: 'Forma estructurada / bajo ajustable', action: 'Ver colección' },
    ],
    collectionAlt: [
      'Playera oversized VHOX negra de alto gramaje sobre concreto oscuro',
      'Chaqueta VHOX de nylon negro con marca discreta en el pecho',
      'Pantalón cargo VHOX negro con bolsillos estructurados',
    ],
    campaignLabel: 'VHOX / CHROMATIC BLACK',
    campaignTitle: 'Un solo tono nunca cuenta toda la historia.',
    campaignAlt: 'Familia streetwear VHOX casi negra en un estudio de color violeta nocturno',
    campaignAction: 'Solicitar acceso privado',
  },
  pt: {
    ...sharedPhrase,
    heroEyebrow: 'VHOX / CASA INDEPENDENTE DE STREETWEAR',
    heroSupport: 'Cor quase preta desenvolvida por peso, proporção e contenção.',
    heroPrimary: 'Descobrir Chromatic Black',
    heroSecondary: 'Ver coleção',
    heroAlt: 'Modelo VHOX usando uma silhueta streetwear oversized quase preta em arquitetura brutalista',
    heroFooterOne: 'Presença silenciosa / detalhe controlado',
    heroFooterTwo: 'Lançamento privado / detalhes pendentes',
    codeLabel: 'O CÓDIGO DE COR VHOX',
    codeTitle: 'O preto é apenas a primeira impressão.',
    codeParagraphOne: 'As peças VHOX vivem entre o preto e a cor. Na sombra parecem quase absolutas; com luz, movimento e proximidade revelam o subtom.',
    codeParagraphTwo: 'A cor pertence ao tecido, não à interface. Cada tom é desenvolvido para parecer escuro, usável e inconfundivelmente próprio.',
    studiesLabel: 'ESTUDOS CROMÁTICOS / 001—003',
    studiesTitle: 'Escuridão, desenvolvida em cor.',
    studiesIntro: 'Tons quase pretos feitos para a rotação diária. Contidos na sombra. Distintos sob a luz.',
    studies: [
      { name: 'BLACK CHERRY', description: 'Um oxblood profundo que parece preto até encontrar a luz.' },
      { name: 'BURNT EARTH', description: 'Um marrom defumado ancorado em pigmento quase preto.' },
      { name: 'MIDNIGHT VIOLET', description: 'Um violeta contido revelado pela profundidade e pelo movimento.' },
    ],
    detailLabel: 'UMA ASSINATURA SILENCIOSA',
    detailTitle: 'Reconhecida por quem olha de perto.',
    detailCopy: 'Uma marca de morcego discreta, desenvolvida por tom e textura. A identidade está presente sem competir com quem veste a peça.',
    detailAlt: 'Vista macro de tecido VHOX escuro e bordado tonal violeta de morcego',
    detailCodes: ['Estrutura de alto peso', 'Proporção oversized', 'Bordado tonal'],
    collectionLabel: 'O UNIFORME / LANÇAMENTO PRIVADO',
    collectionTitle: 'Feito para entrar na sua rotação.',
    collectionIntro: 'Formas streetwear familiares refinadas por proporção, superfície e branding controlado. Especificações e disponibilidade finais aguardam confirmação.',
    pieces: [
      { name: 'TEXTURED TEE', detail: 'Estudo de alto peso / preto lavado', action: 'Ver coleção' },
      { name: 'NYLON SHELL', detail: 'Superfície fosca / marca contida', action: 'Ver coleção' },
      { name: 'UTILITY CARGO', detail: 'Forma estruturada / barra ajustável', action: 'Ver coleção' },
    ],
    collectionAlt: [
      'Camiseta oversized VHOX preta de alto peso sobre concreto escuro',
      'Jaqueta VHOX de nylon preto com marca discreta no peito',
      'Calça cargo VHOX preta com bolsos estruturados',
    ],
    campaignLabel: 'VHOX / CHROMATIC BLACK',
    campaignTitle: 'Um único tom nunca conta toda a história.',
    campaignAlt: 'Família streetwear VHOX quase preta em um estudo de cor violeta noturno',
    campaignAction: 'Solicitar acesso privado',
  },
  fr: {
    ...sharedPhrase,
    heroEyebrow: 'VHOX / MAISON STREETWEAR INDÉPENDANTE',
    heroSupport: 'Une couleur presque noire développée par le poids, la proportion et la retenue.',
    heroPrimary: 'Découvrir Chromatic Black',
    heroSecondary: 'Voir la collection',
    heroAlt: 'Mannequin VHOX portant une silhouette streetwear oversized presque noire dans une architecture brutaliste',
    heroFooterOne: 'Présence silencieuse / détail contrôlé',
    heroFooterTwo: 'Sortie privée / détails en attente',
    codeLabel: 'LE CODE COULEUR VHOX',
    codeTitle: 'Le noir n’est que la première impression.',
    codeParagraphOne: 'Les pièces VHOX vivent entre le noir et la couleur. Dans l’ombre elles semblent absolues ; la lumière, le mouvement et la proximité révèlent leur sous-ton.',
    codeParagraphTwo: 'La couleur appartient au tissu, pas à l’interface. Chaque ton est développé pour rester sombre, portable et immédiatement distinct.',
    studiesLabel: 'ÉTUDES CHROMATIQUES / 001—003',
    studiesTitle: 'L’obscurité, développée en couleur.',
    studiesIntro: 'Des tons presque noirs pour la rotation quotidienne. Retenus dans l’ombre. Distincts sous la lumière.',
    studies: [
      { name: 'BLACK CHERRY', description: 'Un oxblood profond qui paraît noir avant de rencontrer la lumière.' },
      { name: 'BURNT EARTH', description: 'Un brun fumé ancré dans un pigment presque noir.' },
      { name: 'MIDNIGHT VIOLET', description: 'Un violet retenu révélé par la profondeur et le mouvement.' },
    ],
    detailLabel: 'UNE SIGNATURE SILENCIEUSE',
    detailTitle: 'Reconnue par ceux qui regardent de plus près.',
    detailCopy: 'Une marque chauve-souris discrète, développée par le ton et la texture. L’identité reste présente sans rivaliser avec la personne qui porte la pièce.',
    detailAlt: 'Vue macro d’un tissu VHOX sombre et d’une broderie tonale violette en forme de chauve-souris',
    detailCodes: ['Structure lourde', 'Proportion oversized', 'Broderie tonale'],
    collectionLabel: 'L’UNIFORME / SORTIE PRIVÉE',
    collectionTitle: 'Conçu pour entrer dans votre rotation.',
    collectionIntro: 'Des formes streetwear familières affinées par la proportion, la surface et une identité contrôlée. Les spécifications et la disponibilité finales restent à confirmer.',
    pieces: [
      { name: 'TEXTURED TEE', detail: 'Étude lourde / noir lavé', action: 'Voir la collection' },
      { name: 'NYLON SHELL', detail: 'Surface mate / marque retenue', action: 'Voir la collection' },
      { name: 'UTILITY CARGO', detail: 'Forme structurée / ourlet ajustable', action: 'Voir la collection' },
    ],
    collectionAlt: [
      'T-shirt oversized VHOX noir et lourd posé sur un béton sombre',
      'Veste VHOX en nylon noir avec une marque discrète sur la poitrine',
      'Pantalon cargo VHOX noir avec poches structurées',
    ],
    campaignLabel: 'VHOX / CHROMATIC BLACK',
    campaignTitle: 'Une seule teinte ne raconte jamais toute l’histoire.',
    campaignAlt: 'Famille streetwear VHOX presque noire dans une étude violet nocturne',
    campaignAction: 'Demander un accès privé',
  },
}
