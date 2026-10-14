import database from "../../../../infra/database.js";

async function status(req, rep) {
  const result = await database.query("SELECT 1 + 1 as sum;");
  console.log(result.rows);
  rep.status(200).json({ chave: "valor" });
}

export default status;
