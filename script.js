
document.addEventListener("DOMContentLoaded", main);

function main() {
    // ajeita o espaço de todas as tags code com a classe block dentro de artigo
    document.querySelectorAll("article code.block").forEach(fix_white_space);
    // torna qualquer elemento dentro de artigo que tiver um id em um link
    document.querySelectorAll("article [id]").forEach(wrap_in_anchor);
}

/** essa função ajeita o espaço em branco dentro de uma tag para que seja exibida corretamente com `white-space: pre`, experimente comentar a chamada desta função na main para ver como fica os `<code class="block">` */
function fix_white_space(elem) {
    let html = String(elem.innerHTML);
    // tira as primeiras linhas se forem vazias
    html = html.replace(/^[ \t\n]*\n/, '');
    // tira o espaço no fim do html
    html = html.trimEnd();
    // divide em linhas
    const lines = html.split('\n');
    // calcula quanto espaço deve ser removido de cada linha
    const trimn = Math.min(...lines.map(x => x.length - x.trimStart().length));
    // tira esse espaço de todas as linhas e junta tudo
    html = lines.map(x => x.substring(trimn)).join('\n');
    // bota o html de volta
    elem.innerHTML = html;
}

/** essa função coloca uma tag a ao redor do elemento, com o href do anchor apontando para aquele elemento,
 *
 * isso serve para o usuário poder copiar o link daquelas seção do artigo */
function wrap_in_anchor(elem) {
    if (!elem.id) return;
    if (elem.parentElement instanceof HTMLAnchorElement) return;
    const a = document.createElement("a");
    a.href = "#" + elem.id;
    elem.replaceWith(a);
    a.appendChild(elem);
}