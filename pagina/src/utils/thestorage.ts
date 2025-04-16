

export const thestorage = {
    read(): string {
        if (!localStorage.hjf)
            localStorage.hjf = '';
        return localStorage.hjf;
    },
    save(d: string): void {
        localStorage.hjf = d;
    }
}