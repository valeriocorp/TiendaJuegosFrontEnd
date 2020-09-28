import Swal, { SweetAlertPosition } from 'sweetalert2';
import {TYPE_ALERT} from './values.config';



export function basicAlert(icon = TYPE_ALERT.SUCCESS, title: string = '', position: SweetAlertPosition = 'top') {
    Swal.fire({
        title,
        icon,
        showConfirmButton: false,
        toast: true,
        position,
        timer: 2500,
        timerProgressBar: true
      });
}
