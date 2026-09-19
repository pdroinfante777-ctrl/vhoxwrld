import type { Locale } from '../i18n/translations'

type Localized = Record<Locale, string>
const text = (es: string, en: string, pt: string, fr: string): Localized => ({ es, en, pt, fr })

export type GarmentImage = { name: string; width: number; height: number; alt: Localized }
export type GarmentStory = { id: string; title: Localized; description: Localized; images: GarmentImage[] }
const image = (name: string, alt: Localized, width = 1122, height = 1402): GarmentImage => ({ name, alt, width, height })

export const garmentCopy = {
  title: text('Prendas con carácter.', 'Clothes with character.', 'Peças com personalidade.', 'Des pièces de caractère.'),
  intro: text('Chaquetas, playeras y capas amplias. El universo VHOX toma nuevas formas.', 'Jackets, tees and generous layers. The VHOX world takes new shapes.', 'Jaquetas, camisetas e camadas amplas. O universo VHOX ganha novas formas.', 'Vestes, t-shirts et superpositions amples. L’univers VHOX prend de nouvelles formes.'),
  note: text('Propuestas visuales de prendas en desarrollo. Detalles y disponibilidad por confirmar.', 'Visual proposals for garments in development. Details and availability to be confirmed.', 'Propostas visuais de peças em desenvolvimento. Detalhes e disponibilidade a confirmar.', 'Propositions visuelles de pièces en développement. Détails et disponibilité à confirmer.'),
  explore: text('Explorar las prendas', 'Explore the garments', 'Explorar as peças', 'Explorer les pièces'),
  collection: text('Prendas', 'Garments', 'Peças', 'Pièces'),
  premiumTitle: text('VHOX Premium', 'VHOX Premium', 'VHOX Premium', 'VHOX Premium'),
  premiumDescription: text('Otra forma de llevar el negro. Volúmenes largos, capas abiertas y color que aparece con la luz.', 'Another way to wear black. Long silhouettes, open layers and colour revealed by light.', 'Outra forma de vestir o preto. Volumes longos, camadas abertas e cor que aparece com a luz.', 'Une autre façon de porter le noir. Des volumes longs, des superpositions ouvertes et une couleur révélée par la lumière.'),
  premiumNote: text('Conceptos de campaña para una nueva dirección de prendas.', 'Campaign concepts for a new garment direction.', 'Conceitos de campanha para uma nova direção de peças.', 'Concepts de campagne pour une nouvelle direction vestimentaire.'),
  atelier: text('Negro, a la luz del día.', 'Black, in daylight.', 'Preto, à luz do dia.', 'Le noir, à la lumière du jour.'),
  courtyard: text('El color vive en las capas.', 'Colour lives in the layers.', 'A cor vive nas camadas.', 'La couleur vit dans les superpositions.'),
  enlarge: text('Ampliar imagen', 'Enlarge image', 'Ampliar imagem', 'Agrandir l’image'),
  close: text('Cerrar imagen', 'Close image', 'Fechar imagem', 'Fermer l’image'),
  next: text('Imagen siguiente', 'Next image', 'Próxima imagem', 'Image suivante'),
  previous: text('Imagen anterior', 'Previous image', 'Imagem anterior', 'Image précédente'),
  show: text('Ver', 'View', 'Ver', 'Voir'),
  unavailable: text('No se pudo cargar esta imagen.', 'This image could not be loaded.', 'Não foi possível carregar esta imagem.', 'Cette image n’a pas pu être chargée.'),
}

