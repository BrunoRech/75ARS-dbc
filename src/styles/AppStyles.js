import styled from "styled-components";
import { Form } from "semantic-ui-react";

export const FormContainer = styled.div`
  width: 500px;
  display: table;
  padding: 15px;
`;

export const Container = styled.div`
  display: flex;
  justify-content: center;
  padding-top: 30px;
  background: #d4d4d4;
  height: 100vh;
`;

export const ButtonContainer = styled.div`
  display: flex;
`;

export const FormButton = styled(Form.Button)`
   width: -webkit-fill-available !important;
`;
