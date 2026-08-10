export type CampoTipo = "text" | "textarea" | "date" | "number";

export type Campo = {
  id: string;
  label: string;
  tipo: CampoTipo;
  placeholder?: string;
};

export type Peticao = {
  id: string;
  titulo: string;
  area: string;
  descricao: string;
  enderecamento: string;
  cabecalho: string;
  fundamentos: string[];
  base: string[];
  campos: Campo[];
  pedidos: string[];
};

export const AREAS = [
  "Cível",
  "Trabalhista",
  "Família e Sucessões",
  "Penal",
  "Consumidor",
  "Previdenciário",
  "Tributário",
  "Empresarial",
] as const;

const F = {
  comarca: { id: "comarca", label: "Comarca", tipo: "text", placeholder: "São Paulo/SP" } as Campo,
  autor: { id: "autor", label: "Nome do autor/requerente", tipo: "text", placeholder: "João da Silva" } as Campo,
  autorQual: {
    id: "autorQual",
    label: "Qualificação do autor",
    tipo: "textarea",
    placeholder: "brasileiro, solteiro, engenheiro, CPF 000.000.000-00, RG 00.000.000-0, residente na Rua X, nº 10, São Paulo/SP",
  } as Campo,
  reu: { id: "reu", label: "Nome do réu/requerido", tipo: "text", placeholder: "Empresa XYZ Ltda." } as Campo,
  reuQual: {
    id: "reuQual",
    label: "Qualificação do réu",
    tipo: "textarea",
    placeholder: "pessoa jurídica de direito privado, CNPJ 00.000.000/0001-00, com sede na Av. Y, nº 200, São Paulo/SP",
  } as Campo,
  fatos: {
    id: "fatos",
    label: "Descrição dos fatos",
    tipo: "textarea",
    placeholder: "Narre de forma cronológica o que ocorreu, com datas, valores e documentos.",
  } as Campo,
  valor: { id: "valor", label: "Valor da causa (R$)", tipo: "text", placeholder: "50.000,00" } as Campo,
  cidade: { id: "cidade", label: "Cidade da assinatura", tipo: "text", placeholder: "São Paulo" } as Campo,
  data: { id: "data", label: "Data", tipo: "date" } as Campo,
  advogado: { id: "advogado", label: "Advogado(a)", tipo: "text", placeholder: "Maria Souza" } as Campo,
  oab: { id: "oab", label: "OAB", tipo: "text", placeholder: "OAB/SP 123.456" } as Campo,
};

export const CAMPOS_COMUNS: Campo[] = [
  F.comarca,
  F.autor,
  F.autorQual,
  F.reu,
  F.reuQual,
  F.fatos,
  F.valor,
  F.cidade,
  F.data,
  F.advogado,
  F.oab,
];

const PEDIDOS_PADRAO = [
  "a citação do(a) requerido(a), no endereço indicado, para, querendo, apresentar contestação, sob pena de revelia e confissão quanto à matéria de fato",
  "a produção de todos os meios de prova em direito admitidos, especialmente documental, testemunhal, pericial e o depoimento pessoal da parte contrária",
  "a condenação do(a) requerido(a) ao pagamento das custas processuais e honorários advocatícios sucumbenciais",
];

function p(
  id: string,
  titulo: string,
  area: string,
  descricao: string,
  enderecamento: string,
  cabecalho: string,
  base: string[],
  fundamentos: string[],
  pedidos: string[],
  campos: Campo[] = [],
): Peticao {
  return {
    id,
    titulo,
    area,
    descricao,
    enderecamento,
    cabecalho,
    base,
    fundamentos,
    pedidos: [...pedidos, ...PEDIDOS_PADRAO],
    campos,
  };
}

