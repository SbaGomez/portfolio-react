# Configuración de EmailJS para el Formulario de Contacto

## 📧 Pasos para Configurar EmailJS

### 1. Crear cuenta en EmailJS
1. Ve a [https://www.emailjs.com](https://www.emailjs.com)
2. Crea una cuenta gratuita (200 emails/mes gratis)
3. Verifica tu email

### 2. Crear un servicio de email
1. Ve a [Email Services](https://dashboard.emailjs.com/admin/integration)
2. Selecciona tu proveedor de email (Gmail, Outlook, etc.)
3. Conecta tu cuenta de email
4. Copia el **Service ID**

### 3. Crear un template de email
1. Ve a [Email Templates](https://dashboard.emailjs.com/admin/templates)
2. Crea un nuevo template
3. Usa este contenido:

**Subject:** `Nuevo mensaje desde Portfolio: {{subject}}`

**Content:**
```html
<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
    <h2 style="color: #1A9FFF; border-bottom: 2px solid #B14143; padding-bottom: 10px;">
        Nuevo mensaje desde tu Portfolio
    </h2>
    
    <div style="background-color: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
        <h3 style="color: #333; margin-top: 0;">Información del contacto:</h3>
        <p><strong>Nombre:</strong> {{from_name}}</p>
        <p><strong>Email:</strong> {{from_email}}</p>
        <p><strong>Asunto:</strong> {{subject}}</p>
    </div>
    
    <div style="background-color: #fff; padding: 20px; border-left: 4px solid #1A9FFF; margin: 20px 0;">
        <h3 style="color: #333; margin-top: 0;">Mensaje:</h3>
        <p style="white-space: pre-wrap; line-height: 1.6;">{{message}}</p>
    </div>
    
    <div style="background-color: #e8f4f8; padding: 15px; border-radius: 5px; margin-top: 20px;">
        <p style="margin: 0; color: #666; font-size: 14px;">
            <strong>Fecha:</strong> {{current_date}}
        </p>
    </div>
</div>
```

**IMPORTANTE - Configuración del Servicio:**
1. En EmailJS, ve a **Email Services**
2. Selecciona tu servicio (Gmail, Outlook, etc.)
3. En **Settings**, configura:
   - **From Name**: `Portfolio Contacto`
   - **From Email**: `sbagomeznight@gmail.com` (tu email verificado)
   - **Reply To**: `{{from_email}}` (email del remitente)

4. Guarda el template y copia el **Template ID**

### 4. Obtener Public Key
1. Ve a [Account](https://dashboard.emailjs.com/admin/account)
2. Copia tu **Public Key**

### 5. Configurar Variables de Entorno
Crea un archivo `.env` en la raíz del proyecto con:

```env
REACT_APP_EMAILJS_SERVICE_ID=tu_service_id_aqui
REACT_APP_EMAILJS_TEMPLATE_ID=tu_template_id_aqui
REACT_APP_EMAILJS_PUBLIC_KEY=tu_public_key_aqui
```

## 🔧 Uso

Una vez configurado, el formulario de contacto enviará emails reales a tu dirección configurada.

## 📋 Variables del Template

El template usa estas variables:
- `{{from_name}}` - Nombre del remitente
- `{{from_email}}` - Email del remitente
- `{{subject}}` - Asunto del mensaje
- `{{message}}` - Contenido del mensaje
- `{{to_email}}` - Email destinatario
- `{{reply_to}}` - Email para responder
- `{{current_date}}` - Fecha actual

## ⚠️ Notas Importantes

- **Gratis**: 200 emails por mes
- **Fácil configuración**: No requiere backend
- **Seguro**: Las claves se mantienen en variables de entorno
- **Compatible**: Funciona perfectamente con React

## 🚀 Ventajas sobre SendGrid

- ✅ **Funciona en frontend** (no necesita backend)
- ✅ **Configuración más simple**
- ✅ **No requiere verificación de dominio**
- ✅ **Perfecto para portfolios**
