import { React } from 'react';
// import './App.css';
import DragDropFlow from './Flows/DragDropFlow';
import DefaultFlow from './Flows/DefaultFlow';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Col, Container, Row } from 'react-bootstrap';
import { BrowserRouter } from 'react-router-dom';

function App() {
  return (
    <Container fluid>
      <Row>
        <Col style={{ minHeight: '90vh', minWidth: '90vh' }}>
          <DragDropFlow />
        </Col>
      </Row>
    </Container>
  );
}

export default App;
