import type { Locale } from '../i18n/translations'

type EditorialCopy = {
  selection: string
  preview: string
  explore: string
  studyTitle: string
  studyDescription: string
  detailTitle: string
  detailDescription: string
  detailNote: string
  identity: string
  identityLink: string
}

export const editorialCopy: Record<Locale, EditorialCopy> = {
  es: {
    selection: 'La primera selección.',
    preview: 'Tres piezas en desarrollo. Imágenes de campaña; producto final, precio y fecha por confirmar.',
    explore: 'Ver la colección',
    studyTitle: 'El negro, de cerca.',
    studyDescription: 'Violeta, cereza y tierra. Tres aproximaciones al color que da forma al universo Chromatic Black.',
    detailTitle: 'Superficie. Silueta. Detalle.',
    detailDescription: 'Un estudio visual del volumen amplio y la marca tonal. El detalle se observa en la imagen; la composición y el acabado del producto final siguen por confirmar.',
    detailNote: 'Estudio de campaña. No es una muestra de producción.',
    identity: 'VHOX explora la relación entre prenda e identidad. Una silueta amplia, una paleta contenida y espacio para quien la lleva.',
    identityLink: 'Leer el manifiesto',
  },
  en: {
    selection: 'The first selection.',
    preview: 'Three pieces in development. Campaign imagery; final products, prices and release date to be confirmed.',
    explore: 'View the collection',
    studyTitle: 'Black, up close.',
    studyDescription: 'Violet, cherry and earth. Three approaches to color shaping the Chromatic Black world.',
    detailTitle: 'Surface. Silhouette. Detail.',
    detailDescription: 'A visual study of generous volume and a tonal mark. The detail is visible in the image; final product composition and finish remain to be confirmed.',
    detailNote: 'Campaign study. Not a production sample.',
    identity: 'VHOX explores the relationship between clothing and identity. A generous silhouette, a restrained palette and room for the person wearing it.',
    identityLink: 'Read the manifesto',
  },
  pt: {
    selection: 'A primeira seleção.',
    preview: 'Três peças em desenvolvimento. Imagens de campanha; produtos finais, preços e data por confirmar.',
    explore: 'Ver a coleção',
    studyTitle: 'O preto, de perto.',
    studyDescription: 'Violeta, cereja e terra. Três abordagens à cor que dá forma ao universo Chromatic Black.',
    detailTitle: 'Superfície. Silhueta. Detalhe.',
    detailDescription: 'Um estudo visual do volume amplo e da marca tonal. O detalhe é visível na imagem; a composição e o acabamento do produto final ainda serão confirmados.',
    detailNote: 'Estudo de campanha. Não é uma amostra de produção.',
    identity: 'A VHOX explora a relação entre roupa e identidade. Uma silhueta ampla, uma paleta contida e espaço para quem a veste.',
    identityLink: 'Ler o manifesto',
  },
  fr: {
    selection: 'La première sélection.',
    preview: 'Trois pièces en développement. Visuels de campagne ; produits définitifs, prix et date à confirmer.',
    explore: 'Voir la collection',
    studyTitle: 'Le noir, de près.',
    studyDescription: 'Violet, cerise et terre. Trois approches de la couleur qui façonnent l’univers Chromatic Black.',
    detailTitle: 'Surface. Silhouette. Détail.',
    detailDescription: 'Une étude visuelle du volume ample et de la marque tonale. Le détail apparaît dans l’image ; la composition et la finition du produit définitif restent à confirmer.',
    detailNote: 'Étude de campagne. Ce n’est pas un échantillon de production.',
    identity: 'VHOX explore la relation entre vêtement et identité. Une silhouette ample, une palette retenue et une place pour la personne qui la porte.',
    identityLink: 'Lire le manifeste',
  },
}
