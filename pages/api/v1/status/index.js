function status(req, rep) {
  rep.status(200).json({ chave: "valor" });
}

export default status;
