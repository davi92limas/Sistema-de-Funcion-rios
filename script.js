function exibirErro(mensagem) {
    document.getElementById('resultado').innerHTML = `<p style="color: red;">Erro: ${mensagem}</p>`;
    abrirModal();
}

function abrirModal() {
    const modal = document.getElementById('myModal');
    modal.style.display = 'block';
}

function fecharModal() {
    const modal = document.getElementById('myModal');
    modal.style.display = 'none';
}

function criarFuncionario() {
    try {
        const nome = document.getElementById('nome').value;
        const idade = parseInt(document.getElementById('idade').value);
        const cargo = document.getElementById('cargo').value;

        if (!nome || isNaN(idade)) {
            throw new Error('Preencha todos os campos corretamente.');
        }

        let funcionario;

        if (cargo === 'gerente') {
            const departamento = document.getElementById('departamento').value;
            funcionario = new Gerente(nome, idade, departamento);
        } else if (cargo === 'desenvolvedor') {
            const linguagem = document.getElementById('linguagem').value;
            funcionario = new Desenvolvedor(nome, idade, linguagem);
        } else {
            throw new Error('Cargo inválido.');
        }

        funcionario.seApresentar();
        funcionario.trabalhar();

        if (funcionario instanceof Gerente) {
            funcionario.gerenciar();
        } else if (funcionario instanceof Desenvolvedor) {
            funcionario.programar();
        }

        document.getElementById('resultado').innerHTML = `<p>Funcionário criado com sucesso.</p>`;
        abrirModal();
    } catch (error) {
        exibirErro(error.message);
    }
}

class Funcionario {
    constructor(nome, idade, cargo) {
        this.nome = nome;
        this.idade = idade;
        this.cargo = cargo;
    }

    seApresentar() {
        console.log(`Olá, meu nome é ${this.nome}, tenho ${this.idade} anos e sou ${this.cargo}.`);
    }

    trabalhar() {
        console.log(`${this.nome} está trabalhando.`);
    }
}

class Gerente extends Funcionario {
    constructor(nome, idade, departamento) {
        super(nome, idade, 'Gerente');
        this.departamento = departamento;
    }

    gerenciar() {
        console.log(`${this.nome} está gerenciando o departamento de ${this.departamento}.`);
    }
}

class Desenvolvedor extends Funcionario {
    constructor(nome, idade, linguagem) {
        super(nome, idade, 'Desenvolvedor');
        this.linguagem = linguagem;
    }

    programar() {
        console.log(`${this.nome} está programando em ${this.linguagem}.`);
    }
}
