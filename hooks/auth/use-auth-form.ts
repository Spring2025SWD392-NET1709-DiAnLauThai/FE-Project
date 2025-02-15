import { formToJSON } from "axios"
import { useAuth } from "./use-auth"
import { useForm } from "react-hook-form"
import { loginPayload, loginSchema } from "@/domains/schemas/auth.shema"
import { zodResolver } from "@hookform/resolvers/zod"

export const useAuthForm = () => {
    const { loginMutation } = useAuth()
    const form = useForm <loginPayload> ({
        resolver: zodResolver(loginSchema),
        defaultValues:{
            email: "",
            password: "",
        }
    })
    const onSubmit = form.handleSubmit( async (data) => {
       await loginMutation.mutate(data)
    })
    return { form, onSubmit, isLoading: loginMutation.isPending }
}