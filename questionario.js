// Cada questão guarda o enunciado, a resposta, os distratores e a explicação.
const questoes = [
    ['Qual componente busca, interpreta e executa as instruções de um programa?', 'CPU', ['RAM', 'SSD', 'Barramento de endereço'], 'A CPU é o processador. A RAM fornece as instruções, mas quem as executa é a CPU.'],
    ['Ao decodificar uma instrução, quem coordena o trabalho das outras partes da CPU?', 'Unidade de Controle', ['ULA', 'Cache', 'Registrador de dados'], 'A Unidade de Controle envia sinais que indicam, por exemplo, quando ler um valor ou iniciar uma soma.'],
    ['Um jogo precisa comparar dois placares. Qual unidade da CPU faz operações aritméticas e lógicas?', 'ULA', ['EEPROM', 'Unidade de Controle', 'Barramento de dados'], 'A ULA realiza operações como somar, subtrair e comparar valores.'],
    ['Uma instrução pede que a CPU some o conteúdo de R1 e R2. O que são R1 e R2?', 'Registradores', ['Setores do SSD', 'Blocos de flash', 'Canais de DMA'], 'Registradores guardam dentro da CPU os valores que uma instrução usa diretamente.'],
    ['Qual memória mantém os programas e os dados em uso e perde seu conteúdo quando falta energia?', 'RAM', ['ROM', 'Flash', 'EEPROM'], 'A RAM é volátil: precisa de energia para manter os dados.'],
    ['Por que a cache pode tornar um programa mais rápido?', 'Ela guarda cópias de dados perto da CPU', ['Ela aumenta a capacidade do SSD', 'Ela substitui a Unidade de Controle', 'Ela torna a RAM não volátil'], 'Quando a CPU encontra o dado na cache, evita esperar pela leitura na memória principal.'],
    ['Qual destes dispositivos é um exemplo de memória de massa?', 'SSD', ['Registrador', 'Cache L1', 'ULA'], 'O SSD armazena arquivos e programas por longo prazo, mesmo com o computador desligado.'],
    ['Qual tipo de memória é usado para guardar fotos em um pendrive?', 'Flash', ['Cache', 'RAM', 'Registrador'], 'A memória flash é regravável e conserva os dados sem energia.'],
    ['Um sensor precisa guardar um ajuste de calibração e permitir sua regravação elétrica. Qual opção atende a esses requisitos?', 'EEPROM', ['RAM', 'ROM gravada em fábrica e imutável', 'Registrador'], 'A EEPROM pode ser apagada e programada eletricamente e mantém a calibração depois que o sensor é desligado.'],
    ['O que significa a sigla ROM?', 'Memória somente de leitura', ['Memória de acesso aleatório', 'Memória de trabalho volátil', 'Memória de acesso direto por periféricos'], 'ROM vem de Read-Only Memory. Um uso clássico é guardar instruções fixas de um aparelho.'],
    ['Qual recurso permite a um periférico transferir um bloco de dados para a RAM sem a CPU copiar cada item?', 'DMA', ['ULA', 'ROM', 'Cache L1'], 'No acesso direto à memória (DMA), a CPU configura a operação e o controlador realiza a transferência.'],
    ['Em uma leitura da memória, o que o address bus transporta?', 'O endereço da posição a ser lida', ['O conteúdo lido nessa posição', 'A operação matemática a executar', 'A energia para a memória'], 'O barramento de endereço identifica o local. O conteúdo dessa posição passa pelo barramento de dados.'],
    ['A CPU quer gravar o valor 42 na posição 100. O que segue pelo barramento de dados?', '42', ['100', '142', 'O sinal de escrita'], '42 é o conteúdo; 100 é o endereço. O sinal de escrita indica à memória o que fazer.'],
    ['Qual é a ordem do ciclo básico de uma instrução?', 'Buscar, decodificar, executar', ['Executar, buscar, decodificar', 'Decodificar, executar, buscar', 'Buscar, executar, decodificar'], 'Primeiro a CPU obtém a instrução, depois identifica a operação e só então a executa.'],
    ['Um aluno salva um texto no SSD antes de desligar o computador. Por que pode abri-lo amanhã?', 'O SSD mantém os dados sem energia', ['A cache preserva o texto ao desligar', 'A RAM se transforma em ROM', 'A ULA memoriza o arquivo'], 'Salvar cria uma cópia em armazenamento não volátil. As alterações que ficaram apenas na RAM podem ser perdidas.'],
    ['Quando um aplicativo instalado no SSD é aberto, para onde normalmente vão as instruções em uso?', 'Para a RAM', ['Para a ROM de fábrica', 'Para o barramento de endereço como armazenamento', 'Para a EEPROM de configuração'], 'O sistema carrega na memória principal as partes necessárias do programa para que a CPU possa executá-las.'],
    ['Qual sequência vai do armazenamento mais próximo da execução na CPU até o armazenamento de massa?', 'Registradores → cache → RAM → SSD', ['RAM → SSD → cache → registradores', 'SSD → RAM → cache → registradores', 'Cache → SSD → registradores → RAM'], 'Registradores fornecem operandos diretamente; a cache aproxima dados da RAM; o SSD guarda arquivos de forma persistente.'],
    ['Qual situação é um acerto de cache?', 'O dado solicitado já está na cache', ['O arquivo foi salvo no SSD', 'A RAM perdeu seu conteúdo', 'O controlador iniciou um DMA'], 'Um acerto, ou hit, permite atender à solicitação naquele nível de cache.'],
    ['Quem normalmente inicia a configuração de uma transferência por DMA?', 'A CPU, executando instruções do driver', ['A ULA, comparando dois dados por conta própria', 'A ROM, gravando dados na cache', 'O barramento de endereço, escolhendo o arquivo'], 'A CPU informa parâmetros como endereço e tamanho. Usar DMA reduz o trabalho de cópia, mas ainda exige coordenação.'],
    ['Um barramento de endereço tem 4 bits. Quantas posições distintas ele pode identificar?', '16 posições', ['4 posições', '8 posições', '32 posições'], 'Cada bit pode ser 0 ou 1. Com quatro bits, há 2 × 2 × 2 × 2 = 16 endereços, de 0000 a 1111.']
];

