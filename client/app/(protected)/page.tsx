import { AddInstrumentsButtons, InstrumentList } from "@/feature/home";

export default function Home() {
  return (
    <div className="">
      <AddInstrumentsButtons /> 

     <div className="h-0.5 bg-slate-300 my-5"/>

      <InstrumentList />
    </div>
  );
}
