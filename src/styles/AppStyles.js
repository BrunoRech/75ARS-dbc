import styled from "styled-components";
import { Form, Modal as SemanticModal } from "semantic-ui-react";

export const FormContainer = styled.div`
  padding: 15px;
`;

export const Container = styled.div`
  justify-content: center;
  padding: 30px;
  background: #d4d4d4;
  height: 100vh;
`;

export const ButtonContainer = styled.div`
  display: flex;
`;

export const FormButton = styled(Form.Button)`
  width: -webkit-fill-available !important;
`;

export const Modal = styled(SemanticModal)`
  width: 600px !important;
`;

export const FindContainer = styled.div`
  margin-top: 15px;
  margin-bottom: 10px;
  display: flex;
`;
