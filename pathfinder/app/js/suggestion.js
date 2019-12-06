suggestion.style.left = `${frominput.offsetLeft}px`;

suggestion.innerHTML = `
<ul>abn</ul>
<ul>asdf</ul>
<ul>tffa</ul>
<ul>afthh</ul>
<ul>asfvfg</ul>
<ul>abn</ul>
<ul>aghnjf</ul>
<ul>tffffa</ul>
<ul>afxcdh</ul>
<ul>asfftolfg</ul>
`;

suggestion.addEventListener("click", (e) => {
    suggestion.style.display = "none";
    console.log(e.target.textContent)
})