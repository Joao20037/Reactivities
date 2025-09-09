import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import type { LogingSchema } from "../schemas/LoginSchema"
import agent from "../api/agents"
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import type { RegisterSchema } from "../schemas/RegisterSchema";

export const useAccount = () => {
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    const loginUser = useMutation({
        mutationFn: async  (creds: LogingSchema) => {
            await agent.post("/login?useCookies=true", creds);
        },
        onSuccess: async () => {
            await queryClient.invalidateQueries({
                queryKey: ['user']
            });
        }
    });

    const registerUser = useMutation({
        mutationFn: async (creds: RegisterSchema) => {
            await agent.post("/account/register", creds)
        },
        onSuccess: () => {
            toast.success("Register successful - You can now login");
            navigate("/login");
        }
    })

    const logoutUser = useMutation({
        mutationFn: async () => {
            await agent.post('/account/logout')
        },
        onSuccess: () => {
            queryClient.removeQueries({queryKey: ['user']});
            queryClient.removeQueries({queryKey: ['activities']});
            navigate('/');
        }
    })

    const {data: currentUser, isLoading: loadingUserInfo} = useQuery({
        queryKey: ['user'],
        queryFn: async () => {
            const response = await agent.get<User>("/account/user-info");
            return response.data;
        },
        enabled: !queryClient.getQueryData(['user']) 
    })

    return {
        loginUser,
        currentUser,
        logoutUser,
        loadingUserInfo,
        registerUser
    }
}