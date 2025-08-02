const fs = require('fs');
const path = require('path');

console.log('🔍 VERIFICANDO CONFIGURACIÓN DEL ENTORNO');
console.log('==========================================');

// Verificar NODE_ENV
const nodeEnv = process.env.NODE_ENV;
console.log(`📁 NODE_ENV: ${nodeEnv || 'undefined'}`);

// Verificar archivos de configuración
const devConfigExists = fs.existsSync(path.join(__dirname, 'webpack.dev.config.js'));
const prodConfigExists = fs.existsSync(path.join(__dirname, 'webpack.config.js'));
const devHtmlExists = fs.existsSync(path.join(__dirname, 'index.dev.html'));
const prodHtmlExists = fs.existsSync(path.join(__dirname, 'index.html'));

console.log(`📄 webpack.dev.config.js: ${devConfigExists ? '✅ Existe' : '❌ No existe'}`);
console.log(`📄 webpack.config.js: ${prodConfigExists ? '✅ Existe' : '❌ No existe'}`);
console.log(`📄 index.dev.html: ${devHtmlExists ? '✅ Existe' : '❌ No existe'}`);
console.log(`📄 index.html: ${prodHtmlExists ? '✅ Existe' : '❌ No existe'}`);

// Determinar entorno
if (nodeEnv === 'development') {
  console.log('\n🚀 ENTORNO: DESARROLLO');
  console.log('📂 Archivos se servirán desde: /dist/');
  console.log('🌐 URL de desarrollo: http://localhost:1234/index.dev.html');
} else if (nodeEnv === 'production') {
  console.log('\n🏭 ENTORNO: PRODUCCIÓN');
  console.log('📂 Archivos se servirán desde: / (raíz)');
  console.log('🌐 Configurado para Vercel');
} else {
  console.log('\n⚠️  ENTORNO: NO DEFINIDO');
  console.log('📂 Usando configuración por defecto');
}

console.log('\n✅ Verificación completada'); 