export interface Contact {
    id: number;
    name: string;
    email: string;
    phone: string;
    userId?: number;
}

export interface ContactCreate {
    name: string;
    email: string;
    phone: string;
    userEmail: string;
}

export interface ContactCreateData{
    name: string;
    email: string;
    phone: string;
    userId: number;
}

export interface ContactRepository {
    create(data: ContactCreateData): Promise<Contact>;
    findByEmailorPhone(emial: string,  phone: string): Promise<Contact | null>
    findAllContacts(userId: string): Promise<Contact[]>;
    updateContact({id, name, email, phone}: Contact):Promise<Contact>;
    delete(id: number): Promise<boolean>;
}