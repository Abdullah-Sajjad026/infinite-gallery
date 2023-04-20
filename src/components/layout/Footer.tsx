const Footer = () => {
  return (
    <div className="fixed inset-x-0 bottom-0">
      <div className="bg-gradient-to-r from-green-700 via-emerald-400 to-green-300 px-4 py-3 text-white">
        <p className="text-center text-sm font-medium">
          Uses{" "}
          <a href="https://picsum.photos/" className="underline te">
            Picsum Api
          </a>
        </p>
      </div>
    </div>
  );
};

export default Footer;
