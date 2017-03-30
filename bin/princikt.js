#!/usr/bin/env node

const fs = require('vinyl-fs');
const ftp = require('vinyl-ftp');
const zip = require('gulp-vinyl-zip');

if(!process.argv[3] || !process.argv[2])
  return console.error('Utilize o padrão princikt cliente nome-arquivo.zip');

const clientes = require('./clientes');
const objetoDeConexaoFtp = clientes.find( cliente => process.argv[2].toLowerCase() === cliente.nome.toLowerCase() );
if(!objetoDeConexaoFtp)
  return console.error('Dados de cliete não encontrados');

const nomeArquivo = process.argv[3];
const nomePasta = nomeArquivo.match(/(.*)\.zip/i)[1];
if(!nomePasta)
  return console.error('Arquivo não é um zip');

const conn = new ftp(objetoDeConexaoFtp);

fs.src(nomeArquivo)
  .pipe(zip.src())
  .pipe(conn.dest(`www/emkt/${nomePasta}`));
