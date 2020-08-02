import React, { useState } from "react";
import { objectOf, any, func } from "prop-types";
import { Form, Icon } from "semantic-ui-react";
import { cpfValidator } from "../functions/Validator";
import { FormButton, FormContainer } from "../styles/AppStyles";
import { backend, viacep } from "../services/api";

const defaultValues = {
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

const { Input, Button, Group } = Form;

const ClienteForm = ({ cliente, callback }) => {
  const [formData, setFormData] = useState({ ...cliente });
  const [loading, setLoading] = useState(false);

  const fetchCep = async () => {
    setLoading(true);
    await viacep
      .get(`/${formData.cep}/json/`)
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

  const handleSubmit = async () => {
    setLoading(true);
    if (!cpfValidator(formData.cpf)) {
      setLoading(false);
      return alert("CPF inválido");
    }
    const keys = Object.keys(formData);
    for (let index = 0; index < keys.length; index++) {
      if (formData[keys[index]] && formData[keys[index]].length === 0) {
        setLoading(false);
        alert("Preencha todos os campos");
        return;
      }
    }
    const { id } = cliente;
    if (id) {
      await backend.put(`/clientes/${id}`, formData);
      alert("Cliente editado com sucesso!");
    } else {
      await backend.post("/clientes", formData);
      alert("Cliente cadastrado com sucesso!");
    }
    setFormData(defaultValues);
    setLoading(false);
    if (callback) callback();
  };

  return (
    <FormContainer>
      <Form loading={loading}>
        <Input
          onChange={handleChange}
          value={formData.nome}
          name="nome"
          label="Nome completo"
        />
        <Group>
          <Input
            type="number"
            onChange={handleChange}
            value={formData.cpf}
            name="cpf"
            label="CPF"
          />
          <Input
            type="number"
            onChange={handleChange}
            value={formData.rg}
            name="rg"
            label="RG"
          />
          <Input
            onChange={handleChange}
            value={formData.data}
            name="data"
            label="Data Nascimento"
          />
        </Group>
        <Group>
          <Input
            onChange={handleChange}
            value={formData.rua}
            name="rua"
            label="Rua"
          />
          <Input
            onChange={handleChange}
            value={formData.bairro}
            name="bairro"
            label="Bairro"
          />
          <Input
            type="number"
            onChange={handleChange}
            value={formData.numero}
            name="numero"
            label="Número"
          />
        </Group>
        <Input disabled value={formData.cidade} name="cidade" label="Cidade" />
        <Group>
          <Input
            disabled
            value={formData.estado}
            name="estado"
            label="Estado"
          />

          <Input
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
        </Group>
        <Button primary onClick={handleSubmit}>
          Cadastrar
        </Button>
      </Form>
    </FormContainer>
  );
};

ClienteForm.propTypes = {
  cliente: objectOf(any),
  callback: func,
};

ClienteForm.defaultProps = {
  cliente: defaultValues,
  callback: null,
};

export default ClienteForm;
