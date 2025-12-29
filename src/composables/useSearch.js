import { ref } from "vue";

export function useSearch () {
 result = ref([])
 error = ref('')
 loading = ref(false)

 const searchEmployee = async ()=> {
  loding.value = true;
  error.value = ""

  try{
    const response = await fetch("https://my-flask-9.vercel.app/employee/short")
  }
 }catch{

 } finally{
  loading.value = false
 }

 return { loading , error , searchEmployee}
}
