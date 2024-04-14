function Custom404() {
  return (
    <div className="flex flex-col items-center justify-center w-screen min-h-screen text-white bg-black text-2xl">
      <img className="w-1/4" src="/not_found.svg" alt="404" />
      <div className="text-2xl">Halaman Tidak Ditemukan</div>
    </div>
  );
}

export default Custom404;
