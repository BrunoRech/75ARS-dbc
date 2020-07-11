// Função do validador retirado do site oficial da receita federal
// http://www.receita.fazenda.gov.br/aplicacoes/atcta/cpf/funcoes.js

export const cpfValidator = cpf =>{
        let Soma = 0;
        let Resto = 0;
       
      if (cpf === "00000000000") return false;
         
      for (let i=1; i<=9; i++){
          Soma = Soma + parseInt(cpf.substring(i-1, i)) * (11 - i);
      } 
      Resto = (Soma * 10) % 11;
       
        if ((Resto === 10) || (Resto === 11))  Resto = 0;
        if (Resto !== parseInt(cpf.substring(9, 10)) ) return false;
       
      Soma = 0;
        for (let i = 1; i <= 10; i++){
            Soma = Soma + parseInt(cpf.substring(i-1, i)) * (12 - i);
        } 
        Resto = (Soma * 10) % 11;
       
        if ((Resto === 10) || (Resto === 11))  Resto = 0;
        if (Resto !== parseInt(cpf.substring(10, 11) ) ) return false;
        return true;
};