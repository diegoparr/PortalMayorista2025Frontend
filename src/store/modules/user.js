const state = {
  id: null,
  token: null,
  email: null,
  name: null,
  v_avatar: null,
  v_documento: null,
  v_nombre_pais: null,
  v_nombre_provincia: null,
  v_nombre_ciudad: null,
  v_primer_nombre: null,
  v_segundo_nombre: null,
  v_primer_apellido: null,
  v_segundo_apellido: null,
  v_sexo: null,
  rol: null,
  d_fechanacimiento: null,
  id_m_ciudades_fk: null,
  id_m_paises_fk: null,
  id_m_provincias_fk: null,
  id_m_tipos_documentos_fk: null,
  created_at: null,
  updated_at: null,
  expiracionToken: null,
  estaAutenticadoFull: false,
  active_pass: false,
  v_nombre_mostrar: null,
  v_uid: null,
  v_token_acceso: null,
  v_api_key: null,
  v_origen_registro: null,
  v_proveedor_acceso: null,
  b_data_completa: false,
  b_reinicio_password: false,
  b_acepta_terminos: false,
  telefonos: [],
  direccion: []
};
const getters = {
  getUsuarioTokenStore: () => {
    return localStorage.getItem('token_lahipertienda');
  },
  getUsuarioIdStore: () => {
    return localStorage.getItem('id_lahipertienda');
  },
  getUsuarioExpiracionTokenStore: () => {
    return localStorage.getItem('expiracion_token_lahipertienda');
  },
  getUsuario: (state) => {
      console.log(state);      
    return {
      id: state.id,
      email: state.email,
      name: state.name,
      v_avatar: state.v_avatar,
      v_documento: state.v_documento,
      v_nombre_pais: state.v_nombre_pais,
      v_nombre_provincia: state.v_nombre_provincia,
      v_nombre_ciudad: state.v_nombre_ciudad,
      v_primer_nombre: state.v_primer_nombre,
      v_segundo_nombre: state.v_segundo_nombre,
      v_primer_apellido: state.v_primer_apellido,
      v_segundo_apellido: state.v_segundo_apellido,
      v_sexo: state.v_sexo,
      rol: state.rol,
      d_fechanacimiento: state.d_fechanacimiento,
      id_m_ciudades_fk: state.id_m_ciudades_fk,
      id_m_paises_fk: state.id_m_paises_fk,
      id_m_provincias_fk: state.id_m_provincias_fk,
      id_m_tipos_documentos_fk: state.id_m_tipos_documentos_fk,
      created_at: state.created_at,
      updated_at: state.updated_at,
      expiracionToken: state.expiracionToken,
      token: state.token,
      estaAutenticadoFull: state.estaAutenticadoFull,
      active_pass: state.active_pass,
      v_nombre_mostrar: state.v_nombre_mostrar,
      v_uid: state.v_uid,
      v_token_acceso: state.v_token_acceso,
      v_api_key: state.v_api_key,
      v_origen_registro: state.v_origen_registro,
      v_proveedor_acceso: state.v_proveedor_acceso,
      b_data_completa: state.b_data_completa,
      b_reinicio_password: state.b_reinicio_password,
      b_acepta_terminos: state.b_acepta_terminos,
      telefonos: state.telefonos,
      direccion: state.direccion
    }
  },
  getAutenticadoFull: () => {
    return state.estaAutenticadoFull;
  },
  getAceptaTerminos: () => {
    return state.b_acepta_terminos;
  },
  getRol: () => {
    return state.rol;
  }
};
const mutations = {
  setUsuarioTokenStore: (state, data) => {
    localStorage.setItem('token_lahipertienda', data);
  },
  setUsuarioIdStore: (state, data) => {
    localStorage.setItem('id_lahipertienda', data);
  },
  setUsuarioExpiracionTokenStore: (state, data) => {
    localStorage.setItem('expiracion_token_lahipertienda', data);
  },
  setUsuario: (state, data) => {
      console.log(state);
      if (data == undefined){
        console.log(data);
      }
      
      state.id = data.id;
      state.email = data.email;
      state.name = data.name;
      state.v_avatar = data.v_avatar;
      state.v_documento = data.v_documento;
      state.v_nombre_pais = data.v_nombre_pais;
      state.v_nombre_provincia = data.v_nombre_provincia;
      state.v_nombre_ciudad = data.v_nombre_ciudad;
      state.v_primer_nombre = data.v_primer_nombre;
      state.v_segundo_nombre = data.v_segundo_nombre;
      state.v_primer_apellido = data.v_primer_apellido;
      state.v_segundo_apellido = data.v_segundo_apellido;
      state.v_sexo = data.v_sexo;
      state.rol = data.rol;
      state.d_fechanacimiento = data.d_fechanacimiento;
      state.id_m_ciudades_fk = data.id_m_ciudades_fk;
      state.id_m_paises_fk = data.id_m_paises_fk;
      state.id_m_provincias_fk = data.id_m_provincias_fk;
      state.id_m_tipos_documentos_fk = data.id_m_tipos_documentos_fk;
      state.created_at = data.created_at;
      state.updated_at = data.updated_at;
      state.expiracionToken = data.expiracionToken;
      state.token = data.token;
      state.estaAutenticadoFull = data.estaAutenticadoFull;
      state.active_pass = data.active_pass;
      state.v_nombre_mostrar = data.v_nombre_mostrar;
      state.v_uid = data.v_uid;
      state.v_token_acceso = data.v_token_acceso;
      state.v_api_key = data.v_api_key;
      state.v_origen_registro = data.v_origen_registro;
      state.v_proveedor_acceso = data.v_proveedor_acceso;
      state.b_data_completa = data.b_data_completa;
      state.b_reinicio_password = data.b_reinicio_password;
      state.b_acepta_terminos = data.b_acepta_terminos;
      state.telefonos =data.telefonos;
      state.direccion =data.direccion;
     
  },
  setUsuarioDestroy: (state) => {
    localStorage.removeItem("token_lahipertienda");
    localStorage.removeItem("id_lahipertienda");
    localStorage.removeItem("expiracion_token_lahipertienda");
    state.id = null;
    state.token = null;
    state.email = null;
    state.name = null;
    state.v_avatar = null;
    state.v_documento = null;
    state.v_nombre_pais = null;
    state.v_nombre_provincia = null;
    state.v_nombre_ciudad = null;
    state.v_primer_nombre = null;
    state.v_segundo_nombre = null;
    state.v_primer_apellido = null;
    state.v_segundo_apellido = null;
    state.v_sexo = null;
    state.rol = null;
    state.d_fechanacimiento = null;
    state.id_m_ciudades_fk = null;
    state.id_m_paises_fk = null;
    state.id_m_provincias_fk = null;
    state.id_m_tipos_documentos_fk = null;
    state.created_at = null;
    state.updated_at = null;
    state.expiracionToken = null;
    state.estaAutenticadoFull = false;
    state.v_nombre_mostrar = null;
    state.v_uid = null;
    state.v_token_acceso = null;
    state.v_api_key = null;
    state.v_origen_registro = null;
    state.v_proveedor_acceso = null;
    state.b_data_completa = false;
    state.b_reinicio_password = false;
    state.active_pass = false;
    state.telefonos =[];
    state.direccion =[];
  }
};
export default {state, getters, mutations}
