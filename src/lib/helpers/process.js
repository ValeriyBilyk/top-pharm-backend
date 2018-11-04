Object.assign(process, {
  debutIsProd,
  debutIsTest,
  debutIsDev,
  debutIsStage,
});

function debutIsProd() {

  return checkEnv('production')
}

function debutIsTest() {

  return checkEnv('test')
}

function debutIsDev() {

  return checkEnv('dev')
}

function debutIsStage() {

  return checkEnv('staging')
}

function checkEnv(env) {

  return process.env.NODE_ENV === env;
}