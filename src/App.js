import React, { useState, useEffect, useCallback } from "react";
import { Container, Modal } from "./styles/AppStyles";
import { Table, Button, Icon } from "semantic-ui-react";
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

const { Row, Cell, Body, Header, HeaderCell } = Table;

const App = () => {
  const [openModal, handleModal] = useState(false);
  const [cliente, setCliente] = useState({});
  const [clientes, setClientes] = useState([]);

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

  return (
    <>
      <Container>
        <Button primary onClick={() => handleModal(true)}>
          Cadastrar cliente
        </Button>
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
              <Row key={cliente.id}>
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
