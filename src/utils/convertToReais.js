export function convertToReais(value) {
    return Number(value / 100).toLocaleString('pt-br', {
        style: 'currency',
        currency: 'BRL'
    })
}