<template>
  <div class="bg-primary full-screen-div">
    <q-card class="container-auth">
      <q-card-section class="content-center">
        <div class="inner-content">
          <q-img src="~assets/images/blue-logo.svg" />
          <p style="font-size: 12pt">Inicia tus evaluaciones de calidad</p>
          
          <q-btn outline color="grey-5" class="q-mt-md q-mb-md btn-google" to="/evaluaciones">
            <div class="btn-content">
              <q-img src="~assets/images/google-logo.png" alt="Google Logo" class="google-logo" />
              <span class="text-dark">Inicia sesión con Google</span>
            </div>
          </q-btn>

          <p style="font-size: 12pt">o</p>

          <q-btn outline color="grey-5" class="q-mb-lg btn-google" to="/evaluaciones">
            <div class="btn-content">
              <q-img src="~assets/images/google-logo.png" alt="Google Logo" class="google-logo" />
              <span class="text-dark">Regístrate con Google</span>
            </div>
          </q-btn>
        </div>
      </q-card-section>
    </q-card>
  </div>
</template>

<script lang='ts'>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'IndexPage',
  data () {
    return {
      slide: 0
    }
  },
})
</script>

<style lang="scss">
  @import 'src/assets/styles/main.scss';
</style>
