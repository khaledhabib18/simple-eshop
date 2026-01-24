import PDFDocument from "pdfkit-table";
import fs from "fs";

export const generateInvoicePDF = async (order: any, orderProducts: any) => {
  const tableRows = orderProducts.map((p: any) => [
    p.product.name,
    p.product.price.toString(),
    p.quantity.toString(),
    (p.product.price * p.quantity).toString(),
  ]);
  const subtotal = orderProducts.reduce(
    (acc: number, p: any) => acc + p.product.price * p.quantity,
    0,
  );
  const shippingFees = 100;
  const total = subtotal + shippingFees;

  tableRows.push(["", "", "Subtotal", `$${subtotal.toFixed(2)}`]);
  tableRows.push(["", "", "Shipping Fees", `$${shippingFees.toFixed(2)}`]);
  tableRows.push(["", "", "TOTAL", `$${total.toFixed(2)}`]);

  const table = {
    title: "Order Invoice",
    subtitle: `Generated on ${new Date().toLocaleDateString()}`,
    headers: [
      { label: "Product Name", width: 200 },
      { label: "Unit Price", width: 100, align: "center" },
      { label: "Qunatity", width: 100, align: "center" },
      { label: "Price", width: 100, align: "center" },
    ],
    rows: tableRows,
  };
  const doc = new PDFDocument({ margin: 30, size: "A4" });
  doc.pipe(fs.createWriteStream(`./public/pdfs/invoice-${order.id}.pdf`));
  doc.registerFont("Fira Code", "./src/Fonts/FiraCode.ttf");
  doc.registerFont("Ubuntu", "./src/Fonts/Ubuntu-Regular.ttf");
  doc.font("Ubuntu");
  doc
    .font("Fira Code")
    .fontSize(28)
    .fillColor("#1a5490")
    .text("== Invoice ==", { align: "center" })
    .moveDown(0.5);
  doc
    .fillColor("black")
    .font("Ubuntu")
    .fontSize(12)
    .text(`Customer Name: ${order.user.name}`)
    .moveDown(0.5);
  doc
    .fillColor("black")
    .font("Ubuntu")
    .fontSize(12)
    .text(`Customer Address: ${order.address}`)
    .moveDown(0.5);
  doc
    .fillColor("black")
    .font("Ubuntu")
    .fontSize(12)
    .text(`Customer Email: ${order.user.email}`)
    .moveDown();
  doc
    .fillColor("black")
    .font("Ubuntu")
    .table(table, {
      prepareHeader: () => doc.fontSize(12),
      prepareRow: (
        row?: any,
        indexColumn?: number,
        indexRow?: number,
        rectRow?: any,
        rectCell?: any,
      ) => {
        return doc;
      },
    });
  doc.end();
};
