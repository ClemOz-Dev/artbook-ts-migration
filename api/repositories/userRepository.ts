import User from "../../db/models/user";
import {Artwork} from "../../db/models";
import CoreRepository from "./coreRepository";

interface IArtistWithArtworks {
    // Définissez ici la structure attendue pour un artiste avec ses œuvres
}

class UserRepository extends CoreRepository<User> {
    constructor() {
        super(User);
    }

    async findByEmail(email: string): Promise<User | null> {
        try {
            return await this.model.findOne({where: {email}});
        } catch (error) {
            throw error;
        }
    }

    async getArtistByIdWithArtworks(artistId: number): Promise<IArtistWithArtworks | null> {
        try {
            return await this.model.findOne({
                where: {id: artistId, role_id: 3},
                attributes: ['id', 'first_name', 'last_name', 'image', 'birthdate', 'nationality'],
                include: [{
                    model: Artwork,
                    as: 'artworks',
                    attributes: ['id', 'name', 'image', 'description', 'category_id', 'created_at', 'updated_at']
                }]
            });
        } catch (error) {
            throw error;
        }
    }
}

export = UserRepository;
