import { AbstractControl } from '../../node_modules/@angular/forms';

export class CustomValidations {
    static cpfValidation(controle: AbstractControl) {
        if (controle.value.length === 0) {
            return null
        }

        const strCPF: string = controle.value;
        let soma: number;
        let resto: number;
        soma = 0;

        if (strCPF == "00000000000") {
            return { cpfInvalid: true }
        }

        for (let i = 1; i <= 9; i++) {
            soma = soma + parseInt(strCPF.substring(i - 1, i)) * (11 - i);
        }

        resto = (soma * 10) % 11;

        if ((resto == 10) || (resto == 11)) {
            resto = 0
        }

        if (resto != parseInt(strCPF.substring(9, 10))) {
            return { cpfInvalid: true }
        }

        soma = 0;

        for (let i = 1; i <= 10; i++) {
            soma = soma + parseInt(strCPF.substring(i - 1, i)) * (12 - i);
        }

        resto = (soma * 10) % 11;

        if ((resto == 10) || (resto == 11)) {
            resto = 0
        };

        if (resto != parseInt(strCPF.substring(10, 11))) {
            return { cpfInvalid: true }
        }

        return null;
    }

    static olderThan18(controle: AbstractControl) {
        if (controle.value.length === 0) {
            return null;
        }

        const nascimento = controle.value;
        const dia = nascimento.slice(0, 2);
        const mes = nascimento.slice(2, 2);
        const ano = nascimento.slice(-4);

        const hoje = new Date();
        const dataNascimento = new Date(ano, mes, dia, 0, 0, 0);
        const tempoParaTeste = 1000 * 60 * 60 * 24 * 365 * 18;

        if (hoje.getTime() - dataNascimento.getTime() >= tempoParaTeste) {
            return null;
        }

        return { ageInvalid: true };
    }
}