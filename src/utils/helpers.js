import cogoToast from 'cogo-toast'

export const Notification = (type='success', message='Operation successful') => {
  cogoToast[type](message)
}