#!/usr/bin/env node

/**
 * Script para verificar y corregir problemas de modales en producción
 * Este script se ejecuta después del build para asegurar que los archivos CSS estén correctos
 */

const fs = require('fs');
const path = require('path');

console.log('🔧 Verificando archivos CSS para modales en producción...\n');

// Verificar que los archivos CSS existan
const cssFiles = [
  'src/assets/css/modal-production-fix.css',
  'src/assets/css/production-override.css'
];

let allFilesExist = true;

cssFiles.forEach(file => {
  if (fs.existsSync(file)) {
    console.log(`✅ ${file} - Existe`);
  } else {
    console.log(`❌ ${file} - No existe`);
    allFilesExist = false;
  }
});

if (!allFilesExist) {
  console.log('\n❌ Algunos archivos CSS no existen. Por favor, verifica la estructura del proyecto.');
  process.exit(1);
}

// Verificar que el archivo main.js tenga las importaciones correctas
const mainJsPath = 'src/main.js';
if (fs.existsSync(mainJsPath)) {
  const mainJsContent = fs.readFileSync(mainJsPath, 'utf8');
  
  if (mainJsContent.includes('modal-production-fix.css')) {
    console.log('✅ main.js - Importación de modal-production-fix.css encontrada');
  } else {
    console.log('❌ main.js - Importación de modal-production-fix.css no encontrada');
  }
  
  if (mainJsContent.includes('production-override.css')) {
    console.log('✅ main.js - Importación de production-override.css encontrada');
  } else {
    console.log('❌ main.js - Importación de production-override.css no encontrada');
  }
} else {
  console.log('❌ main.js - No existe');
}

// Verificar que el package.json tenga el script de build actualizado
const packageJsonPath = 'package.json';
if (fs.existsSync(packageJsonPath)) {
  const packageJsonContent = fs.readFileSync(packageJsonPath, 'utf8');
  
  if (packageJsonContent.includes('modal-production-fix.css')) {
    console.log('✅ package.json - Script de build actualizado correctamente');
  } else {
    console.log('❌ package.json - Script de build no actualizado');
  }
} else {
  console.log('❌ package.json - No existe');
}

// Verificar que el vercel.json tenga las rutas correctas
const vercelJsonPath = 'vercel.json';
if (fs.existsSync(vercelJsonPath)) {
  const vercelJsonContent = fs.readFileSync(vercelJsonPath, 'utf8');
  
  if (vercelJsonContent.includes('modal-production-fix.css')) {
    console.log('✅ vercel.json - Ruta para modal-production-fix.css configurada');
  } else {
    console.log('❌ vercel.json - Ruta para modal-production-fix.css no configurada');
  }
  
  if (vercelJsonContent.includes('production-override.css')) {
    console.log('✅ vercel.json - Ruta para production-override.css configurada');
  } else {
    console.log('❌ vercel.json - Ruta para production-override.css no configurada');
  }
} else {
  console.log('❌ vercel.json - No existe');
}

console.log('\n🎉 Verificación completada!');
console.log('\n📋 Pasos para aplicar la solución:');
console.log('1. Ejecuta: npm run vercel-build');
console.log('2. Verifica que los archivos CSS se hayan copiado a la carpeta dist/');
console.log('3. Despliega a Vercel');
console.log('4. Verifica que el modal se vea correctamente en producción');

console.log('\n🔍 Si el problema persiste, verifica:');
console.log('- Que los archivos CSS se estén cargando correctamente en el navegador');
console.log('- Que no haya conflictos con otros estilos CSS');
console.log('- Que el orden de carga de los CSS sea el correcto');
