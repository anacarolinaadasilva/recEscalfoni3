
const $ = id => document.getElementById(id);
const saida = (id, texto) => { $(id).textContent = texto; };

function campos(ids) {
  const v = ids.map(id => $(id).value.trim());
  return v.includes('') ? null : v.map(Number);
}
const lista = id => $(id).value.split(',').map(s => s.trim()).filter(s => s !== '').map(Number);

function executar(idSaida, ids, fn) {
  const v = campos(ids);
  saida(idSaida, v ? fn(v) : 'Preencha todos os campos.');
}
function comLista(idSaida, idCampo, fn) {
  const v = lista(idCampo);
  saida(idSaida, v.length && !v.some(isNaN) ? fn(v) : 'Digite números separados por vírgula.');
}
function comInteiro(idSaida, idCampo, fn) {
  const n = Number($(idCampo).value);
  saida(idSaida, Number.isInteger(n) && n > 0 ? fn(n).join(', ') : 'Digite um inteiro positivo.');
}
const lerNumeros = qtd =>
  Array.from({ length: qtd }, (_, i) => Number(prompt(`Digite o número ${i + 1} de ${qtd}:`)));

const somar = arr => arr.reduce((acc, n) => acc + n, 0);
const media = arr => somar(arr) / arr.length;


//Questão 1
function ordenar2(arr) {
  const [a, b] = arr;
  return a > b ? [b, a] : [a, b];
}
const ex1 = () => executar('s1', ['e1a', 'e1b'], v => ordenar2(v).join(', '));

// Questão 2
function ordenar3(arr) {
  let [a, b, c] = arr;
  if (a > b) { [a, b] = [b, a]; }
  if (b > c) { [b, c] = [c, b]; }
  if (a > b) { [a, b] = [b, a]; }
  return [a, b, c];
}
const ex2 = () => executar('s2', ['e2a', 'e2b', 'e2c'], v => ordenar3(v).join(', '));

// 3 e 4
function exibirEInverter(idSaida, arr) {
  const original = arr.join(',');
  arr.reverse(); 
  saida(idSaida, `Array: ${original}\nAo contrário: ${arr.join(',')}`);
}
const ex3 = () => exibirEInverter('s3', lerNumeros(3));
function ex4() {
  const qtd = Number(prompt('Quantos números deseja inserir?'));
  if (!Number.isInteger(qtd) || qtd <= 0) return saida('s4', 'Informe uma quantidade válida.');
  exibirEInverter('s4', lerNumeros(qtd));
}

//Questão  5 (bubble sort)
function bubbleSort(arr) {
  const v = [...arr];
  for (let i = 0; i < v.length - 1; i++) {
    for (let j = 0; j < v.length - 1 - i; j++) {
      if (v[j] > v[j + 1]) { [v[j], v[j + 1]] = [v[j + 1], v[j]]; }
    }
  }
  return v;
}
const ex5 = () => comLista('s5', 'e5', v => bubbleSort(v).join(', '));

// 6
const indicesDe = (arr, n) => arr.map((v, i) => (v === n ? i : -1)).filter(i => i !== -1);
function ex6() {
  const v = lista('e6l');
  const n = $('e6n').value.trim();
  if (!v.length || v.some(isNaN) || n === '') return saida('s6', 'Preencha o vetor e o número.');
  const idx = indicesDe(v, Number(n));
  saida('s6', idx.length ? `Índices: ${idx.join(', ')}` : 'O número não aparece no vetor.');
}

// 7
function fibonacci(n) {
  const f = [];
  for (let i = 0; i < n; i++) f.push(i < 2 ? i : f[i - 1] + f[i - 2]);
  return f;
}
const ex7 = () => comInteiro('s7', 'e7', fibonacci);

// Questão 8 
function fatoriais(n) {
  const f = [];
  for (let i = 0; i <= n; i++) f.push(i === 0 ? 1 : i * f[i - 1]);
  return f;
}
const ex8 = () => comInteiro('s8', 'e8', fatoriais);

