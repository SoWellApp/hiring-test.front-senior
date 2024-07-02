import { reactive } from 'vue'

const form = reactive({
  fullName: '',
  age: 0,
  about: '',
  accept: false
})

export const useForm = () => {
  const reset = () => {
    form.fullName = ''
    form.age = 0
    form.about = ''
    form.accept = false
  }

  return { form, reset }
}
