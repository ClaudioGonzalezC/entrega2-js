let presupuesto = {};
let compras = [];

// Función para validar el nombre del presupuesto
function validarNombrePresupuesto(nombre) {
    return nombre && nombre.trim().length >= 3;
}

// Función para validar el simbolo de moneda
function esSimboloMonedaValido(simbolo) {
    const simbolosValidos = ['฿', '₵', '₡', 'Bs', 'B/.', '₫', '€', 'ƒ', '₲', 'Kč', '₭', '£', '₤', '₥', '₦', '₱', 'P', 'R', '₨', 'Sk', '৲', 'S/', '৳', 'R$', '$', '₸', '₮', '₩', '¥', 'zł', '₴', '₪', '₽'];
    return simbolosValidos.includes(simbolo);
}

// Función para mostrar sugerencias de simbolos
function mostrarSugerenciasSimbolos() {
    return 'Puedes utilizar, por ejemplo: ฿, ₵, ₡, Bs, B/., ₫, €, ƒ, ₲, Kč, ₭, £, ₤, ₥, ₦, ₱, P, R, ₨, Sk, ৲, S/, ৳, R$, $, ₸, ₮, ₩, ¥, zł, ₴, ₪, ₽';
}

// Función para validar el monto
function validarMonto(monto) {
    return !isNaN(monto) && Number.isInteger(parseFloat(monto)) && parseFloat(monto) > 0;
}

// Función para registrar el nombre del presupuesto
function registrarNombrePresupuesto() {
    let nombre;
    do {
        nombre = prompt('Comencemos por darle un nombre a tu proyecto de presupuesto. Debe contar con al menos 3 caracteres.');
        if (nombre === null) {
            alert('Registro cancelado');
            return null;
        }
    } while (!validarNombrePresupuesto(nombre));
    return nombre.trim();
}

// Función para registrar el simbolo de la moneda
function registrarSimboloMoneda() {
    let simbolo;
    do {
        simbolo = prompt('Ingresa el símbolo monetario que quieres usar:');
        if (simbolo === null) {
            alert('Registro cancelado');
            return null;
        }
        simbolo = simbolo.trim();
        if (!esSimboloMonedaValido(simbolo)) {
            alert('El símbolo ingresado no es válido. ' + mostrarSugerenciasSimbolos());
        }
    } while (!esSimboloMonedaValido(simbolo));
    return simbolo;
}

// Función para registrar el monto total del presupuesto
function registrarMontoTotal() {
    let monto;
    do {
        monto = prompt('Ingresa tu presupuesto inicial');
        if (monto === null) {
            alert('Monto no ingresado');
            return null;
        }
        monto = monto.trim();
        if (!validarMonto(monto)) {
            alert('El presupuesto debe ser un número entero mayor a 0.');
        }
    } while (!validarMonto(monto));
    return parseFloat(monto);
}

// Función para registrar una compra
function registrarCompra() {
    let compra = {};
    compra.nombre = prompt('Ingresa el nombre de la compra');
    if (!compra.nombre || compra.nombre.trim() === '') {
        alert('El nombre de la compra no puede estar vacío.');
        return null;
    }
    compra.nombre = compra.nombre.trim();

    let montoCompra;
    do {
        montoCompra = prompt('Ingresa el monto de la compra ' + '(' + presupuesto.simboloMoneda + ')');
        if (montoCompra === null) {
            alert('Monto de la compra no ingresado');
            return null;
        }
        montoCompra = montoCompra.trim();
        if (!validarMonto(montoCompra)) {
            alert('El monto ingresado no es válido. Debe ser un número positivo.');
        } else if (parseFloat(montoCompra) > presupuesto.montoTotal) {
            alert('El monto de la compra no puede ser mayor que el presupuesto disponible.');
            return null;
        }
    } while (!validarMonto(montoCompra) || parseFloat(montoCompra) > presupuesto.montoTotal);

    compra.monto = parseFloat(montoCompra);
    presupuesto.montoTotal -= compra.monto;
    return compra;
}

// Función para mostrar las compras registradas
function mostrarCompras(compras) {
    compras.forEach((compra, registro) => {
        alert('Compra ' + (registro + 1) + ': ' + compra.nombre + ' por un monto de ' + presupuesto.simboloMoneda + compra.monto);
    });
}

// Función para calcular el monto total gastado
function calcularMontoTotalGastado(compras) {
    return compras.reduce((total, compra) => total + compra.monto, 0);
}

// Función para calcular el promedio de gasto por compra
function calcularPromedioGasto(compras) {
    if (compras.length === 0) return 0;
    return calcularMontoTotalGastado(compras) / compras.length;
}

// Función para filtrar compras por monto minimo
function filtrarComprasPorMontoMinimo(compras, montoMinimo) {
    return compras.filter(compra => compra.monto >= montoMinimo);
}

// Registrar el nombre del presupuesto
presupuesto.nombre = registrarNombrePresupuesto();
if (!presupuesto.nombre) {
    console.log('Registro cancelado');
    return;
}

// Registrar el simbolo de la moneda
presupuesto.simboloMoneda = registrarSimboloMoneda();
if (!presupuesto.simboloMoneda) {
    console.log('Registro cancelado');
    return;
}

// Registrar el monto total del presupuesto
presupuesto.montoTotal = registrarMontoTotal();
if (!presupuesto.montoTotal) {
    console.log('Registro cancelado');
    return;
}

alert('¡Monto ingresado en ' + presupuesto.nombre + '! Tu presupuesto inicial es de: ' + presupuesto.simboloMoneda + presupuesto.montoTotal);
console.log(presupuesto);

// Registrar compras
let continuarIngresando = true;
while (continuarIngresando) {
    let compra = registrarCompra();
    if (compra) {
        compras.push(compra);
        alert('Has ingresado: ' + compra.nombre + ' por un monto de: ' + presupuesto.simboloMoneda + compra.monto);
    } else {
        alert('Compra no registrada');
        break;
    }

    let respuestaContinuar = prompt('¿Deseas ingresar otra compra? (Si/No)');
    if (respuestaContinuar === null || respuestaContinuar.trim().toLowerCase() === 'no') {
        continuarIngresando = false;
    }
}

// Mostrar compras registradas
if (compras.length > 0) {
    mostrarCompras(compras);
}

// Calcular y mostrar el monto total gastado y el promedio de gasto por compra
let montoTotalGastado = calcularMontoTotalGastado(compras);
let promedioGasto = calcularPromedioGasto(compras);
alert('Monto total gastado: ' + presupuesto.simboloMoneda + montoTotalGastado);
alert('Promedio de gasto por compra: ' + presupuesto.simboloMoneda + promedioGasto.toFixed(2));

// Filtrar y mostrar compras por monto minimo
let montoMinimo = parseFloat(prompt('Ingresa el monto mínimo para filtrar compras'));
let comprasFiltradas = filtrarComprasPorMontoMinimo(compras, montoMinimo);
if (comprasFiltradas.length > 0) {
    alert('Compras que superan el monto minimo de ' + presupuesto.simboloMoneda + montoMinimo + ':');
    mostrarCompras(comprasFiltradas);
} else {
    alert('No hay compras que superen el monto minimo de ' + presupuesto.simboloMoneda + montoMinimo);
}

console.log(compras);
console.log(presupuesto);