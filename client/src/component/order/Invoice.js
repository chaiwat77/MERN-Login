import React from "react";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  PDFDownloadLink,
  Font,
} from "@react-pdf/renderer";
import moment from "moment/min/moment-with-locales";
import fontDev from "./tahoma.ttf";

import {
  Table,
  TableHeader,
  TableCell,
  TableBody,
  DataTableCell,
} from "@david.kucsai/react-pdf-table";
// // Register font
Font.register({ family: "basicfont", src: fontDev });

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: "row",
    backgroundColor: "#E4E4E4",
    fontFamily: "basicfont",
    textAlign: "center",
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
  summary: {
    textAlign: "right",
  },
});

const Invoice = ({ order }) => {
  //   console.log(order);
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <Text>MERN STACK WORKSHOP {order.cartTotal}</Text>
          <Text>เทสเวิร์คช็อป {order.cartTotal}</Text>
          <Text>{moment(Date.now()).locale("th").format("LL")}</Text>

          <Table>
            <TableHeader>
              <TableCell>รายการสินค้า</TableCell>
              <TableCell>ราคา</TableCell>
              <TableCell>จำนวน</TableCell>
            </TableHeader>
          </Table>

          <Table data={order.products}>
            <TableBody>
              <DataTableCell getContent={(i) => i.product.title} />
              <DataTableCell getContent={(i) => i.price} />
              <DataTableCell getContent={(i) => i.count} />
            </TableBody>
          </Table>

          <Text style={styles.summary}>Total: {order.cartTotal}</Text>
        </View>
      </Page>
    </Document>
  );
};

export default Invoice;
