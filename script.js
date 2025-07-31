// Canvas para corações animados no fundo
function createHeartBackground() {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  // Configurar canvas
  canvas.style.position = "fixed";
  canvas.style.top = "0";
  canvas.style.left = "0";
  canvas.style.width = "100%";
  canvas.style.height = "100%";
  canvas.style.zIndex = "-1";
  canvas.style.pointerEvents = "none";

  // Definir tamanho do canvas
  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  resizeCanvas();
  window.addEventListener("resize", resizeCanvas);

  // Classe para os corações
  class Heart {
    constructor() {
      this.x = Math.random() * canvas.width;
      this.y = canvas.height + 20;
      this.size = Math.random() * 15 + 10;
      this.speed = Math.random() * 2 + 1;
      this.opacity = Math.random() * 0.5 + 0.3;
      this.color = `hsl(${Math.random() * 60 + 330}, 70%, 60%)`; // Tons de rosa/vermelho
    }

    update() {
      this.y -= this.speed;
      if (this.y < -20) {
        this.y = canvas.height + 20;
        this.x = Math.random() * canvas.width;
      }
    }

    draw() {
      ctx.save();
      ctx.globalAlpha = this.opacity;
      ctx.fillStyle = this.color;

      // Desenhar coração
      const x = this.x;
      const y = this.y;
      const size = this.size;

      ctx.beginPath();
      ctx.moveTo(x, y - size * 0.3);

      // Lado esquerdo do coração
      ctx.bezierCurveTo(
        x - size * 0.5,
        y - size * 0.8,
        x - size * 0.8,
        y - size * 0.3,
        x,
        y + size * 0.3
      );

      // Lado direito do coração
      ctx.bezierCurveTo(
        x + size * 0.8,
        y - size * 0.3,
        x + size * 0.5,
        y - size * 0.8,
        x,
        y - size * 0.3
      );

      ctx.fill();
      ctx.restore();
    }
  }

  // Criar array de corações
  const hearts = [];
  const numHearts = 20;

  for (let i = 0; i < numHearts; i++) {
    hearts.push(new Heart());
  }

  // Função de animação
  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    hearts.forEach((heart) => {
      heart.update();
      heart.draw();
    });

    requestAnimationFrame(animate);
  }

  // Iniciar animação
  animate();

  // Adicionar canvas ao body
  document.body.appendChild(canvas);
}

