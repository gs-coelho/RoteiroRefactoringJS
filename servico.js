module.exports = class ServicoCalculoFatura {
  constructor(repo) {
     this.repo = repo;
  }

  calcularCredito(apre) {
    let creditos = 0;
    creditos += Math.max(apre.audiencia - 30, 0);
    if (this.repo.getPeca(apre).tipo === "comedia")
      creditos += Math.floor(apre.audiencia / 5);
    return creditos;
  }

  calcularTotalCreditos(apresentacoes){
    const valorInicial = 0
    const total = apresentacoes.reduce(
      (acumulado, apre) => { return acumulado + this.calcularCredito(apre) },
      valorInicial
    );
    return total;
  }

  calcularTotalApresentacao(apre) {
    let total = 0;

    switch (this.repo.getPeca(apre).tipo) {
      case "tragedia":
        total = 40000;
        if (apre.audiencia > 30) {
          total += 1000 * (apre.audiencia - 30);
        }
        break;
      case "comedia":
        total = 30000;
        if (apre.audiencia > 20) {
          total += 10000 + 500 * (apre.audiencia - 20);
        }
        total += 300 * apre.audiencia;
        break;
      default:
        throw new Error(`Peça desconhecia: ${this.repo.getPeca(apre).tipo}`);
    }

    return total;
  }

  calcularTotalFatura(apresentacoes){
    const valorInicial = 0
    const total = apresentacoes.reduce(
      (acumulado, apre) => { return acumulado + this.calcularTotalApresentacao(apre) },
      valorInicial
    );
    return total;
  }
}