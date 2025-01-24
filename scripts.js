const button = document.querySelector(".buttonTarefa"); // Seleciona o botão de adicionar tarefa
const input = document.querySelector(".inputTarefa"); // Seleciona o campo de entrada da tarefa
const listaCompleta = document.querySelector(".listaTarefa"); // Seleciona a lista onde as tarefas serão exibidas

let minhaListaDeTarefas = []; // Cria um array vazio para armazenar as tarefas

button.disabled = true;

function adicionarTarefa() {
  if (input.value.trim() == '') return; 

var tarefaJaIncluida = minhaListaDeTarefas.some(x => x.tarefa.toUpperCase() == input.value.trim().toUpperCase());

if (tarefaJaIncluida){
  alert("Tarefa já incluída anteriormente!");
  input.value = '' // Limpa o campo de entrada após adicionar a tarefa
  return;
}

  minhaListaDeTarefas.push({
    tarefa: input.value.trim(), // Adiciona a tarefa no array
    concluida: false // Marca a tarefa como não concluída
  });

  input.value = '' // Limpa o campo de entrada após adicionar a tarefa

  mostrarTarefa(); // Chama a função para exibir a lista de tarefas

  button.disabled = true;
}

function mostrarTarefa() {
  let novaLi = '' // Cria uma string vazia para armazenar o HTML das tarefas

  minhaListaDeTarefas.forEach((item, index) => { // Itera sobre todas as tarefas
    novaLi =  novaLi + `

    <li class="tarefa ${item.concluida && "feito"}"> <!-- Aplica a classe "feito" se a tarefa estiver concluída -->
        <img src="iconCheck.png" alt="Ícone check" onclick="concluirTarefa(${index})"> <!-- Ícone para marcar a tarefa como concluída -->
        <p>${item.tarefa}</p> <!-- Exibe a descrição da tarefa -->
        <img src="iconTrash.png" alt="Ícone lixo" onclick="deletarTarefa(${index})"> <!-- Ícone para deletar a tarefa -->
    </li>
        
        `
  })

  listaCompleta.innerHTML = novaLi // Atualiza a lista de tarefas no HTML

  localStorage.setItem('lista', JSON.stringify(minhaListaDeTarefas)) // Armazena a lista de tarefas no localStorage
}

function concluirTarefa(index) {
    minhaListaDeTarefas[index].concluida = !minhaListaDeTarefas[index].concluida // Alterna o estado de conclusão da tarefa
    mostrarTarefa() // Atualiza a lista de tarefas
}

function deletarTarefa(index){
  minhaListaDeTarefas.splice(index, 1) // Remove a tarefa do array
  mostrarTarefa() // Atualiza a lista de tarefas
}

function recarregarTela(){
  const tarefasLocalStorage = localStorage.getItem('lista') // Recupera as tarefas armazenadas no localStorage

  if(tarefasLocalStorage){ // Se houver tarefas no localStorage
    minhaListaDeTarefas =  JSON.parse(tarefasLocalStorage) // Converte as tarefas para formato de objeto
  }

  mostrarTarefa() // Exibe as tarefas na tela
}

recarregarTela() // Chama a função para carregar as tarefas ao carregar a página

button.addEventListener("click", adicionarTarefa); // Adiciona um ouvinte de evento para o botão
input.addEventListener("input", verificarConteudoCorreto);

function verificarConteudoCorreto(){

if (input.value.trim() == '') button.disabled = true;

  else button.disabled = false; 

}