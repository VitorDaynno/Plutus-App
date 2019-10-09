class Format {

    static money(value) {  
        return 'R$ ' + value.toFixed(2).replace('.',',');
    }

    static formatDate(dateString) {
        const date = new Date(dateString);
        return date.toLocaleDateString();
    }
    
    static formatTime(dateString) {
        const time = new Date(dateString);
        return time.toLocaleTimeString();
    }
}

export default Format;