export const PETICOES: Peticao[] = [
  // ---------------- Cível ----------------
  p(
    "acao-cobranca",
    "Ação de Cobrança",
    "Cível",
    "Cobrança de dívida líquida e certa sem força executiva, pelo procedimento comum.",
    "EXCELENTÍSSIMO(A) SENHOR(A) DOUTOR(A) JUIZ(ÍZA) DE DIREITO DA ___ VARA CÍVEL DA COMARCA DE {{comarca}}",
    "AÇÃO DE COBRANÇA PELO PROCEDIMENTO COMUM",
    ["CPC, arts. 318 e ss.", "Código Civil, arts. 389, 394 e 397"],
    [
      "O inadimplemento da obrigação líquida, positiva e vencida constitui o devedor em mora de pleno direito, nos termos do art. 397 do Código Civil.",
      "Não havendo título dotado de executividade, a via adequada é o procedimento comum, com pedido condenatório ao pagamento do valor devido, acrescido de correção monetária desde o vencimento e juros de mora de 1% ao mês.",
      "A documentação anexa comprova a existência do crédito, sua exigibilidade e a ausência de pagamento, autorizando o acolhimento integral do pedido.",
    ],
    [
      "a condenação do(a) requerido(a) ao pagamento da quantia de R$ {{debito}}, corrigida monetariamente desde o vencimento e acrescida de juros de mora de 1% ao mês desde a citação",
    ],
    [
      { id: "debito", label: "Valor do débito (R$)", tipo: "text", placeholder: "18.500,00" },
      { id: "vencimento", label: "Data do vencimento", tipo: "date" },
    ],
  ),
  p(
    "indenizacao-danos-morais",
    "Ação de Indenização por Danos Morais e Materiais",
    "Cível",
    "Reparação civil por ato ilícito, com pedido de danos morais e materiais.",
    "EXCELENTÍSSIMO(A) SENHOR(A) DOUTOR(A) JUIZ(ÍZA) DE DIREITO DA ___ VARA CÍVEL DA COMARCA DE {{comarca}}",
    "AÇÃO DE INDENIZAÇÃO POR DANOS MORAIS E MATERIAIS",
    ["CF/88, art. 5º, V e X", "Código Civil, arts. 186, 187 e 927"],
    [
      "Aquele que, por ação ou omissão voluntária, negligência ou imprudência, violar direito e causar dano a outrem, ainda que exclusivamente moral, comete ato ilícito e fica obrigado a repará-lo (arts. 186 e 927 do Código Civil).",
      "Estão presentes os elementos da responsabilidade civil: conduta, dano, nexo causal e, no que couber, culpa, conforme demonstra a prova documental acostada.",
      "O arbitramento do dano moral deve observar o caráter compensatório e pedagógico, considerando a extensão do dano, a capacidade econômica do ofensor e a vedação ao enriquecimento sem causa.",
    ],
    [
      "a condenação do(a) requerido(a) ao pagamento de indenização por danos morais em valor não inferior a R$ {{danoMoral}}",
      "a condenação do(a) requerido(a) ao pagamento de indenização por danos materiais no montante de R$ {{danoMaterial}}, devidamente comprovado nos autos",
    ],
    [
      { id: "danoMoral", label: "Valor pretendido de dano moral (R$)", tipo: "text", placeholder: "20.000,00" },
      { id: "danoMaterial", label: "Valor do dano material (R$)", tipo: "text", placeholder: "4.300,00" },
    ],
  ),
  p(
    "despejo-falta-pagamento",
    "Ação de Despejo por Falta de Pagamento c/c Cobrança",
    "Cível",
    "Retomada do imóvel locado com cobrança dos aluguéis e encargos em atraso.",
    "EXCELENTÍSSIMO(A) SENHOR(A) DOUTOR(A) JUIZ(ÍZA) DE DIREITO DA ___ VARA CÍVEL DA COMARCA DE {{comarca}}",
    "AÇÃO DE DESPEJO POR FALTA DE PAGAMENTO CUMULADA COM COBRANÇA DE ALUGUÉIS E ENCARGOS",
    ["Lei nº 8.245/1991, arts. 9º, III, 59, §1º, IX, e 62"],
    [
      "A locação pode ser desfeita em razão da falta de pagamento do aluguel e demais encargos, nos termos do art. 9º, III, da Lei nº 8.245/1991.",
      "É lícita a cumulação do pedido de despejo com o de cobrança dos aluguéis e acessórios vencidos e vincendos até a efetiva desocupação, conforme art. 62, I, da Lei do Inquilinato.",
      "Ausente caução ou garantia idônea, requer-se a concessão de liminar para desocupação em quinze dias, na forma do art. 59, §1º, IX, da mesma lei.",
    ],
    [
      "a concessão de liminar para desocupação do imóvel no prazo de 15 (quinze) dias, mediante prestação de caução, se exigida",
      "a decretação do despejo do(a) locatário(a) do imóvel situado em {{imovel}}",
      "a condenação ao pagamento dos aluguéis e encargos vencidos, no valor de R$ {{atraso}}, e dos vincendos até a efetiva desocupação",
    ],
    [
      { id: "imovel", label: "Endereço do imóvel locado", tipo: "text", placeholder: "Rua das Acácias, nº 45, apto. 12" },
      { id: "atraso", label: "Valor em atraso (R$)", tipo: "text", placeholder: "9.600,00" },
    ],
  ),

  // ---------------- Trabalhista ----------------
  p(
    "reclamacao-trabalhista",
    "Reclamação Trabalhista",
    "Trabalhista",
    "Pedido de verbas rescisórias e demais direitos decorrentes do contrato de trabalho.",
    "EXCELENTÍSSIMO(A) SENHOR(A) DOUTOR(A) JUIZ(ÍZA) DO TRABALHO DA ___ VARA DO TRABALHO DE {{comarca}}",
    "RECLAMAÇÃO TRABALHISTA",
    ["CLT, arts. 477, 487 e 840", "Súmulas do TST aplicáveis"],
    [
      "O contrato de trabalho vigorou de {{admissao}} a {{demissao}}, na função de {{funcao}}, mediante última remuneração de R$ {{salario}}.",
      "Rescindido o contrato, cabe à empregadora o pagamento integral das verbas rescisórias no prazo do art. 477, §6º, da CLT, sob pena da multa prevista no §8º do mesmo artigo.",
      "Os documentos e a prova oral demonstrarão a irregularidade apontada, invertendo-se o ônus quanto aos controles de jornada e registros que competem exclusivamente à empregadora.",
    ],
    [
      "o pagamento das verbas rescisórias: saldo de salário, aviso prévio, 13º salário proporcional, férias proporcionais acrescidas de 1/3 e FGTS com multa de 40%",
      "o pagamento das horas extras excedentes à 8ª diária e 44ª semanal, com adicional de 50% e reflexos",
      "a aplicação da multa do art. 477, §8º, da CLT",
    ],
    [
      { id: "funcao", label: "Função exercida", tipo: "text", placeholder: "Auxiliar administrativo" },
      { id: "admissao", label: "Data de admissão", tipo: "date" },
      { id: "demissao", label: "Data da dispensa", tipo: "date" },
      { id: "salario", label: "Último salário (R$)", tipo: "text", placeholder: "2.400,00" },
    ],
  ),
  p(
    "contestacao-trabalhista",
    "Contestação Trabalhista",
    "Trabalhista",
    "Defesa da empresa reclamada com preliminares e impugnação dos pedidos.",
    "EXCELENTÍSSIMO(A) SENHOR(A) DOUTOR(A) JUIZ(ÍZA) DO TRABALHO DA ___ VARA DO TRABALHO DE {{comarca}}",
    "CONTESTAÇÃO",
    ["CLT, arts. 818 e 847", "CPC, arts. 336 e 337, de aplicação subsidiária"],
    [
      "Nos autos do processo nº {{processo}}, a reclamada apresenta defesa impugnando especificamente cada um dos pedidos formulados na inicial.",
      "Prescrição: requer-se o reconhecimento da prescrição quinquenal das parcelas anteriores a cinco anos do ajuizamento, nos termos do art. 7º, XXIX, da Constituição Federal.",
      "No mérito, os fatos narrados não correspondem à realidade contratual, sendo do reclamante o ônus da prova quanto aos fatos constitutivos do seu direito (art. 818, I, da CLT).",
    ],
    [
      "o acolhimento das preliminares arguidas, com a extinção do feito sem resolução de mérito",
      "o reconhecimento da prescrição quinquenal",
      "no mérito, a total improcedência dos pedidos formulados na reclamação trabalhista",
    ],
    [
      { id: "processo", label: "Número do processo", tipo: "text", placeholder: "0000000-00.2026.5.02.0000" },
      { id: "reclamante", label: "Nome do reclamante", tipo: "text" },
    ],
  ),
  p(
    "rescisao-indireta",
    "Reclamação com Pedido de Rescisão Indireta",
    "Trabalhista",
    "Reconhecimento da falta grave do empregador e rescisão por justa causa patronal.",
    "EXCELENTÍSSIMO(A) SENHOR(A) DOUTOR(A) JUIZ(ÍZA) DO TRABALHO DA ___ VARA DO TRABALHO DE {{comarca}}",
    "RECLAMAÇÃO TRABALHISTA COM PEDIDO DE RESCISÃO INDIRETA DO CONTRATO DE TRABALHO",
    ["CLT, art. 483"],
    [
      "A conduta patronal descrita configura falta grave apta a autorizar a rescisão indireta do contrato de trabalho, nos moldes do art. 483 da CLT.",
      "A gravidade e a reiteração da conduta tornam insustentável a manutenção do vínculo, equiparando-se a rescisão à dispensa imotivada para todos os efeitos legais.",
      "Assim, são devidas ao reclamante todas as verbas próprias da dispensa sem justa causa.",
    ],
    [
      "a declaração da rescisão indireta do contrato de trabalho, com fundamento no art. 483, alínea \"{{alinea}}\", da CLT",
      "o pagamento de todas as verbas rescisórias devidas na dispensa imotivada, inclusive aviso prévio e multa de 40% do FGTS",
      "a expedição de alvará para saque do FGTS e a liberação das guias do seguro-desemprego",
    ],
    [
      { id: "alinea", label: "Alínea do art. 483 aplicável", tipo: "text", placeholder: "d" },
      { id: "funcao", label: "Função exercida", tipo: "text" },
    ],
  ),

  // ---------------- Família e Sucessões ----------------
  p(
    "divorcio-consensual",
    "Divórcio Consensual",
    "Família e Sucessões",
    "Dissolução do casamento por acordo, com partilha, guarda e alimentos.",
    "EXCELENTÍSSIMO(A) SENHOR(A) DOUTOR(A) JUIZ(ÍZA) DE DIREITO DA ___ VARA DE FAMÍLIA E SUCESSÕES DA COMARCA DE {{comarca}}",
    "AÇÃO DE DIVÓRCIO CONSENSUAL",
    ["CF/88, art. 226, §6º", "CPC, arts. 731 e ss."],
    [
      "As partes contraíram matrimônio em {{casamento}}, sob o regime de {{regime}}, conforme certidão anexa.",
      "A Emenda Constitucional nº 66/2010 suprimiu qualquer requisito temporal ou de discussão de culpa para a decretação do divórcio, bastando a manifestação de vontade.",
      "Os requerentes ajustaram, de forma livre e consciente, as cláusulas relativas à partilha de bens, ao nome, à guarda e aos alimentos, nada mais tendo a reclamar um do outro.",
    ],
    [
      "a homologação do acordo e a decretação do divórcio do casal",
      "a partilha dos bens na forma ajustada: {{partilha}}",
      "a fixação da guarda {{guarda}} dos filhos menores e de alimentos no valor de {{alimentos}}",
      "a expedição do mandado de averbação ao Cartório de Registro Civil competente",
    ],
    [
      { id: "casamento", label: "Data do casamento", tipo: "date" },
      { id: "regime", label: "Regime de bens", tipo: "text", placeholder: "comunhão parcial de bens" },
      { id: "partilha", label: "Descrição da partilha", tipo: "textarea" },
      { id: "guarda", label: "Modalidade de guarda", tipo: "text", placeholder: "compartilhada" },
      { id: "alimentos", label: "Alimentos ajustados", tipo: "text", placeholder: "30% do salário mínimo" },
    ],
  ),
  p(
    "acao-alimentos",
    "Ação de Alimentos",
    "Família e Sucessões",
    "Fixação de pensão alimentícia com pedido de alimentos provisórios.",
    "EXCELENTÍSSIMO(A) SENHOR(A) DOUTOR(A) JUIZ(ÍZA) DE DIREITO DA ___ VARA DE FAMÍLIA DA COMARCA DE {{comarca}}",
    "AÇÃO DE ALIMENTOS COM PEDIDO DE ALIMENTOS PROVISÓRIOS",
    ["Lei nº 5.478/1968", "Código Civil, arts. 1.694 a 1.710"],
    [
      "A obrigação alimentar decorre do poder familiar e do dever de sustento, devendo ser fixada na proporção das necessidades do alimentando e dos recursos do alimentante (art. 1.694, §1º, do Código Civil).",
      "Comprovado o vínculo de parentesco pela certidão anexa, impõe-se a fixação de alimentos provisórios desde logo, na forma do art. 4º da Lei nº 5.478/1968.",
      "As despesas mensais do alimentando com moradia, alimentação, saúde, educação e vestuário justificam o percentual pleiteado.",
    ],
    [
      "a fixação de alimentos provisórios no importe de {{provisorios}}, desde a citação",
      "ao final, a fixação de alimentos definitivos em {{definitivos}}, com depósito até o dia {{diaPagamento}} de cada mês",
    ],
    [
      { id: "alimentando", label: "Nome do(a) alimentando(a)", tipo: "text" },
      { id: "provisorios", label: "Alimentos provisórios pretendidos", tipo: "text", placeholder: "30% dos rendimentos líquidos" },
      { id: "definitivos", label: "Alimentos definitivos pretendidos", tipo: "text", placeholder: "30% dos rendimentos líquidos" },
      { id: "diaPagamento", label: "Dia do pagamento", tipo: "text", placeholder: "10" },
    ],
  ),
  p(
    "inventario-partilha",
    "Petição Inicial de Inventário e Partilha",
    "Família e Sucessões",
    "Abertura de inventário judicial com nomeação de inventariante e partilha do acervo.",
    "EXCELENTÍSSIMO(A) SENHOR(A) DOUTOR(A) JUIZ(ÍZA) DE DIREITO DA ___ VARA DE SUCESSÕES DA COMARCA DE {{comarca}}",
    "PETIÇÃO INICIAL DE INVENTÁRIO E PARTILHA",
    ["CPC, arts. 610 e ss.", "Código Civil, arts. 1.784 e ss."],
    [
      "Faleceu em {{obito}} o(a) de cujus {{falecido}}, deixando bens a inventariar, conforme certidão de óbito anexa.",
      "Aberta a sucessão, a herança transmite-se desde logo aos herdeiros legítimos e testamentários (art. 1.784 do Código Civil), impondo-se a instauração do inventário.",
      "O(a) requerente reúne as condições legais para exercer a inventariança, nos termos do art. 617 do CPC.",
    ],
    [
      "a abertura do inventário dos bens deixados por {{falecido}}, com a nomeação do(a) requerente como inventariante e sua intimação para prestar compromisso",
      "as primeiras declarações no prazo legal, com posterior avaliação, cálculo do imposto e homologação da partilha entre os herdeiros: {{herdeiros}}",
    ],
    [
      { id: "falecido", label: "Nome do(a) falecido(a)", tipo: "text" },
      { id: "obito", label: "Data do óbito", tipo: "date" },
      { id: "herdeiros", label: "Herdeiros", tipo: "textarea" },
      { id: "bens", label: "Bens a inventariar", tipo: "textarea" },
    ],
  ),

  // ---------------- Penal ----------------
  p(
    "habeas-corpus",
    "Habeas Corpus",
    "Penal",
    "Impetração com pedido de liminar contra constrangimento ilegal à liberdade de locomoção.",
    "EXCELENTÍSSIMO(A) SENHOR(A) DESEMBARGADOR(A) PRESIDENTE DO EGRÉGIO TRIBUNAL DE JUSTIÇA",
    "HABEAS CORPUS COM PEDIDO DE LIMINAR",
    ["CF/88, art. 5º, LXVIII", "CPP, arts. 647 e 648"],
    [
      "O paciente {{paciente}} sofre constrangimento ilegal em sua liberdade de locomoção por ato da autoridade coatora {{autoridade}}, nos autos nº {{processo}}.",
      "A decisão impugnada carece de fundamentação idônea e concreta, limitando-se a referências genéricas à gravidade abstrata do delito, em desacordo com o art. 315, §2º, do CPP.",
      "Presentes o fumus boni iuris e o periculum in mora, impõe-se a concessão da liminar, sob pena de manutenção de prisão manifestamente ilegal.",
    ],
    [
      "a concessão de liminar para expedição de alvará de soltura em favor do paciente, ou a substituição da prisão preventiva por medidas cautelares diversas",
      "a requisição de informações à autoridade coatora e, ao final, a concessão definitiva da ordem",
    ],
    [
      { id: "paciente", label: "Nome do paciente", tipo: "text" },
      { id: "autoridade", label: "Autoridade coatora", tipo: "text", placeholder: "Juízo da 2ª Vara Criminal de ..." },
      { id: "processo", label: "Número do processo de origem", tipo: "text" },
    ],
  ),
  p(
    "resposta-acusacao",
    "Resposta à Acusação",
    "Penal",
    "Defesa preliminar do art. 396-A do CPP, com teses de absolvição sumária.",
    "EXCELENTÍSSIMO(A) SENHOR(A) DOUTOR(A) JUIZ(ÍZA) DE DIREITO DA ___ VARA CRIMINAL DA COMARCA DE {{comarca}}",
    "RESPOSTA À ACUSAÇÃO",
    ["CPP, arts. 396-A e 397"],
    [
      "Nos autos da ação penal nº {{processo}}, o(a) acusado(a) apresenta resposta à acusação, arguindo preliminares e teses de absolvição sumária.",
      "A denúncia é inepta na medida em que não descreve de forma individualizada a conduta imputada, prejudicando o exercício da ampla defesa.",
      "Não há justa causa para a ação penal, pois os elementos informativos colhidos no inquérito não constituem lastro probatório mínimo de autoria e materialidade.",
    ],
    [
      "o reconhecimento da inépcia da denúncia e a rejeição da peça acusatória",
      "subsidiariamente, a absolvição sumária nos termos do art. 397 do CPP",
      "não sendo esse o entendimento, o prosseguimento do feito com a oitiva das testemunhas arroladas: {{testemunhas}}",
    ],
    [
      { id: "processo", label: "Número da ação penal", tipo: "text" },
      { id: "acusado", label: "Nome do(a) acusado(a)", tipo: "text" },
      { id: "testemunhas", label: "Rol de testemunhas", tipo: "textarea" },
    ],
  ),
  p(
    "liberdade-provisoria",
    "Pedido de Liberdade Provisória",
    "Penal",
    "Requerimento de soltura com ou sem fiança e aplicação de medidas cautelares diversas.",
    "EXCELENTÍSSIMO(A) SENHOR(A) DOUTOR(A) JUIZ(ÍZA) DE DIREITO DA ___ VARA CRIMINAL DA COMARCA DE {{comarca}}",
    "PEDIDO DE LIBERDADE PROVISÓRIA COM APLICAÇÃO DE MEDIDAS CAUTELARES DIVERSAS DA PRISÃO",
    ["CPP, arts. 310, 319 e 321", "CF/88, art. 5º, LVII e LXVI"],
    [
      "O(a) requerente foi preso(a) em flagrante/preventivamente em {{prisao}}, pela suposta prática do delito previsto em {{crime}}.",
      "A prisão cautelar é medida excepcional; ausentes os requisitos do art. 312 do CPP, a liberdade é a regra, em respeito à presunção de inocência.",
      "O(a) requerente é primário(a), possui bons antecedentes, residência fixa e ocupação lícita, sendo suficientes as medidas cautelares do art. 319 do CPP.",
    ],
    [
      "a concessão da liberdade provisória, com a imediata expedição de alvará de soltura",
      "a aplicação, se necessário, de medidas cautelares diversas da prisão, como comparecimento periódico em juízo e proibição de ausentar-se da comarca",
    ],
    [
      { id: "prisao", label: "Data da prisão", tipo: "date" },
      { id: "crime", label: "Tipificação imputada", tipo: "text", placeholder: "art. 155, caput, do Código Penal" },
    ],
  ),

  // ---------------- Consumidor ----------------
  p(
    "inscricao-indevida",
    "Ação Declaratória de Inexistência de Débito c/c Danos Morais",
    "Consumidor",
    "Inscrição indevida em cadastro de inadimplentes, com pedido de tutela de urgência.",
    "EXCELENTÍSSIMO(A) SENHOR(A) DOUTOR(A) JUIZ(ÍZA) DE DIREITO DA ___ VARA CÍVEL DA COMARCA DE {{comarca}}",
    "AÇÃO DECLARATÓRIA DE INEXISTÊNCIA DE DÉBITO CUMULADA COM INDENIZAÇÃO POR DANOS MORAIS E PEDIDO DE TUTELA DE URGÊNCIA",
    ["CDC, arts. 6º, VIII, 14 e 43", "CPC, art. 300", "Súmula 385 do STJ"],
    [
      "A relação é de consumo, aplicando-se o Código de Defesa do Consumidor e a inversão do ônus da prova diante da verossimilhança das alegações e da hipossuficiência técnica do consumidor.",
      "A negativação em razão de débito inexistente, no valor de R$ {{valorNegativado}}, junto ao órgão {{orgao}}, configura falha na prestação do serviço e enseja responsabilidade objetiva do fornecedor (art. 14 do CDC).",
      "O dano moral, no caso, é in re ipsa, prescindindo de prova do abalo, conforme jurisprudência pacífica do Superior Tribunal de Justiça.",
    ],
    [
      "a concessão de tutela de urgência para exclusão imediata do nome do(a) autor(a) dos cadastros restritivos de crédito, sob pena de multa diária",
      "a declaração de inexistência do débito no valor de R$ {{valorNegativado}}",
      "a condenação da ré ao pagamento de indenização por danos morais em valor não inferior a R$ {{danoMoral}}",
      "a inversão do ônus da prova, nos termos do art. 6º, VIII, do CDC",
    ],
    [
      { id: "valorNegativado", label: "Valor negativado (R$)", tipo: "text", placeholder: "1.250,00" },
      { id: "orgao", label: "Órgão de restrição", tipo: "text", placeholder: "SERASA" },
      { id: "danoMoral", label: "Dano moral pretendido (R$)", tipo: "text", placeholder: "15.000,00" },
    ],
  ),
  p(
    "vicio-produto",
    "Ação de Obrigação de Fazer por Vício do Produto",
    "Consumidor",
    "Substituição, reparo ou restituição por vício de qualidade do produto ou serviço.",
    "EXCELENTÍSSIMO(A) SENHOR(A) DOUTOR(A) JUIZ(ÍZA) DE DIREITO DA ___ VARA CÍVEL DA COMARCA DE {{comarca}}",
    "AÇÃO DE OBRIGAÇÃO DE FAZER CUMULADA COM INDENIZAÇÃO",
    ["CDC, arts. 18, 20 e 26"],
    [
      "O(a) autor(a) adquiriu o produto {{produto}} em {{compra}}, pelo valor de R$ {{valorProduto}}, conforme nota fiscal anexa.",
      "Constatado o vício, o fornecedor não o sanou no prazo de 30 dias previsto no art. 18, §1º, do CDC, abrindo-se ao consumidor as alternativas legais de substituição, restituição ou abatimento.",
      "Todos os fornecedores da cadeia de consumo respondem solidariamente pelos vícios de qualidade do produto.",
    ],
    [
      "a condenação da ré à substituição do produto por outro da mesma espécie, em perfeitas condições de uso, no prazo de 10 dias, sob pena de multa diária",
      "alternativamente, a restituição imediata da quantia paga, corrigida monetariamente",
      "a condenação ao pagamento de indenização pelos danos morais suportados",
    ],
    [
      { id: "produto", label: "Produto ou serviço", tipo: "text" },
      { id: "compra", label: "Data da compra", tipo: "date" },
      { id: "valorProduto", label: "Valor pago (R$)", tipo: "text" },
    ],
  ),
  p(
    "revisional-contrato",
    "Ação Revisional de Contrato Bancário",
    "Consumidor",
    "Revisão de cláusulas abusivas e encargos excessivos em contrato de financiamento.",
    "EXCELENTÍSSIMO(A) SENHOR(A) DOUTOR(A) JUIZ(ÍZA) DE DIREITO DA ___ VARA CÍVEL DA COMARCA DE {{comarca}}",
    "AÇÃO REVISIONAL DE CONTRATO COM PEDIDO DE REPETIÇÃO DE INDÉBITO",
    ["CDC, arts. 6º, V, e 51", "Súmulas 297, 530 e 539 do STJ"],
    [
      "As instituições financeiras submetem-se ao Código de Defesa do Consumidor, conforme Súmula 297 do STJ.",
      "O contrato nº {{contrato}}, firmado em {{dataContrato}}, no valor de R$ {{valorContrato}}, contém encargos abusivos, notadamente capitalização indevida de juros e cobrança de tarifas sem previsão legal.",
      "Verificada a abusividade, impõe-se a revisão das cláusulas e a devolução dos valores pagos a maior, na forma do art. 42, parágrafo único, do CDC.",
    ],
    [
      "a revisão das cláusulas contratuais abusivas, com o recálculo do saldo devedor e exclusão dos encargos indevidos",
      "a repetição do indébito dos valores cobrados a maior",
      "a realização de perícia contábil para apuração dos valores",
    ],
    [
      { id: "contrato", label: "Número do contrato", tipo: "text" },
      { id: "dataContrato", label: "Data do contrato", tipo: "date" },
      { id: "valorContrato", label: "Valor financiado (R$)", tipo: "text" },
    ],
  ),

  // ---------------- Previdenciário ----------------
  p(
    "aposentadoria-idade",
    "Ação de Concessão de Aposentadoria",
    "Previdenciário",
    "Concessão de benefício previdenciário negado administrativamente pelo INSS.",
    "EXCELENTÍSSIMO(A) SENHOR(A) DOUTOR(A) JUIZ(ÍZA) FEDERAL DA ___ VARA FEDERAL DA SUBSEÇÃO JUDICIÁRIA DE {{comarca}}",
    "AÇÃO PREVIDENCIÁRIA DE CONCESSÃO DE BENEFÍCIO",
    ["Lei nº 8.213/1991", "EC nº 103/2019", "Decreto nº 3.048/1999"],
    [
      "O(a) autor(a) requereu administrativamente o benefício de {{beneficio}} em {{der}}, sob o NB {{nb}}, tendo o pedido sido indeferido pelo INSS.",
      "A documentação anexa (CNIS, CTPS e demais provas) demonstra o preenchimento dos requisitos de carência, tempo de contribuição e idade exigidos pela legislação de regência.",
      "Preenchidos os requisitos legais, o benefício é devido desde a data do requerimento administrativo, com o pagamento das parcelas vencidas acrescidas de correção e juros.",
    ],
    [
      "a concessão do benefício de {{beneficio}} desde a DER em {{der}}, com implantação em 30 dias",
      "o pagamento das parcelas vencidas desde a DER, corrigidas monetariamente e acrescidas de juros de mora",
      "a concessão dos benefícios da justiça gratuita",
    ],
    [
      { id: "beneficio", label: "Benefício pretendido", tipo: "text", placeholder: "aposentadoria por idade urbana" },
      { id: "der", label: "Data do requerimento (DER)", tipo: "date" },
      { id: "nb", label: "Número do benefício (NB)", tipo: "text" },
    ],
  ),
  p(
    "auxilio-doenca",
    "Ação de Restabelecimento de Auxílio por Incapacidade Temporária",
    "Previdenciário",
    "Restabelecimento de benefício por incapacidade com pedido de tutela de urgência.",
    "EXCELENTÍSSIMO(A) SENHOR(A) DOUTOR(A) JUIZ(ÍZA) FEDERAL DA ___ VARA FEDERAL DA SUBSEÇÃO JUDICIÁRIA DE {{comarca}}",
    "AÇÃO DE RESTABELECIMENTO DE BENEFÍCIO POR INCAPACIDADE COM PEDIDO DE TUTELA DE URGÊNCIA",
    ["Lei nº 8.213/1991, arts. 42, 59 e 60", "CPC, art. 300"],
    [
      "O(a) autor(a) é segurado(a) da Previdência Social e recebia o benefício NB {{nb}}, cessado em {{cessacao}}, apesar da persistência da incapacidade laborativa.",
      "Os laudos e exames médicos anexos atestam que o(a) autor(a) permanece incapaz para o exercício de sua atividade habitual de {{atividade}}.",
      "A natureza alimentar do benefício e o risco à subsistência autorizam a concessão da tutela de urgência (art. 300 do CPC).",
    ],
    [
      "a concessão de tutela de urgência para restabelecimento imediato do benefício",
      "a realização de perícia médica judicial",
      "ao final, o restabelecimento definitivo do benefício desde a cessação indevida, com pagamento dos atrasados",
    ],
    [
      { id: "nb", label: "Número do benefício (NB)", tipo: "text" },
      { id: "cessacao", label: "Data da cessação", tipo: "date" },
      { id: "atividade", label: "Atividade habitual", tipo: "text" },
    ],
  ),
  p(
    "bpc-loas",
    "Ação de Concessão de Benefício Assistencial (BPC/LOAS)",
    "Previdenciário",
    "Benefício de prestação continuada à pessoa idosa ou com deficiência.",
    "EXCELENTÍSSIMO(A) SENHOR(A) DOUTOR(A) JUIZ(ÍZA) FEDERAL DA ___ VARA FEDERAL DA SUBSEÇÃO JUDICIÁRIA DE {{comarca}}",
    "AÇÃO DE CONCESSÃO DE BENEFÍCIO DE PRESTAÇÃO CONTINUADA",
    ["CF/88, art. 203, V", "Lei nº 8.742/1993, art. 20"],
    [
      "O(a) autor(a) é {{condicao}} e não possui meios de prover a própria manutenção nem de tê-la provida por sua família.",
      "O grupo familiar é composto por {{grupoFamiliar}}, com renda mensal per capita inferior ao limite legal, conforme documentos e CadÚnico anexos.",
      "O Supremo Tribunal Federal admite a aferição da miserabilidade por outros meios de prova, não se limitando ao critério objetivo de renda.",
    ],
    [
      "a realização de perícia médica e de estudo socioeconômico",
      "a concessão do benefício assistencial de um salário mínimo mensal desde a DER",
      "a concessão da justiça gratuita e da prioridade de tramitação",
    ],
    [
      { id: "condicao", label: "Condição (idoso/pessoa com deficiência)", tipo: "text" },
      { id: "grupoFamiliar", label: "Composição do grupo familiar", tipo: "textarea" },
    ],
  ),

  // ---------------- Tributário ----------------
  p(
    "mandado-seguranca-tributario",
    "Mandado de Segurança em Matéria Tributária",
    "Tributário",
    "Impugnação de exigência fiscal ilegal com pedido de liminar.",
    "EXCELENTÍSSIMO(A) SENHOR(A) DOUTOR(A) JUIZ(ÍZA) FEDERAL DA ___ VARA FEDERAL DA SUBSEÇÃO JUDICIÁRIA DE {{comarca}}",
    "MANDADO DE SEGURANÇA COM PEDIDO DE LIMINAR",
    ["CF/88, art. 5º, LXIX", "Lei nº 12.016/2009", "CTN, arts. 151, IV, e 165"],
    [
      "A impetrante sofre ameaça de lesão a direito líquido e certo em razão da exigência de {{tributo}} pela autoridade impetrada {{autoridade}}.",
      "A cobrança viola o princípio da legalidade tributária e a orientação consolidada dos tribunais superiores sobre a matéria.",
      "Presentes o fumus boni iuris e o periculum in mora, impõe-se a concessão de liminar para suspender a exigibilidade do crédito tributário (art. 151, IV, do CTN).",
    ],
    [
      "a concessão de liminar para suspender a exigibilidade do crédito tributário relativo a {{tributo}}",
      "a notificação da autoridade coatora para prestar informações e a ciência ao órgão de representação judicial",
      "ao final, a concessão definitiva da segurança, assegurando o direito à compensação/restituição dos valores recolhidos indevidamente",
    ],
    [
      { id: "tributo", label: "Tributo discutido", tipo: "text", placeholder: "ICMS na base de cálculo do PIS/COFINS" },
      { id: "autoridade", label: "Autoridade coatora", tipo: "text", placeholder: "Delegado da Receita Federal em ..." },
    ],
  ),
  p(
    "embargos-execucao-fiscal",
    "Embargos à Execução Fiscal",
    "Tributário",
    "Defesa do executado em execução fiscal, após garantia do juízo.",
    "EXCELENTÍSSIMO(A) SENHOR(A) DOUTOR(A) JUIZ(ÍZA) DE DIREITO DA ___ VARA DE EXECUÇÕES FISCAIS DA COMARCA DE {{comarca}}",
    "EMBARGOS À EXECUÇÃO FISCAL",
    ["Lei nº 6.830/1980, art. 16", "CTN, arts. 156 e 174"],
    [
      "Nos autos da execução fiscal nº {{processo}}, garantido o juízo, o embargante opõe os presentes embargos.",
      "A CDA que instrui a execução não atende aos requisitos do art. 2º, §5º, da LEF, o que compromete sua liquidez e certeza e acarreta nulidade do título.",
      "Ademais, operou-se a prescrição do crédito tributário, nos termos do art. 174 do CTN, considerando o decurso de mais de cinco anos da constituição definitiva.",
    ],
    [
      "o recebimento dos embargos com efeito suspensivo",
      "a declaração de nulidade da CDA e a extinção da execução fiscal",
      "subsidiariamente, o reconhecimento da prescrição do crédito tributário",
    ],
    [
      { id: "processo", label: "Número da execução fiscal", tipo: "text" },
      { id: "cda", label: "Número da CDA", tipo: "text" },
    ],
  ),
  p(
    "repeticao-indebito-tributario",
    "Ação de Repetição de Indébito Tributário",
    "Tributário",
    "Restituição de tributo pago indevidamente ou a maior.",
    "EXCELENTÍSSIMO(A) SENHOR(A) DOUTOR(A) JUIZ(ÍZA) DA ___ VARA DA FAZENDA PÚBLICA DA COMARCA DE {{comarca}}",
    "AÇÃO DE REPETIÇÃO DE INDÉBITO TRIBUTÁRIO",
    ["CTN, arts. 165, 167 e 168"],
    [
      "O(a) autor(a) recolheu indevidamente o tributo {{tributo}}, no período de {{periodo}}, no montante de R$ {{valorPago}}.",
      "O art. 165 do CTN assegura ao sujeito passivo o direito à restituição total ou parcial do tributo pago indevidamente, independentemente de prévio protesto.",
      "A restituição deve ser acrescida de correção monetária desde o pagamento indevido e de juros de mora a partir do trânsito em julgado (Súmulas 162 e 188 do STJ).",
    ],
    [
      "a condenação da ré à restituição do valor de R$ {{valorPago}}, corrigido monetariamente e acrescido de juros",
      "alternativamente, o reconhecimento do direito à compensação com tributos da mesma espécie",
    ],
    [
      { id: "tributo", label: "Tributo recolhido", tipo: "text" },
      { id: "periodo", label: "Período de recolhimento", tipo: "text", placeholder: "01/2021 a 12/2024" },
      { id: "valorPago", label: "Valor pago indevidamente (R$)", tipo: "text" },
    ],
  ),

  // ---------------- Empresarial ----------------
  p(
    "execucao-titulo-extrajudicial",
    "Execução de Título Executivo Extrajudicial",
    "Empresarial",
    "Cobrança executiva de duplicata, nota promissória, cheque ou contrato assinado.",
    "EXCELENTÍSSIMO(A) SENHOR(A) DOUTOR(A) JUIZ(ÍZA) DE DIREITO DA ___ VARA CÍVEL DA COMARCA DE {{comarca}}",
    "AÇÃO DE EXECUÇÃO DE TÍTULO EXECUTIVO EXTRAJUDICIAL",
    ["CPC, arts. 784, 786 e 824 e ss."],
    [
      "O(a) exequente é credor(a) do(a) executado(a) da quantia de R$ {{valorTitulo}}, representada por {{titulo}}, com vencimento em {{vencimento}}.",
      "O título é líquido, certo e exigível, preenchendo os requisitos do art. 783 do CPC, e não foi honrado no vencimento.",
      "Requer-se a citação para pagamento em três dias, com o benefício da redução dos honorários pela metade em caso de pagamento integral (art. 827, §1º, do CPC).",
    ],
    [
      "a citação do(a) executado(a) para pagar a dívida de R$ {{valorTitulo}} no prazo de 3 (três) dias, sob pena de penhora",
      "não havendo pagamento, a penhora e avaliação de bens suficientes, inclusive por meio dos sistemas SISBAJUD e RENAJUD",
      "a fixação de honorários advocatícios em 10% sobre o valor da execução",
    ],
    [
      { id: "titulo", label: "Espécie do título", tipo: "text", placeholder: "duplicata mercantil nº 123" },
      { id: "valorTitulo", label: "Valor do título (R$)", tipo: "text" },
      { id: "vencimento", label: "Vencimento", tipo: "date" },
    ],
  ),
  p(
    "dissolucao-parcial-sociedade",
    "Ação de Dissolução Parcial de Sociedade",
    "Empresarial",
    "Retirada ou exclusão de sócio com apuração de haveres.",
    "EXCELENTÍSSIMO(A) SENHOR(A) DOUTOR(A) JUIZ(ÍZA) DE DIREITO DA ___ VARA EMPRESARIAL DA COMARCA DE {{comarca}}",
    "AÇÃO DE DISSOLUÇÃO PARCIAL DE SOCIEDADE COM APURAÇÃO DE HAVERES",
    ["CPC, arts. 599 a 609", "Código Civil, arts. 1.028 a 1.031"],
    [
      "O(a) autor(a) integra o quadro societário da empresa {{sociedade}}, CNPJ {{cnpj}}, detendo {{participacao}} do capital social.",
      "A quebra da affectio societatis torna inviável a continuidade do vínculo societário, autorizando a dissolução parcial nos termos do art. 599 do CPC.",
      "A apuração de haveres deve observar o critério do contrato social e, na sua omissão, o valor patrimonial apurado em balanço de determinação (art. 606 do CPC).",
    ],
    [
      "a decretação da dissolução parcial da sociedade, com a retirada do(a) autor(a) do quadro societário",
      "a apuração de haveres mediante perícia contábil, com balanço de determinação na data da resolução",
      "a condenação da sociedade ao pagamento dos haveres apurados, corrigidos monetariamente",
    ],
    [
      { id: "sociedade", label: "Razão social", tipo: "text" },
      { id: "cnpj", label: "CNPJ", tipo: "text" },
      { id: "participacao", label: "Participação societária", tipo: "text", placeholder: "40%" },
    ],
  ),
  p(
    "recuperacao-judicial",
    "Pedido de Recuperação Judicial",
    "Empresarial",
    "Petição inicial de recuperação judicial com pedido de processamento.",
    "EXCELENTÍSSIMO(A) SENHOR(A) DOUTOR(A) JUIZ(ÍZA) DE DIREITO DA ___ VARA DE FALÊNCIAS E RECUPERAÇÕES JUDICIAIS DA COMARCA DE {{comarca}}",
    "PEDIDO DE RECUPERAÇÃO JUDICIAL",
    ["Lei nº 11.101/2005, arts. 47, 48, 51 e 52"],
    [
      "A requerente {{sociedade}}, CNPJ {{cnpj}}, exerce regularmente suas atividades há mais de dois anos e atravessa crise econômico-financeira reversível.",
      "O passivo sujeito à recuperação totaliza R$ {{passivo}}, distribuído entre as classes de credores relacionadas na documentação do art. 51 da Lei nº 11.101/2005.",
      "A recuperação judicial busca viabilizar a superação da crise, preservando a empresa, sua função social e os empregos gerados (art. 47).",
    ],
    [
      "o deferimento do processamento da recuperação judicial, com a nomeação de administrador judicial",
      "a suspensão das execuções contra a devedora pelo prazo do stay period",
      "a concessão de prazo de 60 dias para apresentação do plano de recuperação judicial",
    ],
    [
      { id: "sociedade", label: "Razão social", tipo: "text" },
      { id: "cnpj", label: "CNPJ", tipo: "text" },
      { id: "passivo", label: "Passivo sujeito (R$)", tipo: "text" },
    ],
  ),
];

