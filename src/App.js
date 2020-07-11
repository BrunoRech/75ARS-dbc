import React, { useState } from "react";
import axios from "axios";
import { Form, Icon } from "semantic-ui-react";
import { Container, FormContainer, FormButton } from "./styles/AppStyles";
import { cpfValidator } from "./functions/Validator";

const App = () => {
  const formStartingValue = {
    nome: "",
    cpf: "",
    rg: "",
    data: "",
    cep: "",
    rua: "",
    cidade: "",
    estado: "",
    bairro: "",
    numero: "",
  };
  const [formData, setFormData] = useState({ ...formStartingValue });
  const [loading, setLoading] = useState(false);

  const fetchCep = async () => {
    setLoading(true);
    await axios
      .get(`https://viacep.com.br/ws/${formData.cep}/json/`)
      .then(({ data }) => {
        const { localidade: cidade, uf: estado } = data;
        setFormData({ ...formData, estado, cidade });
      })
      .catch((error) => {
        alert("CEP inválido");
      });
    setLoading(false);
  };

  const handleChange = (event, { name }) => {
    const { value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = () => {
    setLoading(true);
    if (!cpfValidator(formData.cpf)) {
      setLoading(false);
      return alert("CPF inválido");
    }
    const keys = Object.keys(formData);
    for (let index = 0; index < keys.length; index++) {
      if (formData[keys[index]].length === 0) {
        setLoading(false);
        alert("Preencha todos os campos");
        return;
      }
    }

    alert("Cliente cadastrado");
    setFormData({ ...formStartingValue });
    setLoading(false);
  };

  return (
    <Container>
      <FormContainer>
        <Form loading={loading}>
          <Form.Input
            onChange={handleChange}
            value={formData.nome}
            name="nome"
            label="Nome completo"
          />
          <Form.Group>
            <Form.Input
              type="number"
              onChange={handleChange}
              value={formData.cpf}
              name="cpf"
              label="CPF"
            />
            <Form.Input
              type="number"
              onChange={handleChange}
              value={formData.rg}
              name="rg"
              label="RG"
            />
            <Form.Input
              onChange={handleChange}
              value={formData.data}
              name="data"
              label="Data Nascimento"
            />
          </Form.Group>
          <Form.Group>
            <Form.Input
              onChange={handleChange}
              value={formData.rua}
              name="rua"
              label="Rua"
            />
            <Form.Input
              onChange={handleChange}
              value={formData.bairro}
              name="bairro"
              label="Bairro"
            />
            <Form.Input
              type="number"
              onChange={handleChange}
              value={formData.numero}
              name="numero"
              label="Número"
            />
          </Form.Group>
          <Form.Input
            disabled
            value={formData.cidade}
            name="cidade"
            label="Cidade"
          />
          <Form.Group>
            <Form.Input
              disabled
              value={formData.estado}
              name="estado"
              label="Estado"
            />

            <Form.Input
              type="number"
              onChange={handleChange}
              value={formData.cep}
              name="cep"
              label="CEP"
            />

            <FormButton
              label="Procurar"
              icon={<Icon name="search" />}
              primary
              onClick={fetchCep}
              fluid
            />
          </Form.Group>
          <Form.Button primary fluid onClick={handleSubmit}>
            Cadastrar
          </Form.Button>
        </Form>
      </FormContainer>
    </Container>
  );
};

export default App;
