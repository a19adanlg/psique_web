module.exports = {
    pages: {
      index: {
        entry: './src/views/HomeView.vue',
        template: './public/index.html',
        title: 'Home - Psique',
        chunks: ['chunk-vendors', 'chunk-common', 'index']
      },
      citas: {
        entry: './src/views/CitasView.vue',
        template: './public/index.html',
        title: 'Citas - Psique',
        chunks: ['chunk-vendors', 'chunk-common', 'citas']
      },
      contacto: {
        entry: './src/views/ContactoView.vue',
        template: './public/index.html',
        title: 'Contacto - Psique',
        chunks: ['chunk-vendors', 'chunk-common', 'contacto']
      },
      doctores: {
        entry: './src/views/DoctoresView.vue',
        template: './public/index.html',
        title: 'Doctores - Psique',
        chunks: ['chunk-vendors', 'chunk-common', 'doctores']
      },
      equipo: {
        entry: './src/views/EquipoView.vue',
        template: './public/index.html',
        title: 'Equipo - Psique',
        chunks: ['chunk-vendors', 'chunk-common', 'equipo']
      },
      login: {
        entry: './src/views/LoginView.vue',
        template: './public/index.html',
        title: 'Login - Psique',
        chunks: ['chunk-vendors', 'chunk-common', 'login']
      },
      pacientes: {
        entry: './src/views/PacientesView.vue',
        template: './public/index.html',
        title: 'Pacientes - Psique',
        chunks: ['chunk-vendors', 'chunk-common', 'pacientes']
      },
      profile: {
        entry: './src/views/ProfileView.vue',
        template: './public/index.html',
        title: 'Profile - Psique',
        chunks: ['chunk-vendors', 'chunk-common', 'profile']
      },
      usuarios: {
        entry: './src/views/UsuariosView.vue',
        template: './public/index.html',
        title: 'Usuarios - Psique',
        chunks: ['chunk-vendors', 'chunk-common', 'usuarios']
      }
    }
  }