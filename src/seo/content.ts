import type { Locale } from '../i18n/translations'

type RouteCopy = { title: string; description: string; h1: string }
type SeoCopy = {
  home: RouteCopy
  collections: RouteCopy
  journal: RouteCopy
  manifesto: RouteCopy
  breadcrumbHome: string
  share: string
  shared: string
  copyLink: string
  inBrief: string
  contents: string
  collectionIntro: string
  collectionCta: string
  collectionStatus: string
  concept: string
  status: string
  pending: string
  faqTitle: string
  faq: Array<{ question: string; answer: string }>
  journalIntro: string
  journalCta: string
  manifestoIntro: string
  manifestoCta: string
}

export const seoCopy: Record<Locale, SeoCopy> = {
  en: {
    home: { title: 'VHOX — Chromatic Black | Premium Streetwear', description: 'VHOX develops premium near-black streetwear through weight, proportion and restraint. From a distance, black. Up close, VHOX.', h1: 'FROM A DISTANCE, BLACK. UP CLOSE, VHOX.' },
    collections: { title: 'BAT, ROSE & VOID — VHOX Collection Studies', description: 'Explore BAT, ROSE and VOID, three VHOX concept studies shaped by nocturnal identity, controlled tension and near-black depth.', h1: 'THREE FORMS. ONE SIGNAL.' },
    journal: { title: 'VHOX Journal — Material, Identity & Chromatic Black', description: 'Read VHOX field notes on near-black color, garment construction, proportion and the independent identity behind Chromatic Black.', h1: 'BEYOND THE SURFACE.' },
    manifesto: { title: 'VHOX Manifesto — An Independent Streetwear Language', description: 'Discover the VHOX manifesto: a disciplined language of near-black material, exact form and identity without compromise.', h1: 'DARKNESS IS A SURFACE.' },
    breadcrumbHome: 'Home', share: 'Share', shared: 'Link copied', copyLink: 'Copy link', inBrief: 'In brief', contents: 'Contents',
    collectionIntro: 'BAT, ROSE and VOID are three editorial studies within one VHOX language. They remain outside commerce until physical samples, media, specifications, price and release are approved.',
    collectionCta: 'ENTER THE INNER CIRCLE', collectionStatus: 'Collection readiness', concept: 'Study', status: 'Status', pending: 'Pending physical and commercial confirmation', faqTitle: 'Collection questions',
    faq: [
      { question: 'Are BAT, ROSE and VOID available to purchase?', answer: 'Not yet. They are editorial concept studies and remain outside commerce until VHOX confirms physical samples, approved media, specifications, price and availability.' },
      { question: 'Are materials and sizing confirmed?', answer: 'No. Materials, fit and size information are marked pending until physical validation is complete.' },
      { question: 'Will every study be restocked?', answer: 'No restock policy has been confirmed. VHOX will publish availability and release terms only when they are approved.' },
      { question: 'How can I receive confirmed release information?', answer: 'Use the official VHOX contact or enter the Inner Circle when approved registration is active. No date or access is promised before official confirmation.' },
    ],
    journalIntro: 'The Journal gathers the symbols, construction studies and decisions that shape VHOX WRLD. Only published field notes appear here; future articles remain unpublished until approved.', journalCta: 'READ THE MANIFESTO',
    manifestoIntro: 'VHOX builds an independent language through restraint: material that changes through movement, form resolved with intention and identity protected from trend cycles.', manifestoCta: 'EXPLORE THE COLLECTION STUDIES',
  },
  es: {
    home: { title: 'VHOX — Chromatic Black | Streetwear Premium', description: 'VHOX desarrolla streetwear premium casi negro mediante peso, proporción y contención. From a distance, black. Up close, VHOX.', h1: 'FROM A DISTANCE, BLACK. UP CLOSE, VHOX.' },
    collections: { title: 'BAT, ROSE y VOID — Estudios de Colección VHOX', description: 'Explora BAT, ROSE y VOID, tres estudios VHOX construidos desde identidad nocturna, tensión controlada y profundidad casi negra.', h1: 'TRES FORMAS. UNA SEÑAL.' },
    journal: { title: 'VHOX Journal — Material, Identidad y Chromatic Black', description: 'Lee notas de campo VHOX sobre color casi negro, construcción, proporción e identidad independiente detrás de Chromatic Black.', h1: 'MÁS ALLÁ DE LA SUPERFICIE.' },
    manifesto: { title: 'Manifiesto VHOX — Un Lenguaje Streetwear Independiente', description: 'Descubre el manifiesto VHOX: una disciplina de material casi negro, forma exacta e identidad sin compromisos.', h1: 'LA OSCURIDAD ES UNA SUPERFICIE.' },
    breadcrumbHome: 'Inicio', share: 'Compartir', shared: 'Enlace copiado', copyLink: 'Copiar enlace', inBrief: 'En breve', contents: 'Contenido',
    collectionIntro: 'BAT, ROSE y VOID son tres estudios editoriales dentro de un solo lenguaje VHOX. Permanecen fuera de venta hasta aprobar muestras físicas, medios, especificaciones, precio y lanzamiento.',
    collectionCta: 'ENTRAR AL CÍRCULO INTERNO', collectionStatus: 'Estado de la colección', concept: 'Estudio', status: 'Estado', pending: 'Pendiente de confirmación física y comercial', faqTitle: 'Preguntas sobre la colección',
    faq: [
      { question: '¿BAT, ROSE y VOID están disponibles para comprar?', answer: 'Todavía no. Son estudios editoriales y permanecen fuera de venta hasta que VHOX confirme muestras físicas, medios aprobados, especificaciones, precio y disponibilidad.' },
      { question: '¿Los materiales y tallas están confirmados?', answer: 'No. Los materiales, el ajuste y las tallas permanecen pendientes hasta completar la validación física.' },
      { question: '¿Todos los estudios tendrán reposición?', answer: 'No existe una política de reposición confirmada. VHOX publicará disponibilidad y condiciones únicamente cuando estén aprobadas.' },
      { question: '¿Cómo recibo información confirmada del lanzamiento?', answer: 'Usa el contacto oficial de VHOX o entra al Inner Circle cuando el registro aprobado esté activo. No se promete fecha ni acceso antes de la confirmación oficial.' },
    ],
    journalIntro: 'El Journal reúne símbolos, estudios de construcción y decisiones que dan forma a VHOX WRLD. Solo aparecen notas publicadas; los artículos futuros permanecen fuera del sitio hasta su aprobación.', journalCta: 'LEER EL MANIFIESTO',
    manifestoIntro: 'VHOX construye un lenguaje independiente mediante contención: material que cambia con el movimiento, forma resuelta con intención e identidad protegida de los ciclos de tendencia.', manifestoCta: 'EXPLORAR LOS ESTUDIOS DE COLECCIÓN',
  },
  pt: {
    home: { title: 'VHOX — Chromatic Black | Streetwear Premium', description: 'A VHOX desenvolve streetwear premium quase preto por meio de peso, proporção e contenção. From a distance, black. Up close, VHOX.', h1: 'FROM A DISTANCE, BLACK. UP CLOSE, VHOX.' },
    collections: { title: 'BAT, ROSE e VOID — Estudos de Coleção VHOX', description: 'Explore BAT, ROSE e VOID, três estudos VHOX moldados por identidade noturna, tensão controlada e profundidade quase preta.', h1: 'TRÊS FORMAS. UM SINAL.' },
    journal: { title: 'VHOX Journal — Material, Identidade e Chromatic Black', description: 'Leia notas VHOX sobre cor quase preta, construção, proporção e a identidade independente por trás de Chromatic Black.', h1: 'ALÉM DA SUPERFÍCIE.' },
    manifesto: { title: 'Manifesto VHOX — Uma Linguagem Streetwear Independente', description: 'Conheça o manifesto VHOX: disciplina de material quase preto, forma exata e identidade sem concessões.', h1: 'A ESCURIDÃO É UMA SUPERFÍCIE.' },
    breadcrumbHome: 'Início', share: 'Compartilhar', shared: 'Link copiado', copyLink: 'Copiar link', inBrief: 'Em resumo', contents: 'Conteúdo',
    collectionIntro: 'BAT, ROSE e VOID são três estudos editoriais dentro de uma linguagem VHOX. Permanecem fora do comércio até a aprovação de amostras, mídia, especificações, preço e lançamento.',
    collectionCta: 'ENTRAR NO CÍRCULO INTERNO', collectionStatus: 'Estado da coleção', concept: 'Estudo', status: 'Estado', pending: 'Confirmação física e comercial pendente', faqTitle: 'Perguntas sobre a coleção',
    faq: [
      { question: 'BAT, ROSE e VOID estão disponíveis para compra?', answer: 'Ainda não. São estudos editoriais e permanecem fora do comércio até a VHOX confirmar amostras físicas, mídia aprovada, especificações, preço e disponibilidade.' },
      { question: 'Materiais e tamanhos estão confirmados?', answer: 'Não. Materiais, caimento e tamanhos permanecem pendentes até a validação física.' },
      { question: 'Todos os estudos terão reposição?', answer: 'Nenhuma política de reposição foi confirmada. A VHOX publicará disponibilidade e termos somente após aprovação.' },
      { question: 'Como recebo informações confirmadas de lançamento?', answer: 'Use o contato oficial VHOX ou entre no Inner Circle quando o cadastro aprovado estiver ativo. Nenhuma data ou acesso é prometido antes da confirmação oficial.' },
    ],
    journalIntro: 'O Journal reúne símbolos, estudos de construção e decisões que formam a VHOX WRLD. Somente notas publicadas aparecem aqui; artigos futuros permanecem inéditos até aprovação.', journalCta: 'LER O MANIFESTO',
    manifestoIntro: 'A VHOX constrói uma linguagem independente por meio da contenção: material que muda com o movimento, forma resolvida com intenção e identidade protegida dos ciclos de tendência.', manifestoCta: 'EXPLORAR OS ESTUDOS DE COLEÇÃO',
  },
  fr: {
    home: { title: 'VHOX — Chromatic Black | Streetwear Premium', description: 'VHOX développe un streetwear premium presque noir par le poids, la proportion et la retenue. From a distance, black. Up close, VHOX.', h1: 'FROM A DISTANCE, BLACK. UP CLOSE, VHOX.' },
    collections: { title: 'BAT, ROSE et VOID — Études de Collection VHOX', description: 'Explorez BAT, ROSE et VOID, trois études VHOX façonnées par une identité nocturne, une tension contrôlée et une profondeur presque noire.', h1: 'TROIS FORMES. UN SIGNAL.' },
    journal: { title: 'VHOX Journal — Matière, Identité et Chromatic Black', description: 'Lisez les notes VHOX sur la couleur presque noire, la construction, la proportion et l’identité de Chromatic Black.', h1: 'AU-DELÀ DE LA SURFACE.' },
    manifesto: { title: 'Manifeste VHOX — Un Langage Streetwear Indépendant', description: 'Découvrez le manifeste VHOX : matière presque noire, forme exacte et identité sans compromis.', h1: 'L’OBSCURITÉ EST UNE SURFACE.' },
    breadcrumbHome: 'Accueil', share: 'Partager', shared: 'Lien copié', copyLink: 'Copier le lien', inBrief: 'En bref', contents: 'Sommaire',
    collectionIntro: 'BAT, ROSE et VOID sont trois études éditoriales réunies dans un langage VHOX. Elles restent hors commerce jusqu’à validation des échantillons, médias, spécifications, prix et lancement.',
    collectionCta: 'ENTRER DANS LE CERCLE PRIVÉ', collectionStatus: 'État de la collection', concept: 'Étude', status: 'État', pending: 'Confirmation physique et commerciale en attente', faqTitle: 'Questions sur la collection',
    faq: [
      { question: 'BAT, ROSE et VOID sont-ils disponibles à l’achat ?', answer: 'Pas encore. Ce sont des études éditoriales hors commerce jusqu’à confirmation des échantillons, médias approuvés, spécifications, prix et disponibilité par VHOX.' },
      { question: 'Les matières et tailles sont-elles confirmées ?', answer: 'Non. Les matières, la coupe et les tailles restent en attente jusqu’à la validation physique.' },
      { question: 'Chaque étude sera-t-elle réapprovisionnée ?', answer: 'Aucune politique de réapprovisionnement n’est confirmée. VHOX publiera disponibilité et conditions uniquement après approbation.' },
      { question: 'Comment recevoir les informations de lancement confirmées ?', answer: 'Utilisez le contact officiel VHOX ou rejoignez l’Inner Circle lorsque l’inscription approuvée sera active. Aucune date ni accès ne sont promis avant confirmation.' },
    ],
    journalIntro: 'Le Journal réunit les symboles, études de construction et décisions qui façonnent VHOX WRLD. Seules les notes publiées apparaissent ici ; les futurs articles restent inédits jusqu’à validation.', journalCta: 'LIRE LE MANIFESTE',
    manifestoIntro: 'VHOX construit un langage indépendant par la retenue : matière révélée par le mouvement, forme résolue avec intention et identité protégée des cycles de tendance.', manifestoCta: 'EXPLORER LES ÉTUDES DE COLLECTION',
  },
}
