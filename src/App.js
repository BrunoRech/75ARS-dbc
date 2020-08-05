import React, { useState, useEffect, useCallback } from "react";
import { Container, Modal, FindContainer } from "./styles/AppStyles";
import { Table, Button, Icon, Form } from "semantic-ui-react";
import { backend } from "./services/api";
import ClienteForm from "./components/ClienteForm";

const collumns = [
  { nome: "Nome", path: "nome" },
  { nome: "CPF", path: "cpf" },
  { nome: "RG", path: "rg" },
  { nome: "Data", path: "data" },
  { nome: "CEP", path: "cep" },
  { nome: "Rua", path: "rua" },
  { nome: "Cidade", path: "cidade" },
  { nome: "Estado", path: "estado" },
  { nome: "Bairro", path: "bairro" },
  { nome: "Número", path: "numero" },
];
const { Button: FormButton, Input } = Form;
const { Row, Cell, Body, Header, HeaderCell } = Table;

const App = () => {
  const [openModal, handleModal] = useState(false);
  const [cliente, setCliente] = useState({});
  const [clientes, setClientes] = useState([]);
  const [clienteId, setClienteId] = useState(null);

  const carregarClientes = useCallback(async () => {
    try {
      const { data } = await backend.get("/clientes");
      setClientes(data);
    } catch (error) {
      alert("Não foi possível carregar a lista de clientes");
    }
  }, []);

  useEffect(() => {
    carregarClientes();
  }, [carregarClientes]);

  const deletarCliente = async (id) => {
    try {
      await backend.delete(`/clientes/${id}`);
      alert("Cliente deletado com sucesso!");
      setClientes(clientes.filter(({ id: clienteId }) => clienteId !== id));
    } catch (error) {
      alert("Erro ao deletar cliente");
    }
  };

  const closeModal = () => {
    handleModal(false);
    setCliente({});
    carregarClientes();
  };

  const procurarPorId = async () => {
    try {
      const { data } = await backend.get(`/clientes/${clienteId}`);
      if (data) {
        alert('Sucesso!')
        return setClientes([data]);
      }
      alert(`Nenhum cliente encontrado com o Id ${clienteId}`);
      setClienteId(null);
      return setClientes([]);
    } catch (error) {
      return alert("Erro ao procurar cliente");
    }
  };

  return (
    <>
      <Container>
        <Button primary onClick={() => handleModal(true)}>
          Cadastrar cliente
        </Button>
        <Form>
          <FindContainer>
            <Input
              width="3"
              placeholder="Procurar cliente por id"
              value={clienteId}
              onChange={({ target }) => setClienteId(target.value)}
            />
            <FormButton onClick={procurarPorId} primary>
              Procurar
            </FormButton>
          </FindContainer>
        </Form>
        <Table celled compact padded>
          <Header>
            <Row>
              {collumns.map(({ nome }) => (
                <HeaderCell>{nome}</HeaderCell>
              ))}
              <HeaderCell>Ações</HeaderCell>
            </Row>
          </Header>
          <Body>
            {clientes.map((cliente) => (
              <Row key={cliente?.id}>
                {collumns.map(({ path }) => (
                  <Cell>{cliente[path]}</Cell>
                ))}
                <Cell>
                  <Button
                    onClick={() => {
                      setCliente(cliente);
                      handleModal(true);
                    }}
                  >
                    <Icon color="orange" name="pencil" />
                    Editar
                  </Button>
                  <Button
                    onClick={() => {
                      deletarCliente(cliente.id);
                    }}
                  >
                    <Icon color="red" name="close" />
                    Excluir
                  </Button>
                </Cell>
              </Row>
            ))}
          </Body>
        </Table>
      </Container>
      <Modal
        open={openModal}
        onClose={() => {
          handleModal(false);
          setCliente({});
        }}
        closeOnTriggerMouseLeave
      >
        <ClienteForm cliente={cliente} callback={closeModal} />
      </Modal>
    </>
  );
};

export default App;
