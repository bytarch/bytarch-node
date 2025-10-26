class Public {
    constructor(apiUrl = 'https://api.bytarch.dpdns.org') {
        this.apiUrl = apiUrl;
    }

    async listUploads() {
        const response = await fetch(`${this.apiUrl}/public/sky`, {
            method: 'GET'
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch public uploads: ${response.status} ${response.statusText}`);
        }

        return await response.json();
    }

    async listChats() {
        const response = await fetch(`${this.apiUrl}/public/chat`, {
            method: 'GET'
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch public chats: ${response.status} ${response.statusText}`);
        }

        return await response.json();
    }

    async getById(id) {
        const response = await fetch(`${this.apiUrl}/public/sky/${id}`, {
            method: 'GET'
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch public item: ${response.status} ${response.statusText}`);
        }

        return await response.json();
    }
}

export default Public;