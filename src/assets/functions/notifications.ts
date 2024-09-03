import { Notify } from 'quasar';
const configNotify = {timeout:4750, color:'negative', multiLine:true, badgePosition:undefined, timeLong: 20000};

export const positiveNotification = (message: string) => {
  Notify.create({...configNotify,
    icon: 'mdi-check-bold',
    position: 'top-right',
    color: 'positive',
    message
  })
}

export const warningNotification = (message: string) => {
  Notify.create({...configNotify,
    icon: 'mdi-alert-outline',
    position: 'top-right',
    color: 'warning',
    message
  })
}

export const negativeNotification = ( message: string, timeLong= false ) => {
  Notify.create({...configNotify,
    actions: timeLong ? [{ label: 'Aceptar', color: 'white' }] : [],
    timeout: timeLong ? configNotify.timeLong : configNotify.timeout,
    icon: 'mdi-shield-alert',
    position: 'top-right',
    message
  })
}