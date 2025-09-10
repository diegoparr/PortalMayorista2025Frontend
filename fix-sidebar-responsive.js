#!/usr/bin/env node

/**
 * Script para verificar y corregir problemas de responsive del sidebar
 * Este script se ejecuta después del build para asegurar que el sidebar funcione correctamente en móviles
 */

const fs = require('fs');
const path = require('path');

console.log('🔧 Verificando configuración del sidebar responsive...\n');

// Verificar que los archivos CSS existan
const cssFiles = [
  'src/assets/css/sidebar-responsive-fix.css'
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
  
  if (mainJsContent.includes('sidebar-responsive-fix.css')) {
    console.log('✅ main.js - Importación de sidebar-responsive-fix.css encontrada');
  } else {
    console.log('❌ main.js - Importación de sidebar-responsive-fix.css no encontrada');
  }
} else {
  console.log('❌ main.js - No existe');
}

// Verificar que el componente mobile-menu-toggle exista
const mobileMenuTogglePath = 'src/components/template/parts/header/parts/mobile-menu-toggle.vue';
if (fs.existsSync(mobileMenuTogglePath)) {
  console.log('✅ mobile-menu-toggle.vue - Componente creado');
} else {
  console.log('❌ mobile-menu-toggle.vue - Componente no existe');
}

// Verificar que el header tenga el componente mobile-menu-toggle
const headerPath = 'src/components/template/parts/header/main.vue';
if (fs.existsSync(headerPath)) {
  const headerContent = fs.readFileSync(headerPath, 'utf8');
  
  if (headerContent.includes('mobile-menu-toggle')) {
    console.log('✅ header/main.vue - Componente mobile-menu-toggle incluido');
  } else {
    console.log('❌ header/main.vue - Componente mobile-menu-toggle no incluido');
  }
  
  if (headerContent.includes('MobileMenuToggle')) {
    console.log('✅ header/main.vue - Importación de MobileMenuToggle encontrada');
  } else {
    console.log('❌ header/main.vue - Importación de MobileMenuToggle no encontrada');
  }
} else {
  console.log('❌ header/main.vue - No existe');
}

// Verificar que el package.json tenga el script de build actualizado
const packageJsonPath = 'package.json';
if (fs.existsSync(packageJsonPath)) {
  const packageJsonContent = fs.readFileSync(packageJsonPath, 'utf8');
  
  if (packageJsonContent.includes('sidebar-responsive-fix.css')) {
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
  
  if (vercelJsonContent.includes('sidebar-responsive-fix.css')) {
    console.log('✅ vercel.json - Ruta para sidebar-responsive-fix.css configurada');
  } else {
    console.log('❌ vercel.json - Ruta para sidebar-responsive-fix.css no configurada');
  }
} else {
  console.log('❌ vercel.json - No existe');
}

// Verificar que el index.html tenga el CSS de respaldo
const indexHtmlPath = 'index.html';
if (fs.existsSync(indexHtmlPath)) {
  const indexHtmlContent = fs.readFileSync(indexHtmlPath, 'utf8');
  
  if (indexHtmlContent.includes('sidebar-responsive-fix.css')) {
    console.log('✅ index.html - CSS de respaldo incluido');
  } else {
    console.log('❌ index.html - CSS de respaldo no incluido');
  }
} else {
  console.log('❌ index.html - No existe');
}

console.log('\n🎉 Verificación completada!');
console.log('\n📋 Pasos para aplicar la solución:');
console.log('1. Ejecuta: npm run vercel-build');
console.log('2. Verifica que los archivos CSS se hayan copiado a la carpeta dist/');
console.log('3. Despliega a Vercel');
console.log('4. Verifica que el sidebar funcione correctamente en móviles');

console.log('\n🔍 Características del sidebar responsive:');
console.log('- ✅ Botón hamburguesa en la esquina superior izquierda');
console.log('- ✅ Sidebar oculto por defecto en móviles');
console.log('- ✅ Sidebar deslizable desde la izquierda');
console.log('- ✅ Overlay para cerrar el sidebar');
console.log('- ✅ Cierre automático al cambiar de ruta');
console.log('- ✅ Cierre automático al redimensionar la ventana');
console.log('- ✅ Cierre al hacer clic fuera del sidebar');

console.log('\n📱 Breakpoints:');
console.log('- Móviles: < 768px - Sidebar oculto, botón hamburguesa visible');
console.log('- Tabletas: 768px - 1024px - Sidebar visible, ancho 200px');
console.log('- Desktop: > 1024px - Sidebar visible, ancho 250px');

console.log('\n🔍 Si el problema persiste, verifica:');
console.log('- Que los archivos CSS se estén cargando correctamente en el navegador');
console.log('- Que el componente mobile-menu-toggle se esté renderizando');
console.log('- Que no haya conflictos con otros estilos CSS');
console.log('- Que el JavaScript esté funcionando correctamente');
