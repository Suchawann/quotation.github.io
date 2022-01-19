import { useState, useEffect } from 'react';
import { Container, Row, Col, Table, Button } from "react-bootstrap";
import { FaTrash } from 'react-icons/fa';

function QuotationTable({ data, setDataItems }) {

    const [dataRows, setDataRows] = useState();
    const [totalPrice, setTotalPrice] = useState(0);
    const [totalDiscount, setTotalDiscount] = useState(0);

    const styles = {
      textCenter: {textAlign: 'center'},
      textRight: {textAlign: 'right'}
    }

    useEffect(() => {
      let sum = 0
      let total_discount = 0
      const z = data.map((v, i) => {
        let amount = (v.qty * v.ppu) - v.disc
        // if amount after discount is below 0
        if (amount < 0) {
          total_discount += v.qty * v.ppu // discount original amount
          amount = 0
        } else {
          total_discount += parseInt(v.disc, 10); // parse int
        }
        sum += amount
          return (
            <tr key={i}>
              <td><FaTrash onClick={() => deleteClick(i)}/></td>
              <td style={styles.textCenter}>{v.qty}</td>
              <td>{v.item}</td>
              <td style={styles.textRight}>{numberWithCommas(v.ppu)}</td>
              <td style={styles.textRight}>{numberWithCommas(v.disc)}</td>
              <td style={styles.textRight}>{numberWithCommas(amount)}</td>
            </tr>
          );
      });

    setDataRows(z);
    setTotalPrice(sum);
    setTotalDiscount(total_discount);
    }, [data]); // empty list of dependency, in this case, useEffect will run only one time.

    // Clear table's data
    const clearData = () => {
      setDataItems([])
      setDataRows([])
      console.log('cleared items')
    }

    // Add commas to numbers with regular expressions
    const numberWithCommas = (x) => {
      return ("" + x).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    };

    // Delete 1 item from table
    const deleteClick = (i) => {
      console.log(i, 'deleted!')
      data.splice(i,1)
      setDataItems([...data])
    }

    // Check and merge duplicated items
    // const clearRedundant = (i) => {
    //   setDataItems(data.map ((v, index) => {
    //     //console.log(data[0])
    //     const next = data[index + 1]
    //     if (v.pid !== undefined && next.pid !== undefined) {
    //       if (v.pid !== undefined && v.pid === next.pid && v.qty === next.qty) {
    //         v.qty = Number(v.qty) + Number(next.qty) + ""
    //       }
    //     }
    //   }))
    //   console.log('redundant items merged!')
    // }

    return (
      <Container>

        <Row>

          <Col>
            <h1>Quotation</h1>
          </Col>

          <Col>
            <Button onClick={clearData} variant="dark">Clear</Button>
          </Col>

          {/* <Col>
            <Button onClick={clearRedundant} variant="dark">Merge</Button>
          </Col> */}

        </Row>

        <Table striped bordered hover>

          <thead>
            <tr>
              <th></th>
              <th>Qty</th>
              <th>Item</th>
              <th>Price/Unit</th>
              <th>Discount</th>
              <th>Amount</th>
            </tr>
          </thead>

          <tbody>
            {dataRows}
          </tbody>

          <tfoot>
            <tr>
              <th colSpan={4}></th>
              <th style={styles.textCenter}>Total Discount</th>
              <th style={styles.textRight}>{numberWithCommas(totalDiscount)}</th>
            </tr>

            <tr>
              <th colSpan={4}></th>
              <th style={styles.textCenter}>Total Amount</th>
              <th style={styles.textRight}>{numberWithCommas(totalPrice)}</th>
            </tr>
          </tfoot>

        </Table>

        </Container>
    )
}

export default QuotationTable;