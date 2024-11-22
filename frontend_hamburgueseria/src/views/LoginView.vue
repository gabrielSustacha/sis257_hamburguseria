<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/index';
import Swal from 'sweetalert2';

const nombreUsuario = ref('');
const clave = ref('');
const error = ref(false);
const router = useRouter();

async function onSubmit() {
  const usuario: string = nombreUsuario.value.trim();
  const password: string = clave.value.trim();

  if (usuario.length === 0 || password.length === 0) {
    Swal.fire({
      icon: 'warning',
      title: 'Debe ingresar un usuario y/o password',
    });
    return;
  }

  const authStore = useAuthStore();
  try {
    const response: any = await authStore.login(usuario, password);
    Swal.fire({
      icon: 'success',
      title: '¡Conexión exitosa!',
      confirmButtonColor: '#3085d6',
      confirmButtonText: 'Ingresar'
    }).then((result) => {
      if (result.isConfirmed) {
        router.push('/'); // Asegúrate de que esta es la ruta correcta
      }
    });
  } catch (error) {
    console.error('Error durante el inicio de sesión:', error);
    Swal.fire({
      icon: 'error',
      title: 'Usuario y/o password incorrecta'
    });
  }
}
</script>

<template>
  <div class="container-login">

    <div class="wrap-login">
      <form class="login-form validate-form" id="formLogin" @submit.prevent="onSubmit">
        <span class="login-form-title">INICIAR SESIÓN</span>
        
        <div style="display: flex; justify-content: center; align-items: center; height: 20vh;">
    <img src="@/assets/images/terza.png" width="150px" alt="Terza Logo">
  </div>

        
        <div class="wrap-input100" data-validate="Usuario incorrecto">
          <input class="input100" type="text" id="usuario" v-model="nombreUsuario" placeholder="Usuario" />
          <span class="focus-efecto"></span>
        </div>
        
        <div class="wrap-input100" data-validate="Password incorrecto">
          <input class="input100" type="password" id="password" v-model="clave" placeholder="Password" />
          <span class="focus-efecto"></span>
        </div>
        
        <div class="container-login-form-btn">
          <div class="wrap-login-form-btn">
            <div class="login-form-bgbtn"></div>
            <button type="submit" class="login-form-btn">CONECTAR</button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>


<style>
@font-face {
  font-family: Poppins-Regular;
  src: url('../assets/fuentes/poppins/Poppins-Regular.ttf') format('truetype')
  
}

@font-face {
  font-family: Poppins-Medium;
  src: url('../assets/fuentes/poppins/Poppins-Medium.ttf') format('truetype');
}

@font-face {
  font-family: Poppins-Bold;
    src: url('../assets/fuentes/poppins/Poppins-Bold.ttf') format('truetype');
}

@font-face {
  font-family: Poppins-SemiBold;
  src: url('../assets/fuentes/Poppins-SemiBold.ttf') format('truetype');
  
}

* {
  margin: 0px;
  padding: 0px;
  box-sizing: border-box;
}

body,
html {
  height: 100%;
  font-family: Poppins-Regular, sans-serif;
}

input {
  outline: none;
  border: none;
}

button {
  outline: none !important;
  border: none;
  background: transparent;
}

button:hover {
  cursor: pointer;
}

/*-- contenedor del Login--*/

