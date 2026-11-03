const resposta = document.querySelector("#resposta");
const lista = document.querySelector("#lista-jogos");
const modelo = document.querySelector("#modelo-jogo");

const apiKey = "cv_yhZOeWObUqohtSGGde7geIz5oyOrzORyvJODQvbP4Y9qjK0liwV6EF_5J6cMHycU";

const apiUrl = "https://api-ds.codeverse.dev.br/api/jogos";

async function buscarjogos() {

    // Mostra uma mensagem
    resposta.textContent="Carregando jogos..."
  
    try {
        // Fazer o get
        const retorno = await fetch(apiUrl, {
            method: "GET",
            headers: {"x-api-key" : apiKey},
        });
    
        // Verificar se não deu certo
        if (!retorno.ok) {
        throw new Error("Não foi possível carregar os jogos.");
        }

    // Converter o resultado para JSON, pois será um objeto
    const resultado = await retorno.json();

    // Percorrer todos os jogos que estão dentro de resultado
    for (const jogo of resultado.data){
      
        // Fazer uma cópia do modelo que criado no HTML
        const card = modelo.content.cloneNode(true);

        // Preecher cada item desse card
        card.querySelector(".nome").textContent = jogo.title;
        card.querySelector(".genero").textContent = jogo.genero;
        card.querySelector(".plataforma").textContent = jogo.plataforma;
        card.querySelector(".ano_lancamento").textContent = jogo.ano_lacamento;
        card.querySelector(".desenvolvedora").textContent = jogo.desenvolvedora;

        const imagem = card.querySelector(".imagem-jogo");

        if (jogo.imageUrl){
            imagem.src = jogo.imageUrl;
            imagem.alt = jogo.title;
            imagem.onerror = () => imagem.remove();

        } else {
            imagem.remove();
        }

        // Adiciona o card preenchido na tela
        lista.appendChild(card);
        resposta.textContent = "";

        }
    } catch (error) {
        console.error(error);
        resposta.textContent= "Não foi possível carregar os jogos. Tente novamente!" 
    }
}

// Executar no arquivo
buscarjogos();