import moment from 'moment';

class Order {
    constructor(orderId, items, totalAmount, date) {
        this.orderId = orderId,
        this.items = items,
        this.totalAmount = totalAmount,
        this.date = date
    }

    get readableDate() {
        return moment(this.date).format('MMMM Do YYYY, hh:mm')
    }
}

export default Order;