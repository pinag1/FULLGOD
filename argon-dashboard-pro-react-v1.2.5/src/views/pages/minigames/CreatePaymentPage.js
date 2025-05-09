// src/views/MainSlot.js
import { Col, Row } from "reactstrap";
import MainSlotForm from "../../../components/MainSlotForm";

const CreatePaymentPage = () => {
  return ( 
      <Row>
        <Col lg="12" md="12">
          <MainSlotForm />
        </Col>
      </Row>
  );
};

export default CreatePaymentPage;
