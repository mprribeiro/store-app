import { CityDTO } from 'src/models/city.dto';

export interface AddressDTO {
    id: String;
    street: String;
    number: String;
    complement: String;
    neighborhood: String;
    cep: String;
    city: CityDTO
}