// Inicializar fundo de corações quando a página carregar
document.addEventListener("DOMContentLoaded", function () {
  createHeartBackground();
  const button = document.getElementById("liquidButton");
  const liquidFill = document.getElementById("liquidFill");
  const buttonContainer = document.getElementById("buttonContainer");
  const polaroidsContainer = document.getElementById("polaroidsContainer");
  const continueButton1 = document.getElementById("continueButton1");
  const polaroidsContainer3 = document.getElementById("polaroidsContainer3");
  const mainContainer = document.getElementById("mainContainer");
  const pedidoFinal = document.getElementById("pedidoFinal");
  const quartoDiv = document.getElementById("quartoDiv");
  if (continueButton1) {
    continueButton1.addEventListener("click", function () {
      showPolaroids2();
    });
  }
  const polaroidsContainer2 = document.getElementById("polaroidsContainer2");
  const messages = [
    "Tá quase lá, amor",
    "Vamos vamos vamos, não desiste",
    "Sabia que eu te amo muito, né?",
    "Só mais um poquinho, vida",
    "O que está por vir é algo muito especial",
    "Quase láaaa",
    "Chegou a horaaaaa",
  ];

  let clickCount = 0;
  const maxClicks = 8;
  let currentStep = 0;

  const timelineContainer = document.getElementById("timelineContainer");
  const timelineDot1 = document.getElementById("timelineDot1");
  const timelineDot2 = document.getElementById("timelineDot2");
  const timelineDot3 = document.getElementById("timelineDot3");
  const timelineLine1 = document.getElementById("timelineLine1");
  const timelineLine2 = document.getElementById("timelineLine2");

  if (button) {
    button.addEventListener("click", function (e) {
      if (clickCount >= maxClicks) return;

      clickCount++;
      const fillPercentage = (clickCount / maxClicks) * 100;
      liquidFill.style.width = fillPercentage + "%";

      if (fillPercentage > 30) {
        button.style.color = "white";
      }

      createHeart(e);

      if (clickCount <= messages.length) {
        showMessage(messages[clickCount - 1]);
      }

      if (clickCount === maxClicks) {
        button.textContent = "Ihaaaaaa !";
        button.style.color = "black";

        setTimeout(() => {
          suckButton();
        }, 1000);
      }
    });
  }

  function suckButton() {
    buttonContainer.classList.add("sucked");

    setTimeout(() => {
      showPolaroids();
    }, 1000);
  }

  function showPolaroids2() {
    polaroidsContainer.style.display = "none";
    polaroidsContainer.style.position = "absolute";

    polaroidsContainer2.classList.remove("hidden");
    polaroidsContainer2.style.position = "";

    setTimeout(() => {
      polaroidsContainer2.classList.add("show");
    }, 50);

    const polaroids2 = polaroidsContainer2.querySelectorAll(".polaroid");
    polaroids2.forEach((polaroid, index) => {
      setTimeout(() => {
        polaroid.classList.add("show");
      }, 300 + index * 200);
    });

    setTimeout(() => {
      advanceTimeline();
    }, 500);
  }

  function showPolaroids3() {
    polaroidsContainer2.style.display = "none";
    polaroidsContainer2.style.position = "absolute";

    polaroidsContainer3.classList.remove("hidden");
    polaroidsContainer3.style.position = "";

    setTimeout(() => {
      polaroidsContainer3.classList.add("show");
    }, 50);

    const polaroids3 = polaroidsContainer3.querySelectorAll(".polaroid");
    polaroids3.forEach((polaroid, index) => {
      setTimeout(() => {
        polaroid.classList.add("show");
      }, 300 + index * 200);
    });

    setTimeout(() => {
      advanceTimeline();
    }, 500);
  }

  window.showPolaroids2 = showPolaroids2;
  window.showPolaroids3 = showPolaroids3;

  function showPolaroids() {
    buttonContainer.style.display = "none";
    timelineContainer.style.display = "block";

    polaroidsContainer.classList.add("show");
    polaroidsContainer.style.position = "";

    const polaroids = document.querySelectorAll(".polaroid");
    polaroids.forEach((polaroid, index) => {
      setTimeout(() => {
        polaroid.classList.add("show");
      }, index * 200);
    });

    // setTimeout(() => {
    //   advanceTimeline();
    // }, 2000);
  }

  function advanceTimeline() {
    currentStep++;

    switch (currentStep) {
      case 1:
        timelineLine1.style.width = "100%";
        setTimeout(() => {
          timelineDot2.classList.add("active");
        }, 500);
        break;
      case 2:
        timelineLine2.style.width = "100%";
        setTimeout(() => {
          timelineDot3.classList.add("active");
        }, 500);
        break;
    }
  }

  window.advanceToStep = function (step) {
    currentStep = step - 1;
    advanceTimeline();
  };

  window.resetTimeline = function () {
    currentStep = 0;
    timelineDot1.classList.add("active");
    timelineDot2.classList.remove("active");
    timelineDot3.classList.remove("active");
    timelineLine1.style.width = "0%";
    timelineLine2.style.width = "0%";
  };

  function createHeart(e) {
    const heart = document.createElement("div");
    heart.className = "heart";
    heart.innerHTML = "❤️";

    heart.style.left = e.clientX + "px";
    heart.style.top = e.clientY + "px";

    document.body.appendChild(heart);

    setTimeout(() => {
      heart.remove();
    }, 2000);
  }

  function showMessage(text) {
    const existingMessage = document.querySelector(".message");
    if (existingMessage) {
      existingMessage.remove();
    }

    const message = document.createElement("div");
    message.className = "message";
    message.textContent = text;

    document.querySelector(".button-container").appendChild(message);

    setTimeout(() => {
      message.remove();
    }, 3000);
  }

  window.showPedidoFinal = showPedidoFinal;

  function showPedidoFinal() {
    mainContainer.style.display = "none";
    pedidoFinal.classList.add("show");
    pedidoFinal.style.display = "flex";
    pedidoFinal.style.flexDirection = "column";
    pedidoFinal.style.alignItems = "center";
    pedidoFinal.style.justifyContent = "center";
    pedidoFinal.style.position = "absolute";
    pedidoFinal.style.top = "50%";
    pedidoFinal.style.left = "50%";
    pedidoFinal.style.transform = "translate(-50%, -50%)";
    pedidoFinal.style.zIndex = "1000";
    pedidoFinal.style.gap = "10px";
    pedidoFinal.style.width = "100%";
    pedidoFinal.style.height = "100%";

    // Adiciona funcionalidade do botão que foge
    setupFleeingButton();
  }

  function setupFleeingButton() {
    const botaoNao = document.getElementById("botaoFinal");
    const botaoSim = document.getElementById("botaoSim");
    const hiddenDiv = document.getElementById("hiddenDiv");

    if (!botaoNao) return;

    let isFleeing = false;
    let originalPosition = null;

    // Função para gerar posição aleatória na tela
    function getRandomPosition() {
      const maxX = window.innerWidth - 200; // 200px é a largura aproximada do botão
      const maxY = window.innerHeight - 60; // 60px é a altura aproximada do botão

      return {
        x: Math.random() * maxX,
        y: Math.random() * maxY,
      };
    }

    // Função para mover o botão
    function moveButton() {
      if (isFleeing) return;

      isFleeing = true;

      // Salva posição original se ainda não foi salva
      if (!originalPosition) {
        const rect = botaoNao.getBoundingClientRect();
        originalPosition = {
          x: rect.left,
          y: rect.top,
        };
      }

      // Gera nova posição
      const newPos = getRandomPosition();

      // Aplica a nova posição
      botaoNao.style.position = "fixed";
      botaoNao.style.left = newPos.x + "px";
      botaoNao.style.top = newPos.y + "px";
      botaoNao.style.transition = "all 0.3s ease";
      botaoNao.style.zIndex = "9999";

      // Reseta o flag após a animação
      setTimeout(() => {
        isFleeing = false;
      }, 300);
    }

    // Event listeners para o botão "Sim"
    if (botaoSim && hiddenDiv) {
      botaoSim.addEventListener("mouseenter", function () {
        hiddenDiv.style.opacity = "1";
      });

      botaoSim.addEventListener("click", function () {
        quartoDiv.style.display = "block";
        pedidoFinal.style.display = "none";
      });

      botaoSim.addEventListener("mouseleave", function () {
        hiddenDiv.style.opacity = "0";
      });
    }

    // Detecta quando o mouse se aproxima do botão
    document.addEventListener("mousemove", function (e) {
      if (!botaoNao || isFleeing) return;

      const rect = botaoNao.getBoundingClientRect();
      const mouseX = e.clientX;
      const mouseY = e.clientY;

      // Calcula a distância entre o mouse e o botão
      const distance = Math.sqrt(
        Math.pow(mouseX - (rect.left + rect.width / 2), 2) +
          Math.pow(mouseY - (rect.top + rect.height / 2), 2)
      );

      // Se o mouse está a menos de 100px do botão, faz ele fugir
      if (distance < 100) {
        moveButton();
      }
    });
  }
});
