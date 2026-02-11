# Despliegue en Vercel - Guía

## Pre-requisitos
- Cuenta en [Vercel](https://vercel.com)
- Git configurado
- GitHub/GitLab/Bitbucket conectado

## Pasos para despliegue

### 1. Preparar el proyecto
```bash
npm run build  # Asegúrate que build sea exitoso localmente
```

### 2. Conectar a Vercel
Opciones:

**Opción A: Desde CLI**
```bash
npm i -g vercel   # Instala Vercel CLI globalmente
vercel            # Inicia el proceso de deploy interactivo
```

**Opción B: Desde Dashboard Vercel**
1. Ve a https://vercel.com/dashboard
2. Haz clic en "New Project"
3. Importa tu repositorio de Git
4. Vercel detectará automáticamente Vite
5. Click "Deploy"

### 3. Configuración automática
Vercel leerá `vercel.json` y configurará:
- Build Command: `npm run build`
- Output Directory: `dist/`
- Framework: Vite

### 4. Monitoreo y Métricas

Una vez deployado:
- **Analytics:** Verá datos de visitas en Vercel Dashboard → Analytics
- **SpeedInsights:** Verá métricas de rendimiento en el Dashboard → Speed Insights
- **Logs:** Visualiza logs de build y runtime en Deployments

### 5. Variables de Entorno (Opcional)
Si necesitas agregar variables:
```
Vercel Dashboard → Settings → Environment Variables
```

## Monitoreo de Métricas

### Web Analytics
- **Page Views:** Número de visitantes
- **Device:** Tipo de dispositivo (mobile, tablet, desktop)
- **Geo:** Ubicación geográfica de usuarios
- **Browser:** Navegador utilizado

### Speed Insights (Core Web Vitals)
- **LCP (Largest Contentful Paint):** Velocidad de carga del contenido principal
- **FID (First Input Delay):** Respuesta a interacciones
- **CLS (Cumulative Layout Shift):** Estabilidad visual de la página
- **TTFB (Time to First Byte):** Tiempo hasta primer byte

## URLs importantes
- **Dashboard:** https://vercel.com/dashboard
- **Analytics:** https://vercel.com/dashboard/[PROJECT-NAME]/analytics
- **Settings:** https://vercel.com/dashboard/[PROJECT-NAME]/settings

## Troubleshooting

### Build falla en Vercel
1. Revisa los logs en Deployments
2. Ejecuta `npm run build` localmente para verificar
3. Asegúrate que TypeScript compila sin errores

### Métricas no aparecen
1. Espera 24 horas para que se recopilen datos iniciales
2. Verifica que el proyecto esté activo (visitas reales)
3. Confirma que Analytics esté habilitado en Vercel

## Archivos de configuración
- **vercel.json:** Configuración de build y output
- **tsconfig.json:** Configuración de TypeScript
- **.github/copilot-instructions.md:** Instrucciones para IA agents