const quiz = document.querySelector('#quiz');
const lista = document.querySelector('#questoes');
const placar = document.querySelector('#placar');

function embaralhar(alternativas) {
    for (let i = alternativas.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [alternativas[i], alternativas[j]] = [alternativas[j], alternativas[i]];
    }
    return alternativas;
}

function iniciarTentativa() {
    lista.replaceChildren();
    placar.hidden = true;
    quiz.querySelector('button').hidden = false;
    questoes.forEach(([enunciado, correta, distratores], indice) => {
        const campo = document.createElement('fieldset');
        const titulo = document.createElement('legend');
        titulo.textContent = `${indice + 1}. ${enunciado}`;
        campo.append(titulo);
        for (const alternativa of embaralhar([correta, ...distratores])) {
            const rotulo = document.createElement('label');
            const opcao = document.createElement('input');
            opcao.type = 'radio';
            opcao.name = `questao-${indice}`;
            opcao.value = alternativa;
            opcao.required = true;
            rotulo.append(opcao, alternativa);
            campo.append(rotulo);
        }
        lista.append(campo);
    });
}

quiz.addEventListener('submit', evento => {
    evento.preventDefault();
    if (!placar.hidden) return;
    let acertos = 0;
    questoes.forEach(([, correta, , explicacao], indice) => {
        const campo = lista.children[indice];
        const acertou = campo.querySelector(':checked').value === correta;
        if (acertou) acertos++;
        const comentario = document.createElement('p');
        comentario.className = acertou ? 'quiz-acerto' : 'quiz-erro';
        comentario.textContent = `${acertou ? 'Acertou!' : 'Errou.'} Resposta: ${correta}. ${explicacao}`;
        campo.append(comentario);
        campo.disabled = true;
    });
    const total = questoes.length;
    const percentual = Math.round(100 * acertos / total);
    document.querySelector('#pontuacao').textContent = `Acertos: ${acertos}/${total} (${percentual}%) · Erros: ${total - acertos}/${total} (${100 - percentual}%)`;
    quiz.querySelector('button').hidden = true;
    placar.hidden = false;
    placar.querySelector('h2').focus();
});

document.querySelector('#reiniciar').addEventListener('click', () => {
    iniciarTentativa();
    lista.querySelector('input').focus();
});
iniciarTentativa();
