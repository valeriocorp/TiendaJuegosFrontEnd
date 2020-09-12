import Swal from 'sweetalert2';
import {TYPE_ALERT} from './values.config';



export function basicAlert(icon = TYPE_ALERT.SUCCESS, title: string = '') {
    Swal.fire({
        title,
        icon,
        showConfirmButton: false,
        toast: true,
        position: 'top',
        timer: 2500,
        timerProgressBar: true
      });
}