// questão 9 
const tabuleiro = [['', '', ''], ['', '', ''], ['', '', '']];
let vez = 'X';
function desenharTabuleiro() {
  $('tabuleiro').innerHTML = tabuleiro
    .map(l => '<tr>' + l.map(c => `<td>${c}</td>`).join('') + '</tr>')
    .join('');
}
function jogar() {
  const l = Number($('jl').value) - 1;
  const c = Number($('jc').value) - 1;
  if (!(Number.isInteger(l) && Number.isInteger(c) && l >= 0 && l < 3 && c >= 0 && c < 3)) {
    return saida('s9', 'Linha e coluna devem ser inteiros de 1 a 3.');
  }
  if (tabuleiro[l][c] !== '') return saida('s9', 'Posição já ocupada!');
  tabuleiro[l][c] = vez;
  vez = vez === 'X' ? 'O' : 'X';
  desenharTabuleiro();
  saida('s9', `Vez do jogador ${vez === 'X' ? 1 : 2} (${vez})`);
}

// Questão 10 e 11
const ex10 = () => comLista('s10', 'e10', v => `Soma: ${somar(v)}`);
const ex11 = () => comLista('s11', 'e11', v => `Média: ${media(v)}`);

// Questão 12
const ehPrimo = n =>
  Number.isInteger(n) && n > 1 &&
  Array.from({ length: Math.floor(Math.sqrt(n)) - 1 }, (_, i) => i + 2).every(d => n % d !== 0);
const soPrimos = arr => arr.filter(ehPrimo);
const ex12 = () => comLista('s12', 'e12', v => {
  const p = soPrimos(v);
  return p.length ? p.join(', ') : 'Nenhum número primo.';
});

// Questão 13
const frutas = ['mamão', 'uva', 'melancia', 'banana'];
const ex13 = () => saida('s13', [...frutas].sort((a, b) => b.localeCompare(a, 'pt')).join('\n'));

// 14
const estados = ['GO', 'MG', 'SP', 'RJ', 'AM', 'PA'];
const ex14 = () => [...estados].sort().forEach(e => $('estados').add(new Option(e, e)));

// Questão 15
function ex15() {
  const agenda = Array.from({ length: 5 }, (_, i) => {
    const dia = prompt(`Dia útil ${i + 1} da semana:`);
    const compromisso = prompt(`Compromisso de ${dia}:`);
    return [dia, compromisso];
  });
  saida('s15', agenda.map(([d, c]) => `${d}: ${c}`).join('\n'));
}


// Questões 16 e 17
function getRandomColor() {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}
function criarQuadrado() {
  const q = document.createElement('div');
  q.className = 'quadrado';
  q.addEventListener('mouseover', () => { q.style.backgroundColor = getRandomColor(); });
  $('quadrados').appendChild(q);
}

// Questões 18 e 19
const nomes = ["Diego", "Gabriel", "Lucas"];
function renderizarLista() {
  $('lista').replaceChildren(...nomes.map(n => {
    const li = document.createElement('li');
    li.textContent = n;
    return li;
  }));
}
function adicionar() {
  const input = document.querySelector('input[name="nome"]');
  const nome = input.value.trim();
  if (!nome) return;
  nomes.push(nome);
  renderizarLista();
  input.value = '';
}


// Questões 20, 21 e 22
const fundo = cor => { document.body.style.backgroundColor = cor; };

// Questao 23
const alternarParagrafo = () => { $('par').hidden = !$('par').hidden; };

// Questao 24
function validarCadastro() {
  const l = $('login').value.trim(), s = $('senha').value, c = $('confirma').value;
  let erro = '';
  if (!l || !s || !c) erro = 'Preencha todos os campos.';
  else if (s !== c) erro = 'Senha e confirmação são diferentes.';
  else if (s.length < 6 || s.length > 10) erro = 'A senha deve ter entre 6 e 10 caracteres.';
  saida('s24', erro);
  if (erro) return false;
  alert('Cadastro enviado!');
  return true;
}

