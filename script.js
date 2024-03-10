const lista = document.getElementById('list');

Sortable.create(lista, {
    animation: 150,
    chosenClass: "selected-song",
    dragClass: "while-drag",
    onEnd: () => {
        console.log('Se inserto un elemento');
    },
    group: "song-tier",
    store: {
        set: (sortable) => {
            const order = sortable.toArray();
            localStorage.setItem(sortable.options.group.name, order.join(', '));
        },
        get: (sortable) => {
            const order = localStorage.getItem(sortable.options.group.name);
            return order ? order.split(', ') : [];
        } 
    }
});

const elementoLista = document.getElementById("list-container");

function capturarImagen() {
    html2canvas(elementoLista).then(function(canvas) {
        const imgData = canvas.toDataURL('image/png');
        const enlaceDescarga = document.createElement('a');
        enlaceDescarga.href = imgData;
        enlaceDescarga.download = 'myGenesisTier.png';
        enlaceDescarga.click();
    });
}
function copiarUrl() {
    html2canvas(elementoLista).then(function(canvas) {
        const imgData = canvas.toDataURL('image/png');
        const button = document.getElementById('share-button');
        button.style.backgroundColor = '#28a745';
        button.style.color = '#ffffff';
        const buttonText = document.getElementById('buttonText');
        buttonText.innerText = 'Copied';
        navigator.clipboard.writeText(imgData)
            .then(function() {
                console.log('URL copied');
            })
            .catch(function(err) {
                console.error('Error: ', err);
            });
    });
}