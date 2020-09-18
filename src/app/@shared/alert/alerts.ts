
import Swal from 'sweetalert2';
import { EMAIL_PATTERN } from '../../@core/constant/regex';

const swalWithbasicOptions = (title: string, html: string) => Swal.mixin({
        title,
        html,
        focusConfirm: false,
        showCloseButton: true,
        cancelButtonText: 'Cancelar',
        showCancelButton: true,
  });

export async function formBasicDialog(title: string, html: string, property: string) {
    return await swalWithbasicOptions(title, html).fire({
        preConfirm: () => {
            const value = ((document.getElementById('name')) as HTMLInputElement).value;
            if (value) {
                return value;
            }
            Swal.showValidationMessage('Tienes que añadir un genero para poder almacenarlo');
            return;
        }
      });
}

export async function userformBasicDialog(title: string, html: string) {
    return await swalWithbasicOptions(title, html).fire({
        preConfirm: () => {
            let error = '';
            const name = ((document.getElementById('name')) as HTMLInputElement).value;
            if (!name) {
                error += 'Nombre es obligatorio<br/>';
            }
            const lastname = ((document.getElementById('lastname')) as HTMLInputElement).value;
            if (!lastname) {
                error += 'Apellido es obligatorio<br/>';
            }
            const email = ((document.getElementById('email')) as HTMLInputElement).value;
            if (!email) {
                error += 'Email es obligatorio<br/>';
            }
            if (!EMAIL_PATTERN.test(email)) {
                error += 'El formato del email no es correcto<br/>';
            }
            const role = ((document.getElementById('role')) as HTMLInputElement).value;
            if (error !== '') {
                Swal.showValidationMessage(
                    error
                );
                return;
            }
            return {
                name,
                lastname,
                email,
                role,
                birthday: new Date().toISOString()
            };
        }
      });
}


export async  function infoDetailBasic(title: string, html: string, width: number | string, confirmButtonText: string = '<i class="fas fa-edit"></i> Editar', cancelButtonText: string = '<i class="fas fa-minus-circle"></i> Bloquear') {
   return await Swal.fire({
        icon: 'info',
        title,
        html,
        width: `${width}px`,
        showCloseButton: true,
        showCancelButton: true,
        confirmButtonColor: '#e0a800',
        cancelButtonColor: '#dc3545',
        confirmButtonText,
        cancelButtonText
      }).then((result) => {
        if (result.value) {
            console.log('Editar');
            return true;
        } else if (result.dismiss.toString() === 'cancel'){
            console.log('Bloquear');
            return false;
        }
      });
}
