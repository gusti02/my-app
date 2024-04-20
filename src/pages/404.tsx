import Image from "next/image";

function Custom404() {
  return (
    <div className="flex flex-col items-center justify-center w-screen min-h-screen text-white bg-black text-2xl">
      {/* <img className="w-1/4" src="/not_found.svg" alt="404" /> */}
      <Image src={"/not_found.svg"} alt="404" width={400} height={400} />
      <div className="text-2xl">Halaman Tidak Ditemukan</div>
    </div>
  );
}

export default Custom404;
