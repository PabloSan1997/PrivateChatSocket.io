
export const urlconnection = {
    httpconnect: 'http://localhost:3000',
    websockectconnect: 'ws://localhost:3000'
}

export const readApi: ReadApi = {
    async login(data: LoginDto): Promise<TokenDto> {

        const ft = await fetch(`${urlconnection.httpconnect}/api/user/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        if (!ft.ok)
            throw await ft.json() as ErrorDto;

        return ft.json();

    },
    async regisger(data: SignUpDto): Promise<TokenDto> {
        const ft = await fetch(`${urlconnection.httpconnect}/api/user/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        if (!ft.ok)
            throw await ft.json() as ErrorDto;

        return ft.json();
    },
    async findUserInfo (token: string): Promise<UserInfoHeader> {
        const ft = await fetch(`${urlconnection.httpconnect}/api/user/getuserinfo`, {
            method: 'GET',
            headers: {
                'Authorization':`Bearer ${token}`
            }
        });

        if (!ft.ok)
            throw await ft.json() as ErrorDto;

        return ft.json();
    },
    async findUsers(token: string): Promise<UserInfoHeader[]> {
        const ft = await fetch(`${urlconnection.httpconnect}/api/message/users`, {
            method: 'GET',
            headers: {
                'Authorization':`Bearer ${token}`
            }
        });

        if (!ft.ok)
            throw await ft.json() as ErrorDto;

        return ft.json();
    },
    async findMessages(token: string, userfriend: string): Promise<MessageDto[]> {
        const ft = await fetch(`${urlconnection.httpconnect}/api/message/${userfriend}`, {
            method: 'GET',
            headers: {
                'Authorization':`Bearer ${token}`
            }
        });

        if (!ft.ok)
            throw await ft.json() as ErrorDto;

        return ft.json();
    },
    async deleteMessage(token: string, userfriend: string, id:number): Promise<void> {
        const ft = await fetch(`${urlconnection.httpconnect}/api/message/${id}?userfriend=${userfriend}`, {
            method: 'DELETE',
            headers: {
                'Authorization':`Bearer ${token}`
            }
        });

        if (!ft.ok)
            throw await ft.json() as ErrorDto;
    }
}