// Questao 25
const ehPalindromo = palavra => {
  const p = palavra.toLowerCase();
  return p === [...p].reverse().join('');
};
function ex25() {
  const p = $('e25').value.trim();
  if (!p) return saida('s25', 'Digite uma palavra.');
  saida('s25', `"${p}" ${ehPalindromo(p) ? 'é' : 'não é'} um palíndromo.`);
}

// quetsao 26
function inverterNomes() {
  const inputs = document.querySelectorAll('.nome5');
  const valores = [...inputs].map(i => i.value);
  valores.reverse();
  inputs.forEach((input, i) => { input.value = valores[i]; });
}

// Quetsoa 27
function alternarPessoa() {
  const fisica = $('pf').checked;
  $('cpf').disabled = !fisica;
  $('nasc').disabled = !fisica;
  $('cnpj').disabled = fisica;
}
function permitirSoNumeros() {
  document.querySelectorAll('.so-numeros').forEach(input =>
    input.addEventListener('input', () => { input.value = input.value.replace(/\D/g, ''); })
  );
}

// Quetsao 28
function intercalar(a, b) {
  let r = '';
  for (let i = 0; i < Math.max(a.length, b.length); i++) r += (a[i] ?? '') + (b[i] ?? '');
  return r;
}
function ex28() {
  $('s28').value = intercalar($('p1').value.trim(), $('p2').value.trim());
}

// Questao 29
function ex29() {
  const v = campos(['t1', 't2', 't3']);
  if (!v) return ($('s29').textContent = 'Preencha os três números.');
  const linhas = [
    ['Número 1', v[0]], ['Número 2', v[1]], ['Número 3', v[2]],
    ['Soma', somar(v)],
    ['Média', media(v)],
    ['Produto', v.reduce((acc, n) => acc * n, 1)],
    ['Maior', Math.max(...v)],
    ['Menor', Math.min(...v)]
  ];
  $('s29').innerHTML = '<table>' +
    linhas.map(([nome, valor]) => `<tr><th>${nome}</th><td>${valor}</td></tr>`).join('') +
    '</table>';
}

// Questao 30
function pesquisar() {
  const original = $('texto').dataset.original ?? ($('texto').dataset.original = $('texto').textContent);
  const termo = $('busca').value.trim();
  if (!termo) { $('texto').textContent = original; return saida('s30', 'Digite uma palavra.'); }
  const regex = new RegExp(termo.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'gi');
  let total = 0;
  $('texto').innerHTML = original.replace(regex, m => { total++; return `<mark>${m}</mark>`; });
  saida('s30', total ? `${total} ocorrência(s) encontrada(s).` : 'A busca não retornou nenhum resultado.');
}

// 31
const imagens = [
  { src: 'https://tse4.mm.bing.net/th/id/OIP.WUE5BSsOcrh6XvTsgilHPwHaE7?r=0&rs=1&pid=ImgDetMain&o=7&rm=3' },
  { src: 'https://pt.wikipedia.org/wiki/Barbie' },
  { src: 'imagens/hd.png', alt: 'HD Seagate SkyHawk 8TB' }
];
const M = 1; 
const N = 3; 
function montarGaleria() {
  const galeria = $('galeria');
  galeria.style.gridTemplateColumns = `repeat(${N}, 1fr)`;
  imagens.slice(0, M * N).forEach(({ src, alt }) => {
    const img = document.createElement('img');
    img.src = src;
    img.alt = alt;
    img.addEventListener('click', () => {
      $('ampliada').innerHTML = `<img src="${src}" alt="${alt} (ampliada)">`;
    });
    galeria.appendChild(img);
  });
}

desenharTabuleiro();
saida('s9', 'Vez do jogador 1 (X)');
ex13();
ex14();
renderizarLista();
permitirSoNumeros();
montarGaleria();