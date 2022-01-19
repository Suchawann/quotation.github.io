import { useRef, useState  } from 'react';
import QuotationTable from './QuotationTable';
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import useLocalStorage from 'react-localstorage-hook'

function App() {

  const itemRef = useRef();
  const ppuRef = useRef();
  const qtyRef = useRef();
  const discRef = useRef();

  // Local storage for data (key: "dataItems")
  // Items now won't disappear when page is refreshed
  const [dataItems, setDataItems] = useLocalStorage("dataItems", []);

  // Add items
  const addItem = () => {

    //console.log(typeof Number(discRef.current.value))
    //console.log(typeof Number(ppuRef.current.value))

    // If discount is negative
    if (Number(discRef.current.value) < 0) {
      alert("Please enter a positive number!");
      return;
    }

    // If discount exceeds or equals item price
    if (Number(discRef.current.value) >= Number(ppuRef.current.value)) {
      console.log("Price:", ppuRef.current.value)
      console.log("Discount:", discRef.current.value)
      console.log("Is discount >= price?", Number(discRef.current.value) >= Number(ppuRef.current.value))
      alert("Discount exceeds or equals item price!");
      return;
    }

    // If empty
    if (itemRef.current.value === "") {
      alert("Item name is empty!");
      return;
    }

    // Get item id
    const pid = itemRef.current.value

    // Find item
    const product = dummyProductList.find(e => e.id === pid)
    console.log('Item found!', product)

    // Assign values
    var itemObj = {
      pid: pid,
      item: product.name,
      ppu: ppuRef.current.value,
      qty: qtyRef.current.value,
      disc: 0
    }

    // Push itemObj into dataItems
    console.log('before', dataItems)
    dataItems.push(itemObj)
    setDataItems([...dataItems])
    console.log('after', dataItems)

    // Add discount to all items by updating disc value in local storage's array
    setDataItems(dataItems.map (x => {
      return {...x, disc: "" + discRef.current.value}
    }))

  }

  // Product list
  const dummyProductList = [
    { id: "p001", name: "iPhone 13 Pro Max", price: 1200 },
    { id: "p002", name: "Samsung Galaxy S22 Ultra", price: 1000 },
    { id: "p003", name: "GeForce RTX 3090 Graphics Card", price: 3000 },
    { id: "p004", name: "AMD Ryzen Threadripper 3990X Processor", price: 7000 },
  ];

  // Map product list to <option>
  const options =  dummyProductList.map(v => {
    return <option value={v.id} key={v.id}>{v.name}</option>
  })

  // Change product
  const productChange = (e) => {
    const pid = itemRef.current.value
    const product = dummyProductList.find((e) => e.id === pid)
    ppuRef.current.value = product.price
  }


  // Main Body
  return (

    <Container>
      <Row>

        <Col xs={5} style={{backgroundColor: '#eaeaea'}}>
          <Form>

            <Form.Group className="mb-3" controlId="formItem">
              <Form.Label>Item</Form.Label>
              {/* <Form.Control type="text" placeholder="Item Name" ref={itemRef} /> */}
              <Form.Select aria-label="Default select example" ref={itemRef} onChange={productChange}>
                {options}
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formPrice">
              <Form.Label>Price</Form.Label>
              <Form.Control type="number" placeholder="Price Per Unit" ref={ppuRef}/>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formQuantity">
              <Form.Label>Quantity</Form.Label>
              <Form.Control type="number" placeholder="Quantity"  ref={qtyRef}/>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formDiscount">
              <Form.Label>Discount</Form.Label>
              <Form.Control type="number" min="0" placeholder="Discount"  ref={discRef}/>
            </Form.Group>

            <Button variant="outline-dark" onClick={addItem}>
              Add
            </Button>

          </Form>
        </Col>

        <Col>
          <QuotationTable data={dataItems} setDataItems={setDataItems}/>
        </Col>

      </Row>
    </Container>
  );
}

export default App;
