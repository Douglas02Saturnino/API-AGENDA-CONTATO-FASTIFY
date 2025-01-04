import { ContactCreate, ContactRepository } from "../interfaces/contacts.interface";
import { UserRepository } from "../interfaces/user.interface";
import { ContactRepositoryPrisma } from "../repositories/contacts.repository";
import { UserRepositoryPrisma } from "../repositories/user.repository";

class ContactUseCase {
    private contactRepository: ContactRepository;
    private userRepository: UserRepository;
    constructor(){
        this.contactRepository = new ContactRepositoryPrisma();
        this.userRepository = new UserRepositoryPrisma();
    }

    async create({email, name, phone, userEmail}: ContactCreate){
        const user = await this.userRepository.findByEmail(userEmail);

        if(!user){
            throw new Error('User not found');
        }

        const verifyExistsContact = await this.contactRepository.findByEmailorPhone(email, phone);

        if(verifyExistsContact){
            throw new Error('Contact already exists');
        }

        const contact = await this.contactRepository.create({
            email,
            name,
            phone,
            userId: user.id
        });
        return contact;
    }

    async listAllContacts(userEmail: string){
        const user = await this.userRepository.findByEmail(userEmail);

        if(!user){
            throw new Error('User not found');
        }

        const contacts = await this.contactRepository.findAllContacts(user.id);
        return contacts;
    }

    async updateContact({id, name, email, phone}: Contact){
        const data = await this.contactRepository.updateContact({id, name, email, phone})

        return data;
    }
    async delete(id: number){
        const data = await this.contactRepository.delete(id);

        return data;
    }
}

export { ContactUseCase };