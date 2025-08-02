export default {
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
        && (arguments.length > 2 && arr[i][attr] === value )) {
        arr.splice(i, 1);

      }
    }
    return arr;
  },
  eliminarArrayObjetos2(arr, attr, value) {
    let i = arr.length;
    let flag = false;
    let a = 0;
    let b = 0;
    while (i--) {
      // console.log('atributo afuera', arr[i][attr]);
      // console.log('value afuera', value);
      if (arr[i]
        && arr[i].hasOwnProperty(attr)
        /*&& (arguments.length > 2 && arr[i][attr] === value )*/) {

       /* console.log('atributo', arr[i][attr]);
        console.log('value', value);*/
        b = 0;
        //arr[i][attr].
        arr[i][attr].forEach( function(valor, indice, array)
        {
          // console.log('el atributo es', arr[i][attr]);
          // console.log('el value es ', value);
         /* console.log('el atributo'+indice, arr[i][attr][indice]);
          console.log('el value es '+indice, value[indice]);
          console.log('b', b);
          console.log('tamaño',arr[i][attr][indice].length);*/
          console.log(arr[i][attr][indice]+ ' ' + value[indice])
          if(arr[i][attr][indice] ===  value[indice])
          {
            console.log('adentro ',arr[i][attr][indice]+ ' ' + value[indice])
            b++
          }

          console.log('b', b);
          console.log('tamaño', arr[i][attr].length);
          if( b === arr[i][attr].length)
          {
            flag = true;
            a = i;
            arr.splice(a, 1);
            console.log('eliminando el', a);
            return false
          }
        });

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
    return numeral(value).format('0,0.00');
  },
  locationShop(string) {
    return this.ufirst(string.toLowerCase());
  }
};