export function getPeticao(id: string) {
  return PETICOES.find((x) => x.id === id);
}

function preencher(texto: string, v: Record<string, string>) {
  return texto.replace(/\{\{(\w+)\}\}/g, (_, k: string) => {
    const val = v[k]?.trim();
    return val ? val : "____________";
  });
}

function dataExtenso(iso?: string) {
  if (!iso) return "____ de ______________ de ______";
  const d = new Date(`${iso}T12:00:00`);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString("pt-BR", { day: "2-digit", month: "long", year: "numeric" });
}

const ROMANOS = ["a)", "b)", "c)", "d)", "e)", "f)", "g)", "h)"];

export function gerarTexto(pet: Peticao, v: Record<string, string>): string {
  const preencherData = { ...v, data: dataExtenso(v['data']) };
  const t = (s: string) => preencher(s, preencherData);

  const partes: string[] = [];
  partes.push(t(pet.enderecamento));
  partes.push("");
  partes.push("");
  partes.push(
    `${t("{{autor}}")}, ${t("{{autorQual}}")}, por seu advogado que esta subscreve, com fundamento em ${pet.base.join("; ")}, vem, respeitosamente, à presença de Vossa Excelência propor a presente`,
  );
  partes.push("");
  partes.push(t(pet.cabecalho));
  partes.push("");
  partes.push(`em face de ${t("{{reu}}")}, ${t("{{reuQual}}")}, pelos fatos e fundamentos a seguir expostos.`);
  partes.push("");
  partes.push("I – DOS FATOS");
  partes.push("");
  partes.push(t("{{fatos}}"));
  partes.push("");
  partes.push("II – DO DIREITO");
  partes.push("");
  pet.fundamentos.forEach((f) => {
    partes.push(t(f));
    partes.push("");
  });
  partes.push("III – DOS PEDIDOS");
  partes.push("");
  partes.push("Ante o exposto, requer a Vossa Excelência:");
  partes.push("");
  pet.pedidos.forEach((ped, i) => {
    partes.push(`${ROMANOS[i] ?? `${i + 1})`} ${t(ped)};`);
  });
  partes.push("");
  partes.push(`Dá-se à causa o valor de R$ ${t("{{valor}}")}.`);
  partes.push("");
  partes.push("Nestes termos, pede deferimento.");
  partes.push("");
  partes.push(`${t("{{cidade}}")}, ${dataExtenso(v['data'])}.`);
  partes.push("");
  partes.push("");
  partes.push(t("{{advogado}}"));
  partes.push(t("{{oab}}"));

  return partes.join("\n");
}
