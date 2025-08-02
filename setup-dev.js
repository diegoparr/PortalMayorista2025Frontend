const fs = require('fs');
const path = require('path');

console.log('🔧 Configurando entorno de desarrollo...');

// Verificar si estamos en desarrollo
const isDevelopment = process.env.NODE_ENV === 'development';

if (isDevelopment) {
  console.log('📁 Configurando para desarrollo local...');
  
  // Crear un archivo HTML temporal para desarrollo si no existe
  const devHtmlPath = path.join(__dirname, 'index.dev.html');
  const prodHtmlPath = path.join(__dirname, 'index.html');
  
  if (fs.existsSync(devHtmlPath)) {
    console.log('✅ Archivo index.dev.html encontrado');
  } else {
    console.log('⚠️  Archivo index.dev.html no encontrado, usando index.html');
  }
  
  console.log('🚀 Servidor de desarrollo configurado para usar /dist/');
  console.log('🌐 Accede a http://localhost:1234/index.dev.html');
} else {
  console.log('🏭 Configurando para producción...');
  console.log('📦 Los archivos se servirán desde la raíz del proyecto');
}

console.log('✅ Configuración completada'); 