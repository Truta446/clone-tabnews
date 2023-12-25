function status(request, response) {
  response.status(200).json({ chave: "alunos acima da média." });
}

export default status;
