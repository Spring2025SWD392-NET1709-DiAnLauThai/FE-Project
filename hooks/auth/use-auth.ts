import { AuthPayload } from "@/domains/models/auth.model"
import { AuthServices } from "@/domains/services/auth.services"
import { queryKey } from "@/domains/stores/query-key"
import { useMutation } from "@tanstack/react-query"
import { useRouter } from "next/navigation"
import { useToast } from "../use-toast"

export const useAuth = () => {
    const toast = useToast()
    const { push } = useRouter()
    const loginMutation = useMutation({
        mutationKey: ['login'],
        mutationFn: async (payload: AuthPayload) => await AuthServices.login(payload), 
        onSuccess: (data) => {

            toast.toast({
                title: "Login success",
                description: "Welcome back",
                
            })
            push('/')
        },
        onError: (error) => {console.log("Login failed", error)}
    })

    return {loginMutation}
}
