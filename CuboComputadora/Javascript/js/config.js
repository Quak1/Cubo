console.log("dentro config.js")

const { ipcRenderer } = require('electron')
const SerialPort = require('serialport')
const Readline = SerialPort.parsers.Readline

var selPuertos = document.querySelector('#puertoCOM')
var btnCancelar = document.querySelector('#btnCancelar')
var btnAceptar = document.querySelector('#btnAceptar')
var btnRefresh = document.querySelector('#btnRefresh')
var btnConectar = document.querySelector('#btnConectar')

btnCancelar.addEventListener('click', function() {
    ipcRenderer.send("config-toggle")
})

btnRefresh.addEventListener('click', function() {
    selPuertos.innerHTML = ""

    SerialPort.list().then( function(ports) {
            ports.forEach( function(port) {
                var opt = document.createElement('option')
                opt.innerHTML = port.path
                selPuertos.appendChild(opt)
            })
        }
    )
})


var port
const parser = new Readline({ delimiter: '\n'})
btnConectar.addEventListener('click', function() {
    console.log(selPuertos.value)

    port = new SerialPort(String(selPuertos.value), {
        baudRate: 38400
    })
    port.pipe(parser)
})

parser.on('data', function (data) {
    console.log(data)
})