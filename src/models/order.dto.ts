import { orderItemDTO } from './order-item.dto';
import { paymentDTO } from './payment.dto';
import { refDTO } from './ref.dto';
export interface orderDTO {
    client: refDTO;
    deliveryAddress: refDTO;
    payment: paymentDTO;
    items: orderItemDTO[];
}