import { StateDTO } from 'src/models/state.dto';
export interface CityDTO {
    id: String;
    name: String;
    state?: StateDTO;
}