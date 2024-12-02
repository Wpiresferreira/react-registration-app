export default function Footer() {
  return (
    <div className="flex flex-col md:flex-row justify-between w-[100vw] bg-[var(--color1)] text-white bottom-0 text-center">
      <div className="text-white p-2">
        <p className="text-white text-left">Arshdeep Singh</p>
        <p className="text-white text-left">Harsh Kullar</p>
        <p className="text-white text-left">Marcos Oshima</p>
        <p className="text-white text-left">Wagner Ferreira</p>
      </div>
      <div className="text-white p-2 text-left md:text-center">
        Call Us <br></br>
        <span className="fa fa-phone text-white px-2"></span> 403-410-1400
        <br></br>
        <span className="fa fa-phone text-white px-2"></span>1-866-428-2669
        (toll free)
      </div>
      <div className="text-white p-2 text-sm text-left">
      <span className="fa fa-copyright text-white px-2"></span>
      Copyright 2024. Bow Valley College. <br>
      </br>All rights reserved.</div>
    </div>
  );
}
