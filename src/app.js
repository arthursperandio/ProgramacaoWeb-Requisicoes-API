const URL_API = "https://jsonplaceholder.typicode.com";

function loadPosts() {
    const request = new XMLHttpRequest();
    const url = URL_API + "/posts";

    request.open("GET", url);
    request.onreadystatechange = () => {
        if(request.readyState !== XMLHttpRequest.DONE)
            return;
        if(request.status >= 200 && request.status < 300) {
            const result = JSON.parse(request.responseText);
            renderPost(result);
        }else{
            console.log("DEU ERRO!");
        }
    };

    request.send();
}

function renderPost(result) {
    const tbody = document.querySelector("tbody");
    tbody.replaceChildren();
    result.forEach(post => {
        tbody.appendChild(createElement(post));
    });
}

function createElement(post) {
    const tr = document.createElement("tr");
    tr.innerHTML = `
        <td>${post.id}</td>
        <td>${post.title}</td>
        <td>${post.body}</td>
        <td>
        <button class="btn btn-danger btn-sm">
            Excluir
        </button>
        </td>
    `;

    const button = tr.querySelector("button");
    button.addEventListener("click", () => {
        deletePost(post.id, tr);
    });

    return tr;
}

function createPost() {
    const titleInput = document.querySelector('input[name="title"]');
    const bodyInput = document.querySelector('textarea[name="body"]');
    const newPost = {
        title: titleInput.value,
        body: bodyInput.value,
        userId: 1
};
    const mensagem = document.getElementById("mensagem");
    if(titleInput.value.trim() === "" || bodyInput.value.trim() === "") {

    mensagem.innerHTML = `
        <div class="alert alert-warning" role="alert">
            É necessário que todos os campos estejam preenchidos!
        </div>
    `;

    titleInput.addEventListener("input", () => {
        mensagem.innerHTML = "";
    });
    bodyInput.addEventListener("input", () => {
        mensagem.innerHTML = "";
    });

    return;
}

    const request = new XMLHttpRequest();
    const url = URL_API + "/posts";
    request.open("POST", url);
    request.setRequestHeader(
        "Content-Type",
        "application/json"
    );

    request.onreadystatechange = () => {
        if(request.readyState !== XMLHttpRequest.DONE)
            return;
        if(request.status >= 200 && request.status < 300) {
            const result = JSON.parse(request.responseText);
            const tbody = document.querySelector("tbody");

            tbody.prepend(createElement(result));

            titleInput.value = "";
            bodyInput.value = "";
        }else{
            console.log("ERRO AO CRIAR POST!");
        }
    };

    request.send(JSON.stringify(newPost));
}

function deletePost(id, element) {
    const request = new XMLHttpRequest();
    const url = URL_API + "/posts/" + id;

    request.open("DELETE", url);
    request.onreadystatechange = () => {
        if(request.readyState !== XMLHttpRequest.DONE)
            return;
        if(request.status >= 200 && request.status < 300) {
            element.remove();
        }else{
            console.log("ERRO AO EXCLUIR POST!");
        }
    };

    request.send();
}

loadPosts();

document
    .getElementById("btn-create")
    .addEventListener("click", createPost);
    