/* formatando a variável.
$('.dataI').datepicker({
    format: 'dd/mm/yyyy',
    language:"pt-BR",
    startDate: '+0d',
});

*/


document.querySelector("#salvar").addEventListener("click", cadastrar)


let atividades = []

window.addEventListener("load", () => {
    atividades = JSON.parse( localStorage.getItem("atividades") ) || []
    atualizar()
})

function atualizar(){
    document.querySelector("#atividades").innerHTML = ""
    atividades.forEach(atividade => 
        document.querySelector("#atividades").innerHTML += criarCard(atividade))
       
}

function cadastrar() {
    const titulo = document.querySelector("#titulo").value
    const pontos = document.querySelector("#pontos").value
    const dataI = document.querySelector("#dataI").value
    const categoria = document.querySelector("#categoria").value
    const modal = bootstrap.Modal.getInstance(document.querySelector("#exampleModal"))

    const atividade = { //JSON Java Script Object Notation
        titulo,
        pontos,
        dataI,
        categoria
    }

   
    

    if (!isValid(atividade.titulo, document.querySelector("#titulo"))) return
    if (!isValid(atividade.pontos, document.querySelector("#pontos"))) return
    if (!isValid(atividade.dataI, document.querySelector("#dataI"))) return

    atividades.push(atividade)
    localStorage.setItem("atividades", JSON.stringify(atividades))

    atualizar()
    modal.hide()
  
}

function isValid(valor, campo){
    if(valor.length == 0){
        campo.classList.add("is-invalid")
        campo.classList.remove("is-valid")
        return false
    }else{
        campo.classList.add("is-valid")
        campo.classList.remove("is-invalid")
        return true
    }

}

function apagar(botao){
    botao.parentNode.parentNode.parentNode.remove()
}

function criarCard(atividade) {
    const card = `
    <div class="col-lg-3 col-md-6 col-sm-12">
        <div class="card">        
            <div class="card-header"  style="background-color: #4682B4;" style="font-size: medium;">
                ${atividade.titulo}
            </div>
            
            <div class="input-group date" data-provide="datepicker">           
                ${atividade.dataI}
            </div>

            <div class="card-body" style="background-color: #B0C4DE;">
                <p class="card-text"  >With supporting text below as a natural lead-in to additional content.</p>
                <p class="card-text">${atividade.categoria}</p>
                <span class="btn btn-secondary">${atividade.pontos}pt</span>
                <span class=${atividade.dataI}></span>
            </div>
            <div class="card-footer" style="background: #6495ED;">
                <a href="#" class="btn btn-success" title="marcar como concluída">
                    <i class="bi bi-check2"></i>
                </a>
                <a href="#" onClick="apagar(this)" class="btn btn-danger" title="apagar atividade">
                    <i class="bi bi-trash3"></i>
                </a>
            </div> <!-- card footer -->
        </div> <!-- card -->
    </div> <!-- col -->
` 



return card
}
    