const bcrypt = require('bcrypt');

// Senha fornecida pelo usuário (exemplo)
const passwordProvided = "godmotaadmin@123";

// Hash da senha armazenada no banco de dados
const storedHash = "$2b$12$5e1s7h4NNbLDc3zCSalKN.PGHgcjbboQwQSgcn1xMo9pPEj8PT7TO"; // Exemplo de um hash armazenado

// Comparando a senha fornecida com o hash armazenado
bcrypt.compare(passwordProvided, storedHash, (err, isMatch) => {
  if (err) {
    console.error('Erro ao comparar a senha', err);
  } else {
    console.log('Senha 1?', passwordProvided); // Exibe true ou false
    console.log('Senha 2?', storedHash); // Exibe true ou false
    console.log('Senha corresponde?', isMatch); // Exibe true ou false
  }
});