export const garmentStories: GarmentStory[] = [
  {
    id: 'jackets', title: text('Chaquetas', 'Jackets', 'Jaquetas', 'Vestes'),
    description: text('Negro sobre blanco. Superficies marcadas y una silueta amplia.', 'Black over white. Worn surfaces and a generous silhouette.', 'Preto sobre branco. Superfícies marcadas e uma silhueta ampla.', 'Du noir sur blanc. Des surfaces marquées et une silhouette ample.'),
    images: [
      image('jacket-story', text('Vistas de una chaqueta negra sobre sudadera blanca, con detalles del pecho y bolsillo', 'Views of a black jacket over a white hoodie, with chest and pocket details', 'Vistas de uma jaqueta preta sobre moletom branco, com detalhes do peito e bolso', 'Vues d’une veste noire sur un sweat blanc, avec détails de la poitrine et de la poche'), 1024, 1536),
      image('jacket-distressed', text('Chaqueta negra de aspecto desgastado sobre sudadera blanca, en percha', 'Distressed-looking black jacket over a white hoodie on a hanger', 'Jaqueta preta de aparência desgastada sobre moletom branco, no cabide', 'Veste noire à l’aspect usé sur un sweat blanc, sur cintre')),
    ],
  },
  {
    id: 'tees', title: text('Playeras', 'T-shirts', 'Camisetas', 'T-shirts'),
    description: text('Violeta y cereza que se abren hacia el blanco. Caída amplia, gesto tranquilo.', 'Violet and cherry fading into white. A loose silhouette, an easy stance.', 'Violeta e cereja que se abrem para o branco. Caimento amplo, postura tranquila.', 'Violet et cerise s’ouvrent sur le blanc. Une coupe ample, une allure tranquille.'),
    images: [
      image('tee-violet', text('Playera amplia en degradado violeta y blanco, modelo de pie', 'Oversized violet-to-white gradient tee on a standing model', 'Camiseta ampla em degradê violeta e branco, modelo em pé', 'T-shirt ample en dégradé violet et blanc, mannequin debout')),
      image('tee-burgundy', text('Playera amplia en degradado cereza y blanco, vista frontal', 'Oversized cherry-to-white gradient tee, front view', 'Camiseta ampla em degradê cereja e branco, vista frontal', 'T-shirt ample en dégradé cerise et blanc, vue de face')),
      image('tee-violet-seated', text('Playera violeta y blanca sobre modelo sentado en una calle húmeda', 'Violet and white tee on a model seated on a wet street', 'Camiseta violeta e branca em modelo sentado numa rua molhada', 'T-shirt violet et blanc sur un mannequin assis dans une rue humide')),
    ],
  },
  {
    id: 'hoodies', title: text('Sudaderas', 'Hoodies', 'Moletons', 'Sweats à capuche'),
    description: text('Gráfica oscura, capucha y proporciones sueltas. Una misma pieza en movimiento y de cerca.', 'Dark graphics, a hood and loose proportions. One piece in motion and up close.', 'Gráfica escura, capuz e proporções soltas. A mesma peça em movimento e de perto.', 'Graphisme sombre, capuche et proportions amples. Une même pièce en mouvement et de près.'),
    images: [
      image('hoodie-front', text('Sudadera gris con cierre y gráfica negra, vista frontal sobre modelo', 'Grey zip hoodie with black graphics, front view on model', 'Moletom cinza com zíper e gráfica preta, vista frontal no modelo', 'Sweat gris zippé à motifs noirs, vue de face sur mannequin')),
      image('hoodie-back', text('Espalda y capucha de la sudadera gris con gráfica negra', 'Back and hood of the grey hoodie with black graphics', 'Costas e capuz do moletom cinza com gráfica preta', 'Dos et capuche du sweat gris à motifs noirs')),
      image('hoodie-walking', text('Sudadera gráfica gris sobre modelo caminando', 'Grey graphic hoodie on a walking model', 'Moletom gráfico cinza em modelo caminhando', 'Sweat gris graphique sur un mannequin en marche')),
    ],
  },
  {
    id: 'racing', title: text('Racing', 'Racing', 'Racing', 'Racing'),
    description: text('Paneles en contraste. Verde profundo, rojo y crema sobre una base negra.', 'Contrasting panels. Deep green, red and cream against black.', 'Painéis contrastantes. Verde profundo, vermelho e creme sobre uma base preta.', 'Des empiècements contrastés. Vert profond, rouge et crème sur une base noire.'),
    images: [
      image('racing-green', text('Chaqueta racing negra, crema y verde con acentos naranja, vista frontal', 'Black, cream and green racing jacket with orange accents, front view', 'Jaqueta racing preta, creme e verde com detalhes laranja, vista frontal', 'Veste racing noire, crème et verte à touches orange, vue de face')),
      image('racing-red', text('Chaqueta racing negra, crema y roja, vista lateral sobre modelo', 'Black, cream and red racing jacket, side view on model', 'Jaqueta racing preta, creme e vermelha, vista lateral no modelo', 'Veste racing noire, crème et rouge, vue de profil sur mannequin')),
      image('racing-green-street', text('Conjunto con chaqueta racing verde, crema y negra en la calle', 'Street look with a green, cream and black racing jacket', 'Look de rua com jaqueta racing verde, creme e preta', 'Silhouette de rue avec veste racing verte, crème et noire')),
    ],
  },
]

export const premiumImages = [
  image('premium-atelier', text('Concepto VHOX Premium: sobrecamisa negra y pantalón amplio junto a una ventana de taller', 'VHOX Premium concept: black overshirt and wide trousers beside an atelier window', 'Conceito VHOX Premium: sobrecamisa preta e calça ampla junto à janela de um ateliê', 'Concept VHOX Premium : surchemise noire et pantalon ample près d’une fenêtre d’atelier'), 1536, 1024),
  image('premium-courtyard', text('Concepto VHOX Premium: abrigo oscuro sobre sudadera burdeos en un patio de concreto', 'VHOX Premium concept: dark coat over a burgundy hoodie in a concrete courtyard', 'Conceito VHOX Premium: casaco escuro sobre moletom bordô em um pátio de concreto', 'Concept VHOX Premium : manteau sombre sur un sweat bordeaux dans une cour en béton')),
]
