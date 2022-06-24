import { environment } from "src/environments/environment.prod";
import Swal from "sweetalert2";


export class Error_Message {
    static Message() {
          Swal.fire({
               icon: 'error',
               title: environment.ErrorMessage_Header,
               text: environment.ErrorMessage,
          });
     }
}
