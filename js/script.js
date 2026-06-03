const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const img = new Image();
img.src = "assets/modelo-padrao.jpg";

const downloadLink = document.getElementById("downloadLink");

const config = {
  width: 1086,
  height: 1369,
  fontColor: "#071033",
  fontFamily: "Arial, Helvetica, sans-serif",
  campoSuperior: {
    x: 543,
    y: 128,
    maxWidth: 520,
    fontSize: 44,
    weight: "800"
  },
  linhas: {
    x: 615,
    yInicial: 361,
    espaco: 106,
    maxWidth: 610,
    fontSize: 42,
    weight: "800"
  }
};

function ajustarFonte(texto, tamanhoInicial, maxWidth, weight) {
  let tamanho = tamanhoInicial;
  ctx.font = `${weight} ${tamanho}px ${config.fontFamily}`;

  while (ctx.measureText(texto).width > maxWidth && tamanho > 22) {
    tamanho -= 2;
    ctx.font = `${weight} ${tamanho}px ${config.fontFamily}`;
  }

  return tamanho;
}

function desenharTextoCentralizado(texto, x, y, maxWidth, fontSize, weight) {
  if (!texto) return;

  const tamanhoFinal = ajustarFonte(texto, fontSize, maxWidth, weight);
  ctx.font = `${weight} ${tamanhoFinal}px ${config.fontFamily}`;
  ctx.fillStyle = config.fontColor;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(texto.toUpperCase(), x, y);
}

function gerarImagem() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(img, 0, 0, config.width, config.height);

  const campoSuperior = document.getElementById("campoSuperior").value.trim();
  desenharTextoCentralizado(
    campoSuperior,
    config.campoSuperior.x,
    config.campoSuperior.y,
    config.campoSuperior.maxWidth,
    config.campoSuperior.fontSize,
    config.campoSuperior.weight
  );

  for (let i = 1; i <= 10; i++) {
    const nome = document.getElementById(`nome${i}`).value.trim();
    const y = config.linhas.yInicial + ((i - 1) * config.linhas.espaco);

    desenharTextoCentralizado(
      nome,
      config.linhas.x,
      y,
      config.linhas.maxWidth,
      config.linhas.fontSize,
      config.linhas.weight
    );
  }

  const dataUrl = canvas.toDataURL("image/png");
  downloadLink.href = dataUrl;
  downloadLink.classList.remove("hidden");
}

function limparCampos() {
  document.querySelectorAll("input").forEach(input => input.value = "");
  downloadLink.classList.add("hidden");
  gerarImagem();
}

img.onload = gerarImagem;

document.getElementById("btnGerar").addEventListener("click", gerarImagem);
document.getElementById("btnLimpar").addEventListener("click", limparCampos);
