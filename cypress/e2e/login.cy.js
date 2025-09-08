import loginData from "../fixtures/login.json";

describe("login", () => {
  beforeEach(() => {
    cy.acessarHome();
  });

  it("login realizado com sucesso", () => {
    const usuario = loginData.perfilGestão;
    cy.preencherFormLogin(usuario.email, usuario.password);
    cy.submitBtn("Acessar");
    cy.verificarMsgToast("Login realizado com sucesso!");
    cy.verifiarUsuarioLogado(usuario.name);
  });

  it("login não realizado quando senha inválida", () => {
    const usuario = { ...loginData.perfilGestão, password: "Teste123" };

    cy.preencherFormLogin(usuario.email, usuario.password);
    cy.submitBtn("Acessar");
    cy.verificarMsgToast(
      "Credenciais inválidas. Verifique seu e-mail e senha."
    );
  });
  it("login não realizado quando dados em branco", () => {
    cy.submitBtn("Acessar");
    cy.verificarMsgErro("O campo de e-mail é obrigatório.");
    cy.verificarMsgErro("O campo de senha é obrigatório.");
  });

  it("Usuário perfil salão deve acessar aplicação pelo APP", () => {
    const usuario = loginData.perfilSalão;
    cy.preencherFormLogin(usuario.email, usuario.password);
    cy.submitBtn("Acessar");
    cy.verificarMsgToast("Acesse através do app.");
    cy.verificarPagina("app-info", "Acesso pelo APP E2E Burguer");
    cy.btnApp("Baixar App");
  });
});
