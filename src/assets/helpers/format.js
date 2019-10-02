class Format {

    static money(value) {  
        return 'R$ ' + value.toFixed(2).replace('.',',');
    }
}

export default Format;