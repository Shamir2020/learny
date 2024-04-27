import { jwtDecode } from 'jwt-decode'
import React, {useEffect, useState} from 'react'
export const UserContext = React.createContext()

const UserContextProvider = ({children}) => {
    const [user, setUser] = useState(null)

    const FetchUser = async (token)=>{
        const response = await fetch(`/api/user`, {
            method: 'POST',
            headers: {
                'Content-Type':'application/json'
            },
            body: JSON.stringify({"token":token})
        })

        
        if (response.ok){
            const user = await response.json()

            console.log(`user  is ${user}`)
            return user
        }
        else {
            console.log('Bad request')
            return null
        }
    }

    const FetchAdmin = async (token)=>{
        const response = await fetch(`/api/admin`, {
            method: 'GET',
            headers: {
                "authorization": `Bearer ${token}`,
                'Content-Type':'application/json'
            }
        })

        
        if (response.ok){
            const user = await response.json()

            console.log(`user  is ${user}`)
            return user
        }
        else {
            console.log('Bad request')
            return null
        }
    }

    useEffect(()=>{
        if (!user){
            var token = null
            try{
                token = localStorage.getItem('token')
                console.log(`Token - ${token}`)
                if (token != null && token != 'null' && token != ""){

                    const role = jwtDecode(token).role

                    let u 
                    if (role == 'admin'){
                        u = FetchAdmin(token)
                    }
                    else {
                        u = FetchUser(token)
                    }
                    if (u) {
                    console.log(u.name)
                    setUser(u)
                    }
                }
            }catch(error){
                console.log(error)
            }
    
        }
    },[])

    return (
        <UserContext.Provider value={{user, setUser}}>
            {children}
        </UserContext.Provider>
    )
}

export default UserContextProvider