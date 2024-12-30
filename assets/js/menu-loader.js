// Função para carregar os menus
async function loadMenus(principalJsonPath, mobileJsonPath) {
  try {
    // Carregar o JSON do menu principal
    const principalResponse = await fetch(principalJsonPath);
    if (!principalResponse.ok) {
      throw new Error(`Erro ao carregar o JSON principal: ${principalResponse.status}`);
    }
    const principalData = await principalResponse.json();
    console.log("JSON do menu principal carregado:", principalData);

    // Renderizar o menu principal
    const menuPrincipalElement = document.getElementById("menu-principal");
    if (menuPrincipalElement) {
      renderMenu(principalData.menuPrincipal, menuPrincipalElement);
    } else {
      console.error("Elemento menu-principal não encontrado no DOM!");
    }

    // Carregar o JSON do menu mobile
    const mobileResponse = await fetch(mobileJsonPath);
    if (!mobileResponse.ok) {
      throw new Error(`Erro ao carregar o JSON mobile: ${mobileResponse.status}`);
    }
    const mobileData = await mobileResponse.json();
    console.log("JSON do menu mobile carregado:", mobileData);

    // Renderizar o menu mobile
    const menuMobileElement = document.querySelector(".menu-mobile-valendo ul");
    if (menuMobileElement) {
      renderMenu(mobileData.menuMobile, menuMobileElement);
    } else {
      console.error("Elemento menu-mobile-valendo não encontrado no DOM!");
    }
  } catch (error) {
    console.error("Erro ao carregar os menus:", error);
  }
}

// Função para renderizar os menus no DOM
function renderMenu(menuItems, parentElement) {
  parentElement.innerHTML = ""; // Limpa o conteúdo atual do menu
  console.log("Itens do menu sendo renderizados:", menuItems);

  menuItems.forEach(item => {
    const li = document.createElement("li");

    // Verifica se o item possui subitens
    if (item.subitems && item.subitems.length > 0) {
      li.innerHTML = `<a href="${item.link}">${item.title}</a>`;

      // Cria o submenu
      const subMenu = document.createElement("ul");
      item.subitems.forEach(subitem => {
        const subLi = document.createElement("li");
        subLi.innerHTML = `<a href="${subitem.link}">${subitem.title}</a>`;
        subMenu.appendChild(subLi);
      });

      li.appendChild(subMenu);
    } else {
      // Caso não tenha subitens, cria um item simples
      li.innerHTML = `<a href="${item.link}">${item.title}</a>`;
    }

    parentElement.appendChild(li);
  });
}

// Evento de carregamento do DOM
document.addEventListener("DOMContentLoaded", () => {
  console.log("Documento carregado");
  // Carrega os menus principal e mobile
  loadMenus("edicao/menu-content.json", "edicao/menu-mobile.json");
});
