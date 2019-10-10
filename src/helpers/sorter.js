import moment from 'moment';

class Sorter {

    static sorterValue(a, b) {
        a = Math.abs(a);
        b = Math.abs(b);
        return a > b ? 1 : -1
    }

    static sorterDate(a, b) {   
        return a > b ? 1 : -1
    }
    
    static sorterHours(a, b) {   
        a = moment(a);
        b = moment(b);
        return a.isBefore(b) ? -1 : 1
    }

}

export default Sorter;