.container-login {
  width: 100%;
  min-height: 100vh;
  display: -webkit-flex;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  padding: 15px;
  background: -webkit-linear-gradient(to right, #191b21, #191b21);
  background: linear-gradient(to right,  #191b21,  #191b21);
}

.wrap-login {
  width: 400px;
  background: #eceff1;
  border-radius: 15px;
  overflow: hidden;
  padding: 77px 55px 53px 55px;
  -webkit-box-shadow: 25px 40px 28px 0px rgba(227, 155, 20);
  
  /* box-shadow: eje-x | eje-y | blur-radius | color */
}

/*----Formulario de user y password----*/

.login-form {
  width: 100%;
}

.login-form-title {
  display: block;
  font-family: Poppins-Bold;
  font-size: 40px;
  color: #0d0d0d;
  line-height: 1.5;
  text-align: center;
}

/*------------------------------------------------------------------
[ Input ]*/

.wrap-input100 {
  width: 100%;
  position: relative;
  border-bottom: 2px solid #adadad;
  margin-bottom: 37px;
}

.input100 {
  font-family: Poppins-Regular;
  font-size: 15px;
  color: #555555;
  line-height: 1.2;

  display: block;
  width: 100%;
  height: 45px;
  background: transparent;
  padding: 0 5px;
}

/*---------------------------------------------*/
.focus-efecto {
  position: absolute;
  display: block;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  pointer-events: none;
}

.focus-efecto::before {
  content: "";
  display: block;
  position: absolute;
  bottom: -2px;
  left: 0;
  width: 0;
  height: 4px; /*ancho de la linea que hace el efecto de barra de progeso en el input al hacer foco*/

  -webkit-transition: all 0.4s;
  -o-transition: all 0.4s;
  -moz-transition: all 0.4s;
  transition: all 0.4s;

  background: #E39B14;
  background: -webkit-linear-gradient(left, #E39B14,  #E39B14);
  background: -o-linear-gradient(left,  #E39B14,  #E39B14);
  background: -moz-linear-gradient(left, #E39B14,  #E39B14);
  background: linear-gradient(left,  #E39B14,  #E39B14);
}

.focus-efecto::after {
  font-family: Poppins-Regular;
  font-size: 15px;
  color: #999999;
  line-height: 1.2;

  content: attr(data-placeholder);
  display: block;
  width: 100%;
  position: absolute;
  top: 16px;
  left: 0px;
  padding-left: 5px;

  -webkit-transition: all 0.4s;
  -o-transition: all 0.4s;
  -moz-transition: all 0.4s;
  transition: all 0.4s;
}

.input100:focus + .focus-efecto::after {
  top: -15px;
}

.input100:focus + .focus-efecto::before {
  width: 100%;
}

.has-val.input100 + .focus-efecto::after {
  top: -15px;
}

.has-val.input100 + .focus-efecto::before {
  width: 100%;
}

/*---------------------------------------------*/

/*------------------------------------------------------------------
[ Button ]*/
.container-login-form-btn {
  display: -webkit-box;
  display: -webkit-flex;
  display: -moz-box;
  display: -ms-flexbox;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  padding-top: 13px;
}

.wrap-login-form-btn {
  width: 100%;
  display: block;
  position: relative;
  z-index: 1;
  border-radius: 40px 5px;
  overflow: hidden;
  margin: 0 auto;
}

.login-form-bgbtn {
  position: absolute;
  z-index: -1;
  width: 300%;
  height: 100%;
  background: #a64bf4;
  background: -webkit-linear-gradient(right,  #E39B14,   #E39B14,   #E39B14,   #E39B14);
  background: -o-linear-gradient(right,   #E39B14,  #E39B14,   #E39B14,   #E39B14);
  background: -moz-linear-gradient(right,    #E39B14,   #E39B14,   #E39B14,  #E39B14);
  background: linear-gradient(right,   #E39B14,  #E39B14,  #E39B14,  #E39B14);
  top: 0;
  left: -100%;

  -webkit-transition: all 0.4s;
  -o-transition: all 0.4s;
  -moz-transition: all 0.4s;
  transition: all 0.4s;
}

.login-form-btn {
  font-family: Poppins-Medium;
  font-size: 20px;
  color: #fff;
  line-height: 1.2;
  text-transform: uppercase;

  display: -webkit-box;
  display: -webkit-flex;
  display: -moz-box;
  display: -ms-flexbox;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 20px;
  width: 100%;
  height: 50px;
}

.wrap-login-form-btn:hover .login-form-bgbtn {
  left: 0;
}

/*--- Para dispositivos small responsive ---*/

@media (max-width: 576px) {
  .wrap-login {
    padding: 77px 15px 33px 15px;
  }
}
</style>
