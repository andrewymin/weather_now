import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const invoices = [
  {
    invoice: "10",
    paymentStatus: "Clear",
    paymentMethod: "70℉",
  },
  {
    invoice: "11",
    paymentStatus: "Pending",
    paymentMethod: "75℉",
  },
  {
    invoice: "12",
    paymentStatus: "Clear",
    paymentMethod: "65℉",
  },
  {
    invoice: "13",
    paymentStatus: "Clear",
    paymentMethod: "70℉",
  },
  {
    invoice: "14",
    paymentStatus: "Clear",
    paymentMethod: "75℉",
  },
  {
    invoice: "15",
    paymentStatus: "Pending",
    paymentMethod: "65℉",
  },
  {
    invoice: "16",
    paymentStatus: "Clear",
    paymentMethod: "70℉",
  },
  {
    invoice: "10",
    paymentStatus: "Clear",
    paymentMethod: "70℉",
  },
  {
    invoice: "11",
    paymentStatus: "Pending",
    paymentMethod: "75℉",
  },
  {
    invoice: "12",
    paymentStatus: "Clear",
    paymentMethod: "65℉",
  },
  {
    invoice: "13",
    paymentStatus: "Clear",
    paymentMethod: "70℉",
  },
  {
    invoice: "14",
    paymentStatus: "Clear",
    paymentMethod: "75℉",
  },
  {
    invoice: "15",
    paymentStatus: "Pending",
    paymentMethod: "65℉",
  },
  {
    invoice: "16",
    paymentStatus: "Clear",
    paymentMethod: "70℉",
  },
];

function Daily() {
  return (
    // <Table className=" p-8 w-[70%] mt-16 mb-16">
    //   <TableHeader>
    //     <TableRow>
    //       <TableHead>Day</TableHead>
    //       <TableHead>Weather</TableHead>
    //       <TableHead>Tempature</TableHead>
    //     </TableRow>
    //   </TableHeader>
    //   <TableBody>
    //     {invoices.map((invoice) => (
    //       <TableRow key={invoice.invoice}>
    //         <TableCell className="font-medium">{invoice.invoice}</TableCell>
    //         <TableCell>{invoice.paymentStatus}</TableCell>
    //         <TableCell>{invoice.paymentMethod}</TableCell>
    //       </TableRow>
    //     ))}
    //   </TableBody>
    // </Table>

    <section id="days" className="flex justify-center">
      <div className="w-[70%] m-12 text-center">
        <div className="grid grid-cols-3 py-6 border-b-2 hover:bg-darkerBlue rounded-t-[7px]">
          <h1 className="font-bold">Day</h1>
          <h1 className="font-bold">Weather</h1>
          <h1 className="font-bold">Tempature</h1>
        </div>
        {invoices.map((day, i) => (
          <div
            key={i}
            className="grid grid-cols-3 py-6 border-b-2 hover:bg-darkerBlue last:rounded-b-[7px] last:border-none"
          >
            <div>{day.invoice}</div>
            <div>{day.paymentStatus}</div>
            <div>{day.paymentMethod}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Daily;
