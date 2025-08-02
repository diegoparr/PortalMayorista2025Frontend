export default {
  methods: {
    ufirst: (string) => {
      return string.charAt(0).toUpperCase() + string.slice(1);
    },
    ifTokenExists() {
      return !!localStorage.getItem('token_lahipertienda');
    },
    eliminarArrayObjetos(arr, attr, value) {
      let i = arr.length;
      while (i--) {
        if (arr[i]
          && arr[i].hasOwnProperty(attr)
          && (arguments.length > 2 && arr[i][attr] === value)) {
          arr.splice(i, 1);
        }
      }
      return arr;
    },
    buscarArrayObjetos(nameKey, myArray) {
      for (let i = 0; i < myArray.length; i++) {
        if (myArray[i].name === nameKey) {
          return myArray[i];
        }
      }
    },
    formatInvoice(value) {
      let numeral = require('numeral');
      //numeral.locale('es');
      let number = numeral(value);
      numeral.defaultFormat('0,0');
      return number.format();
    },
    locationShop(string) {
      return this.ufirst(string.toLowerCase());
    },
    retornarHora12(horaString) {
      let split = horaString.split(":");
      let hora12 = parseInt(split[0]) - 12;
      let amPM = 'PM';
      if (hora12 < 0) {
        hora12 = parseInt(split[0]);
        amPM = 'AM';
      }
      return hora12 + ":" + split[1] + " " + amPM;
    },
    formatearFecha(fecha, formato) {
      let moment = require('moment');
      return moment(fecha).format(formato)
    }
  }
};
